'use client';
import { CVData } from '@/app/types/cv';
import { Lang, parts, fullName, dateRange, eduRange, bullets, L, contactItems, Icon, ExtraSections } from './shared';

const INK = '#0B1220', LINE = '#E2E8F0', MUTED = '#64748B', SUBTLE = '#F8FAFC';
const HEAD = '"Space Grotesk","Inter",Arial,sans-serif';
const BODY = '"IBM Plex Sans","Inter",Arial,sans-serif';

export default function TechTemplate({ data, lang, accentColor = '#0E9F6E', leftTextScale = 1, rightTextScale = 1 }: { data: CVData; lang: Lang; accentColor?: string; leftTextScale?: number; rightTextScale?: number }) {
  const GREEN = /^#[0-9a-f]{6}$/i.test(accentColor) ? accentColor : '#0E9F6E';
  const GREEN_SOFT = `${GREEN}16`;
  const { p, experience, education, skills, languages, certs, trains, additional } = parts(data);
  const contacts = contactItems(p);

  const H = ({ children, count }: { children: string; count?: number }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10, paddingBottom: 6, borderBottom: `1px solid ${LINE}` }}>
      <span style={{ width: 3, height: 11, background: GREEN, borderRadius: 1 }} />
      <span style={{ fontFamily: HEAD, fontSize: `calc(9.5px * var(--tech-text-scale, 1))`, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: INK }}>{children}</span>
      {!!count && <span style={{ marginLeft: 'auto', fontFamily: HEAD, fontSize: `calc(8.5px * var(--tech-text-scale, 1))`, fontWeight: 700, color: GREEN, background: GREEN_SOFT, borderRadius: 10, padding: '1px 7px' }}>{count}</span>}
    </div>
  );

  return (
    <div style={{ fontFamily: BODY, color: '#1E293B', background: '#fff', width: '100%', display: 'flex', flexDirection: 'column', fontSize: `calc(9.6px * var(--tech-text-scale, 1))`, lineHeight: 1.5 }}>


      <div style={{ display: 'flex', flex: 1, alignItems: 'stretch' }}>
        <main style={{ '--tech-text-scale': rightTextScale, fontSize: `${9.6 * rightTextScale}px`, flex: 1, minWidth: 0, padding: '24px 26px 30px 30px' } as React.CSSProperties}>
      <header style={{ padding: '0 0 18px', marginLeft: -12, display: 'flex', justifyContent: 'space-between', gap: 20, alignItems: 'flex-start' }}>
        <div style={{ minWidth: 0, flex: 1 }}>
          <h1 style={{ margin: 0, fontFamily: HEAD, fontSize: `calc(31px * var(--tech-text-scale, 1))`, fontWeight: 700, letterSpacing: -0.9, color: INK, lineHeight: 1.08, overflowWrap: 'anywhere' }}>{fullName(data) || ' '}</h1>
          {p.jobTitle && <div style={{ fontFamily: HEAD, marginTop: 6, fontSize: `calc(13px * var(--tech-text-scale, 1))`, fontWeight: 500, color: GREEN, overflowWrap: 'anywhere' }}>{'› '}{p.jobTitle}</div>}
          <div data-cv-contacts style={{ display: 'flex', flexWrap: 'nowrap', gap: 'calc(6px * var(--cv-contact-scale, 1))', marginTop: 13 }}>
            {contacts.map(c => (
              <span key={c.text} style={{ display: 'inline-flex', alignItems: 'center', flexShrink: 0, whiteSpace: 'nowrap', gap: 'calc(4px * var(--cv-contact-scale, 1))', border: `1px solid ${LINE}`, borderRadius: 5, padding: '4px calc(5px * var(--cv-contact-scale, 1))', fontSize: `calc(7.8px * var(--tech-text-scale, 1) * var(--cv-contact-scale, 1))`, color: '#334155', background: SUBTLE }}>
                <Icon name={c.icon} size={8} color={GREEN} />{c.icon === 'link' && /^https?:\/\//i.test(c.text) ? <a href={c.text.replace(/\/+$/, '')} target="_blank" rel="noopener noreferrer" style={{ overflowWrap: 'anywhere', color: 'inherit', textDecoration: 'underline', textUnderlineOffset: 2 }}>{c.text.replace(/^https?:\/\//i, '').replace(/\/+$/, '')}</a> : <span style={{ overflowWrap: 'anywhere' }}>{c.text}</span>}
              </span>
            ))}
          </div>
        </div>

      </header>
          {p.summary && <div style={{ marginBottom: 17 }}><H>{L.summary(lang)}</H><div style={{ lineHeight: 1.65, color: '#334155' }}>{p.summary}</div></div>}
          {experience.length > 0 && (
            <div style={{ marginBottom: 16 }}>
              <H>{L.experience(lang)}</H>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 13 }}>
                {experience.map(e => (
                  <div key={e.id}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'baseline' }}>
                      <span style={{ fontFamily: HEAD, fontSize: `calc(11.5px * var(--tech-text-scale, 1))`, fontWeight: 700, color: INK, lineHeight: 1.3, overflowWrap: 'anywhere' }}>{e.jobTitle}</span>
                      <span style={{ fontFamily: HEAD, fontSize: `calc(8.5px * var(--tech-text-scale, 1))`, fontWeight: 500, color: MUTED, flexShrink: 0, whiteSpace: 'nowrap' }}>{dateRange(e, lang)}</span>
                    </div>
                    <div style={{ fontSize: `calc(10px * var(--tech-text-scale, 1))`, fontWeight: 600, color: GREEN, margin: '1px 0 4px' }}>{[e.company, e.city].filter(Boolean).join(' / ')}</div>
                    {bullets(e.description).map((b, i) => <div key={i} style={{ display: 'flex', gap: 7, marginBottom: 2.5 }}><span style={{ color: GREEN, fontWeight: 700, flexShrink: 0 }}>›</span><span style={{ minWidth: 0, overflowWrap: 'anywhere' }}>{b}</span></div>)}
                  </div>
                ))}
              </div>
            </div>
          )}
          {certs.length > 0 && <div style={{ marginBottom: 18 }}><H>{L.certificates(lang)}</H>{certs.map(c => <div key={c.id} style={{ marginBottom: 7 }}><div style={{ fontWeight: 600, color: INK, lineHeight: 1.35, overflowWrap: 'anywhere' }}>{c.name}</div><div style={{ color: MUTED, fontSize: `calc(8.8px * var(--tech-text-scale, 1))` }}>{[c.issuer, c.year].filter(Boolean).join(' · ')}</div></div>)}</div>}
          <ExtraSections data={data} lang={lang} Heading={H} color="#334155" muted={MUTED} accent={INK} gap={16} fontSize={9.6 * rightTextScale} />
          {additional && <div><H>{L.additional(lang)}</H><div style={{ whiteSpace: 'pre-line', overflowWrap: 'anywhere' }}>{additional}</div></div>}
        </main>

        <aside style={{ '--tech-text-scale': leftTextScale, fontSize: `${9.6 * leftTextScale}px`, order: -1, width: 238, flexShrink: 0, borderRight: `1px solid ${LINE}`, background: SUBTLE, padding: '24px 20px 30px 24px', boxSizing: 'border-box' } as React.CSSProperties}>
          {p.photo && <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 22 }}><div style={{ width: 112, height: 112, borderRadius: '50%', overflow: 'hidden', border: `3px solid ${GREEN}`, padding: 3, background: '#fff' }}><div style={{ width: '100%', height: '100%', borderRadius: '50%', overflow: 'hidden' }}><img src={p.photo} alt={fullName(data)} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block', transform: 'scale(1.12)', transformOrigin: 'center 35%' }} /></div></div></div>}
          {education.length > 0 && (
            <div style={{ marginBottom: 18 }}><H>{L.education(lang)}</H>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>{education.map(e => <div key={e.id}><div style={{ fontFamily: HEAD, fontWeight: 700, color: INK, lineHeight: 1.35, overflowWrap: 'anywhere' }}>{e.degree || e.school}</div>{e.degree && e.school && <div style={{ color: MUTED }}>{e.school}</div>}<div style={{ fontFamily: HEAD, fontSize: `calc(8.5px * var(--tech-text-scale, 1))`, color: GREEN, fontWeight: 600 }}>{eduRange(e.startYear, e.endYear)}</div></div>)}</div>
            </div>
          )}
          {data.skillGroups?.length ? (
            <div style={{ marginBottom: 18 }}><H>{L.skills(lang)}</H>
              {data.skillGroups.map(group => <div key={group.title} style={{ marginBottom: 11 }}>
                <div style={{ fontFamily: HEAD, fontSize: `calc(9px * var(--tech-text-scale, 1))`, fontWeight: 700, color: GREEN, marginBottom: 5 }}>{group.title}</div>
                {group.items.map(skill => <div key={skill} style={{ display: 'flex', gap: 5, marginBottom: 2, fontSize: `calc(8.8px * var(--tech-text-scale, 1))`, lineHeight: 1.4 }}><span style={{ color: GREEN }}>•</span><span>{skill}</span></div>)}
              </div>)}
            </div>
          ) : skills.length > 0 ? (
            <div style={{ marginBottom: 18 }}><H>{L.skills(lang)}</H>
              {skills.map(skill => <div key={skill} style={{ marginBottom: 3 }}>{skill}</div>)}
            </div>
          ) : null}
          {languages.length > 0 && <div style={{ marginBottom: 18 }}><H>{L.languages(lang)}</H>{languages.map(l => <div key={l.id} style={{ display: 'flex', justifyContent: 'space-between', gap: 8, marginBottom: 4 }}><span style={{ fontWeight: 500, color: INK }}>{l.name}</span><span style={{ fontFamily: HEAD, fontSize: `calc(8.5px * var(--tech-text-scale, 1))`, color: MUTED }}>{l.level}</span></div>)}</div>}

          {trains.length > 0 && <div><H>{L.trainings(lang)}</H>{trains.map(t => <div key={t.id} style={{ marginBottom: 7 }}><div style={{ fontWeight: 600, color: INK, lineHeight: 1.35, overflowWrap: 'anywhere' }}>{t.name}</div><div style={{ color: MUTED, fontSize: `calc(8.8px * var(--tech-text-scale, 1))` }}>{[t.provider, t.year].filter(Boolean).join(' · ')}</div></div>)}</div>}
        </aside>
      </div>
    </div>
  );
}
