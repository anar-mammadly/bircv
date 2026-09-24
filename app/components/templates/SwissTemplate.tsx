'use client';
import { CVData } from '@/app/types/cv';
import { Lang, parts, dateRange, eduRange, bullets, L, contactItems, ExtraSections } from './shared';

const INK = '#111111', MUTED = '#7A7A7A', RULE = '#E2E2E2', DOT = '#E5484D';
const F = '"Inter","Helvetica Neue",Arial,sans-serif';

export default function SwissTemplate({ data, lang }: { data: CVData; lang: Lang }) {
  const { p, experience, education, skills, languages, certs, trains, additional } = parts(data);
  const contacts = contactItems(p);

  const H = ({ children }: { children: string }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 11 }}>
      <span style={{ width: 6, height: 6, background: DOT, flexShrink: 0 }} />
      <span style={{ fontSize: 8.5, fontWeight: 700, letterSpacing: 1.8, textTransform: 'uppercase', color: INK }}>{children}</span>
      <span style={{ flex: 1, height: 1, background: RULE }} />
    </div>
  );
  const Sec = ({ title, children }: { title: string; children: React.ReactNode }) => <section style={{ marginBottom: 20 }}><H>{title}</H>{children}</section>;

  return (
    <div style={{ fontFamily: F, color: INK, background: '#fff', width: '100%', padding: '44px 48px 40px', boxSizing: 'border-box', fontSize: 10, lineHeight: 1.5 }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', gap: 28, alignItems: 'flex-end', paddingBottom: 20, marginBottom: 22, borderBottom: `2px solid ${INK}` }}>
        <div style={{ minWidth: 0, flex: 1, display: 'flex', gap: 18, alignItems: 'flex-end' }}>
          {p.photo && <img src={p.photo} alt="" style={{ width: 74, height: 74, objectFit: 'cover', objectPosition: 'top', display: 'block', flexShrink: 0 }} />}
          <div style={{ minWidth: 0 }}>
            <h1 style={{ margin: 0, fontSize: 35, lineHeight: 1.04, letterSpacing: -1.1, overflowWrap: 'anywhere' }}>
              <span style={{ fontWeight: 300 }}>{p.firstName}</span>{p.firstName && p.lastName ? ' ' : ''}<span style={{ fontWeight: 700 }}>{p.lastName}</span>
            </h1>
            {p.jobTitle && <div style={{ marginTop: 8, fontSize: 12, fontWeight: 500, color: MUTED, overflowWrap: 'anywhere' }}>{p.jobTitle}</div>}
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 3, textAlign: 'right', fontSize: 9.5, color: '#333', maxWidth: 200, flexShrink: 0 }}>
          {contacts.map(c => <div key={c.text} style={{ overflowWrap: 'anywhere' }}>{c.text}</div>)}
        </div>
      </header>

      {p.summary && <Sec title={L.summary(lang)}><div style={{ fontSize: 11, lineHeight: 1.7, color: '#222', maxWidth: 560 }}>{p.summary}</div></Sec>}

      {experience.length > 0 && (
        <Sec title={L.experience(lang)}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {experience.map(e => (
              <div key={e.id} style={{ display: 'grid', gridTemplateColumns: '92px minmax(0,1fr)', gap: 18 }}>
                <div style={{ fontSize: 8.5, fontWeight: 500, color: MUTED, lineHeight: 1.5, paddingTop: 2 }}>{dateRange(e, lang).split(' – ').map((x, i) => <div key={i}>{i === 1 ? '– ' : ''}{x}</div>)}</div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 11.5, fontWeight: 700, lineHeight: 1.35, overflowWrap: 'anywhere' }}>{e.jobTitle}</div>
                  <div style={{ fontSize: 10, color: MUTED, fontWeight: 500, margin: '1px 0 5px' }}>{[e.company, e.city].filter(Boolean).join(', ')}</div>
                  {bullets(e.description).map((b, i) => <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 2.5, color: '#2a2a2a' }}><span style={{ color: DOT, flexShrink: 0 }}>·</span><span style={{ minWidth: 0, overflowWrap: 'anywhere' }}>{b}</span></div>)}
                </div>
              </div>
            ))}
          </div>
        </Sec>
      )}

      {education.length > 0 && (
        <Sec title={L.education(lang)}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
            {education.map(e => (
              <div key={e.id} style={{ display: 'grid', gridTemplateColumns: '92px minmax(0,1fr)', gap: 18 }}>
                <div style={{ fontSize: 8.5, fontWeight: 500, color: MUTED, paddingTop: 2 }}>{eduRange(e.startYear, e.endYear)}</div>
                <div style={{ minWidth: 0 }}><div style={{ fontWeight: 700, fontSize: 10.5, overflowWrap: 'anywhere' }}>{e.degree || e.school}</div>{e.degree && e.school && <div style={{ color: MUTED }}>{e.school}</div>}</div>
              </div>
            ))}
          </div>
        </Sec>
      )}

      {(skills.length > 0 || languages.length > 0) && (
        <div style={{ display: 'grid', gridTemplateColumns: skills.length && languages.length ? '1.5fr 1fr' : '1fr', gap: 32 }}>
          {skills.length > 0 && <Sec title={L.skills(lang)}><div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px 6px' }}>{skills.map(s => <span key={s} style={{ fontSize: 9, fontWeight: 500, border: `1px solid ${RULE}`, borderRadius: 3, padding: '3px 8px', overflowWrap: 'anywhere' }}>{s}</span>)}</div></Sec>}
          {languages.length > 0 && <Sec title={L.languages(lang)}>{languages.map(l => <div key={l.id} style={{ display: 'flex', justifyContent: 'space-between', gap: 8, marginBottom: 4 }}><span style={{ fontWeight: 600 }}>{l.name}</span><span style={{ color: MUTED }}>{l.level}</span></div>)}</Sec>}
        </div>
      )}

      {certs.length > 0 && <Sec title={L.certificates(lang)}>{certs.map(c => <div key={c.id} style={{ display: 'flex', justifyContent: 'space-between', gap: 10, marginBottom: 3 }}><span style={{ minWidth: 0, overflowWrap: 'anywhere' }}><b style={{ fontWeight: 600 }}>{c.name}</b>{c.issuer ? <span style={{ color: MUTED }}> · {c.issuer}</span> : null}</span><span style={{ color: MUTED, flexShrink: 0 }}>{c.year}</span></div>)}</Sec>}
      {trains.length > 0 && <Sec title={L.trainings(lang)}>{trains.map(t => <div key={t.id} style={{ marginBottom: 3 }}><b style={{ fontWeight: 600 }}>{t.name}</b><span style={{ color: MUTED }}>{[t.provider, t.year].filter(Boolean).length ? ' · ' + [t.provider, t.year].filter(Boolean).join(', ') : ''}</span></div>)}</Sec>}
      <ExtraSections data={data} lang={lang} Heading={H} color="#2a2a2a" muted={MUTED} accent={INK} gap={20} />
      {additional && <Sec title={L.additional(lang)}><div style={{ whiteSpace: 'pre-line', overflowWrap: 'anywhere' }}>{additional}</div></Sec>}
    </div>
  );
}
