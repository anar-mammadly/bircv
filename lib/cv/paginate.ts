// A4 pagination engine.
//
// The template is rendered ONCE as one tall document at the canonical page width. This module
// then finds "atoms" (lines/rows/cards that must not be cut) and pushes any atom that would
// straddle a page boundary onto the next page by adding margin-top to it. Because the pushes are
// real layout, the preview and the PDF (which reads the same DOM) always agree.
//
// Coordinates are in "document px": the template is laid out at width = A4 width / textScale, so
// one page is pageH document px tall.

export interface PaginateOptions {
  pageH: number;      // document px per page
  padTop: number;     // top gap on continuation pages
  padBottom: number;  // bottom gap on every page
}

export interface PaginateResult { pages: number; height: number }

const ATOM_MAX = 96;          // a block shorter than this is never split
const ORIG = 'data-pgorig';   // original inline margin-top of a pushed element

interface Atom {
  el: HTMLElement;
  t: number; b: number; l: number; r: number;
  glue: boolean;              // must stay on the same page as the NEXT atom
  parent: Element | null;
}

function hasContent(el: Element): boolean {
  if (el.tagName === 'IMG' || el.tagName === 'svg' || el.tagName === 'SVG') return true;
  for (const n of Array.from(el.childNodes)) {
    if (n.nodeType === 3 && (n.textContent || '').trim()) return true;
    if (n.nodeType === 1 && hasContent(n as Element)) return true;
  }
  return false;
}

function hasDirectText(el: Element): boolean {
  return Array.from(el.childNodes).some(n => n.nodeType === 3 && (n.textContent || '').trim());
}

function collect(root: HTMLElement, atoms: Atom[], base: DOMRect) {
  const walk = (el: HTMLElement) => {
    const cs = getComputedStyle(el);
    if (cs.display === 'none' || cs.position === 'absolute' || cs.position === 'fixed') return;
    if (!hasContent(el)) return;
    const r = el.getBoundingClientRect();
    let t = r.top - base.top, b = r.bottom - base.top;
    const l = r.left - base.left, rr = r.right - base.left;
    // A plain text leaf stretched by a grid/flex row (e.g. a margin label beside a tall entry) must be
    // measured by its text, not by the stretched cell — otherwise it looks like one giant unbreakable block.
    let textTop = t, textBottom = b;
    if (el.children.length === 0 && hasDirectText(el)) {
      const rg = document.createRange();
      rg.selectNodeContents(el);
      const tr = rg.getBoundingClientRect();
      if (tr.height > 0 && tr.height < b - t - 2) { textTop = tr.top - base.top; textBottom = tr.bottom - base.top; }
    }
    const atomic =
      b - t <= ATOM_MAX || el.tagName === 'IMG' || el.tagName === 'svg' || hasDirectText(el) || el.children.length === 0;
    if (atomic) {
      atoms.push({ el, t: textTop, b: textBottom, l, r: rr, glue: false, parent: el.parentElement });
      return;
    }
    const start = atoms.length;
    Array.from(el.children).forEach(c => walk(c as HTMLElement));
    // heading + first entry + first line stay together; never leave a lone first line behind
    for (let i = start; i < Math.min(atoms.length - 1, start + 2); i++) atoms[i].glue = true;
  };
  Array.from(root.children).forEach(c => walk(c as HTMLElement));
}

/**
 * Push target for an atom: climb while the atom is the FIRST layout child of a small parent, so borders,
 * padding and backgrounds of the block it opens move together with it (a margin-top on a mid-block child
 * would otherwise leave a stray rule/background behind).
 */
function firstLayoutChild(p: HTMLElement): Element | null {
  for (const c of Array.from(p.children)) {
    const cs = getComputedStyle(c);
    if (cs.display === 'none' || cs.position === 'absolute' || cs.position === 'fixed') continue;
    if (!hasContent(c)) continue;          // purely decorative boxes (timeline dots, rules) do not count
    return c;
  }
  return null;
}

function pushTarget(root: HTMLElement, el: HTMLElement, usable: number): HTMLElement {
  let cur = el;
  while (cur.parentElement && cur.parentElement !== root && cur.parentElement.parentElement !== root) {
    const p = cur.parentElement;
    if (firstLayoutChild(p) !== cur) break;
    if (p.getBoundingClientRect().height > usable * 0.5) break;
    cur = p;
  }
  return cur;
}

/** Restore every element we pushed on a previous run. */
export function resetPagination(root: HTMLElement) {
  root.querySelectorAll<HTMLElement>(`[${ORIG}]`).forEach(el => {
    el.style.marginTop = el.getAttribute(ORIG) || '';
    el.removeAttribute(ORIG);
  });
}

