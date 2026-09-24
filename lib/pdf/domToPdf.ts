// Paginated CV document (DOM) → real vector PDF with embedded fonts.
//
// Instead of screenshotting the page, we read the laid-out DOM the browser already produced for the
// preview (same fonts, same wrapping, same pagination) and re-emit it as PDF primitives:
// text runs (selectable, ATS-readable), rectangles, borders, gradients and rasterised images/icons.
// Because both outputs come from one layout, the PDF cannot drift from the preview.

import type { jsPDF as JsPDF } from 'jspdf';
import { resolveFontFile } from '@/lib/cvFonts';

export interface PdfSource {
  root: HTMLElement;   // paginated document element
  pages: number;
  docW: number;        // document px across one page
  pageH: number;       // document px per page
}

const PT_W = 595.276;   // A4 width in pt

// ── helpers ───────────────────────────────────────────────────────────────────
const fontBytes = new Map<string, Promise<string>>();   // url → base64
async function loadFontBase64(url: string): Promise<string> {
  let p = fontBytes.get(url);
  if (!p) {
    p = fetch(url).then(async r => {
      if (!r.ok) throw new Error(`Font not found: ${url}`);
      const buf = new Uint8Array(await r.arrayBuffer());
      let bin = '';
      for (let i = 0; i < buf.length; i += 0x8000) bin += String.fromCharCode.apply(null, Array.from(buf.subarray(i, i + 0x8000)));
      return btoa(bin);
    });
    fontBytes.set(url, p);
  }
  return p;
}

let colorCtx: CanvasRenderingContext2D | null = null;
function parseColor(input: string): { r: number; g: number; b: number; a: number } | null {
  if (!input || input === 'transparent') return null;
  colorCtx = colorCtx || document.createElement('canvas').getContext('2d')!;
  colorCtx.fillStyle = '#000';
  colorCtx.fillStyle = input;
  const v = colorCtx.fillStyle as string;
  if (v.startsWith('#')) {
    const n = parseInt(v.slice(1), 16);
    return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255, a: 1 };
  }
  const m = v.match(/rgba?\(([^)]+)\)/);
  if (!m) return null;
  const [r, g, b, a] = m[1].split(',').map(x => parseFloat(x));
  return { r, g, b, a: a === undefined ? 1 : a };
}

function splitTop(s: string): string[] {
  const out: string[] = []; let depth = 0, cur = '';
  for (const ch of s) {
    if (ch === '(') depth++;
    if (ch === ')') depth--;
    if (ch === ',' && depth === 0) { out.push(cur.trim()); cur = ''; } else cur += ch;
  }
  if (cur.trim()) out.push(cur.trim());
  return out;
}

function radiusPx(v: string, w: number, h: number): number {
  const first = v.split(' ')[0];
  if (first.endsWith('%')) return (parseFloat(first) / 100) * Math.min(w, h);
  return parseFloat(first) || 0;
}

interface Box { x: number; y: number; w: number; h: number }

