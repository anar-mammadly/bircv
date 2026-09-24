'use client';
import { CVData } from '@/app/types/cv';
import { Lang, parts, fullName, dateRange, eduRange, bullets, L, contactItems, Icon, ExtraSections } from './shared';

// Designer — editorial "bento": a deep plum hero card, then modular cards on warm paper.
const PLUM = '#3A1F3D', ROSE = '#D4587A', BLUSH = '#F6E4E1', CREAM = '#FAF6F0', INK = '#231A26', MUTED = '#6F6474', LINE = '#E9DFD6';
const HEAD = '"Fraunces","Playfair Display",Georgia,serif';
const BODY = '"Plus Jakarta Sans","Inter",Arial,sans-serif';

export default function DesignerTemplate({ data, lang }: { data: CVData; lang: Lang }) {
  const { p, experience, education, skills, languages, certs, trains, additional } = parts(data);
  const contacts = contactItems(p);

  const CardH = ({ children }: { children: string }) => (
    <div style={{ fontFamily: HEAD, fontSize: 15.7, fontWeight: 600, color: INK, marginBottom: 10, letterSpacing: -0.2 }}>{children}</div>
  );
  const Card = ({ title, children, tone = 'white' }: { title: string; children: React.ReactNode; tone?: 'white' | 'blush' }) => (
    <div style={{ background: tone === 'blush' ? BLUSH : '#fff', border: tone === 'blush' ? 'none' : `1px solid ${LINE}`, borderRadius: 14, padding: '16px 18px', marginBottom: 12 }}>
      <CardH>{title}</CardH>{children}
    </div>
  );
  const SecH = ({ children }: { children: string }) => (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 12 }}>
      <span style={{ fontFamily: HEAD, fontSize: 20.8, fontWeight: 600, color: INK, letterSpacing: -0.5 }}>{children}</span>
      <span style={{ flex: 1, height: 1, background: LINE }} />
    </div>
  );

  return (
    <div style={{ fontFamily: BODY, background: CREAM, color: INK, width: '100%', padding: '30px 30px 32px', boxSizing: 'border-box', fontSize: 10.6, lineHeight: 1.55 }}>
      {/* hero card */}
      <header style={{ background: PLUM, color: '#fff', borderRadius: 18, padding: '26px 28px 22px', marginBottom: 14 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 22, alignItems: 'center' }}>
          <div style={{ minWidth: 0, flex: 1 }}>
            <div style={{ fontFamily: HEAD, fontSize: 39.5, fontWeight: 600, letterSpacing: -1.2, lineHeight: 1.04, overflowWrap: 'anywhere' }}>{fullName(data) || ' '}</div>
            {p.jobTitle && <div style={{ marginTop: 9, fontSize: 13, fontWeight: 600, color: '#F2B9C9', letterSpacing: 0.4, overflowWrap: 'anywhere' }}>{p.jobTitle}</div>}
          </div>
          {p.photo && <img src={p.photo} alt="" style={{ width: 92, height: 92, borderRadius: 16, objectFit: 'cover', objectPosition: 'top', display: 'block', flexShrink: 0 }} />}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px 8px', marginTop: 18 }}>
          {contacts.map(c => (
            <span key={c.text} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.12)', borderRadius: 999, padding: '4px 11px', fontSize: 9.7, color: '#FBEFF3' }}>
              <Icon name={c.icon} size={10} color="#F2B9C9" /><span style={{ overflowWrap: 'anywhere' }}>{c.text}</span>
            </span>
          ))}
        </div>
      </header>

      <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
        <main style={{ flex: 1, minWidth: 0 }}>
          {p.summary && <div style={{ fontFamily: HEAD, fontSize: 14.6, lineHeight: 1.6, fontWeight: 400, color: '#3B2F3E', marginBottom: 22, padding: '2px 4px 0 2px' }}>{p.summary}</div>}
          {experience.length > 0 && (
            <div style={{ marginBottom: 14 }}>
              <SecH>{L.experience(lang)}</SecH>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                {experience.map((e, i) => (
                  <div key={e.id} style={{ display: 'flex', gap: 12 }}>
                    <div style={{ fontFamily: HEAD, fontSize: 20.8, fontWeight: 600, color: ROSE, width: 26, flexShrink: 0, lineHeight: 1.1 }}>{String(i + 1).padStart(2, '0')}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 12.7, fontWeight: 700, lineHeight: 1.3, overflowWrap: 'anywhere' }}>{e.jobTitle}</div>
                      <div style={{ display: 'flex', gap: 8, alignItems: 'baseline', flexWrap: 'wrap', margin: '2px 0 5px' }}>
                        <span style={{ fontSize: 10.8, fontWeight: 600, color: PLUM }}>{[e.company, e.city].filter(Boolean).join(' · ')}</span>
                        <span style={{ fontSize: 9.5, fontWeight: 600, color: ROSE, whiteSpace: 'nowrap' }}>{dateRange(e, lang)}</span>
                      </div>
                      {bullets(e.description).map((b, k) => <div key={k} style={{ display: 'flex', gap: 8, marginBottom: 2.5, color: '#41364A' }}><span style={{ width: 4, height: 4, borderRadius: 2, background: ROSE, marginTop: 6, flexShrink: 0 }} /><span style={{ minWidth: 0, overflowWrap: 'anywhere' }}>{b}</span></div>)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          <ExtraSections data={data} lang={lang} Heading={SecH} color="#41364A" muted={MUTED} accent={INK} gap={16} fontSize={9.8} />
          {additional && <div><SecH>{L.additional(lang)}</SecH><div style={{ whiteSpace: 'pre-line', overflowWrap: 'anywhere' }}>{additional}</div></div>}
        </main>

        <aside style={{ width: 216, flexShrink: 0 }}>
          {skills.length > 0 && (
            <Card title={L.skills(lang)} tone="blush">
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>{skills.map(s => <span key={s} style={{ fontSize: 9.5, fontWeight: 600, color: PLUM, background: '#fff', borderRadius: 999, padding: '3px 10px', overflowWrap: 'anywhere' }}>{s}</span>)}</div>
            </Card>
          )}
          {education.length > 0 && (
            <Card title={L.education(lang)}>
              {education.map((e, i) => <div key={e.id} style={{ marginBottom: i < education.length - 1 ? 10 : 0 }}><div style={{ fontWeight: 700, lineHeight: 1.35, overflowWrap: 'anywhere' }}>{e.degree || e.school}</div>{e.degree && e.school && <div style={{ color: MUTED, fontSize: 9.9 }}>{e.school}</div>}<div style={{ color: ROSE, fontSize: 9.5, fontWeight: 600 }}>{eduRange(e.startYear, e.endYear)}</div></div>)}
            </Card>
          )}
          {languages.length > 0 && (
            <Card title={L.languages(lang)}>
              {languages.map(l => <div key={l.id} style={{ display: 'flex', justifyContent: 'space-between', gap: 8, marginBottom: 4 }}><span style={{ fontWeight: 600 }}>{l.name}</span><span style={{ color: MUTED }}>{l.level}</span></div>)}
            </Card>
          )}
          {certs.length > 0 && (
            <Card title={L.certificates(lang)}>
              {certs.map(c => <div key={c.id} style={{ marginBottom: 7 }}><div style={{ fontWeight: 600, lineHeight: 1.35, overflowWrap: 'anywhere' }}>{c.name}</div><div style={{ color: MUTED, fontSize: 9.5 }}>{[c.issuer, c.year].filter(Boolean).join(' · ')}</div></div>)}
            </Card>
          )}
          {trains.length > 0 && (
            <Card title={L.trainings(lang)}>
              {trains.map(t => <div key={t.id} style={{ marginBottom: 7 }}><div style={{ fontWeight: 600, lineHeight: 1.35, overflowWrap: 'anywhere' }}>{t.name}</div><div style={{ color: MUTED, fontSize: 9.5 }}>{[t.provider, t.year].filter(Boolean).join(' · ')}</div></div>)}
            </Card>
          )}
        </aside>
      </div>
    </div>
  );
}
