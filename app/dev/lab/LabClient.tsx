'use client';
import { useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import CVDocument, { CVLayout } from '@/app/components/CVDocument';
import { FIXTURES } from '@/lib/cv/fixtures';
import { TemplateId } from '@/app/types/cv';
import { CVFontId } from '@/lib/cvFonts';
import { renderPdf } from '@/lib/pdf/domToPdf';
import { validatePagination } from '@/lib/cv/paginate';

export default function LabClient() {
  const q = useSearchParams();
  const layoutRef = useRef<CVLayout | null>(null);
  const tpl = (q.get('tpl') || 'kompakt') as TemplateId;
  const fx = q.get('fx') || 'standard';
  const font = (q.get('font') || 'template') as CVFontId;
  const scale = parseFloat(q.get('scale') || '1');
  const lang = (q.get('lang') || 'en') as 'az' | 'en';
  const w = parseInt(q.get('w') || '794', 10);
  if (typeof window !== 'undefined') {
    (window as any).__cvLayout = layoutRef;
    (window as any).__qa = () => {
      const l = layoutRef.current!;
      const s = l.textScale;
      return { pages: l.pages, ...validatePagination(l.root, { pageH: l.pageH, padTop: 40 / s, padBottom: 30 / s }) };
    };
    (window as any).__exportPdf = async () => {
      const l = layoutRef.current!;
      const blob = await renderPdf(l, 'lab');
      const buf = new Uint8Array(await blob.arrayBuffer());
      let bin = ''; for (let i = 0; i < buf.length; i += 0x8000) bin += String.fromCharCode.apply(null, Array.from(buf.subarray(i, i + 0x8000)));
      return btoa(bin);
    };
  }
  return (
    <div style={{ background: '#e5e7eb', padding: 16, minHeight: '100vh' }}>
      <CVDocument
        data={FIXTURES[fx] || FIXTURES.standard} template={tpl} lang={lang} font={font} textScale={scale}
        layoutRef={layoutRef} fixedWidth={w}
        onLayout={l => { if (typeof window !== 'undefined') (window as any).__cvPages = l.pages; }}
      />
    </div>
  );
}
