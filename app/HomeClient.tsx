'use client';
import Link from 'next/link';
import { ArrowRight, Sparkles, FileText, Type, ScanText, Check, Layers, ChevronDown } from 'lucide-react';
import { useCVStore } from '@/app/store/cvStore';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import Reveal from '@/app/components/ui/Reveal';
import TemplatePreview from '@/app/components/TemplatePreview';
import HeroVisual from '@/app/components/HeroVisual';
import { TEMPLATE_LIST } from '@/lib/cv/templates';
import { CV_FONT_OPTIONS } from '@/lib/cvFonts';

export default function HomeClient() {
  const { lang } = useCVStore();
  const az = lang === 'az';

  const steps = [
    { n: '01', t: az ? 'Məlumatları daxil et' : 'Enter your details', d: az ? 'Sadə formu doldurun, foto əlavə edin. Hər dəyişiklik CV-də anında görünür.' : 'Fill in the simple form and add a photo. Every change shows up in the CV instantly.' },
    { n: '02', t: az ? 'Dizaynı seç' : 'Pick the design', d: az ? 'Şablon və şrift seçin — CV real vaxtda yenidən düzülür.' : 'Choose a template and a font — the CV re-flows in real time.' },
    { n: '03', t: az ? 'PDF yüklə' : 'Download the PDF', d: az ? 'Dəqiq A4, seçilə bilən mətn. İşə müraciətə hazırdır.' : 'Exact A4 with selectable text. Ready to apply.' },
  ];

  const faqs = [
    { q: az ? 'BirCV pulsuzdur?' : 'Is BirCV free?', a: az ? 'Bəli. Pulsuz planda şablonların çoxu, 2 CV yükləmə və 5 AI sorğusu var. Premium limitləri qaldırır və bütün şablonları açır.' : 'Yes. The free plan includes most templates, 2 CV downloads and 5 AI requests. Premium lifts the limits and unlocks every template.' },
    { q: az ? 'CV-lər ATS sistemlərinə uyğundur?' : 'Are the CVs ATS-friendly?', a: az ? 'PDF-də mətn şəkil deyil, real mətndir — ATS və HR proqramları onu oxuya bilir. Minimal və Klassik şablonlar tək sütunludur.' : 'The PDF contains real text, not an image, so ATS and HR tools can read it. Minimal and Klassik are single-column layouts.' },
    { q: az ? 'Şrifti dəyişsəm CV pozulmur?' : 'Will changing the font break my CV?', a: az ? 'Xeyr. Şrift dəyişəndə mətn yenidən sətirlənir və səhifələr yenidən hesablanır; PDF də eyni şriftlə yaranır.' : 'No. When you change the font the text re-wraps and pages are recalculated; the PDF uses the same embedded font.' },
    { q: az ? 'Məlumatlarım harada saxlanılır?' : 'Where is my data stored?', a: az ? 'CV məzmununuz yalnız sizin brauzerinizdə saxlanılır. Serverə yalnız hesab məlumatları və AI sorğuları göndərilir.' : 'Your CV content stays in your browser. Only account details and AI requests are sent to our servers.' },
    { q: az ? 'AI necə işləyir?' : 'How does the AI writing work?', a: az ? 'Vəzifə adınızı yazırsınız, AI bir düymə ilə xülasə və iş təcrübəsi bəndləri təklif edir. İstədiyiniz kimi redaktə edə bilərsiniz.' : 'Enter your job title and the AI drafts a summary and experience bullets in one click. Edit them however you like.' },
  ];

  const showcase = TEMPLATE_LIST.filter(t => ['designer', 'header', 'modern', 'elegant'].includes(t.id));

  return (
    <div className="min-h-dvh">
      <Navbar />
      <main>
        {/* ── hero ── */}
        <section className="section grid items-center gap-12 pb-16 pt-10 sm:pt-16 lg:grid-cols-[1.05fr_1fr] lg:gap-8 lg:pb-24 lg:pt-20">
          <div className="animate-rise">
            <span className="chip mb-6 border-primary/25 bg-primary-soft text-primary"><Sparkles size={13} />{az ? 'AI yazı köməkçisi ilə' : 'With an AI writing assistant'}</span>
            <h1 className="t-display max-w-[14ch]">
              {az ? <>Peşəkar CV. <span className="text-primary">Dəqiqələr</span> içində.</> : <>A professional CV, <span className="text-primary">in minutes</span>.</>}
            </h1>
            <p className="mt-6 max-w-[46ch] text-[1.0625rem] leading-relaxed text-ink-2">
              {az ? 'Şablon və şrift seçin, AI ilə mətni yazın, dəqiq A4 formatda PDF yükləyin. Mətn seçilə bilir, ATS sistemləri oxuyur.' : 'Pick a template and a font, let AI write the text, and download a print-perfect A4 PDF. The text is selectable and ATS-readable.'}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/create" className="btn-primary btn-lg">{az ? 'CV yaratmağa başla' : 'Start your CV'}<ArrowRight size={17} /></Link>
              <Link href="/templates" className="btn-secondary btn-lg">{az ? 'Şablonlara bax' : 'Browse templates'}</Link>
            </div>
            <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-small text-ink-2">
              {[az ? 'Pulsuz başla' : 'Free to start', az ? 'Kart tələb olunmur' : 'No card needed', az ? 'A4 PDF' : 'A4 PDF'].map(x => (
                <li key={x} className="flex items-center gap-1.5"><Check size={15} className="text-success" />{x}</li>
              ))}
            </ul>
          </div>

          <HeroVisual lang={lang} />
        </section>

        {/* ── proof strip ── */}
        <section className="border-y border-line bg-surface">
          <dl className="section grid grid-cols-2 gap-y-6 py-8 md:grid-cols-4">
            {[
              [az ? '2 dəq' : '2 min', az ? 'orta hazırlanma vaxtı' : 'average time to a CV'],
              [`${TEMPLATE_LIST.length}+`, az ? 'real şablon' : 'real templates'],
              [String(CV_FONT_OPTIONS.length), az ? 'şrift seçimi' : 'font choices'],
              ['A4', az ? 'dəqiq səhifələmə' : 'exact pagination'],
            ].map(([v, l]) => (
              <div key={l} className="px-2 md:border-l md:border-line md:pl-6 first:md:border-l-0 first:md:pl-0">
                <dt className="font-display text-3xl font-bold tracking-tight text-ink">{v}</dt>
                <dd className="text-small text-ink-2">{l}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ── how it works ── */}
        <section id="how" className="section scroll-mt-24 py-20 lg:py-28">
          <Reveal><p className="eyebrow">{az ? 'Necə işləyir' : 'How it works'}</p><h2 className="t-h1 mt-3 max-w-[22ch]">{az ? 'Üç addım, bir hazır CV' : 'Three steps to a finished CV'}</h2></Reveal>
          <ol className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 90}>
                <li className="relative border-t-2 border-ink pt-5">
                  <span className="font-display text-sm font-semibold tabular-nums text-primary">{s.n}</span>
                  <h3 className="t-h3 mt-2">{s.t}</h3>
                  <p className="mt-2 max-w-[38ch] text-ink-2">{s.d}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </section>

        {/* ── features ── */}
        <section className="border-y border-line bg-surface-2/60 py-20 lg:py-28">
          <div className="section">
            <Reveal><p className="eyebrow">{az ? 'Fərqi yaradan' : 'What sets it apart'}</p><h2 className="t-h1 mt-3 max-w-[24ch]">{az ? 'Dizayner səviyyəsində nəticə, sıfır əziyyət' : 'Designer-grade results, zero fiddling'}</h2></Reveal>
            <div className="mt-12 grid gap-4 md:grid-cols-6">
              <Reveal className="md:col-span-3">
                <div className="card h-full p-6">
                  <Type size={20} className="text-primary" />
                  <h3 className="t-h3 mt-4">{az ? 'Canlı şrift seçimi' : 'Live font selection'}</h3>
                  <p className="mt-1.5 text-ink-2">{az ? 'Şrifti dəyişin — CV dərhal yenidən düzülür. PDF eyni şriftlə yaranır.' : 'Change the font and the CV re-flows instantly. The PDF embeds the very same font.'}</p>
                  <div className="mt-5 grid gap-1.5">
                    {CV_FONT_OPTIONS.map(f => (
                      <div key={f.id} className="flex items-baseline justify-between gap-3 rounded-lg bg-bg px-3 py-2 text-ink" style={{ fontFamily: `"${f.css}"` }}>
                        <span className="font-semibold">{f.name}</span><span className="hidden truncate text-small text-muted sm:block">Əə Ğğ İı Şş — 1234</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
              <Reveal className="md:col-span-3" delay={80}>
                <div className="card h-full p-6">
                  <Layers size={20} className="text-primary" />
                  <h3 className="t-h3 mt-4">{az ? 'Mətni kəsməyən səhifələmə' : 'Pagination that never cuts text'}</h3>
                  <p className="mt-1.5 text-ink-2">{az ? 'Başlıq səhifənin sonunda tək qalmır, iş bloku yarıya bölünmür. Səhifə yalnız dolanda keçir.' : 'No orphaned headings, no job entry split in half. A new page starts only when the page is genuinely full.'}</p>
                  <div className="mt-5 flex gap-3" aria-hidden>
                    {[0.78, 0.5].map((h, i) => (
                      <div key={i} className="flex h-40 flex-1 flex-col gap-1.5 rounded-md border border-line bg-white p-3 shadow-sm">
                        <div className="h-2 w-1/3 rounded bg-primary/70" />
                        {Array.from({ length: i === 0 ? 9 : 5 }).map((_, k) => <div key={k} className="h-1.5 rounded bg-line-strong/70" style={{ width: `${96 - (k % 3) * 14}%` }} />)}
                        <div className="mt-auto text-right text-[9px] text-muted">{i + 1} / 2</div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
              <Reveal className="md:col-span-2">
                <div className="card h-full p-6"><ScanText size={20} className="text-primary" /><h3 className="t-h3 mt-4">{az ? 'ATS oxuyur' : 'ATS-readable'}</h3><p className="mt-1.5 text-ink-2">{az ? 'PDF-də real mətn: seçmək, kopyalamaq və axtarmaq mümkündür.' : 'Real text in the PDF: select, copy and search it.'}</p></div>
              </Reveal>
              <Reveal className="md:col-span-2" delay={70}>
                <div className="card h-full p-6"><Sparkles size={20} className="text-primary" /><h3 className="t-h3 mt-4">{az ? 'AI ilə yazı' : 'AI writing'}</h3><p className="mt-1.5 text-ink-2">{az ? 'Xülasə və iş təcrübəsi bəndləri bir kliklə.' : 'Summary and experience bullets in a single click.'}</p></div>
              </Reveal>
              <Reveal className="md:col-span-2" delay={140}>
                <div className="card h-full p-6"><FileText size={20} className="text-primary" /><h3 className="t-h3 mt-4">{az ? 'Pixel-dəqiq PDF' : 'Pixel-accurate PDF'}</h3><p className="mt-1.5 text-ink-2">{az ? 'Önizləmə ilə PDF arasında fərq yoxdur.' : 'What you see in the preview is what the PDF contains.'}</p></div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── templates ── */}
        <section className="section py-20 lg:py-28">
          <Reveal className="flex flex-wrap items-end justify-between gap-4">
            <div><p className="eyebrow">{az ? 'Şablonlar' : 'Templates'}</p><h2 className="t-h1 mt-3">{az ? 'Real önizləmələr, saxta ekran görüntüsü yox' : 'Real previews, not mock screenshots'}</h2></div>
            <Link href="/templates" className="btn-secondary">{az ? 'Hamısına bax' : 'See all'}<ArrowRight size={15} /></Link>
          </Reveal>
          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
            {showcase.map((t, i) => (
              <Reveal key={t.id} delay={i * 70}>
                <Link href="/templates" className="group block">
                  <div className="overflow-hidden rounded-lg border border-line shadow-sm transition-[transform,box-shadow] duration-300 ease-out group-hover:-translate-y-1 group-hover:shadow-lg"><TemplatePreview template={t.id} lang={lang} /></div>
                  <div className="mt-2.5 flex items-center justify-between"><span className="font-semibold text-ink">{t.name}</span>{t.premium && <span className="badge-accent">PRO</span>}</div>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="section max-w-[860px] pb-20 lg:pb-28">
          <Reveal><p className="eyebrow">FAQ</p><h2 className="t-h1 mt-3">{az ? 'Tez-tez verilən suallar' : 'Frequently asked questions'}</h2></Reveal>
          <div className="mt-8 divide-y divide-line border-y border-line">
            {faqs.map(f => (
              <details key={f.q} className="group py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[1.0625rem] font-semibold text-ink [&::-webkit-details-marker]:hidden">
                  {f.q}<ChevronDown size={18} className="shrink-0 text-muted transition-transform duration-200 group-open:rotate-180" aria-hidden />
                </summary>
                <p className="mt-2 max-w-[62ch] text-ink-2">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* ── final CTA ── */}
        <section className="section pb-20">
          <div className="relative overflow-hidden rounded-sheet bg-ink px-6 py-14 text-center text-bg sm:px-12">
            <h2 className="t-h1 mx-auto max-w-[20ch] !text-bg">{az ? 'İşə müraciət etməyə hazırsınız?' : 'Ready to apply?'}</h2>
            <p className="mx-auto mt-3 max-w-[44ch] text-bg/70">{az ? 'İlk CV-nizi bu gün, pulsuz yaradın.' : 'Create your first CV today, for free.'}</p>
            <Link href="/create" className="btn-lg mt-7 inline-flex items-center gap-2 rounded-[12px] bg-bg px-6 font-semibold text-ink transition-transform duration-150 hover:scale-[1.02] active:scale-[.98]">{az ? 'CV yaratmağa başla' : 'Start your CV'}<ArrowRight size={17} /></Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
