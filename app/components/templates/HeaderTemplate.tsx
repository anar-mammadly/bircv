'use client';
import { CVData } from '@/app/types/cv';
import { Lang, parts, fullName, dateRange, eduRange, bullets, L, contactItems, Icon, ExtraSections } from './shared';

// Header — the masthead IS the design: a deep petrol banner whose contact bar overlaps into the body.
const PETROL = '#0F3D46', AQUA = '#5CCFBE', AQUA_DK = '#1F8F80', INK = '#14262B', MUTED = '#566A70', LINE = '#DCE7E8', SOFT = '#F1F7F7';
const F = '"Plus Jakarta Sans","Inter",Arial,sans-serif';

export default function HeaderTemplate({ data, lang }: { data: CVData; lang: Lang }) {
  const { p, experience, education, skills, languages, certs, trains, additional } = parts(data);
  const contacts = contactItems(p);

  const H = ({ children }: { children: string }) => (
    <div style={{ borderLeft: `3px solid ${AQUA}`, paddingLeft: 9, marginBottom: 11, fontSize: 10.2, fontWeight: 800, letterSpacing: 1.8, textTransform: 'uppercase', color: PETROL, lineHeight: 1.2 }}>{children}</div>
  );

  return (
    <div style={{ fontFamily: F, background: '#fff', color: INK, width: '100%', display: 'flex', flexDirection: 'column', fontSize: 10.6, lineHeight: 1.55 }}>
      <header style={{ background: PETROL, color: '#fff', padding: '38px 40px 66px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 24, alignItems: 'center' }}>
          <div style={{ minWidth: 0, flex: 1 }}>
            <div style={{ fontSize: 39.5, fontWeight: 800, letterSpacing: -1.3, lineHeight: 1.04, overflowWrap: 'anywhere' }}>{fullName(data) || ' '}</div>
            {p.jobTitle && <div style={{ marginTop: 11, fontSize: 12.4, fontWeight: 700, letterSpacing: 2.4, textTransform: 'uppercase', color: AQUA, overflowWrap: 'anywhere' }}>{p.jobTitle}</div>}
          </div>
          {p.photo && <img src={p.photo} alt="" style={{ width: 96, height: 96, borderRadius: '50%', objectFit: 'cover', objectPosition: 'top', border: `3px solid ${AQUA}`, display: 'block', flexShrink: 0 }} />}
        </div>
      </header>

      {/* contact bar: overlaps the banner, tying header and body together */}
      <div style={{ margin: '-30px 40px 0', background: '#fff', border: `1px solid ${LINE}`, borderRadius: 12, padding: '13px 18px', display: 'flex', flexWrap: 'wrap', gap: '8px 22px', justifyContent: 'space-between' }}>
        {contacts.map(c => (
          <span key={c.text} style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 10.2, fontWeight: 500, color: INK }}>
            <Icon name={c.icon} size={11.5} color={AQUA_DK} /><span style={{ overflowWrap: 'anywhere' }}>{c.text}</span>
          </span>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 30, padding: '24px 40px 36px', flex: 1, alignItems: 'flex-start' }}>
        <main style={{ flex: 1, minWidth: 0 }}>
          {p.summary && <div style={{ marginBottom: 20 }}><H>{L.summary(lang)}</H><div style={{ fontSize: 11.2, lineHeight: 1.72, color: '#2B3F45' }}>{p.summary}</div></div>}
          {experience.length > 0 && (
            <div style={{ marginBottom: 18 }}>
              <H>{L.experience(lang)}</H>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {experience.map((e, i) => (
                  <div key={e.id} style={{ display: 'flex', gap: 14 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 11, flexShrink: 0 }}>
                      <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#fff', border: `3px solid ${AQUA}`, marginTop: 2, flexShrink: 0, boxSizing: 'border-box' }} />
                      {i < experience.length - 1 && <span style={{ width: 2, flex: 1, background: LINE, marginTop: 3 }} />}
                    </div>
                    <div style={{ flex: 1, minWidth: 0, paddingBottom: i < experience.length - 1 ? 16 : 0 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'baseline' }}>
                        <span style={{ fontSize: 13, fontWeight: 800, lineHeight: 1.3, overflowWrap: 'anywhere' }}>{e.jobTitle}</span>
                        <span style={{ fontSize: 9.5, fontWeight: 700, color: AQUA_DK, flexShrink: 0, whiteSpace: 'nowrap' }}>{dateRange(e, lang)}</span>
                      </div>
                      <div style={{ fontSize: 10.8, fontWeight: 600, color: MUTED, margin: '1px 0 5px' }}>{[e.company, e.city].filter(Boolean).join(' · ')}</div>
                      {bullets(e.description).map((b, k) => <div key={k} style={{ display: 'flex', gap: 8, marginBottom: 2.5, color: '#2B3F45' }}><span style={{ width: 4, height: 4, background: AQUA, marginTop: 6, flexShrink: 0 }} /><span style={{ minWidth: 0, overflowWrap: 'anywhere' }}>{b}</span></div>)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          <ExtraSections data={data} lang={lang} Heading={H} color="#2B3F45" muted={MUTED} accent={INK} gap={18} fontSize={9.8} />
          {additional && <div><H>{L.additional(lang)}</H><div style={{ whiteSpace: 'pre-line', overflowWrap: 'anywhere' }}>{additional}</div></div>}
        </main>

        <aside style={{ width: 212, flexShrink: 0, background: SOFT, borderRadius: 14, padding: '18px 18px 8px' }}>
          {skills.length > 0 && <div style={{ marginBottom: 18 }}><H>{L.skills(lang)}</H>{skills.map(s => <div key={s} style={{ display: 'flex', gap: 8, marginBottom: 4, fontWeight: 600 }}><span style={{ width: 5, height: 5, background: AQUA_DK, marginTop: 5.5, flexShrink: 0 }} /><span style={{ overflowWrap: 'anywhere' }}>{s}</span></div>)}</div>}
          {education.length > 0 && <div style={{ marginBottom: 18 }}><H>{L.education(lang)}</H>{education.map(e => <div key={e.id} style={{ marginBottom: 9 }}><div style={{ fontWeight: 700, lineHeight: 1.35, overflowWrap: 'anywhere' }}>{e.degree || e.school}</div>{e.degree && e.school && <div style={{ color: MUTED, fontSize: 9.9 }}>{e.school}</div>}<div style={{ color: AQUA_DK, fontSize: 9.5, fontWeight: 700 }}>{eduRange(e.startYear, e.endYear)}</div></div>)}</div>}
          {languages.length > 0 && <div style={{ marginBottom: 18 }}><H>{L.languages(lang)}</H>{languages.map(l => <div key={l.id} style={{ display: 'flex', justifyContent: 'space-between', gap: 8, marginBottom: 4 }}><span style={{ fontWeight: 600 }}>{l.name}</span><span style={{ color: MUTED }}>{l.level}</span></div>)}</div>}
          {certs.length > 0 && <div style={{ marginBottom: 18 }}><H>{L.certificates(lang)}</H>{certs.map(c => <div key={c.id} style={{ marginBottom: 7 }}><div style={{ fontWeight: 600, lineHeight: 1.35, overflowWrap: 'anywhere' }}>{c.name}</div><div style={{ color: MUTED, fontSize: 9.5 }}>{[c.issuer, c.year].filter(Boolean).join(' · ')}</div></div>)}</div>}
          {trains.length > 0 && <div style={{ marginBottom: 10 }}><H>{L.trainings(lang)}</H>{trains.map(t => <div key={t.id} style={{ marginBottom: 7 }}><div style={{ fontWeight: 600, lineHeight: 1.35, overflowWrap: 'anywhere' }}>{t.name}</div><div style={{ color: MUTED, fontSize: 9.5 }}>{[t.provider, t.year].filter(Boolean).join(' · ')}</div></div>)}</div>}
        </aside>
      </div>
    </div>
  );
}
