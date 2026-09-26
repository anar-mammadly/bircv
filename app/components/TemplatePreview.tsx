'use client';
import { useEffect, useRef, useState } from 'react';
import CVDocument from '@/app/components/CVDocument';
import { CVData, TemplateId } from '@/app/types/cv';
import { DEMO_CV_AZ, DEMO_CV_EN } from '@/lib/cv/demo';
import { CVFontId } from '@/lib/cvFonts';

/**
 * A real, live render of a template (first page) — never a fake screenshot. Mounts when scrolled into view.
 * `data` lets a caller show its own CV content (e.g. the Design tab mirrors the editor's current CV);
 * without it, this falls back to the marketing demo CV (home page, /templates gallery).
 */
export default function TemplatePreview({ template, lang, font, width, data }: {
  template: TemplateId; lang: 'az' | 'en'; font?: CVFontId; width?: number; data?: CVData;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [w, setW] = useState(width || 0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); io.disconnect(); } }, { rootMargin: '200px' });
    io.observe(el);
    const ro = new ResizeObserver(() => setW(Math.round(el.clientWidth)));
    ro.observe(el); setW(Math.round(el.clientWidth));
    return () => { io.disconnect(); ro.disconnect(); };
  }, []);

  return (
    <div ref={ref} className="relative w-full overflow-hidden bg-white" style={{ aspectRatio: '210 / 297' }}>
      {visible && w > 0 ? (
        <CVDocument data={data || (lang === 'az' ? DEMO_CV_AZ : DEMO_CV_EN)} template={template} lang={lang} font={font} fixedWidth={w} maxPages={1} showPageNumbers={false} flat />
      ) : (
        <div className="skeleton absolute inset-0 rounded-none" aria-hidden />
      )}
    </div>
  );
}
