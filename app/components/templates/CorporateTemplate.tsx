'use client';
import { CVData } from '@/app/types/cv';
import { Lang, parts, fullName, dateRange, eduRange, bullets, L, contactItems, Icon, ExtraSections } from './shared';

const NAVY = '#0F1B2D', GOLD = '#C9A24B', GOLD_DK = '#9A7A2E', TEXT = '#243044', MUTED = '#6B7688', PANEL = '#F4F5F7', LINE = '#E3E6EB';
const F = '"Plus Jakarta Sans","Inter",Arial,sans-serif';

export default function CorporateTemplate({ data, lang }: { data: CVData; lang: Lang }) {
  const { p, experience, education, skills, languages, certs, trains, additional } = parts(data);
  const contacts = contactItems(p);

  const H = ({ children, light }: { children: string; light?: boolean }) => (
    <div style={{ marginBottom: 11 }}>
      <div style={{ fontSize: 9.5, fontWeight: 800, letterSpacing: 1.7, textTransform: 'uppercase', color: light ? NAVY : NAVY }}>{children}</div>
      <div style={{ width: 26, height: 2.5, background: GOLD, marginTop: 5, borderRadius: 2 }} />
    </div>
  );

  return (
    <div style={{ fontFamily: F, color: TEXT, background: '#fff', width: '100%', display: 'flex', flexDirection: 'column', fontSize: 10 }}>
      <header style={{ background: NAVY, color: '#fff', padding: '32px 40px 28px', display: 'flex', gap: 24, justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: 20, alignItems: 'center', minWidth: 0, flex: 1 }}>
          {p.photo && <img src={p.photo} alt="" style={{ width: 84, height: 84, borderRadius: '50%', objectFit: 'cover', objectPosition: 'top', border: `2.5px solid ${GOLD}`, flexShrink: 0, display: 'block' }} />}
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 29, fontWeight: 800, letterSpacing: -0.6, lineHeight: 1.1, overflowWrap: 'anywhere' }}>{fullName(data) || ' '}</div>
            {p.jobTitle && <div style={{ marginTop: 7, fontSize: 11.5, fontWeight: 600, letterSpacing: 1.2, color: GOLD, textTransform: 'uppercase', overflowWrap: 'anywhere' }}>{p.jobTitle}</div>}
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flexShrink: 0, maxWidth: 210 }}>
          {contacts.map(c => (
            <div key={c.text} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', fontSize: 9.5, color: 'rgba(255,255,255,.88)' }}>
              <span style={{ marginTop: 1.5, color: GOLD }}><Icon name={c.icon} size={11} /></span><span style={{ minWidth: 0, overflowWrap: 'anywhere' }}>{c.text}</span>
            </div>
          ))}
        </div>
      </header>

      <div style={{ display: 'flex', flex: 1, alignItems: 'stretch' }}>
        <main style={{ flex: 1, minWidth: 0, padding: '26px 30px 30px 40px' }}>
          {p.summary && <div style={{ marginBottom: 20 }}><H>{L.summary(lang)}</H><div style={{ lineHeight: 1.7, color: TEXT }}>{p.summary}</div></div>}
          {experience.length > 0 && (
            <div style={{ marginBottom: 18 }}>
              <H>{L.experience(lang)}</H>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
                {experience.map(e => (
                  <div key={e.id}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'flex-start' }}>
                      <span style={{ fontSize: 12, fontWeight: 700, color: NAVY, lineHeight: 1.3, overflowWrap: 'anywhere' }}>{e.jobTitle}</span>
                      <span style={{ fontSize: 8.5, fontWeight: 700, color: GOLD_DK, background: '#FBF5E6', padding: '3px 8px', borderRadius: 20, flexShrink: 0, whiteSpace: 'nowrap' }}>{dateRange(e, lang)}</span>
                    </div>
                    <div style={{ fontSize: 10.5, color: MUTED, fontWeight: 600, margin: '2px 0 6px' }}>{[e.company, e.city].filter(Boolean).join('  ·  ')}</div>
                    {bullets(e.description).map((b, i) => (
                      <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 3, lineHeight: 1.6 }}><span style={{ width: 4, height: 4, background: GOLD, marginTop: 6, flexShrink: 0 }} /><span style={{ minWidth: 0, overflowWrap: 'anywhere' }}>{b}</span></div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}
          <ExtraSections data={data} lang={lang} Heading={H} color={TEXT} muted={MUTED} accent={NAVY} gap={18} />
          {additional && <div><H>{L.additional(lang)}</H><div style={{ whiteSpace: 'pre-line', lineHeight: 1.65, overflowWrap: 'anywhere' }}>{additional}</div></div>}
        </main>

        <aside style={{ width: 236, flexShrink: 0, background: PANEL, borderLeft: `1px solid ${LINE}`, padding: '26px 24px 30px', boxSizing: 'border-box' }}>
          {skills.length > 0 && (
            <div style={{ marginBottom: 20 }}><H>{L.skills(lang)}</H>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                {skills.map(s => <span key={s} style={{ fontSize: 9, fontWeight: 600, color: NAVY, background: '#fff', border: `1px solid ${LINE}`, borderRadius: 4, padding: '3px 8px', overflowWrap: 'anywhere' }}>{s}</span>)}
              </div>
            </div>
          )}
          {education.length > 0 && (
            <div style={{ marginBottom: 20 }}><H>{L.education(lang)}</H>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
                {education.map(e => <div key={e.id}><div style={{ fontWeight: 700, color: NAVY, lineHeight: 1.35, overflowWrap: 'anywhere' }}>{e.degree || e.school}</div>{e.degree && e.school && <div style={{ color: MUTED, fontSize: 9.5 }}>{e.school}</div>}<div style={{ color: GOLD_DK, fontSize: 9, fontWeight: 700, marginTop: 1 }}>{eduRange(e.startYear, e.endYear)}</div></div>)}
              </div>
            </div>
          )}
          {languages.length > 0 && (
            <div style={{ marginBottom: 20 }}><H>{L.languages(lang)}</H>
              {languages.map(l => <div key={l.id} style={{ display: 'flex', justifyContent: 'space-between', gap: 8, marginBottom: 5 }}><span style={{ fontWeight: 600, color: NAVY }}>{l.name}</span><span style={{ color: MUTED, fontSize: 9 }}>{l.level}</span></div>)}
            </div>
          )}
          {certs.length > 0 && (
            <div style={{ marginBottom: 20 }}><H>{L.certificates(lang)}</H>
              {certs.map(c => <div key={c.id} style={{ marginBottom: 7 }}><div style={{ fontWeight: 600, color: NAVY, lineHeight: 1.35, overflowWrap: 'anywhere' }}>{c.name}</div><div style={{ color: MUTED, fontSize: 9 }}>{[c.issuer, c.year].filter(Boolean).join(' · ')}</div></div>)}
            </div>
          )}
          {trains.length > 0 && (
            <div><H>{L.trainings(lang)}</H>
              {trains.map(t => <div key={t.id} style={{ marginBottom: 7 }}><div style={{ fontWeight: 600, color: NAVY, lineHeight: 1.35, overflowWrap: 'anywhere' }}>{t.name}</div><div style={{ color: MUTED, fontSize: 9 }}>{[t.provider, t.year].filter(Boolean).join(' · ')}</div></div>)}
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
