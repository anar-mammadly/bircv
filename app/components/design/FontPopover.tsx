'use client';
import { useEffect, useId, useRef, useState } from 'react';
import { Check, ChevronDown, Type } from 'lucide-react';
import { CV_FONT_OPTIONS, CVFontId } from '@/lib/cvFonts';

/** Compact font dropdown: every option is rendered in its own font; picking one re-flows the real CV instantly. */
export default function FontPopover({ value, onChange, lang }: { value: CVFontId; onChange: (id: CVFontId) => void; lang: 'az' | 'en' }) {
  const az = lang === 'az';
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLDivElement>(null);
  const id = useId();

  const options: { id: CVFontId; name: string; css?: string; note: string }[] = [
    { id: 'template', name: az ? 'Şablonun öz şrifti' : "Template's own font", note: az ? 'Dizayndakı tipoqrafiya saxlanılır' : 'Keeps the designed typography' },
    ...CV_FONT_OPTIONS.map(f => ({ id: f.id, name: f.name, css: f.css, note: f.note[lang] })),
  ];
  const current = options.find(o => o.id === value) || options[0];

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent | TouchEvent) => { if (!wrap.current?.contains(e.target as Node)) setOpen(false); };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setOpen(false); (wrap.current?.querySelector('button[aria-haspopup]') as HTMLElement | null)?.focus(); }
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        const items = Array.from(list.current?.querySelectorAll<HTMLElement>('[role="option"]') || []);
        const i = items.indexOf(document.activeElement as HTMLElement);
        items[(i + (e.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length]?.focus();
      }
    };
    document.addEventListener('mousedown', onDown); document.addEventListener('touchstart', onDown); document.addEventListener('keydown', onKey);
    setTimeout(() => (list.current?.querySelector('[aria-selected="true"]') as HTMLElement | null)?.focus(), 0);
    return () => { document.removeEventListener('mousedown', onDown); document.removeEventListener('touchstart', onDown); document.removeEventListener('keydown', onKey); };
  }, [open]);

  return (
    <div ref={wrap} className="relative">
      <button type="button" onClick={() => setOpen(o => !o)} aria-haspopup="listbox" aria-expanded={open} aria-controls={id}
        className={`inline-flex h-9 max-w-[220px] items-center gap-2 rounded-control border bg-surface px-3 text-[0.8125rem] font-medium text-ink transition-colors hover:bg-surface-2 ${open ? 'border-primary shadow-focus' : 'border-line-strong'}`}>
        <Type size={14} className="shrink-0 text-muted" aria-hidden />
        <span className="text-muted">{az ? 'Şrift' : 'Font'}</span>
        <span className="min-w-0 truncate font-semibold" style={current.css ? { fontFamily: `"${current.css}", system-ui, sans-serif` } : undefined}>{value === 'template' ? (az ? 'Standart' : 'Default') : current.name}</span>
        <ChevronDown size={15} className={`shrink-0 text-muted transition-transform duration-200 ${open ? 'rotate-180' : ''}`} aria-hidden />
      </button>

      {open && (
        <div id={id} ref={list} role="listbox" aria-label={az ? 'CV şrifti' : 'CV font'}
          className="absolute right-0 top-full z-30 mt-2 w-[min(300px,calc(100vw-32px))] origin-top-right animate-pop rounded-xl border border-line bg-surface p-1.5 shadow-lg">
          {options.map(o => {
            const sel = o.id === value;
            const style = o.css ? { fontFamily: `"${o.css}", system-ui, sans-serif` } : undefined;
            return (
              <button key={o.id} type="button" role="option" aria-selected={sel} onClick={() => { onChange(o.id); setOpen(false); }}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors hover:bg-surface-2 focus-visible:bg-surface-2 ${sel ? 'bg-primary-soft/60' : ''}`}>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[0.95rem] font-semibold leading-tight text-ink" style={style}>{o.name}</span>
                  <span className="mt-0.5 block truncate text-caption text-muted" style={style}>{o.css ? 'Əə Ğğ İı Öö Şş Üü Çç 0123' : o.note}</span>
                </span>
                <span className={`grid h-5 w-5 shrink-0 place-items-center rounded-full ${sel ? 'bg-primary text-on-primary' : 'text-transparent'}`} aria-hidden><Check size={12} strokeWidth={3} /></span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
