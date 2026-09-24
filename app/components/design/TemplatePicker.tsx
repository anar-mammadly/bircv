'use client';
import { useState } from 'react';
import { Lock, Check } from 'lucide-react';
import TemplatePreview from '@/app/components/TemplatePreview';
import { TEMPLATE_LIST, CATEGORY_LABEL, TemplateCategory } from '@/lib/cv/templates';
import { TemplateId } from '@/app/types/cv';
import { CVFontId } from '@/lib/cvFonts';

export default function TemplatePicker({ value, onChange, lang, font, isPro }: {
  value: TemplateId; onChange: (id: TemplateId) => void; lang: 'az' | 'en'; font: CVFontId; isPro: boolean;
}) {
  const [cat, setCat] = useState<TemplateCategory | 'all'>('all');
  const cats: (TemplateCategory | 'all')[] = ['all', 'professional', 'modern', 'minimal', 'creative', 'executive', 'ats'];
  const list = TEMPLATE_LIST.filter(t => cat === 'all' || t.categories.includes(cat));

  return (
    <div>
      <div className="no-scrollbar -mx-4 mb-3 flex gap-1.5 overflow-x-auto px-4" role="tablist" aria-label={lang === 'az' ? 'Kateqoriyalar' : 'Categories'}>
        {cats.map(c => (
          <button key={c} role="tab" aria-selected={cat === c} onClick={() => setCat(c)}
            className={`h-8 shrink-0 rounded-full border px-3.5 text-[0.8125rem] font-medium transition-colors ${cat === c ? 'border-ink bg-ink text-bg' : 'border-line bg-surface text-ink-2 hover:border-line-strong hover:text-ink'}`}>
            {CATEGORY_LABEL[c][lang]}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3" role="radiogroup" aria-label={lang === 'az' ? 'Şablon' : 'Template'}>
        {list.map(t => {
          const selected = t.id === value;
          return (
            <button key={t.id} type="button" role="radio" aria-checked={selected} onClick={() => onChange(t.id)}
              className={`group relative overflow-hidden rounded-xl border text-left transition-[transform,box-shadow,border-color] duration-200 ease-out hover:-translate-y-0.5 hover:shadow-md ${selected ? 'border-primary shadow-[0_0_0_2px_rgb(var(--primary))]' : 'border-line'}`}>
              <div className="pointer-events-none border-b border-line"><TemplatePreview template={t.id} lang={lang} font={font === 'template' ? undefined : font} /></div>
              <div className="flex items-center gap-1.5 bg-surface px-2.5 py-2">
                <span className="min-w-0 flex-1 truncate text-[0.8125rem] font-semibold text-ink">{t.name}</span>
                {t.premium && !isPro && <span className="badge-accent shrink-0"><Lock size={10} />PRO</span>}
                {t.premium && isPro && <span className="badge-primary shrink-0">PRO</span>}
              </div>
              {selected && <span className="absolute right-2 top-2 grid h-6 w-6 animate-pop place-items-center rounded-full bg-primary text-on-primary shadow-md"><Check size={14} strokeWidth={3} /></span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}
