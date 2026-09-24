'use client';
import { DEFAULT_PROFILE_PHOTO } from '@/lib/cv/defaultPhoto';

// Two original, hand-built CV cards for the hero (not renders of the real templates).
// Each card is designed at 408px wide; every size is in cqw so it scales with its container.
const W = 408;
const u = (px: number) => `${((px * 100) / W).toFixed(3)}cqw`;

const SHADOW = 'shadow-[0_34px_64px_-34px_rgba(15,23,42,.42),0_2px_6px_rgba(15,23,42,.06)]';

/* ───────────────────────────── Card 1 — Modern Professional ───────────────────────────── */
function ModernCard({ az }: { az: boolean }) {
  const BLUE = '#1F4FFF', INK = '#0F1220', MUTED = '#59616F', FAINT = '#8B93A1', LINE = '#E7E9EF', SIDE = '#F3F5FA';

  const Label = ({ children }: { children: string }) => (
    <div style={{ fontSize: u(6.6), fontWeight: 800, letterSpacing: '0.16em', textTransform: 'uppercase', color: INK, marginBottom: u(6) }}>{children}</div>
  );
  const Job = ({ role, org, when, lines }: { role: string; org: string; when: string; lines: string[] }) => (
    <div style={{ marginBottom: u(12) }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: u(8), alignItems: 'baseline' }}>
        <span style={{ fontSize: u(9.6), fontWeight: 700, color: INK }}>{role}</span>
        <span style={{ fontSize: u(6.8), color: FAINT, whiteSpace: 'nowrap' }}>{when}</span>
      </div>
      <div style={{ fontSize: u(8), fontWeight: 600, color: BLUE, margin: `${u(1)} 0 ${u(4)}` }}>{org}</div>
      {lines.map(l => (
        <div key={l} style={{ display: 'flex', gap: u(5), fontSize: u(7.8), lineHeight: 1.55, color: MUTED, marginBottom: u(2) }}>
          <span style={{ width: u(2.8), height: u(2.8), borderRadius: '50%', background: '#AEB8F0', marginTop: u(4.4), flexShrink: 0 }} />{l}
        </div>
      ))}
    </div>
  );
  const Skill = ({ n, v }: { n: string; v: number }) => (
    <div style={{ marginBottom: u(6.5) }}>
      <div style={{ fontSize: u(7.2), fontWeight: 600, color: INK, marginBottom: u(2.5) }}>{n}</div>
      <div style={{ height: u(2.4), background: '#E1E5F0', borderRadius: 4 }}><div style={{ width: `${v}%`, height: '100%', background: BLUE, borderRadius: 4 }} /></div>
    </div>
  );

  return (
    <div className={`overflow-hidden rounded-[14px] bg-[#FEFEFC] ring-1 ring-black/[.06] ${SHADOW}`} style={{ containerType: 'inline-size', aspectRatio: '210 / 297', display: 'flex', color: INK }}>
      {/* slim sidebar */}
      <div style={{ width: u(104), background: SIDE, padding: `${u(24)} ${u(14)}`, flexShrink: 0, borderRight: `1px solid ${LINE}` }}>
        <img src={DEFAULT_PROFILE_PHOTO} alt="" style={{ width: u(60), height: u(60), borderRadius: '50%', objectFit: 'cover', objectPosition: 'top', display: 'block', margin: `0 auto ${u(18)}`, boxShadow: `0 0 0 ${u(2.5)} #fff, 0 0 0 ${u(3.5)} ${LINE}` }} />
        <Label>{az ? 'Əlaqə' : 'Contact'}</Label>
        <div style={{ fontSize: u(6.8), lineHeight: 1.6, color: MUTED, marginBottom: u(18), overflowWrap: 'anywhere' }}>
          anar.mammadov<br />@mail.az<br /><span style={{ display: 'block', marginTop: u(3) }}>+994 51 123 45 67</span><span style={{ display: 'block', marginTop: u(3) }}>{az ? 'Bakı, Azərbaycan' : 'Baku, Azerbaijan'}</span>
        </div>
        <Label>{az ? 'Bacarıqlar' : 'Skills'}</Label>
        <Skill n="Playwright" v={95} /><Skill n="TypeScript" v={85} /><Skill n="API testing" v={90} /><Skill n="CI/CD" v={78} /><Skill n="SQL" v={80} />
        <div style={{ height: u(10) }} />
        <Label>{az ? 'Dillər' : 'Languages'}</Label>
        <div style={{ fontSize: u(7.2), lineHeight: 1.75, color: MUTED }}>
          <b style={{ color: INK, fontWeight: 600 }}>{az ? 'Azərbaycan' : 'Azerbaijani'}</b> · {az ? 'Ana dili' : 'Native'}<br />
          <b style={{ color: INK, fontWeight: 600 }}>{az ? 'İngilis' : 'English'}</b> · C1<br />
          <b style={{ color: INK, fontWeight: 600 }}>{az ? 'Rus' : 'Russian'}</b> · B1
        </div>
        <div style={{ height: u(14) }} />
        <Label>{az ? 'Maraqlar' : 'Interests'}</Label>
        <div style={{ fontSize: u(7.2), lineHeight: 1.7, color: MUTED }}>{az ? 'Açıq mənbə, mentorluq, şahmat' : 'Open source, mentoring, chess'}</div>
      </div>

      {/* main column */}
      <div style={{ flex: 1, minWidth: 0, padding: `${u(26)} ${u(22)}` }}>
        <div className="font-display" style={{ fontSize: u(23), fontWeight: 700, letterSpacing: '-0.025em', lineHeight: 1.05 }}>Anar {az ? 'Məmmədov' : 'Mammadov'}</div>
        <div style={{ fontSize: u(9.6), fontWeight: 600, color: BLUE, margin: `${u(5)} 0 ${u(12)}` }}>{az ? 'Baş QA Avtomasiya Mühəndisi' : 'Senior QA Automation Engineer'}</div>
        <div style={{ height: 1, background: LINE, marginBottom: u(11) }} />
        <div style={{ fontSize: u(7.8), lineHeight: 1.65, color: MUTED, marginBottom: u(15) }}>
          {az ? 'Fintech məhsulları üçün etibarlı test sistemləri quran 5+ illik təcrübəli mühəndis. Reqressiya vaxtını 85% azaldıb.' : 'Engineer with 5+ years building reliable test systems for fintech products. Cut regression time by 85%.'}
        </div>
        <Label>{az ? 'İş təcrübəsi' : 'Experience'}</Label>
        <Job role={az ? 'Baş QA Mühəndisi' : 'Senior QA Engineer'} org="Nova Fintech" when={az ? '2023 – indi' : '2023 – Now'}
          lines={az ? ['400+ kritik ssenarini əhatə edən test çərçivəsi qurdu', 'Reqressiya vaxtını 6 saatdan 40 dəqiqəyə endirdi'] : ['Built a framework covering 400+ critical user flows', 'Cut regression time from 6 hours to 40 minutes']} />
        <Job role={az ? 'QA Mühəndisi' : 'QA Engineer'} org="Caspian Pay" when="2021 – 2023"
          lines={az ? ['API kontrakt testləri ilə 120+ qüsur aşkar etdi', 'Agile sprintlərdə qəbul meyarlarını müəyyən etdi'] : ['Caught 120+ defects with API contract tests', 'Defined acceptance criteria in Agile sprints']} />
        <Job role={az ? 'Kiçik QA Mühəndisi' : 'Junior QA Engineer'} org="Baku Digital" when="2018 – 2021"
          lines={az ? ['Hər həftəlik relizdə smoke və reqressiya testləri apardı', 'JIRA-da qüsur hesabatlarını standartlaşdırdı'] : ['Ran smoke and regression tests for every weekly release', 'Standardised defect reports in JIRA']} />
        <Label>{az ? 'Layihələr' : 'Projects'}</Label>
        <div style={{ fontSize: u(7.8), lineHeight: 1.6, color: MUTED, marginBottom: u(12) }}>
          <b style={{ color: INK, fontWeight: 700 }}>pw-report</b> · {az ? 'Playwright üçün açıq mənbəli hesabat aləti, 1.2k ulduz' : 'Open-source Playwright reporter, 1.2k stars'}
        </div>
        <Label>{az ? 'Təhsil' : 'Education'}</Label>
        <div style={{ fontSize: u(8), color: MUTED }}>
          <b style={{ color: INK, fontWeight: 700 }}>{az ? 'Kompüter Elmləri, Magistr' : "Computer Science, Master's"}</b><br />ADA {az ? 'Universiteti' : 'University'} · 2022 – 2024
        </div>
        <div style={{ height: u(12) }} />
        <Label>{az ? 'Sertifikatlar' : 'Certificates'}</Label>
        <div style={{ fontSize: u(7.8), lineHeight: 1.7, color: MUTED }}>
          <b style={{ color: INK, fontWeight: 600 }}>ISTQB Foundation Level</b> · 2022<br /><b style={{ color: INK, fontWeight: 600 }}>AWS Cloud Practitioner</b> · 2023
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────────── Card 2 — Creative Executive ───────────────────────────── */
function ExecutiveCard({ az }: { az: boolean }) {
  const INK = '#181613', ACCENT = '#E4502E', MUTED = '#6A645B', FAINT = '#9A9388', RULE = '#DDD7CC', PAPER = '#FBFAF6';

  const Label = ({ children }: { children: string }) => (
    <div style={{ fontSize: u(6.4), fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase', color: ACCENT, marginBottom: u(6) }}>{children}</div>
  );
  const Stat = ({ n, l }: { n: string; l: string }) => (
    <div style={{ flex: 1, paddingLeft: u(10), borderLeft: `1px solid ${RULE}` }}>
      <div className="font-display" style={{ fontSize: u(19), fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1, color: INK }}>{n}</div>
      <div style={{ fontSize: u(6.6), color: MUTED, marginTop: u(3) }}>{l}</div>
    </div>
  );

  return (
    <div className={`overflow-hidden rounded-[14px] ring-1 ring-black/[.06] ${SHADOW}`} style={{ background: PAPER, containerType: 'inline-size', aspectRatio: '210 / 297', color: INK }}>
     {/* padding lives on a child: cqw units only resolve against an ANCESTOR container */}
     <div style={{ padding: `${u(26)} ${u(24)}` }}>
      {/* masthead */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', paddingBottom: u(13), borderBottom: `${u(2)} solid ${INK}` }}>
        <div>
          <div style={{ fontSize: u(6.8), fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: ACCENT, marginBottom: u(7) }}>{az ? 'Marketinq Direktoru' : 'Chief Marketing Officer'}</div>
          <div className="font-display" style={{ fontSize: u(29), fontWeight: 700, letterSpacing: '-0.035em', lineHeight: 0.98 }}>Nigar<br />{az ? 'Əliyeva' : 'Aliyeva'}</div>
        </div>
        <div style={{ fontSize: u(6.8), lineHeight: 1.7, color: MUTED, textAlign: 'right' }}>nigar.aliyeva@mail.az<br />+994 55 234 56 78<br />{az ? 'Bakı, Azərbaycan' : 'Baku, Azerbaijan'}</div>
      </div>

      {/* key figures */}
      <div style={{ display: 'flex', margin: `${u(14)} 0 ${u(15)}` }}>
        <Stat n="12+" l={az ? 'il təcrübə' : 'years of experience'} />
        <Stat n="3" l={az ? 'ölkədə komanda' : 'country teams'} />
        <Stat n="+38%" l={az ? 'gəlir artımı' : 'revenue growth'} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: u(20) }}>
        <div>
          <Label>{az ? 'Profil' : 'Profile'}</Label>
          <div className="font-display" style={{ fontSize: u(9.6), lineHeight: 1.55, fontWeight: 500, marginBottom: u(15) }}>
            {az ? 'Brend strategiyası və rəqəmsal böyümə üzrə rəhbər. 35 nəfərlik komandanı idarə edir.' : 'Leader in brand strategy and digital growth, running a team of 35.'}
          </div>
          <Label>{az ? 'Təcrübə' : 'Experience'}</Label>
          {[
            { r: az ? 'Marketinq Direktoru' : 'Chief Marketing Officer', o: 'Nordlight Group', w: az ? '2020 – indi' : '2020 – Now', b: az ? 'Üç bazarda brend strategiyasını və 2M AZN büdcəni idarə edir.' : 'Owns brand strategy and a 2M AZN budget across three markets.' },
            { r: az ? 'Baş Marketinq Meneceri' : 'Head of Marketing', o: 'Caspian Retail', w: '2016 – 2020', b: az ? 'Rəqəmsal kanalları qurdu, onlayn satışı 3 dəfə artırdı.' : 'Built the digital channels and tripled online sales.' },
            { r: az ? 'Marketinq Meneceri' : 'Marketing Manager', o: az ? 'Bakı Media' : 'Baku Media', w: '2012 – 2016', b: az ? 'Kampaniyaların planlaşdırılması və media tərəfdaşlıqları.' : 'Campaign planning and media partnerships.' },
            { r: az ? 'Brend Meneceri' : 'Brand Manager', o: 'Azeri Foods', w: '2009 – 2012', b: az ? 'Yeni məhsul xəttinin brendinq və buraxılış strategiyası.' : 'Branding and launch strategy for a new product line.' },
          ].map(j => (
            <div key={j.r} style={{ marginBottom: u(11) }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: u(6), alignItems: 'baseline' }}>
                <span style={{ fontSize: u(8.8), fontWeight: 700 }}>{j.r}</span><span style={{ fontSize: u(6.6), color: FAINT, whiteSpace: 'nowrap' }}>{j.w}</span>
              </div>
              <div style={{ fontSize: u(7.6), fontWeight: 600, color: ACCENT, margin: `${u(1)} 0 ${u(3)}` }}>{j.o}</div>
              <div style={{ fontSize: u(7.6), lineHeight: 1.55, color: MUTED }}>{j.b}</div>
            </div>
          ))}
          <Label>{az ? 'Nailiyyətlər' : 'Achievements'}</Label>
          {[az ? '“İlin marketoloqu” mükafatı, 2022' : '“Marketer of the Year” award, 2022', az ? 'Beynəlxalq konfranslarda 8 çıxış' : '8 talks at international conferences'].map(a => (
            <div key={a} style={{ display: 'flex', gap: u(5), fontSize: u(7.6), lineHeight: 1.55, color: MUTED, marginBottom: u(3) }}>
              <span style={{ width: u(3), height: u(3), background: ACCENT, marginTop: u(4.4), flexShrink: 0, transform: 'rotate(45deg)' }} />{a}
            </div>
          ))}
        </div>

        <div style={{ borderLeft: `1px solid ${RULE}`, paddingLeft: u(14) }}>
          <Label>{az ? 'Bacarıqlar' : 'Skills'}</Label>
          <div style={{ marginBottom: u(15) }}>
            {[az ? 'Brend strategiyası' : 'Brand strategy', az ? 'Rəqəmsal marketinq' : 'Digital marketing', az ? 'Analitika' : 'Analytics', az ? 'Liderlik' : 'Leadership'].map(s => (
              <div key={s} style={{ display: 'flex', alignItems: 'center', gap: u(5), fontSize: u(7.6), fontWeight: 600, marginBottom: u(5) }}>
                <span style={{ width: u(4), height: u(4), background: ACCENT, transform: 'rotate(45deg)', flexShrink: 0 }} />{s}
              </div>
            ))}
          </div>
          <Label>{az ? 'Təhsil' : 'Education'}</Label>
          <div style={{ fontSize: u(7.6), lineHeight: 1.5, color: MUTED, marginBottom: u(15) }}>
            <b style={{ color: INK, fontWeight: 700 }}>MBA</b><br />{az ? 'Bakı Biznes Universiteti' : 'Baku Business University'}<br />2014 – 2016
          </div>
          <Label>{az ? 'Dillər' : 'Languages'}</Label>
          <div style={{ fontSize: u(7.6), lineHeight: 1.6, color: MUTED, marginBottom: u(15) }}>{az ? 'Azərbaycan · İngilis · Türk' : 'Azerbaijani · English · Turkish'}</div>
          <Label>{az ? 'Sertifikatlar' : 'Certificates'}</Label>
          <div style={{ fontSize: u(7.6), lineHeight: 1.6, color: MUTED, marginBottom: u(15) }}>
            <b style={{ color: INK, fontWeight: 600 }}>Google Analytics</b> · 2021<br /><b style={{ color: INK, fontWeight: 600 }}>CIM Chartered Marketer</b> · 2019
          </div>
          <Label>{az ? 'Üzvlük' : 'Memberships'}</Label>
          <div style={{ fontSize: u(7.6), lineHeight: 1.6, color: MUTED }}>{az ? 'Azərbaycan Marketinq Assosiasiyası' : 'Azerbaijan Marketing Association'}</div>
        </div>
      </div>
     </div>
    </div>
  );
}

/* ───────────────────────────── composition ───────────────────────────── */
export default function HeroVisual({ lang }: { lang: 'az' | 'en' }) {
  const az = lang === 'az';
  return (
    <div className="relative mx-auto w-full max-w-[600px]" style={{ aspectRatio: '1 / 1.04' }} aria-hidden="true">
      {/* back card: Creative Executive, up and to the left, tilted a little */}
      <div className="absolute left-0 top-0 z-10 w-[58%] -rotate-[2deg] animate-rise [animation-delay:200ms]">
        <ExecutiveCard az={az} />
      </div>
      {/* front card: Modern Professional, the focus */}
      <div className="absolute bottom-0 right-0 z-20 w-[61%] rotate-[1deg] animate-rise transition-transform duration-500 ease-out hover:-translate-y-1 [animation-delay:80ms]">
        <ModernCard az={az} />
      </div>
    </div>
  );
}
