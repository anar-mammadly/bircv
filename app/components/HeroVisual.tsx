'use client';
import { Sparkles, Check, Download, RefreshCw } from 'lucide-react';
import { DEFAULT_PROFILE_PHOTO } from '@/lib/cv/defaultPhoto';

// The sheet is designed at 440px wide; every size is expressed in cqw so it scales with its container.
const u = (px: number) => `${((px * 100) / 440).toFixed(3)}cqw`;

/** Hero illustration: a clean CV sheet with a live AI suggestion and an export confirmation floating on it. */
export default function HeroVisual({ lang }: { lang: 'az' | 'en' }) {
  const az = lang === 'az';
  const BLUE = '#1F4FFF', INK = '#0F1220', MUTED = '#5B6472', LINE = '#E6E8EE';

  const Title = ({ children }: { children: string }) => (
    <div style={{ marginBottom: u(7) }}>
      <div style={{ fontSize: u(7), fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: INK }}>{children}</div>
      <div style={{ width: u(16), height: u(2), background: BLUE, marginTop: u(3), borderRadius: 2 }} />
    </div>
  );
  const Job = ({ role, org, when, lines }: { role: string; org: string; when: string; lines: string[] }) => (
    <div style={{ marginBottom: u(11) }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: u(8), alignItems: 'baseline' }}>
        <span style={{ fontSize: u(9.2), fontWeight: 700, color: INK }}>{role}</span>
        <span style={{ fontSize: u(6.6), color: '#8A93A3', whiteSpace: 'nowrap' }}>{when}</span>
      </div>
      <div style={{ fontSize: u(7.6), fontWeight: 600, color: BLUE, margin: `${u(1)} 0 ${u(3.5)}` }}>{org}</div>
      {lines.map(l => (
        <div key={l} style={{ display: 'flex', gap: u(5), fontSize: u(7.3), lineHeight: 1.55, color: MUTED, marginBottom: u(1.5) }}>
          <span style={{ width: u(2.6), height: u(2.6), borderRadius: '50%', background: '#B6BEEA', marginTop: u(4.2), flexShrink: 0 }} />{l}
        </div>
      ))}
    </div>
  );

  return (
    <div className="relative mx-auto w-full max-w-[560px]" aria-hidden="true">
      {/* soft stage */}
      <div className="absolute inset-x-[2%] inset-y-[5%] rounded-[36px] bg-primary-soft/70" />

      {/* CV sheet */}
      <div className="relative ml-auto w-[80%] animate-rise [animation-delay:120ms]">
        <div
          className="overflow-hidden rounded-[22px] bg-white ring-1 ring-black/[.06] shadow-[0_30px_60px_-32px_rgba(15,23,42,.38),0_2px_8px_rgba(15,23,42,.05)]"
          style={{ containerType: 'inline-size', aspectRatio: '210 / 297' }}
        >
          <div style={{ padding: `${u(26)} ${u(28)}`, color: INK }}>
            <div style={{ display: 'flex', gap: u(14), alignItems: 'center' }}>
              <img src={DEFAULT_PROFILE_PHOTO} alt="" style={{ width: u(54), height: u(54), borderRadius: '50%', objectFit: 'cover', objectPosition: 'top', boxShadow: `0 0 0 ${u(2)} #fff, 0 0 0 ${u(3)} ${LINE}`, flexShrink: 0 }} />
              <div style={{ minWidth: 0 }}>
                <div className="font-display" style={{ fontSize: u(21), fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.08 }}>Anar {az ? 'Məmmədov' : 'Mammadov'}</div>
                <div style={{ fontSize: u(9.4), fontWeight: 600, color: BLUE, marginTop: u(3) }}>{az ? 'QA Avtomasiya Mühəndisi' : 'QA Automation Engineer'}</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: u(10), fontSize: u(6.8), color: '#7A8394', margin: `${u(11)} 0 ${u(13)}`, paddingBottom: u(13), borderBottom: `1px solid ${LINE}` }}>
              <span>anar@mail.az</span><span>+994 51 123 45 67</span><span>{az ? 'Bakı' : 'Baku'}</span>
            </div>

            <div style={{ fontSize: u(7.5), lineHeight: 1.65, color: MUTED, marginBottom: u(14) }}>
              {az ? 'Fintech və e-ticarət məhsulları üçün etibarlı test sistemləri quran 5+ illik təcrübəli mühəndis.' : 'Engineer with 5+ years building reliable test systems for fintech and e-commerce products.'}
            </div>

            <Title>{az ? 'İş təcrübəsi' : 'Experience'}</Title>
            <Job role={az ? 'Baş QA Avtomasiya Mühəndisi' : 'Senior QA Automation Engineer'} org="Google · Baku" when={az ? '2023 – indi' : '2023 – Present'}
              lines={az ? ['400+ kritik ssenarini əhatə edən test çərçivəsi qurdu', 'Reqressiya vaxtını 6 saatdan 40 dəqiqəyə endirdi'] : ['Built a framework covering 400+ critical user flows', 'Cut regression time from 6 hours to 40 minutes']} />
            <Job role={az ? 'QA Mühəndisi' : 'QA Engineer'} org="Microsoft · Baku" when="2021 – 2023"
              lines={az ? ['API kontrakt testləri ilə 120+ qüsur aşkar etdi'] : ['Caught 120+ defects with API contract tests']} />

            <Title>{az ? 'Bacarıqlar' : 'Skills'}</Title>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: u(4), marginBottom: u(12) }}>
              {['Playwright', 'TypeScript', 'Postman', 'SQL', 'CI/CD'].map(s => (
                <span key={s} style={{ fontSize: u(6.8), fontWeight: 600, color: '#3B43B5', background: '#EEF1FF', borderRadius: u(4), padding: `${u(2.2)} ${u(6)}` }}>{s}</span>
              ))}
            </div>

            <Title>{az ? 'Təhsil' : 'Education'}</Title>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: u(7.6), color: MUTED }}>
              <span><b style={{ color: INK, fontWeight: 700 }}>{az ? 'Kompüter Elmləri, Magistr' : "Computer Science, Master's"}</b> · ADA</span><span>2022 – 2024</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: u(18), marginTop: u(14) }}>
              <div />
              <div>
                <Title>{az ? 'Sertifikatlar' : 'Certificates'}</Title>
                {['ISTQB Foundation Level', 'AWS Cloud Practitioner', 'Test Automation Engineer'].map(c => (
                  <div key={c} style={{ fontSize: u(7.4), fontWeight: 600, color: INK, marginBottom: u(3) }}>{c}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI suggestion */}
      <div className="absolute bottom-[12%] left-0 w-[60%] animate-rise rounded-2xl border border-line bg-surface p-3 shadow-md [animation-delay:260ms] sm:w-[56%] sm:p-4">
        <div className="flex items-center gap-2">
          <span className="grid h-6 w-6 place-items-center rounded-full bg-primary-soft text-primary"><Sparkles size={13} /></span>
          <span className="text-[0.75rem] font-semibold text-ink">{az ? 'AI təklifi' : 'AI suggestion'}</span>
        </div>
        <p className="mt-2 text-[0.6875rem] leading-relaxed text-ink-2 sm:mt-2.5 sm:text-[0.75rem]">
          {az ? 'Playwright ilə 400+ ssenarini əhatə edən test çərçivəsi qurdu, reqressiya vaxtını 85% azaltdı.' : 'Built a Playwright framework covering 400+ flows and cut regression time by 85%.'}
        </p>
        <div className="mt-3 flex items-center gap-2">
          <span className="inline-flex h-7 items-center rounded-lg bg-primary px-3 text-[0.75rem] font-semibold text-on-primary">{az ? 'Əlavə et' : 'Add'}</span>
          <span className="inline-flex h-7 items-center gap-1.5 rounded-lg px-2 text-[0.75rem] font-medium text-ink-2"><RefreshCw size={12} />{az ? 'Yenilə' : 'Retry'}</span>
        </div>
      </div>

      {/* export confirmation */}
      <div className="absolute -bottom-3 right-[7%] flex animate-rise items-center gap-2.5 rounded-full border border-line bg-surface py-2 pl-2 pr-4 shadow-md [animation-delay:380ms]">
        <span className="grid h-7 w-7 place-items-center rounded-full bg-success-soft text-success"><Check size={15} strokeWidth={3} /></span>
        <span className="text-[0.75rem] font-semibold text-ink">{az ? 'CV-niz hazırdır' : 'Your CV is ready'}</span>
        <Download size={14} className="text-muted" />
      </div>
    </div>
  );
}
