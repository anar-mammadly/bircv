'use client';
import type { CVSettings } from '@/app/store/cvStore';
import { DEFAULT_CV_FONT } from '@/lib/cvFonts';

const COLORS = [
  ['#0E9F6E', 'Yaşıl', 'Green'], ['#2563EB', 'Mavi', 'Blue'],
  ['#1E3A5F', 'Tünd göy', 'Navy'], ['#7C3AED', 'Bənövşəyi', 'Purple'],
  ['#9F1239', 'Bordo', 'Burgundy'], ['#C2410C', 'Narıncı', 'Orange'],
  ['#1F2937', 'Qara', 'Charcoal'],
];

export default function AppearanceControls({ settings, onChange, lang }: {
  settings: CVSettings; onChange: (settings: Partial<CVSettings>) => void; lang: 'az' | 'en';
}) {
  const az = lang === 'az';
  const scales = [
    { key: 'textScale', label: az ? 'Bütün səhifə' : 'Whole page' },
    { key: 'leftTextScale', label: az ? 'Sol hissə' : 'Left column' },
    { key: 'rightTextScale', label: az ? 'Sağ hissə / əsas mətn' : 'Right column / main text' },
  ] as const;
  return <div className="flex flex-col gap-6">
    {scales.map(({ key, label }) => {
      const value = Math.round(settings[key] * 100);
      const update = (n: number) => onChange({ [key]: Math.max(85, Math.min(115, n)) / 100 });
      return <div key={key}>
        <label htmlFor={`design-${key}`} className="flex justify-between gap-2 text-sm font-medium"><span>{label}</span><span className="tabular-nums text-ink-2">{value}%</span></label>
        <div className="mt-2 flex items-center gap-3">
          <button type="button" className="btn-secondary h-9 px-3" disabled={value <= 85} aria-label={`${label} −`} onClick={() => update(value - 1)}>A−</button>
          <input id={`design-${key}`} className="min-w-0 flex-1 accent-[rgb(var(--primary))]" type="range" min={85} max={115} step={1} value={value} onChange={e => update(Number(e.target.value))} />
          <button type="button" className="btn-secondary h-9 px-3" disabled={value >= 115} aria-label={`${label} +`} onClick={() => update(value + 1)}>A+</button>
        </div>
      </div>;
    })}
    <p className="-mt-3 text-xs text-ink-2">{az ? 'Bir sütunlu hissələrə sağ hissənin ölçüsü tətbiq edilir.' : 'Single-column sections use the main text size.'}</p>
    <fieldset>
      <legend className="mb-3 text-sm font-medium">{az ? 'Vurğu rəngi' : 'Accent color'}</legend>
      <div className="flex flex-wrap items-center gap-3">
        {COLORS.map(([color, nameAz, nameEn]) => <button key={color} type="button" aria-label={az ? nameAz : nameEn} title={az ? nameAz : nameEn} aria-pressed={settings.accentColor === color}
          onClick={() => onChange({ accentColor: color })} style={{ backgroundColor: color }}
          className={`h-8 w-8 rounded-full border border-line ${settings.accentColor === color ? 'ring-2 ring-ink ring-offset-2' : ''}`} />)}
        <label className="flex items-center gap-2 text-xs text-ink-2">{az ? 'Öz rəngin' : 'Custom'}<input type="color" aria-label={az ? 'Xüsusi rəng' : 'Custom color'} value={settings.accentColor || '#0E9F6E'} onChange={e => onChange({ accentColor: e.target.value })} className="h-8 w-9 cursor-pointer rounded border border-line" /></label>
      </div>
      <button type="button" className="mt-3 text-xs underline underline-offset-4" onClick={() => onChange({ accentColor: '' })}>{az ? 'Şablonun öz rəngi' : 'Original template color'}</button>
    </fieldset>
    <button type="button" className="btn-secondary w-full" onClick={() => onChange({ font: DEFAULT_CV_FONT, textScale: 1, leftTextScale: 1, rightTextScale: 1, accentColor: '' })}>{az ? 'Dizaynı sıfırla' : 'Reset appearance'}</button>
  </div>;
}