export function paginate(root: HTMLElement, opts: PaginateOptions): PaginateResult {
  const { pageH, padTop, padBottom } = opts;
  resetPagination(root);

  const usable = pageH - padTop - padBottom;
  const limit = (k: number) => (k + 1) * pageH - padBottom;   // last usable y on page k
  const start = (k: number) => (k === 0 ? 0 : k * pageH + padTop);

  for (let iter = 0; iter < 200; iter++) {
    const base = root.getBoundingClientRect();   // root is laid out unscaled (1 css px = 1 document px)
    const atoms: Atom[] = [];
    collect(root, atoms, base);

    // build groups from glue chains
    const groups: Atom[][] = [];
    for (let i = 0; i < atoms.length; i++) {
      const g = [atoms[i]];
      while (atoms[i].glue && i + 1 < atoms.length) { i++; g.push(atoms[i]); }
      groups.push(g);
    }

    let fixed = false;
    // process by vertical position so earlier pages settle first
    const order = groups
      .map(g => ({ g, t: Math.min(...g.map(a => a.t)), b: Math.max(...g.map(a => a.b)) }))
      .sort((x, y) => x.t - y.t);

    for (const { g, t, b } of order) {
      const k = Math.floor(t / pageH);
      const height = b - t;
      let members = g;
      let gt = t, gb = b;
      if (height > usable) {           // chain too tall for one page: fall back to its first atom
        members = [g[0]]; gt = g[0].t; gb = g[0].b;
        if (gb - gt > usable) continue;
      }
      const inGap = gt >= limit(k) - 0.5;       // starts in the bottom margin
      const crosses = gb > limit(k) + 0.5;      // ends beyond the usable area of its page
      const beforeStart = k > 0 && gt < start(k) - 0.5 && gt >= k * pageH; // starts inside the top margin
      if (!(inGap || crosses || beforeStart)) continue;
      // a group already sitting at the top of its page cannot move further (unless it is in the top margin)
      if ((inGap || crosses) && !beforeStart && ((k > 0 && gt <= start(k) + 0.5) || (k === 0 && gt <= 0.5))) continue;

      const target = beforeStart ? start(k) : start(k + 1);
      const delta = target - members[0].t;
      if (delta < 0.5) continue;

      // push the first atom and its row-mates (same parent, same top) by the same amount
      const first = members[0];
      const pushAll = atoms.filter(a => a === first || (a.parent === first.parent && Math.abs(a.t - first.t) < 2));
      const targets = Array.from(new Set<HTMLElement>(pushAll.map(a => pushTarget(root, a.el, usable))));
      for (const el of targets) {
        if (!el.hasAttribute(ORIG)) el.setAttribute(ORIG, el.style.marginTop || '');
        const cur = parseFloat(getComputedStyle(el).marginTop) || 0;
        el.style.marginTop = `${cur + delta}px`;
      }
      fixed = true;
      break;
    }
    if (!fixed) break;
  }

  const first = root.firstElementChild as HTMLElement | null;
  const h = Math.max(first ? first.scrollHeight : 0, root.scrollHeight);
  const pages = Math.max(1, Math.ceil((h - 6) / pageH));
  return { pages, height: h };
}

/** QA helper: how many atoms straddle a page boundary or sit in a margin, and does anything overflow sideways? */
export function validatePagination(root: HTMLElement, opts: PaginateOptions) {
  const { pageH, padTop, padBottom } = opts;
  const base = root.getBoundingClientRect();
  const atoms: Atom[] = [];
  collect(root, atoms, base);
  let straddling = 0, inMargin = 0;
  const details: string[] = [];
  for (const a of atoms) {
    if (a.b - a.t > pageH - padTop - padBottom) continue;
    const k = Math.floor(a.t / pageH);
    const limit = (k + 1) * pageH - padBottom;
    if (a.b > limit + 1) { straddling++; details.push(`S p${k} t=${a.t.toFixed(0)} b=${a.b.toFixed(0)} lim=${limit.toFixed(0)} h=${(a.b - a.t).toFixed(0)} ${(a.el.textContent || '').slice(0, 40)} <${a.el.tagName}>`); }
    else if (k > 0 && a.t < k * pageH + padTop - 5) { inMargin++; details.push(`M p${k} t=${a.t.toFixed(0)} start=${(k * pageH + padTop).toFixed(0)} ${(a.el.textContent || '').slice(0, 40)} <${a.el.tagName}>`); }
  }
  let overflowX = 0;
  root.querySelectorAll<HTMLElement>('*').forEach(el => {
    const r = el.getBoundingClientRect();
    if (r.width && r.right - base.left > base.width + 1.5 && getComputedStyle(el).position !== 'absolute') overflowX++;
  });
  return { atoms: atoms.length, straddling, inMargin, overflowX, details };
}
