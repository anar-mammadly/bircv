'use client';
import { CVData } from '@/app/types/cv';
import { Lang, parts, fullName, dateRange, eduRange, bullets, L, contactItems, Icon, ExtraSections } from './shared';

// Modern — airy SaaS look: oversized name, soft accent, floating cards in the side column.
const INK = '#0B1220', BLUE = '#2563EB', SOFT = '#EEF3FF', MUTED = '#59627A', LINE = '#E4E9F4';
const F = '"Inter","Segoe UI",Arial,sans-serif';
const LEVEL: Record<string, number> = { A1: 1, A2: 2, B1: 3, B2: 4, C1: 5, C2: 5, 'Ana dili': 5, Native: 5 };

export default function ModernTemplate({ data, lang }: { data: CVData; lang: Lang }) {
  const { p, experience, education, skills, languages, certs, trains, additional } = parts(data);
  const contacts = contactItems(p);

  const H = ({ children }: { children: string }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
      <span style={{ fontSize: 10.3, fontWeight: 700, letterSpacing: 1.6, textTransform: 'uppercase', color: BLUE }}>{children}</span>
      <span style={{ flex: 1, height: 1, background: LINE }} />
    </div>
  );
  const Card = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div style={{ background: SOFT, borderRadius: 12, padding: '15px 16px', marginBottom: 12 }}>
      <div style={{ fontSize: 9.7, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: INK, marginBottom: 10 }}>{title}</div>
      {children}
    </div>
  );

  return (
    <div style={{ fontFamily: F, background: '#fff', color: INK, width: '100%', display: 'flex', flexDirection: 'column', fontSize: 10.8, lineHeight: 1.55 }}>
      <header style={{ padding: '38px 40px 22px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 24, alignItems: 'flex-start' }}>
          <div style={{ minWidth: 0, flex: 1 }}>
            <div style={{ width: 44, height: 4, background: BLUE, borderRadius: 2, marginBottom: 16 }} />
            <h1 style={{ margin: 0, fontSize: 42.6, fontWeight: 700, letterSpacing: -1.7, lineHeight: 1.02, overflowWrap: 'anywhere' }}>{fullName(data) || ' '}</h1>
            {p.jobTitle && <div style={{ marginTop: 9, fontSize: 15.1, fontWeight: 500, color: MUTED, overflowWrap: 'anywhere' }}>{p.jobTitle}</div>}
          </div>
          {p.photo && <img src={p.photo} alt="" style={{ width: 86, height: 86, borderRadius: 18, objectFit: 'cover', objectPosition: 'top', display: 'block', flexShrink: 0 }} />}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 20px', marginTop: 20, paddingTop: 15, borderTop: `1px solid ${LINE}` }}>
          {contacts.map(c => (
            <span key={c.text} style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 10.4, color: '#2B3550' }}>
              <span style={{ width: 20, height: 20, borderRadius: 10, background: SOFT, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name={c.icon} size={10.5} color={BLUE} /></span>
              <span style={{ overflowWrap: 'anywhere' }}>{c.text}</span>
            </span>
          ))}
        </div>
      </header>

      <div style={{ display: 'flex', gap: 30, padding: '6px 40px 36px', flex: 1, alignItems: 'flex-start' }}>
        <main style={{ flex: 1, minWidth: 0 }}>
          {p.summary && <div style={{ marginBottom: 22 }}><H>{L.summary(lang)}</H><div style={{ fontSize: 11.7, lineHeight: 1.75, color: '#27304A' }}>{p.summary}</div></div>}
          {experience.length > 0 && (
            <div style={{ marginBottom: 18 }}>
              <H>{L.experience(lang)}</H>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {experience.map(e => (
                  <div key={e.id} style={{ paddingLeft: 14, borderLeft: `2px solid ${LINE}` }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'baseline' }}>
                      <span style={{ fontSize: 13.5, fontWeight: 700, lineHeight: 1.3, overflowWrap: 'anywhere' }}>{e.jobTitle}</span>
                      <span style={{ fontSize: 9.7, color: '#8089A3', flexShrink: 0, whiteSpace: 'nowrap', fontWeight: 500 }}>{dateRange(e, lang)}</span>
                    </div>
                    <div style={{ margin: '4px 0 6px', display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: 10.2, fontWeight: 600, color: BLUE, background: SOFT, borderRadius: 5, padding: '2px 8px' }}>{e.company}</span>
                      {e.city && <span style={{ fontSize: 10.2, color: '#8089A3' }}>{e.city}</span>}
                    </div>
                    {bullets(e.description).map((b, i) => <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 3, color: '#3A4462' }}><span style={{ width: 5, height: 1.5, background: BLUE, marginTop: 8, flexShrink: 0 }} /><span style={{ minWidth: 0, overflowWrap: 'anywhere' }}>{b}</span></div>)}
                  </div>
                ))}
              </div>
            </div>
          )}
          <ExtraSections data={data} lang={lang} Heading={H} color="#3A4462" muted="#8089A3" accent={INK} gap={18} fontSize={10} />
          {additional && <div><H>{L.additional(lang)}</H><div style={{ whiteSpace: 'pre-line', overflowWrap: 'anywhere' }}>{additional}</div></div>}
        </main>

        <aside style={{ width: 226, flexShrink: 0 }}>
          {skills.length > 0 && (
            <Card title={L.skills(lang)}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>{skills.map(s => <span key={s} style={{ fontSize: 9.5, fontWeight: 600, color: INK, background: '#fff', border: `1px solid ${LINE}`, borderRadius: 6, padding: '3px 8px', overflowWrap: 'anywhere' }}>{s}</span>)}</div>
            </Card>
          )}
          {education.length > 0 && (
            <Card title={L.education(lang)}>
              {education.map((e, i) => <div key={e.id} style={{ marginBottom: i < education.length - 1 ? 10 : 0 }}><div style={{ fontWeight: 700, lineHeight: 1.35, overflowWrap: 'anywhere' }}>{e.degree || e.school}</div>{e.degree && e.school && <div style={{ color: MUTED, fontSize: 10 }}>{e.school}</div>}<div style={{ color: BLUE, fontSize: 9.5, fontWeight: 600 }}>{eduRange(e.startYear, e.endYear)}</div></div>)}
            </Card>
          )}
          {languages.length > 0 && (
            <Card title={L.languages(lang)}>
              {languages.map(l => (
                <div key={l.id} style={{ marginBottom: 8 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600, fontSize: 10.2 }}><span>{l.name}</span><span style={{ color: '#8089A3', fontWeight: 500 }}>{l.level}</span></div>
                  <div style={{ height: 3, background: '#D9E2FA', borderRadius: 2, marginTop: 4 }}><div style={{ height: 3, width: `${(LEVEL[l.level] ?? 3) * 20}%`, background: BLUE, borderRadius: 2 }} /></div>
                </div>
              ))}
            </Card>
          )}
          {certs.length > 0 && (
            <Card title={L.certificates(lang)}>
              {certs.map(c => <div key={c.id} style={{ marginBottom: 7 }}><div style={{ fontWeight: 600, lineHeight: 1.35, overflowWrap: 'anywhere' }}>{c.name}</div><div style={{ color: '#8089A3', fontSize: 9.5 }}>{[c.issuer, c.year].filter(Boolean).join(' · ')}</div></div>)}
            </Card>
          )}
          {trains.length > 0 && (
            <Card title={L.trainings(lang)}>
              {trains.map(t => <div key={t.id} style={{ marginBottom: 7 }}><div style={{ fontWeight: 600, lineHeight: 1.35, overflowWrap: 'anywhere' }}>{t.name}</div><div style={{ color: '#8089A3', fontSize: 9.5 }}>{[t.provider, t.year].filter(Boolean).join(' · ')}</div></div>)}
            </Card>
          )}
        </aside>
      </div>
    </div>
  );
}
