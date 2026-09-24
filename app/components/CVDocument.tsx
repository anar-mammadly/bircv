'use client';
import { createPortal } from 'react-dom';
import { useDeferredValue, useEffect, useLayoutEffect, useMemo, useRef, useState, MutableRefObject } from 'react';
import { CVData, TemplateId } from '@/app/types/cv';
import { CVFontId, DEFAULT_CV_FONT } from '@/lib/cvFonts';
import { paginate } from '@/lib/cv/paginate';
import { renderTemplate } from '@/app/components/CVPreview';

// A4 @ 96dpi in CSS px (fixed reference, independent of the browser)
export const A4_W = 793.7;
export const A4_H = 1122.52;

/** Handle used by the PDF exporter: the laid-out, paginated document and its geometry. */
export interface CVLayout {
  root: HTMLElement;   // paginated document element (laid out at docW)
  pages: number;
  docW: number;        // document px per page width
  pageH: number;       // document px per page height
  textScale: number;   // document px -> CSS px factor (page width / docW)
}

interface Props {
  data: CVData;
  template: TemplateId;
  lang: 'az' | 'en';
  font?: CVFontId;
  /** 0.9 – 1.1: scales all text and spacing while the A4 geometry stays fixed. */
  textScale?: number;
  layoutRef?: MutableRefObject<CVLayout | null>;
  onLayout?: (l: { pages: number }) => void;
  /** Pixel width the pages are shown at. Default: fill the container. */
  fixedWidth?: number;
  gap?: number;
  showPageNumbers?: boolean;
  /** thumbnails: render only the first N pages */
  maxPages?: number;
  /** draw the paper shadow (off for thumbnails inside cards) */
  flat?: boolean;
}

export default function CVDocument({
  data, template, lang, font = DEFAULT_CV_FONT, textScale = 1,
  layoutRef, onLayout, fixedWidth, gap = 18, showPageNumbers = true, maxPages, flat,
}: Props) {
  const deferred = useDeferredValue(data);
  const s = textScale;
  const docW = A4_W / s;
  const pageH = A4_H / s;

  const wrapRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(fixedWidth || 0);
  const [snap, setSnap] = useState<{ html: string; pages: number } | null>(null);
  const [fontTick, setFontTick] = useState(0);
  // subtle cross-fade when the design (template / font / size) changes
  const [pulse, setPulse] = useState(false);
  const firstRun = useRef(true);
  useEffect(() => {
    if (firstRun.current) { firstRun.current = false; return; }
    setPulse(true);
    const id = setTimeout(() => setPulse(false), 170);
    return () => clearTimeout(id);
  }, [template, font, s]);
  // The measuring document lives in <body> so hidden tabs / collapsed panels never zero its layout.
  const [host, setHost] = useState<HTMLElement | null>(null);
  useEffect(() => { setHost(document.body); }, []);

  // container width → scale factor of the visible pages
  useEffect(() => {
    if (fixedWidth) { setWidth(fixedWidth); return; }
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setWidth(el.clientWidth));
    ro.observe(el);
    setWidth(el.clientWidth);
    return () => ro.disconnect();
  }, [fixedWidth]);

  // fonts load lazily (only the used family/weights) → re-paginate once they arrive
  useEffect(() => {
    if (typeof document === 'undefined' || !('fonts' in document)) return;
    const bump = () => setFontTick(t => t + 1);
    document.fonts.addEventListener('loadingdone', bump);
    document.fonts.ready.then(bump);
    return () => document.fonts.removeEventListener('loadingdone', bump);
  }, []);

  const content = useMemo(() => renderTemplate(template, deferred, lang), [template, deferred, lang]);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    root.style.minHeight = '0px';
    const { pages } = paginate(root, { pageH, padTop: 40 / s, padBottom: 30 / s });
    root.style.minHeight = `${pages * pageH}px`;
    const html = root.outerHTML;
    setSnap(prev => (prev && prev.html === html && prev.pages === pages ? prev : { html, pages }));
    if (layoutRef) layoutRef.current = { root, pages, docW, pageH, textScale: s };
    onLayout?.({ pages });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content, font, s, lang, fontTick, pageH, host]);

  const scale = width ? width / docW : 0;
  const pages = Math.min(snap?.pages ?? 1, maxPages ?? 999);
  const total = snap?.pages ?? 1;

  return (
    <div ref={wrapRef} style={{ width: fixedWidth || '100%' }} aria-busy={!snap}>
      {/* Live, un-transformed document: the single source for pagination, previews and PDF. */}
      {host && createPortal(
        <div
          className="cv-scope"
          data-cvfont={font}
          lang={lang}
          style={{ position: 'fixed', top: 0, left: -99999, width: docW, visibility: 'hidden', pointerEvents: 'none' }}
          aria-hidden="true"
        >
          <div ref={rootRef} className="cv-doc" style={{ width: docW, display: 'flex', flexDirection: 'column' }}>
            {content}
          </div>
        </div>,
        host,
      )}

      {Array.from({ length: pages }).map((_, i) => (
        <div
          key={i}
          className={flat ? 'cv-page cv-page-flat' : 'cv-page'}
          style={{
            width: '100%', aspectRatio: '210/297', background: '#fff', position: 'relative', overflow: 'hidden',
            marginBottom: i < pages - 1 ? gap : 0, opacity: pulse ? 0.55 : 1, transition: 'opacity .17s ease',
          }}
        >
          {!snap && !flat && (
            <div className="absolute inset-0 grid place-items-center" role="status">
              <span className="flex items-center gap-2 text-small font-medium text-muted"><span className="spin h-4 w-4 rounded-full border-2 border-line-strong border-t-primary" />{lang === 'az' ? 'CV hazırlanır…' : 'Preparing your CV…'}</span>
            </div>
          )}
          {snap && scale > 0 && (
            <div
              className="cv-scope"
              data-cvfont={font}
              lang={lang}
              style={{ position: 'absolute', top: 0, left: 0, width: docW, transformOrigin: 'top left', transform: `scale(${scale}) translateY(${-i * pageH}px)` }}
              dangerouslySetInnerHTML={{ __html: snap.html }}
            />
          )}
          {showPageNumbers && total > 1 && (
            <div className="cv-page-no">{i + 1} / {total}</div>
          )}
        </div>
      ))}
    </div>
  );
}
