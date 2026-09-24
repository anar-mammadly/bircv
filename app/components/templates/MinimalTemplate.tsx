'use client';
import { CVData } from '@/app/types/cv';
import { Lang, parts, dateRange, eduRange, bullets, L, contactItems, Icon, ExtraSections } from './shared';

const INK = '#1a1a1a', TEXT = '#404040', MUTED = '#6b7280', FAINT = '#a3a3a3', RULE = '#dcdcdc';
const F = '"Work Sans","Segoe UI",Arial,sans-serif';

export default function MinimalTemplate({ data, lang }: { data: CVData; lang: Lang }) {
  const { p, experience, education, skills, languages, certs, trains, additional } = parts(data);
  const contacts = contactItems(p);

  const H = ({ children }: { children: string }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 11 }}>
      <span style={{ fontSize: 9, fontWeight: 600, letterSpacing: 2.6, textTransform: 'uppercase', color: INK, whiteSpace: 'nowrap' }}>{children}</span>
      <span style={{ flex: 1, height: 1, background: RULE }} />
    </div>
  );
  const Sec = ({ title, children, mb = 22 }: { title: string; children: React.ReactNode; mb?: number }) => <section style={{ marginBottom: mb }}><H>{title}</H>{children}</section>;

  return (
    <div style={{ fontFamily: F, background: '#fff', color: TEXT, width: '100%', padding: '44px 46px 40px', boxSizing: 'border-box', fontSize: 10.4, lineHeight: 1.55 }}>
      <header style={{ marginBottom: 24, paddingBottom: 20, borderBottom: `1px solid ${INK}` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 20 }}>
          <div style={{ minWidth: 0, flex: 1 }}>
            <h1 style={{ margin: 0, fontSize: 31, lineHeight: 1.12, letterSpacing: -0.6, color: INK, overflowWrap: 'anywhere' }}>
              <span style={{ fontWeight: 300 }}>{p.firstName}</span>{p.firstName && p.lastName ? ' ' : ''}<span style={{ fontWeight: 600 }}>{p.lastName}</span>
            </h1>
            {p.jobTitle && <div style={{ marginTop: 7, fontSize: 10.5, fontWeight: 500, letterSpacing: 2.4, textTransform: 'uppercase', color: MUTED, overflowWrap: 'anywhere' }}>{p.jobTitle}</div>}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px 18px', marginTop: 14, fontSize: 9.6, color: TEXT }}>
              {contacts.map(c => <span key={c.text} style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><Icon name={c.icon} size={10.5} color={FAINT} /><span style={{ overflowWrap: 'anywhere' }}>{c.text}</span></span>)}
            </div>
          </div>
          {p.photo && <img src={p.photo} alt="" style={{ width: 66, height: 66, borderRadius: '50%', objectFit: 'cover', objectPosition: 'top', display: 'block', flexShrink: 0 }} />}
        </div>
      </header>

      {p.summary && <div style={{ marginBottom: 22, fontSize: 11, lineHeight: 1.78, color: TEXT }}>{p.summary}</div>}

      {experience.length > 0 && (
        <Sec title={L.experience(lang)}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {experience.map(e => {
              const [a, b] = dateRange(e, lang).split(' – ');
              return (
                <div key={e.id} style={{ display: 'flex', gap: 16 }}>
                  <div style={{ width: 84, flexShrink: 0, fontSize: 9.4, color: MUTED, lineHeight: 1.55, paddingTop: 1.5 }}><div>{a}</div><div>{b}</div></div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 11.6, fontWeight: 700, color: INK, lineHeight: 1.35, overflowWrap: 'anywhere' }}>{e.jobTitle}</div>
                    <div style={{ fontSize: 10.4, color: MUTED, fontWeight: 500, marginBottom: 5 }}>{[e.company, e.city].filter(Boolean).join(', ')}</div>
                    {bullets(e.description).map((bl, i) => <div key={i} style={{ display: 'flex', gap: 7, marginBottom: 3, lineHeight: 1.6 }}><span style={{ color: FAINT, flexShrink: 0 }}>–</span><span style={{ minWidth: 0, overflowWrap: 'anywhere' }}>{bl}</span></div>)}
                  </div>
                </div>
              );
            })}
          </div>
        </Sec>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: 30 }}>
        <div style={{ minWidth: 0 }}>
          {education.length > 0 && (
            <Sec title={L.education(lang)}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {education.map(e => <div key={e.id}><div style={{ fontWeight: 700, fontSize: 10.8, color: INK, lineHeight: 1.35, overflowWrap: 'anywhere' }}>{e.degree || e.school}</div>{e.degree && e.school && <div style={{ color: MUTED }}>{e.school}</div>}<div style={{ fontSize: 9.4, color: FAINT, marginTop: 1 }}>{eduRange(e.startYear, e.endYear)}</div></div>)}
              </div>
            </Sec>
          )}
          {certs.length > 0 && <Sec title={L.certificates(lang)}>{certs.map(c => <div key={c.id} style={{ marginBottom: 5, overflowWrap: 'anywhere' }}><b style={{ fontWeight: 600, color: INK }}>{c.name}</b><span style={{ color: MUTED }}>{[c.issuer, c.year].filter(Boolean).length ? ' · ' + [c.issuer, c.year].filter(Boolean).join(' · ') : ''}</span></div>)}</Sec>}
        </div>
        <div style={{ minWidth: 0 }}>
          {skills.length > 0 && <Sec title={L.skills(lang)}><div style={{ lineHeight: 2, color: TEXT, fontWeight: 500 }}>{skills.join('  ·  ')}</div></Sec>}
          {languages.length > 0 && <Sec title={L.languages(lang)}>{languages.map(l => <div key={l.id} style={{ display: 'flex', justifyContent: 'space-between', gap: 8, marginBottom: 4 }}><span style={{ color: INK, fontWeight: 500 }}>{l.name}</span><span style={{ color: MUTED }}>{l.level}</span></div>)}</Sec>}
          {trains.length > 0 && <Sec title={L.trainings(lang)}>{trains.map(t => <div key={t.id} style={{ marginBottom: 5, overflowWrap: 'anywhere' }}><b style={{ fontWeight: 600, color: INK }}>{t.name}</b><span style={{ color: MUTED }}>{[t.provider, t.year].filter(Boolean).length ? ' · ' + [t.provider, t.year].filter(Boolean).join(' · ') : ''}</span></div>)}</Sec>}
        </div>
      </div>

      <ExtraSections data={data} lang={lang} Heading={H} color={TEXT} muted={MUTED} accent={INK} gap={22} fontSize={10.4} />
      {additional && <Sec title={L.additional(lang)} mb={0}><div style={{ whiteSpace: 'pre-line', overflowWrap: 'anywhere' }}>{additional}</div></Sec>}
    </div>
  );
}
