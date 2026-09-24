'use client';
import { CVData } from '@/app/types/cv';
import { Lang, parts, dateRange, eduRange, bullets, L, contactItems, Icon, ExtraSections } from './shared';

// Left panel: near-black petrol-teal (white text contrast ≈ 13:1). The main-column accents are unchanged.
const SIDE = '#0A3540';
const CORAL = '#FF5A36', DARK = '#1A1A1A', CREAM = '#FFF7F0', MUTED = '#7C6F66';
const F = '"Bricolage Grotesque","Inter",Arial,sans-serif';

const LEVEL_DOTS: Record<string, number> = { A1: 1, A2: 2, B1: 3, B2: 4, C1: 5, C2: 5, 'Ana dili': 5, Native: 5 };

export default function CreativeTemplate({ data, lang }: { data: CVData; lang: Lang }) {
  const { p, experience, education, skills, languages, certs, trains, additional } = parts(data);
  const contacts = contactItems(p);
  const initials = ((p.firstName[0] || '') + (p.lastName[0] || '')).toUpperCase();

  const SideH = ({ children }: { children: string }) => <div style={{ fontSize: 9.5, fontWeight: 800, letterSpacing: 1.6, textTransform: 'uppercase', color: '#fff', marginBottom: 10, paddingBottom: 6, borderBottom: '1.5px solid rgba(255,255,255,.45)' }}>{children}</div>;
  const H = ({ children }: { children: string }) => (
    <div style={{ display: 'inline-block', position: 'relative', marginBottom: 12 }}>
      <div style={{ fontSize: 19, fontWeight: 800, letterSpacing: -0.4, color: DARK, position: 'relative', zIndex: 1, lineHeight: 1.1 }}>{children}</div>
      <div style={{ position: 'absolute', left: -2, right: -6, bottom: 0, height: 7, background: CORAL, opacity: 0.35, zIndex: 0 }} />
    </div>
  );

  return (
    <div style={{ fontFamily: F, display: 'flex', width: '100%', fontSize: 10, color: DARK, background: CREAM }}>
      <aside style={{ width: '33%', background: SIDE, color: '#fff', padding: '34px 22px 30px', boxSizing: 'border-box', flexShrink: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 22 }}>
          {p.photo
            ? <img src={p.photo} alt="" style={{ width: 112, height: 112, borderRadius: '50%', objectFit: 'cover', objectPosition: 'top', border: '4px solid #fff', display: 'block' }} />
            : <div style={{ width: 112, height: 112, borderRadius: '50%', border: '4px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 38, fontWeight: 800, letterSpacing: -1 }}>{initials || <Icon name="user" size={40} color="#fff" />}</div>}
        </div>
        {contacts.length > 0 && (
          <div style={{ marginBottom: 22 }}><SideH>{L.contact(lang)}</SideH>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {contacts.map(c => <div key={c.text} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', fontSize: 9.5, lineHeight: 1.4 }}><span style={{ marginTop: 1 }}><Icon name={c.icon} size={11} color="#fff" /></span><span style={{ minWidth: 0, overflowWrap: 'anywhere' }}>{c.text}</span></div>)}
            </div>
          </div>
        )}
        {skills.length > 0 && (
          <div style={{ marginBottom: 22 }}><SideH>{L.skills(lang)}</SideH>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>{skills.map(s => <span key={s} style={{ fontSize: 9, fontWeight: 600, border: '1.5px solid #fff', borderRadius: 999, padding: '2px 9px', overflowWrap: 'anywhere' }}>{s}</span>)}</div>
          </div>
        )}
        {languages.length > 0 && (
          <div style={{ marginBottom: 22 }}><SideH>{L.languages(lang)}</SideH>
            {languages.map(l => {
              const n = LEVEL_DOTS[l.level] ?? 3;
              return (
                <div key={l.id} style={{ marginBottom: 8 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 6, fontSize: 9.5, fontWeight: 600 }}><span>{l.name}</span><span style={{ opacity: 0.85, fontWeight: 500 }}>{l.level}</span></div>
                  <div style={{ display: 'flex', gap: 3, marginTop: 4 }}>{[1, 2, 3, 4, 5].map(i => <span key={i} style={{ width: 9, height: 4, borderRadius: 2, background: i <= n ? '#fff' : 'rgba(255,255,255,.35)' }} />)}</div>
                </div>
              );
            })}
          </div>
        )}
        {certs.length > 0 && <div style={{ marginBottom: 22 }}><SideH>{L.certificates(lang)}</SideH>{certs.map(c => <div key={c.id} style={{ marginBottom: 7, lineHeight: 1.35 }}><div style={{ fontWeight: 700, fontSize: 9.5, overflowWrap: 'anywhere' }}>{c.name}</div><div style={{ fontSize: 9, opacity: 0.85 }}>{[c.issuer, c.year].filter(Boolean).join(' · ')}</div></div>)}</div>}
        {trains.length > 0 && <div><SideH>{L.trainings(lang)}</SideH>{trains.map(t => <div key={t.id} style={{ marginBottom: 7, lineHeight: 1.35 }}><div style={{ fontWeight: 700, fontSize: 9.5, overflowWrap: 'anywhere' }}>{t.name}</div><div style={{ fontSize: 9, opacity: 0.85 }}>{[t.provider, t.year].filter(Boolean).join(' · ')}</div></div>)}</div>}
      </aside>

      <main style={{ flex: 1, minWidth: 0, padding: '38px 32px 32px 30px' }}>
        <h1 style={{ margin: 0, fontSize: 45, fontWeight: 800, lineHeight: 0.98, letterSpacing: -1.6, color: DARK, overflowWrap: 'anywhere' }}>
          {p.firstName}{p.firstName && p.lastName ? <br /> : ''}<span style={{ color: CORAL }}>{p.lastName}</span>
        </h1>
        {p.jobTitle && <div style={{ display: 'inline-block', marginTop: 14, background: DARK, color: CREAM, fontSize: 10.5, fontWeight: 700, letterSpacing: 0.4, padding: '5px 11px', borderRadius: 6, overflowWrap: 'anywhere' }}>{p.jobTitle}</div>}
        {p.summary && <div style={{ marginTop: 18, fontSize: 10.5, lineHeight: 1.7, fontWeight: 500, color: '#3a332e' }}>{p.summary}</div>}

        {experience.length > 0 && (
          <div style={{ marginTop: 24 }}><H>{L.experience(lang)}</H>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
              {experience.map((e, i) => (
                <div key={e.id} style={{ display: 'flex', gap: 12 }}>
                  <div style={{ fontSize: 18, fontWeight: 800, color: CORAL, lineHeight: 1, width: 26, flexShrink: 0, letterSpacing: -0.5 }}>{String(i + 1).padStart(2, '0')}</div>
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'baseline' }}>
                      <span style={{ fontSize: 12.5, fontWeight: 800, lineHeight: 1.3, overflowWrap: 'anywhere' }}>{e.jobTitle}</span>
                      <span style={{ fontSize: 8.5, fontWeight: 700, color: MUTED, flexShrink: 0, whiteSpace: 'nowrap' }}>{dateRange(e, lang)}</span>
                    </div>
                    <div style={{ fontSize: 10.5, fontWeight: 700, color: CORAL, margin: '1px 0 5px' }}>{[e.company, e.city].filter(Boolean).join(' · ')}</div>
                    {bullets(e.description).map((b, k) => <div key={k} style={{ display: 'flex', gap: 7, marginBottom: 2.5, lineHeight: 1.6, fontWeight: 500, color: '#3a332e' }}><span style={{ width: 5, height: 5, borderRadius: '50%', background: CORAL, marginTop: 6, flexShrink: 0 }} /><span style={{ minWidth: 0, overflowWrap: 'anywhere' }}>{b}</span></div>)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {education.length > 0 && (
          <div style={{ marginTop: 22 }}><H>{L.education(lang)}</H>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
              {education.map(e => <div key={e.id} style={{ display: 'flex', justifyContent: 'space-between', gap: 10 }}><div style={{ minWidth: 0 }}><div style={{ fontWeight: 800, fontSize: 11, overflowWrap: 'anywhere' }}>{e.degree || e.school}</div>{e.degree && e.school && <div style={{ color: MUTED, fontWeight: 500 }}>{e.school}</div>}</div><span style={{ fontSize: 8.5, fontWeight: 700, color: MUTED, flexShrink: 0 }}>{eduRange(e.startYear, e.endYear)}</span></div>)}
            </div>
          </div>
        )}
        <div style={{ marginTop: 22 }}><ExtraSections data={data} lang={lang} Heading={H} color="#3a332e" muted={MUTED} accent={DARK} gap={20} /></div>
        {additional && <div style={{ marginTop: 4 }}><H>{L.additional(lang)}</H><div style={{ whiteSpace: 'pre-line', lineHeight: 1.65, fontWeight: 500, overflowWrap: 'anywhere' }}>{additional}</div></div>}
      </main>
    </div>
  );
}
