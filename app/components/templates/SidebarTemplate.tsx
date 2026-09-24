'use client';
import { CVData } from '@/app/types/cv';
import { Lang, parts, dateRange, eduRange, bullets, L, contactItems, Icon, ExtraSections } from './shared';

const SAGE = '#4F6F52', DEEP = '#26332B', GOLD = '#B08D57', IVORY = '#F3EFE6', MUTED = '#7A8579', LINE = '#DDD6C7';
const HEAD = '"Lora","Playfair Display",Georgia,serif';
const BODY = '"Work Sans","Inter",Arial,sans-serif';
const LEVEL: Record<string, number> = { A1: 1, A2: 2, B1: 3, B2: 4, C1: 5, C2: 5, 'Ana dili': 5, Native: 5 };

export default function SidebarTemplate({ data, lang }: { data: CVData; lang: Lang }) {
  const { p, experience, education, skills, languages, certs, trains, additional } = parts(data);
  const contacts = contactItems(p);
  const initials = ((p.firstName[0] || '') + (p.lastName[0] || '')).toUpperCase();

  const H = ({ children }: { children: string }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
      <span style={{ fontFamily: HEAD, fontSize: 14, fontWeight: 600, color: DEEP, letterSpacing: -0.2 }}>{children}</span>
      <span style={{ flex: 1, height: 1, background: LINE }} />
    </div>
  );
  const SideH = ({ children }: { children: string }) => (
    <div style={{ marginBottom: 10 }}>
      <div style={{ fontFamily: BODY, fontSize: 8.8, fontWeight: 700, letterSpacing: 1.8, textTransform: 'uppercase', color: SAGE }}>{children}</div>
      <div style={{ width: 22, height: 1.5, background: GOLD, marginTop: 5 }} />
    </div>
  );

  return (
    <div style={{ fontFamily: BODY, display: 'flex', width: '100%', background: '#fff', color: '#2F3A33', fontSize: 9.8, lineHeight: 1.55 }}>
      <main style={{ flex: 1, minWidth: 0, padding: '42px 30px 34px 42px' }}>
        <h1 style={{ margin: 0, fontFamily: HEAD, fontSize: 37, fontWeight: 600, lineHeight: 1.05, letterSpacing: -1, color: DEEP, overflowWrap: 'anywhere' }}>
          {p.firstName}{p.firstName && p.lastName ? ' ' : ''}{p.lastName}
        </h1>
        {p.jobTitle && <div style={{ marginTop: 10, fontSize: 10.5, fontWeight: 600, letterSpacing: 2.2, textTransform: 'uppercase', color: SAGE, overflowWrap: 'anywhere' }}>{p.jobTitle}</div>}
        <div style={{ width: 44, height: 2, background: GOLD, margin: '15px 0 18px' }} />
        {p.summary && <div style={{ marginBottom: 22, fontSize: 10.4, lineHeight: 1.75, color: '#3A463E' }}>{p.summary}</div>}

        {experience.length > 0 && (
          <div style={{ marginBottom: 20 }}><H>{L.experience(lang)}</H>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {experience.map((e, i) => (
                <div key={e.id} style={{ display: 'flex', gap: 14 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 11, flexShrink: 0 }}>
                    <span style={{ width: 9, height: 9, borderRadius: '50%', border: `2px solid ${SAGE}`, background: '#fff', marginTop: 3, flexShrink: 0 }} />
                    {i < experience.length - 1 && <span style={{ width: 1.5, flex: 1, background: LINE, marginTop: 3 }} />}
                  </div>
                  <div style={{ minWidth: 0, flex: 1, paddingBottom: i < experience.length - 1 ? 16 : 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'baseline' }}>
                      <span style={{ fontFamily: HEAD, fontSize: 12.5, fontWeight: 600, color: DEEP, lineHeight: 1.3, overflowWrap: 'anywhere' }}>{e.jobTitle}</span>
                      <span style={{ fontSize: 8.6, fontWeight: 600, color: GOLD, flexShrink: 0, whiteSpace: 'nowrap' }}>{dateRange(e, lang)}</span>
                    </div>
                    <div style={{ fontSize: 10, fontWeight: 600, color: SAGE, margin: '1px 0 5px' }}>{[e.company, e.city].filter(Boolean).join(' · ')}</div>
                    {bullets(e.description).map((b, k) => <div key={k} style={{ display: 'flex', gap: 8, marginBottom: 2.5 }}><span style={{ width: 4, height: 1.5, background: GOLD, marginTop: 8, flexShrink: 0 }} /><span style={{ minWidth: 0, overflowWrap: 'anywhere' }}>{b}</span></div>)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {education.length > 0 && (
          <div style={{ marginBottom: 20 }}><H>{L.education(lang)}</H>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
              {education.map(e => <div key={e.id} style={{ display: 'flex', justifyContent: 'space-between', gap: 10 }}><div style={{ minWidth: 0 }}><div style={{ fontFamily: HEAD, fontWeight: 600, fontSize: 11.2, color: DEEP, overflowWrap: 'anywhere' }}>{e.degree || e.school}</div>{e.degree && e.school && <div style={{ color: MUTED }}>{e.school}</div>}</div><span style={{ fontSize: 8.6, fontWeight: 600, color: GOLD, flexShrink: 0 }}>{eduRange(e.startYear, e.endYear)}</span></div>)}
            </div>
          </div>
        )}
        <ExtraSections data={data} lang={lang} Heading={H} color="#3A463E" muted={MUTED} accent={DEEP} gap={20} fontSize={9.8} />
        {additional && <div><H>{L.additional(lang)}</H><div style={{ whiteSpace: 'pre-line', overflowWrap: 'anywhere' }}>{additional}</div></div>}
      </main>

      <aside style={{ width: '33%', background: IVORY, padding: '42px 26px 34px 24px', boxSizing: 'border-box', flexShrink: 0 }}>
        <div style={{ marginBottom: 24 }}>
          {p.photo
            ? <img src={p.photo} alt="" style={{ width: 118, height: 140, objectFit: 'cover', objectPosition: 'top', borderRadius: 10, display: 'block' }} />
            : <div style={{ width: 118, height: 140, borderRadius: 10, background: SAGE, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: HEAD, fontSize: 40, fontWeight: 600 }}>{initials || <Icon name="user" size={44} color="#fff" />}</div>}
        </div>
        {contacts.length > 0 && (
          <div style={{ marginBottom: 22 }}><SideH>{L.contact(lang)}</SideH>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {contacts.map(c => <div key={c.text} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', fontSize: 9.4 }}><span style={{ marginTop: 1.5 }}><Icon name={c.icon} size={11} color={SAGE} /></span><span style={{ minWidth: 0, overflowWrap: 'anywhere' }}>{c.text}</span></div>)}
            </div>
          </div>
        )}
        {skills.length > 0 && <div style={{ marginBottom: 22 }}><SideH>{L.skills(lang)}</SideH>{skills.map(s => <div key={s} style={{ display: 'flex', gap: 8, marginBottom: 4 }}><span style={{ width: 4, height: 1.5, background: GOLD, marginTop: 8, flexShrink: 0 }} /><span style={{ minWidth: 0, overflowWrap: 'anywhere' }}>{s}</span></div>)}</div>}
        {languages.length > 0 && (
          <div style={{ marginBottom: 22 }}><SideH>{L.languages(lang)}</SideH>
            {languages.map(l => <div key={l.id} style={{ marginBottom: 8 }}><div style={{ display: 'flex', justifyContent: 'space-between', gap: 6, fontWeight: 600 }}><span>{l.name}</span><span style={{ fontWeight: 500, color: MUTED, fontSize: 8.8 }}>{l.level}</span></div><div style={{ height: 3, background: LINE, borderRadius: 2, marginTop: 4 }}><div style={{ height: 3, width: `${(LEVEL[l.level] ?? 3) * 20}%`, background: SAGE, borderRadius: 2 }} /></div></div>)}
          </div>
        )}
        {certs.length > 0 && <div style={{ marginBottom: 22 }}><SideH>{L.certificates(lang)}</SideH>{certs.map(c => <div key={c.id} style={{ marginBottom: 7, lineHeight: 1.4 }}><div style={{ fontWeight: 600, overflowWrap: 'anywhere' }}>{c.name}</div><div style={{ color: MUTED, fontSize: 8.8 }}>{[c.issuer, c.year].filter(Boolean).join(' · ')}</div></div>)}</div>}
        {trains.length > 0 && <div><SideH>{L.trainings(lang)}</SideH>{trains.map(t => <div key={t.id} style={{ marginBottom: 7, lineHeight: 1.4 }}><div style={{ fontWeight: 600, overflowWrap: 'anywhere' }}>{t.name}</div><div style={{ color: MUTED, fontSize: 8.8 }}>{[t.provider, t.year].filter(Boolean).join(' · ')}</div></div>)}</div>}
      </aside>
    </div>
  );
}
