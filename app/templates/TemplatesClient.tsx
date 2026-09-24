'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, Lock } from 'lucide-react';
import { useCVStore } from '@/app/store/cvStore';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import TemplatePreview from '@/app/components/TemplatePreview';
import { TEMPLATE_LIST, CATEGORY_LABEL, TemplateCategory } from '@/lib/cv/templates';

export default function TemplatesClient() {
  const { lang, setSelectedTemplate } = useCVStore();
  const router = useRouter();
  const az = lang === 'az';
  const [cat, setCat] = useState<TemplateCategory | 'all'>('all');
  const cats: (TemplateCategory | 'all')[] = ['all', 'professional', 'modern', 'minimal', 'creative', 'executive', 'ats'];
  const list = TEMPLATE_LIST.filter(t => cat === 'all' || t.categories.includes(cat));

  return (
    <div className="min-h-dvh">
      <Navbar />
      <main className="section py-12 lg:py-16">
        <div className="max-w-[60ch] animate-rise">
          <p className="eyebrow">{az ? 'Şablonlar' : 'Templates'}</p>
          <h1 className="t-h1 mt-3">{az ? 'Öz üslubuna uyğun şablon seç' : 'Choose a template that fits your style'}</h1>
          <p className="mt-3 text-[1.0625rem] text-ink-2">{az ? 'Aşağıdakılar CV-nin real önizləməsidir — məlumatlarınızı daxil edəndə eyni cür görünəcək.' : 'These are live renders of the actual CV — yours will look exactly like this once you add your details.'}</p>
        </div>

        <div className="no-scrollbar -mx-5 mt-8 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:px-0" role="tablist" aria-label={az ? 'Kateqoriyalar' : 'Categories'}>
          {cats.map(c => (
            <button key={c} role="tab" aria-selected={cat === c} onClick={() => setCat(c)}
              className={`h-9 shrink-0 rounded-full border px-4 text-[0.875rem] font-medium transition-colors ${cat === c ? 'border-ink bg-ink text-bg' : 'border-line bg-surface text-ink-2 hover:border-line-strong hover:text-ink'}`}>
              {CATEGORY_LABEL[c][lang]}
            </button>
          ))}
        </div>

        <ul className="mt-8 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((t, i) => (
            <li key={t.id} className="group animate-rise" style={{ animationDelay: `${Math.min(i, 6) * 45}ms` }}>
              <button onClick={() => { setSelectedTemplate(t.id); router.push('/create'); }} className="block w-full text-left" aria-label={`${t.name} — ${az ? 'istifadə et' : 'use template'}`}>
                <div className="relative overflow-hidden rounded-xl border border-line bg-white shadow-sm transition-[transform,box-shadow] duration-300 ease-out group-hover:-translate-y-1 group-hover:shadow-lg">
                  <TemplatePreview template={t.id} lang={lang} />
                  <span className="absolute inset-x-3 bottom-3 flex translate-y-2 items-center justify-center gap-2 rounded-lg bg-ink py-2.5 text-[0.875rem] font-semibold text-bg opacity-0 shadow-lg transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                    {az ? 'Bu şablonu istifadə et' : 'Use this template'}<ArrowRight size={15} />
                  </span>
                </div>
              </button>
              <div className="mt-3 flex items-center gap-2">
                <h2 className="font-display text-lg font-semibold text-ink">{t.name}</h2>
                {t.premium ? <span className="badge-accent"><Lock size={10} />PRO</span> : <span className="badge-success">{az ? 'Pulsuz' : 'Free'}</span>}
              </div>
              <p className="mt-1 text-small text-ink-2">{t.description[lang]}</p>
              <div className="mt-2 flex flex-wrap gap-1.5">{t.categories.map(c => <span key={c} className="chip h-6 text-[0.6875rem]">{CATEGORY_LABEL[c][lang]}</span>)}</div>
            </li>
          ))}
        </ul>

        <div className="mt-16 flex flex-col items-center gap-4 rounded-sheet border border-line bg-surface px-6 py-10 text-center">
          <h2 className="t-h2">{az ? 'Hazırsınız?' : 'Ready to start?'}</h2>
          <p className="max-w-[44ch] text-ink-2">{az ? 'İstənilən vaxt şablonu və ya şrifti dəyişə bilərsiniz — məlumatlarınız itmir.' : 'You can switch template or font at any time — your content is never lost.'}</p>
          <div className="flex flex-wrap justify-center gap-3"><Link href="/create" className="btn-primary btn-lg">{az ? 'CV yarat' : 'Create CV'}</Link><Link href="/pricing" className="btn-secondary btn-lg">{az ? 'Premium haqqında' : 'About Premium'}</Link></div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