// ── main ──────────────────────────────────────────────────────────────────────
export async function renderPdf(src: PdfSource, title: string): Promise<Blob> {
  const { jsPDF } = await import('jspdf');
  const { root, pages, docW, pageH } = src;
  const f = PT_W / docW;                                  // pt per document px
  const doc: JsPDF = new jsPDF({ unit: 'pt', format: 'a4', orientation: 'portrait', compress: true });
  doc.setProperties({ title, creator: 'BirCV', subject: 'CV' });
  for (let i = 1; i < pages; i++) doc.addPage();

  const base = root.getBoundingClientRect();
  const box = (r: DOMRect): Box => ({ x: r.left - base.left, y: r.top - base.top, w: r.width, h: r.height });

  // 1) collect + embed fonts actually used by text
  const fontIds = new Map<string, string>();               // "css|w|i" → jsPDF font name
  const fontFor = async (css: string, weight: number, italic: boolean): Promise<string> => {
    const file = resolveFontFile(css, weight, italic);
    if (!file) throw new Error(`Font "${css}" is not embeddable (not in the CV font registry)`);
    const key = file.url;
    let id = fontIds.get(key);
    if (id) return id;
    // real, inspectable PDF font name, e.g. "Poppins-600" / "PlayfairDisplay-400i"
    id = `${css.replace(/\s+/g, '')}-${file.weight}${file.italic ? 'i' : ''}`;
    const b64 = await loadFontBase64(file.url);
    const vfs = `${id}.ttf`;
    doc.addFileToVFS(vfs, b64);
    doc.addFont(vfs, id, 'normal');
    fontIds.set(key, id);
    return id;
  };

  const measureCtx = document.createElement('canvas').getContext('2d')!;
  const ascentOf = (cssFont: string) => {
    measureCtx.font = cssFont;
    const m = measureCtx.measureText('Hxg');
    return m.fontBoundingBoxAscent ?? m.actualBoundingBoxAscent;
  };

  // opacity state
  const setAlpha = (a: number) => {
    // @ts-ignore GState is on the instance
    doc.setGState(new (doc as any).GState({ opacity: a, 'stroke-opacity': a }));
  };

  // draw callback once per page a vertical span touches; y is page-relative pt
  const onPages = (top: number, bottom: number, fn: (y0: number, y1: number) => void) => {
    const first = Math.max(0, Math.floor(top / pageH));
    const last = Math.min(pages - 1, Math.floor((bottom - 0.01) / pageH));
    for (let p = first; p <= last; p++) {
      doc.setPage(p + 1);
      const y0 = Math.max(top, p * pageH) - p * pageH;
      const y1 = Math.min(bottom, (p + 1) * pageH) - p * pageH;
      fn(y0, y1);
    }
  };

  const fillRect = (b: Box, color: { r: number; g: number; b: number; a: number }, alpha: number, radius = 0) => {
    onPages(b.y, b.y + b.h, (y0, y1) => {
      setAlpha(color.a * alpha);
      doc.setFillColor(color.r, color.g, color.b);
      const clipped = y1 - y0 < b.h - 0.5;
      if (radius > 0 && !clipped) doc.roundedRect(b.x * f, y0 * f, b.w * f, (y1 - y0) * f, radius * f, radius * f, 'F');
      else doc.rect(b.x * f, y0 * f, b.w * f, (y1 - y0) * f, 'F');
    });
  };

  const rasterize = async (b: Box, draw: (ctx: CanvasRenderingContext2D, w: number, h: number) => Promise<void> | void, alpha: number, jpeg = false) => {
    const k = 3;
    const cv = document.createElement('canvas');
    cv.width = Math.max(1, Math.ceil(b.w * k)); cv.height = Math.max(1, Math.ceil(b.h * k));
    const ctx = cv.getContext('2d')!;
    ctx.scale(k, k);
    if (jpeg) { ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, b.w, b.h); }
    await draw(ctx, b.w, b.h);
    const data = cv.toDataURL(jpeg ? 'image/jpeg' : 'image/png', 0.92);
    // images are atoms and never straddle pages: place by the page holding their top
    const p = Math.min(pages - 1, Math.floor(b.y / pageH));
    doc.setPage(p + 1);
    setAlpha(alpha);
    doc.addImage(data, jpeg ? 'JPEG' : 'PNG', b.x * f, (b.y - p * pageH) * f, b.w * f, b.h * f, undefined, 'FAST');
  };

  const roundRectPath = (ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) => {
    const rr = Math.min(r, w / 2, h / 2);
    ctx.beginPath();
    ctx.moveTo(x + rr, y); ctx.arcTo(x + w, y, x + w, y + h, rr); ctx.arcTo(x + w, y + h, x, y + h, rr);
    ctx.arcTo(x, y + h, x, y, rr); ctx.arcTo(x, y, x + w, y, rr); ctx.closePath();
  };

  // linear-gradient(...) → canvas gradient
  const paintGradient = (ctx: CanvasRenderingContext2D, css: string, w: number, h: number): boolean => {
    const m = css.match(/^linear-gradient\(([\s\S]*)\)$/);
    if (!m) return false;
    const parts = splitTop(m[1]);
    let angle = 180;
    const first = parts[0];
    if (/^-?[\d.]+deg$/.test(first)) { angle = parseFloat(first); parts.shift(); }
    else if (first.startsWith('to ')) {
      const t = first.slice(3).trim();
      const map: Record<string, number> = { top: 0, right: 90, bottom: 180, left: 270, 'top right': 45, 'right top': 45, 'bottom right': 135, 'right bottom': 135, 'bottom left': 225, 'left bottom': 225, 'top left': 315, 'left top': 315 };
      angle = map[t] ?? 180; parts.shift();
    }
    const rad = (angle * Math.PI) / 180;
    const len = Math.abs(w * Math.sin(rad)) + Math.abs(h * Math.cos(rad));
    const cx = w / 2, cy = h / 2;
    const dx = (Math.sin(rad) * len) / 2, dy = (-Math.cos(rad) * len) / 2;
    const g = ctx.createLinearGradient(cx - dx, cy - dy, cx + dx, cy + dy);
    const stops = parts.map(p => {
      const mm = p.match(/^([\s\S]*?)(?:\s+(-?[\d.]+)%)?$/)!;
      return { color: mm[1].trim(), pos: mm[2] !== undefined ? parseFloat(mm[2]) / 100 : undefined };
    });
    stops.forEach((s, i) => { if (s.pos === undefined) s.pos = stops.length === 1 ? 0 : i / (stops.length - 1); });
    stops.forEach(s => g.addColorStop(Math.max(0, Math.min(1, s.pos!)), s.color));
    ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
    return true;
  };

  const clipChain = (el: Element): { box: Box; r: number }[] => {
    const out: { box: Box; r: number }[] = [];
    for (let a = el.parentElement; a && a !== root.parentElement; a = a.parentElement) {
      const cs = getComputedStyle(a);
      if (cs.overflow !== 'visible' || cs.overflowX !== 'visible') {
        const b = box(a.getBoundingClientRect());
        out.push({ box: b, r: radiusPx(cs.borderTopLeftRadius, b.w, b.h) });
      }
    }
    return out;
  };

  const drawImage = async (img: HTMLImageElement, alpha: number) => {
    if (!img.complete || !img.naturalWidth) await img.decode().catch(() => {});   // never draw a half-loaded photo
    const cs = getComputedStyle(img);
    const b = box(img.getBoundingClientRect());
    if (b.w < 1 || b.h < 1 || !img.naturalWidth) return;
    const r = radiusPx(cs.borderTopLeftRadius, b.w, b.h);
    const clips = clipChain(img);
    const hasClip = r > 0 || clips.some(c => c.r > 0);
    await rasterize(b, async (ctx, w, h) => {
      ctx.save();
      if (r > 0) { roundRectPath(ctx, 0, 0, w, h, r); ctx.clip(); }
      for (const c of clips) {
        if (c.r > 0) { roundRectPath(ctx, c.box.x - b.x, c.box.y - b.y, c.box.w, c.box.h, c.r); ctx.clip(); }
      }
      const iw = img.naturalWidth, ih = img.naturalHeight;
      const fit = cs.objectFit;
      let dw = w, dh = h, dx = 0, dy = 0;
      if (fit === 'cover' || fit === 'contain') {
        const sc = fit === 'cover' ? Math.max(w / iw, h / ih) : Math.min(w / iw, h / ih);
        dw = iw * sc; dh = ih * sc;
        const pos = cs.objectPosition.split(' ');
        const px = pos[0].endsWith('%') ? parseFloat(pos[0]) / 100 : 0.5;
        const py = (pos[1] || '50%').endsWith('%') ? parseFloat(pos[1] || '50%') / 100 : 0.5;
        dx = (w - dw) * px; dy = (h - dh) * py;
      }
      ctx.drawImage(img, dx, dy, dw, dh);
      ctx.restore();
    }, alpha, !hasClip);
  };

  const drawSvg = async (svg: SVGSVGElement, alpha: number) => {
    const b = box(svg.getBoundingClientRect());
    if (b.w < 0.5 || b.h < 0.5) return;
    const clone = svg.cloneNode(true) as SVGSVGElement;
    clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    clone.setAttribute('width', String(b.w)); clone.setAttribute('height', String(b.h));
    const cs = getComputedStyle(svg);
    clone.style.color = cs.color;
    // SVG <text> must render in a registered font, never a silent system fallback
    const url = URL.createObjectURL(new Blob([new XMLSerializer().serializeToString(clone)], { type: 'image/svg+xml;charset=utf-8' }));
    try {
      const im = new Image();
      await new Promise<void>((res, rej) => { im.onload = () => res(); im.onerror = () => rej(new Error('svg')); im.src = url; });
      await rasterize(b, ctx => { ctx.drawImage(im, 0, 0, b.w, b.h); }, alpha);
    } finally { URL.revokeObjectURL(url); }
  };

  const drawBoxDecor = async (el: HTMLElement, cs: CSSStyleDeclaration, alpha: number) => {
    const b = box(el.getBoundingClientRect());
    if (b.w < 0.1 || b.h < 0.1) return;
    const tr = cs.transform;
    const rTL = radiusPx(cs.borderTopLeftRadius, b.w, b.h);
    const uniform = [cs.borderTopRightRadius, cs.borderBottomRightRadius, cs.borderBottomLeftRadius]
      .every(v => radiusPx(v, b.w, b.h) === rTL);
    const radius = uniform ? rTL : 0;

    // transformed (e.g. rotated diamond bullet): fill the transformed quad
    if (tr && tr !== 'none') {
      const col = parseColor(cs.backgroundColor);
      if (col) {
        const m = new DOMMatrix(tr);
        const cx = b.x + b.w / 2, cy = b.y + b.h / 2;
        const w = el.offsetWidth, h = el.offsetHeight;
        const pts = [[-w / 2, -h / 2], [w / 2, -h / 2], [w / 2, h / 2], [-w / 2, h / 2]].map(([x, y]) => {
          const p = m.transformPoint(new DOMPoint(x, y));
          return [cx + p.x, cy + p.y];
        });
        const p = Math.min(pages - 1, Math.floor(cy / pageH));
        doc.setPage(p + 1);
        setAlpha(col.a * alpha);
        doc.setFillColor(col.r, col.g, col.b);
        const [p0, ...rest] = pts;
        const segs = rest.map((q, i) => [(q[0] - (i ? rest[i - 1][0] : p0[0])) * f, (q[1] - (i ? rest[i - 1][1] : p0[1])) * f]);
        doc.lines(segs, p0[0] * f, (p0[1] - p * pageH) * f, [1, 1], 'F', true);
      }
      return;
    }

    // background: gradient → raster, colour → vector
    const bgImg = cs.backgroundImage;
    if (bgImg && bgImg !== 'none' && bgImg.startsWith('linear-gradient')) {
      const p = Math.min(pages - 1, Math.floor(b.y / pageH));
      const spans = b.y + b.h - (p + 1) * pageH > 1;   // tall gradient across a page break: paint per page slice
      if (!spans) {
        await rasterize(b, (ctx, w, h) => {
          ctx.save();
          if (radius > 0) { roundRectPath(ctx, 0, 0, w, h, radius); ctx.clip(); }
          paintGradient(ctx, bgImg, w, h);
          ctx.restore();
        }, alpha);
      }
    } else {
      const col = parseColor(cs.backgroundColor);
      if (col && col.a > 0) fillRect(b, col, alpha, radius);
    }

    // borders
    const sides = [
      { w: parseFloat(cs.borderTopWidth), c: cs.borderTopColor, s: cs.borderTopStyle, side: 't' },
      { w: parseFloat(cs.borderRightWidth), c: cs.borderRightColor, s: cs.borderRightStyle, side: 'r' },
      { w: parseFloat(cs.borderBottomWidth), c: cs.borderBottomColor, s: cs.borderBottomStyle, side: 'b' },
      { w: parseFloat(cs.borderLeftWidth), c: cs.borderLeftColor, s: cs.borderLeftStyle, side: 'l' },
    ].filter(s => s.w > 0 && s.s !== 'none' && s.s !== 'hidden');
    if (!sides.length) return;
    const same = sides.length === 4 && sides.every(s => s.w === sides[0].w && s.c === sides[0].c && s.s === sides[0].s);
    if (same) {
      const col = parseColor(sides[0].c);
      if (!col) return;
      const w = sides[0].w;
      onPages(b.y, b.y + b.h, (y0, y1) => {
        setAlpha(col.a * alpha);
        doc.setDrawColor(col.r, col.g, col.b);
        doc.setLineWidth(w * f);
        if (sides[0].s === 'dashed') doc.setLineDashPattern([w * 3 * f, w * 2 * f], 0); else doc.setLineDashPattern([], 0);
        const clipped = y1 - y0 < b.h - 0.5;
        const x = (b.x + w / 2) * f, y = (y0 + (clipped ? 0 : w / 2)) * f, ww = (b.w - w) * f, hh = (y1 - y0 - (clipped ? 0 : w)) * f;
        if (radius > 0 && !clipped) doc.roundedRect(x, y, ww, hh, Math.max(0, radius - w / 2) * f, Math.max(0, radius - w / 2) * f, 'S');
        else doc.rect(x, y, ww, hh, 'S');
        doc.setLineDashPattern([], 0);
      });
    } else {
      for (const s of sides) {
        const col = parseColor(s.c);
        if (!col) continue;
        const sb: Box =
          s.side === 't' ? { x: b.x, y: b.y, w: b.w, h: s.w } :
          s.side === 'b' ? { x: b.x, y: b.y + b.h - s.w, w: b.w, h: s.w } :
          s.side === 'l' ? { x: b.x, y: b.y, w: s.w, h: b.h } :
                           { x: b.x + b.w - s.w, y: b.y, w: s.w, h: b.h };
        fillRect(sb, col, alpha);
      }
    }
  };

  // ── text ────────────────────────────────────────────────────────────────────
  interface Line { text: string; left: number; right: number; top: number }
  const linesOf = (node: Text): Line[] => {
    const txt = node.data;
    const range = document.createRange();
    const lines: Line[] = [];
    let cur: Line | null = null;
    let pendingSpace = '';
    for (let i = 0; i < txt.length; i++) {
      range.setStart(node, i); range.setEnd(node, i + 1);
      const rc = range.getClientRects()[0];
      const ch = txt[i];
      if (!rc || (rc.width === 0 && rc.height === 0) || ch === '\n' || ch === '\t') continue;   // collapsed whitespace
      const top = rc.top - base.top;
      const isSpace = /\s/.test(ch);
      if (!cur || Math.abs(top - cur.top) > 2) {
        if (isSpace) continue;                       // never start a line with a space
        cur = { text: '', left: rc.left - base.left, right: rc.right - base.left, top };
        lines.push(cur);
        pendingSpace = '';
      }
      if (isSpace) { pendingSpace += ch; continue; } // spaces only count once followed by a glyph
      cur.text += pendingSpace + ch; pendingSpace = '';
      cur.right = rc.right - base.left;
    }
    return lines.filter(l => l.text.trim().length);
  };

  const drawText = async (node: Text, cs: CSSStyleDeclaration, alpha: number, lang: string) => {
    const family = cs.fontFamily.split(',')[0].trim().replace(/^["']|["']$/g, '');
    const weight = parseInt(cs.fontWeight, 10) || (cs.fontWeight === 'bold' ? 700 : 400);
    const italic = cs.fontStyle === 'italic' || cs.fontStyle === 'oblique';
    const id = await fontFor(family, weight, italic);
    const file = resolveFontFile(family, weight, italic)!;
    const useItalic = italic && file.italic;
    const size = parseFloat(cs.fontSize);
    const ascent = ascentOf(`${useItalic ? 'italic ' : ''}${file.weight} ${size}px "${family}"`);
    const col = parseColor(cs.color);
    if (!col) return;
    const ls = cs.letterSpacing === 'normal' ? 0 : parseFloat(cs.letterSpacing) || 0;
    for (const line of linesOf(node)) {
      let text = line.text;
      if (cs.textTransform === 'uppercase') text = text.toLocaleUpperCase(lang);
      else if (cs.textTransform === 'lowercase') text = text.toLocaleLowerCase(lang);
      else if (cs.textTransform === 'capitalize') text = text.replace(/(^|\s)(\S)/g, (_m, a, b) => a + b.toLocaleUpperCase(lang));
      const p = Math.min(pages - 1, Math.max(0, Math.floor(line.top / pageH)));
      doc.setPage(p + 1);
      setAlpha(col.a * alpha);
      doc.setTextColor(col.r, col.g, col.b);
      doc.setFont(id, 'normal');
      doc.setFontSize(size * f);
      const targetW = (line.right - line.left) * f;
      const natural = doc.getTextWidth(text);
      let charSpace = text.length > 1 ? (targetW - natural) / (text.length - 1) : 0;
      if (!isFinite(charSpace) || Math.abs(charSpace) > 4) charSpace = ls * f;   // metrics mismatch guard
      doc.text(text, line.left * f, (line.top - p * pageH + ascent) * f, { baseline: 'alphabetic', charSpace: Math.abs(charSpace) < 0.004 ? 0 : charSpace } as any);
    }
  };

  // ── walk ────────────────────────────────────────────────────────────────────
  const walk = async (el: HTMLElement, parentAlpha: number, lang: string) => {
    const cs = getComputedStyle(el);
    if (cs.display === 'none') return;
    const alpha = parentAlpha * (parseFloat(cs.opacity) || 0);
    if (alpha <= 0) return;
    const l = el.getAttribute('lang') || lang;
    if (el.tagName === 'IMG') { await drawImage(el as HTMLImageElement, alpha); return; }
    if (el.tagName.toLowerCase() === 'svg') { await drawSvg(el as unknown as SVGSVGElement, alpha); return; }
    if (el !== root) await drawBoxDecor(el, cs, alpha);
    for (const n of Array.from(el.childNodes)) {
      if (n.nodeType === 3) {
        if ((n as Text).data.trim()) await drawText(n as Text, cs, alpha, l);
      } else if (n.nodeType === 1) {
        await walk(n as HTMLElement, alpha, l);
      }
    }
  };

  await walk(root, 1, root.closest('[lang]')?.getAttribute('lang') || document.documentElement.lang || 'en');
  return doc.output('blob');
}
