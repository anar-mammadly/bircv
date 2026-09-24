'use client';
import { CVData } from '@/app/types/cv';
import { Lang, parts, fullName, dateRange, eduRange, bullets, L, contactItems, Icon, ExtraSections } from './shared';

const INK = '#0B1220', GREEN = '#0E9F6E', GREEN_SOFT = '#E6F7F0', LINE = '#E2E8F0', MUTED = '#64748B', SUBTLE = '#F8FAFC';
const HEAD = '"Space Grotesk","Inter",Arial,sans-serif';
const BODY = '"IBM Plex Sans","Inter",Arial,sans-serif';

export default function TechTemplate({ data, lang }: { data: CVData; lang: Lang }) {
  const { p, experience, education, skills, languages, certs, trains, additional } = parts(data);
  const contacts = contactItems(p);

  const H = ({ children, count }: { children: string; count?: number }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10, paddingBottom: 6, borderBottom: `1px solid ${LINE}` }}>
      <span style={{ width: 3, height: 11, background: GREEN, borderRadius: 1 }} />
      <span style={{ fontFamily: HEAD, fontSize: 9.5, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: INK }}>{children}</span>
      {!!count && <span style={{ marginLeft: 'auto', fontFamily: HEAD, fontSize: 8.5, fontWeight: 700, color: GREEN, background: GREEN_SOFT, borderRadius: 10, padding: '1px 7px' }}>{count}</span>}
    </div>
  );

  return (
    <div style={{ fontFamily: BODY, color: '#1E293B', background: '#fff', width: '100%', display: 'flex', flexDirection: 'column', fontSize: 9.6, lineHeight: 1.5 }}>
      <div style={{ height: 5, background: GREEN }} />
      <header style={{ padding: '26px 36px 18px', display: 'flex', justifyContent: 'space-between', gap: 20, alignItems: 'flex-start' }}>
        <div style={{ minWidth: 0, flex: 1 }}>
          <h1 style={{ margin: 0, fontFamily: HEAD, fontSize: 31, fontWeight: 700, letterSpacing: -0.9, color: INK, lineHeight: 1.08, overflowWrap: 'anywhere' }}>{fullName(data) || ' '}</h1>
          {p.jobTitle && <div style={{ fontFamily: HEAD, marginTop: 6, fontSize: 13, fontWeight: 500, color: GREEN, overflowWrap: 'anywhere' }}>{'› '}{p.jobTitle}</div>}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 6px', marginTop: 13 }}>
            {contacts.map(c => (
              <span key={c.text} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, border: `1px solid ${LINE}`, borderRadius: 5, padding: '3px 8px', fontSize: 9, color: '#334155', background: SUBTLE }}>
                <Icon name={c.icon} size={10} color={GREEN} /><span style={{ overflowWrap: 'anywhere' }}>{c.text}</span>
              </span>
            ))}
          </div>
        </div>
        {p.photo && <img src={p.photo} alt="" style={{ width: 70, height: 70, borderRadius: 10, objectFit: 'cover', objectPosition: 'top', display: 'block', flexShrink: 0, border: `1px solid ${LINE}` }} />}
      </header>

      <div style={{ display: 'flex', flex: 1, alignItems: 'stretch', padding: '4px 0 0' }}>
        <main style={{ flex: 1, minWidth: 0, padding: '10px 26px 30px 36px' }}>
          {p.summary && <div style={{ marginBottom: 17 }}><H>{L.summary(lang)}</H><div style={{ lineHeight: 1.65, color: '#334155' }}>{p.summary}</div></div>}
          {experience.length > 0 && (
            <div style={{ marginBottom: 16 }}>
              <H count={experience.length}>{L.experience(lang)}</H>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 13 }}>
                {experience.map(e => (
                  <div key={e.id}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'baseline' }}>
                      <span style={{ fontFamily: HEAD, fontSize: 11.5, fontWeight: 700, color: INK, lineHeight: 1.3, overflowWrap: 'anywhere' }}>{e.jobTitle}</span>
                      <span style={{ fontFamily: HEAD, fontSize: 8.5, fontWeight: 500, color: MUTED, flexShrink: 0, whiteSpace: 'nowrap' }}>{dateRange(e, lang)}</span>
                    </div>
                    <div style={{ fontSize: 10, fontWeight: 600, color: GREEN, margin: '1px 0 4px' }}>{[e.company, e.city].filter(Boolean).join(' / ')}</div>
                    {bullets(e.description).map((b, i) => <div key={i} style={{ display: 'flex', gap: 7, marginBottom: 2.5 }}><span style={{ color: GREEN, fontWeight: 700, flexShrink: 0 }}>›</span><span style={{ minWidth: 0, overflowWrap: 'anywhere' }}>{b}</span></div>)}
                  </div>
                ))}
              </div>
            </div>
          )}
          <ExtraSections data={data} lang={lang} Heading={H} color="#334155" muted={MUTED} accent={INK} gap={16} fontSize={9.6} />
          {additional && <div><H>{L.additional(lang)}</H><div style={{ whiteSpace: 'pre-line', overflowWrap: 'anywhere' }}>{additional}</div></div>}
        </main>

        <aside style={{ width: 218, flexShrink: 0, borderLeft: `1px solid ${LINE}`, background: SUBTLE, padding: '10px 26px 30px 22px', boxSizing: 'border-box' }}>
          {skills.length > 0 && (
            <div style={{ marginBottom: 18 }}><H count={skills.length}>{L.skills(lang)}</H>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>{skills.map(s => <span key={s} style={{ fontFamily: HEAD, fontSize: 8.6, fontWeight: 500, color: INK, background: '#fff', border: `1px solid ${LINE}`, borderRadius: 4, padding: '2.5px 7px', overflowWrap: 'anywhere' }}>{s}</span>)}</div>
            </div>
          )}
          {education.length > 0 && (
            <div style={{ marginBottom: 18 }}><H>{L.education(lang)}</H>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>{education.map(e => <div key={e.id}><div style={{ fontFamily: HEAD, fontWeight: 700, color: INK, lineHeight: 1.35, overflowWrap: 'anywhere' }}>{e.degree || e.school}</div>{e.degree && e.school && <div style={{ color: MUTED }}>{e.school}</div>}<div style={{ fontFamily: HEAD, fontSize: 8.5, color: GREEN, fontWeight: 600 }}>{eduRange(e.startYear, e.endYear)}</div></div>)}</div>
            </div>
          )}
          {languages.length > 0 && <div style={{ marginBottom: 18 }}><H>{L.languages(lang)}</H>{languages.map(l => <div key={l.id} style={{ display: 'flex', justifyContent: 'space-between', gap: 8, marginBottom: 4 }}><span style={{ fontWeight: 500, color: INK }}>{l.name}</span><span style={{ fontFamily: HEAD, fontSize: 8.5, color: MUTED }}>{l.level}</span></div>)}</div>}
          {certs.length > 0 && <div style={{ marginBottom: 18 }}><H count={certs.length}>{L.certificates(lang)}</H>{certs.map(c => <div key={c.id} style={{ marginBottom: 7 }}><div style={{ fontWeight: 600, color: INK, lineHeight: 1.35, overflowWrap: 'anywhere' }}>{c.name}</div><div style={{ color: MUTED, fontSize: 8.8 }}>{[c.issuer, c.year].filter(Boolean).join(' · ')}</div></div>)}</div>}
          {trains.length > 0 && <div><H>{L.trainings(lang)}</H>{trains.map(t => <div key={t.id} style={{ marginBottom: 7 }}><div style={{ fontWeight: 600, color: INK, lineHeight: 1.35, overflowWrap: 'anywhere' }}>{t.name}</div><div style={{ color: MUTED, fontSize: 8.8 }}>{[t.provider, t.year].filter(Boolean).join(' · ')}</div></div>)}</div>}
        </aside>
      </div>
    </div>
  );
}
