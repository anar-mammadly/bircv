'use client';
import { Check } from 'lucide-react';
import { CV_FONT_OPTIONS, CVFontId } from '@/lib/cvFonts';

/** Font chooser: every option is rendered in its own font, and picking one re-flows the real CV live. */
export default function FontPicker({ value, onChange, lang }: { value: CVFontId; onChange: (id: CVFontId) => void; lang: 'az' | 'en' }) {
  const az = lang === 'az';
  return (
    <div role="radiogroup" aria-label={az ? 'CV şrifti' : 'CV font'} className="flex flex-col gap-2">
      <FontRow id="template" selected={value === 'template'} onSelect={onChange}
        name={az ? 'Şablonun öz şrifti' : "Template's own font"} note={az ? 'Hər şablon öz dizaynındakı tipoqrafiyanı saxlayır' : 'Each template keeps its designed typography'} />
      {CV_FONT_OPTIONS.map(f => (
        <FontRow key={f.id} id={f.id} selected={value === f.id} onSelect={onChange} name={f.name} css={f.css} note={f.note[lang]}
          sample="The quick brown fox jumps over the lazy dog" glyphs="Əə Ğğ İı Öö Şş Üü Çç 0123456789" />
      ))}
    </div>
  );
}

function FontRow({ id, selected, onSelect, name, css, note, sample, glyphs }: {
  id: CVFontId; selected: boolean; onSelect: (id: CVFontId) => void; name: string; css?: string; note: string; sample?: string; glyphs?: string;
}) {
  const style = css ? { fontFamily: `"${css}", system-ui, sans-serif` } : undefined;
  return (
    <button type="button" role="radio" aria-checked={selected} onClick={() => onSelect(id)}
      className={`group relative w-full rounded-xl border p-3.5 text-left transition-[border-color,background-color,box-shadow] duration-150 ${
        selected ? 'border-primary bg-primary-soft/60 shadow-[0_0_0_1px_rgb(var(--primary))]' : 'border-line bg-surface hover:border-line-strong hover:bg-surface-2'}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-[1.05rem] font-semibold leading-tight text-ink" style={style}>{name}</div>
          <div className="mt-0.5 text-caption text-muted">{note}</div>
        </div>
        <span className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border transition-colors ${selected ? 'border-primary bg-primary text-on-primary' : 'border-line-strong text-transparent'}`} aria-hidden><Check size={12} strokeWidth={3} /></span>
      </div>
      {sample && <div className="mt-2.5 text-[0.9rem] leading-snug text-ink-2" style={style}>{sample}</div>}
      {glyphs && <div className="mt-1 text-[0.8rem] tracking-wide text-muted" style={style}>{glyphs}</div>}
    </button>
  );
}
