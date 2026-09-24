'use client';
import { CVData } from '@/app/types/cv';
import { Lang, parts, dateRange, eduRange, bullets, L, contactItems, Icon, ExtraSections } from './shared';

// Kompakt — dense, ledger-like: full-width masthead, tinted left rail, tight typographic rhythm.
const INK = '#171A2B', INDIGO = '#3F4BC6', TINT = '#F3F4FB', MUTED = '#5B6177', FAINT = '#8B90A6', RULE = '#DDE0F0';
const F = '"Manrope","Inter",Arial,sans-serif';
const LEVEL: Record<string, number> = { A1: 1, A2: 2, B1: 3, B2: 4, C1: 5, C2: 5, 'Ana dili': 5, Native: 5 };

export default function KompaktTemplate({ data, lang }: { data: CVData; lang: Lang }) {
  const { p, experience, education, skills, languages, certs, trains, additional } = parts(data);
  const contacts = contactItems(p);

  const H = ({ children }: { children: string }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 9 }}>
      <span style={{ width: 6, height: 6, background: INDIGO, flexShrink: 0 }} />
      <span style={{ fontSize: 9.3, fontWeight: 800, letterSpacing: 1.7, textTransform: 'uppercase', color: INK }}>{children}</span>
      <span style={{ flex: 1, height: 1, background: RULE }} />
    </div>
  );
  const RailH = ({ children }: { children: string }) => (
    <div style={{ fontSize: 9.1, fontWeight: 800, letterSpacing: 1.7, textTransform: 'uppercase', color: INDIGO, marginBottom: 8, paddingBottom: 5, borderBottom: `1.5px solid ${INDIGO}` }}>{children}</div>
  );

  return (
    <div style={{ fontFamily: F, background: '#fff', color: INK, width: '100%', display: 'flex', flexDirection: 'column', fontSize: 10.3, lineHeight: 1.5 }}>
      <div style={{ height: 6, background: INDIGO }} />
      <header style={{ padding: '22px 32px 16px', display: 'flex', gap: 22, alignItems: 'flex-end', justifyContent: 'space-between', borderBottom: `1px solid ${RULE}` }}>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center', minWidth: 0, flex: 1 }}>
          {p.photo && <img src={p.photo} alt="" style={{ width: 66, height: 66, borderRadius: 10, objectFit: 'cover', objectPosition: 'top', display: 'block', flexShrink: 0 }} />}
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 29.1, fontWeight: 800, letterSpacing: -0.9, lineHeight: 1.05, overflowWrap: 'anywhere' }}>{[p.firstName, p.lastName].filter(Boolean).join(' ') || ' '}</div>
            {p.jobTitle && <div style={{ fontSize: 12.4, fontWeight: 700, color: INDIGO, marginTop: 5, overflowWrap: 'anywhere' }}>{p.jobTitle}</div>}
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'auto auto', gap: '4px 18px', flexShrink: 0, maxWidth: 380 }}>
          {contacts.map(c => (
            <div key={c.text} style={{ display: 'flex', gap: 6, alignItems: 'flex-start', fontSize: 9.5, color: MUTED }}>
              <span style={{ marginTop: 1.5 }}><Icon name={c.icon} size={10} color={INDIGO} /></span><span style={{ overflowWrap: 'anywhere' }}>{c.text}</span>
            </div>
          ))}
        </div>
      </header>

      <div style={{ display: 'flex', flex: 1, alignItems: 'stretch' }}>
        <aside style={{ width: 208, flexShrink: 0, background: TINT, padding: '20px 18px 26px 32px', boxSizing: 'border-box' }}>
          {skills.length > 0 && (
            <div style={{ marginBottom: 20 }}><RailH>{L.skills(lang)}</RailH>
              {skills.map(s => <div key={s} style={{ display: 'flex', gap: 7, marginBottom: 4, fontWeight: 600, fontSize: 10.2 }}><span style={{ width: 4, height: 4, background: INDIGO, marginTop: 5.5, flexShrink: 0 }} /><span style={{ overflowWrap: 'anywhere' }}>{s}</span></div>)}
            </div>
          )}
          {languages.length > 0 && (
            <div style={{ marginBottom: 20 }}><RailH>{L.languages(lang)}</RailH>
              {languages.map(l => (
                <div key={l.id} style={{ marginBottom: 7 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 6, fontWeight: 600, fontSize: 10.2 }}><span>{l.name}</span><span style={{ color: FAINT, fontWeight: 500, fontSize: 9.3 }}>{l.level}</span></div>
                  <div style={{ display: 'flex', gap: 3, marginTop: 3 }}>{[1, 2, 3, 4, 5].map(i => <span key={i} style={{ width: 18, height: 3, borderRadius: 2, background: i <= (LEVEL[l.level] ?? 3) ? INDIGO : '#D5D9EE' }} />)}</div>
                </div>
              ))}
            </div>
          )}
          {education.length > 0 && (
            <div style={{ marginBottom: 20 }}><RailH>{L.education(lang)}</RailH>
              {education.map(e => <div key={e.id} style={{ marginBottom: 9 }}><div style={{ fontWeight: 700, lineHeight: 1.35, overflowWrap: 'anywhere' }}>{e.degree || e.school}</div>{e.degree && e.school && <div style={{ color: MUTED, fontSize: 9.7 }}>{e.school}</div>}<div style={{ color: INDIGO, fontSize: 9.3, fontWeight: 700 }}>{eduRange(e.startYear, e.endYear)}</div></div>)}
            </div>
          )}
          {certs.length > 0 && (
            <div style={{ marginBottom: 20 }}><RailH>{L.certificates(lang)}</RailH>
              {certs.map(c => <div key={c.id} style={{ marginBottom: 7 }}><div style={{ fontWeight: 700, lineHeight: 1.35, overflowWrap: 'anywhere' }}>{c.name}</div><div style={{ color: MUTED, fontSize: 9.5 }}>{[c.issuer, c.year].filter(Boolean).join(' · ')}</div></div>)}
            </div>
          )}
          {trains.length > 0 && (
            <div><RailH>{L.trainings(lang)}</RailH>
              {trains.map(t => <div key={t.id} style={{ marginBottom: 7 }}><div style={{ fontWeight: 700, lineHeight: 1.35, overflowWrap: 'anywhere' }}>{t.name}</div><div style={{ color: MUTED, fontSize: 9.5 }}>{[t.provider, t.year].filter(Boolean).join(' · ')}</div></div>)}
            </div>
          )}
        </aside>

        <main style={{ flex: 1, minWidth: 0, padding: '20px 32px 28px 26px' }}>
          {p.summary && <div style={{ marginBottom: 18 }}><H>{L.summary(lang)}</H><div style={{ fontSize: 10.8, lineHeight: 1.65, color: '#2C3047' }}>{p.summary}</div></div>}
          {experience.length > 0 && (
            <div style={{ marginBottom: 16 }}>
              <H>{L.experience(lang)}</H>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {experience.map(e => (
                  <div key={e.id}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'baseline' }}>
                      <span style={{ fontSize: 12.1, fontWeight: 800, lineHeight: 1.3, overflowWrap: 'anywhere' }}>{e.jobTitle}</span>
                      <span style={{ fontSize: 9.3, fontWeight: 700, color: INDIGO, flexShrink: 0, whiteSpace: 'nowrap' }}>{dateRange(e, lang)}</span>
                    </div>
                    <div style={{ fontSize: 10.4, fontWeight: 600, color: MUTED, margin: '1px 0 4px' }}>{[e.company, e.city].filter(Boolean).join(' · ')}</div>
                    {bullets(e.description).map((b, i) => <div key={i} style={{ display: 'flex', gap: 7, marginBottom: 2 }}><span style={{ width: 4, height: 4, background: INDIGO, marginTop: 5.5, flexShrink: 0 }} /><span style={{ minWidth: 0, overflowWrap: 'anywhere', color: '#2C3047' }}>{b}</span></div>)}
                  </div>
                ))}
              </div>
            </div>
          )}
          <ExtraSections data={data} lang={lang} Heading={H} color="#2C3047" muted={MUTED} accent={INK} gap={16} fontSize={9.5} />
          {additional && <div><H>{L.additional(lang)}</H><div style={{ whiteSpace: 'pre-line', overflowWrap: 'anywhere' }}>{additional}</div></div>}
        </main>
      </div>
    </div>
  );
}
