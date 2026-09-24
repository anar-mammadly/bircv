'use client';
import { CVData } from '@/app/types/cv';
import { Lang, parts, fullName, dateRange, eduRange, bullets, L, contactItems, ExtraSections } from './shared';

const INK = '#1B1B1B', ACCENT = '#B4452B', MUTED = '#6B645C', RULE = '#D9D3C7', PAPER = '#FFFDF9';
const HEAD = '"Fraunces","Playfair Display",serif';
const BODY = '"Source Serif 4","Lora",Georgia,serif';
const LABEL = '"Libre Franklin","Inter",Arial,sans-serif';

// A section is a ruled row: a small label in the margin, content to the right.
function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section style={{ display: 'grid', gridTemplateColumns: '116px minmax(0,1fr)', gap: 22, padding: '15px 0', borderTop: `1px solid ${RULE}` }}>
      <div style={{ fontFamily: LABEL, fontSize: 8.5, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: ACCENT, paddingTop: 3 }}>{label}</div>
      <div style={{ minWidth: 0 }}>{children}</div>
    </section>
  );
}

export default function EditorialTemplate({ data, lang }: { data: CVData; lang: Lang }) {
  const { p, experience, education, skills, languages, certs, trains, additional } = parts(data);
  const contacts = contactItems(p);
  const name = [p.firstName, p.lastName];

  const Heading = ({ children }: { children: string }) => <div style={{ fontFamily: HEAD, fontSize: 11.5, fontWeight: 600, color: INK, marginBottom: 6 }}>{children}</div>;

  return (
    <div style={{ background: PAPER, color: INK, fontFamily: BODY, fontSize: 10, padding: '40px 46px 40px', width: '100%', boxSizing: 'border-box' }}>
      <div style={{ borderTop: `3px solid ${INK}`, paddingTop: 16, marginBottom: 6 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 24, alignItems: 'flex-start' }}>
          <div style={{ minWidth: 0, flex: 1 }}>
            <div style={{ fontFamily: LABEL, fontSize: 8.5, fontWeight: 600, letterSpacing: 2.2, textTransform: 'uppercase', color: MUTED, marginBottom: 10 }}>Curriculum Vitae</div>
            <h1 style={{ margin: 0, fontFamily: HEAD, fontSize: 42, lineHeight: 1.02, letterSpacing: -1.2, color: INK, overflowWrap: 'anywhere' }}>
              <span style={{ fontWeight: 400 }}>{name[0]}</span>{name[0] && name[1] ? ' ' : ''}<span style={{ fontWeight: 700 }}>{name[1]}</span>
            </h1>
            {p.jobTitle && <div style={{ marginTop: 10, fontFamily: LABEL, fontSize: 10.5, fontWeight: 600, letterSpacing: 1.6, textTransform: 'uppercase', color: ACCENT, overflowWrap: 'anywhere' }}>{p.jobTitle}</div>}
          </div>
          <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', flexShrink: 0 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, fontFamily: LABEL, fontSize: 9, color: MUTED, textAlign: 'right', maxWidth: 190, paddingTop: 20 }}>
              {contacts.map(c => <div key={c.text} style={{ overflowWrap: 'anywhere' }}>{c.text}</div>)}
            </div>
            {p.photo && <img src={p.photo} alt="" style={{ width: 70, height: 88, objectFit: 'cover', objectPosition: 'top', display: 'block' }} />}
          </div>
        </div>
      </div>

      <div style={{ marginTop: 14 }}>
        {p.summary && <Row label={L.summary(lang)}><div style={{ fontFamily: HEAD, fontSize: 12.5, lineHeight: 1.55, fontWeight: 400, color: INK }}>{p.summary}</div></Row>}

        {experience.length > 0 && (
          <Row label={L.experience(lang)}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {experience.map(e => (
                <div key={e.id}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'baseline' }}>
                    <span style={{ fontFamily: HEAD, fontSize: 13, fontWeight: 600, lineHeight: 1.3, overflowWrap: 'anywhere' }}>{e.jobTitle}</span>
                    <span style={{ fontFamily: LABEL, fontSize: 8.5, color: MUTED, flexShrink: 0, letterSpacing: 0.3 }}>{dateRange(e, lang)}</span>
                  </div>
                  <div style={{ fontSize: 10, color: ACCENT, fontWeight: 600, margin: '1px 0 5px' }}>{[e.company, e.city].filter(Boolean).join(' — ')}</div>
                  {bullets(e.description).map((b, i) => (
                    <div key={i} style={{ display: 'flex', gap: 7, marginBottom: 2.5, lineHeight: 1.55, color: '#33302B' }}><span style={{ color: ACCENT, flexShrink: 0 }}>—</span><span style={{ minWidth: 0, overflowWrap: 'anywhere' }}>{b}</span></div>
                  ))}
                </div>
              ))}
            </div>
          </Row>
        )}

        {education.length > 0 && (
          <Row label={L.education(lang)}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
              {education.map(e => (
                <div key={e.id} style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
                  <div style={{ minWidth: 0 }}><div style={{ fontFamily: HEAD, fontWeight: 600, fontSize: 11.5, overflowWrap: 'anywhere' }}>{e.degree || e.school}</div>{e.degree && e.school && <div style={{ color: MUTED }}>{e.school}</div>}</div>
                  <span style={{ fontFamily: LABEL, fontSize: 8.5, color: MUTED, flexShrink: 0 }}>{eduRange(e.startYear, e.endYear)}</span>
                </div>
              ))}
            </div>
          </Row>
        )}

        {skills.length > 0 && <Row label={L.skills(lang)}><div style={{ lineHeight: 1.75, color: '#33302B' }}>{skills.join('  /  ')}</div></Row>}

        {languages.length > 0 && (
          <Row label={L.languages(lang)}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,minmax(0,1fr))', gap: '4px 24px' }}>
              {languages.map(l => <div key={l.id} style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}><span>{l.name}</span><span style={{ fontFamily: LABEL, fontSize: 8.5, color: MUTED }}>{l.level}</span></div>)}
            </div>
          </Row>
        )}

        {certs.length > 0 && (
          <Row label={L.certificates(lang)}>
            {certs.map(c => <div key={c.id} style={{ display: 'flex', justifyContent: 'space-between', gap: 10, marginBottom: 3 }}><span style={{ minWidth: 0, overflowWrap: 'anywhere' }}><b style={{ fontWeight: 600 }}>{c.name}</b>{c.issuer ? <span style={{ color: MUTED }}> — {c.issuer}</span> : null}</span><span style={{ fontFamily: LABEL, fontSize: 8.5, color: MUTED, flexShrink: 0 }}>{c.year}</span></div>)}
          </Row>
        )}

        {trains.length > 0 && (
          <Row label={L.trainings(lang)}>
            {trains.map(t => <div key={t.id} style={{ marginBottom: 4 }}><b style={{ fontWeight: 600 }}>{t.name}</b><span style={{ color: MUTED }}>{[t.provider, t.year].filter(Boolean).length ? ' — ' + [t.provider, t.year].filter(Boolean).join(', ') : ''}</span></div>)}
          </Row>
        )}

        <ExtraSectionsRows data={data} lang={lang} />

        {additional && <Row label={L.additional(lang)}><div style={{ whiteSpace: 'pre-line', lineHeight: 1.6, color: '#33302B', overflowWrap: 'anywhere' }}>{additional}</div></Row>}
      </div>
    </div>
  );
}

// projects / custom sections keep the margin-label look
function ExtraSectionsRows({ data, lang }: { data: CVData; lang: Lang }) {
  const { projects, customs } = parts(data);
  return (
    <>
      {projects.length > 0 && (
        <Row label={L.projects(lang)}>
          {projects.map(pr => <div key={pr.id} style={{ marginBottom: 6, lineHeight: 1.5 }}><div style={{ display: 'flex', justifyContent: 'space-between', gap: 10 }}><b style={{ fontFamily: HEAD, fontWeight: 600 }}>{pr.name}</b>{pr.link && <span style={{ fontFamily: LABEL, fontSize: 8.5, color: MUTED, overflowWrap: 'anywhere' }}>{pr.link}</span>}</div>{pr.description && <div style={{ color: '#33302B', whiteSpace: 'pre-line' }}>{pr.description}</div>}</div>)}
        </Row>
      )}
      {customs.map(cs => <Row key={cs.id} label={cs.title || (lang === 'az' ? 'Bölmə' : 'Section')}><div style={{ whiteSpace: 'pre-line', lineHeight: 1.6, color: '#33302B', overflowWrap: 'anywhere' }}>{cs.content}</div></Row>)}
    </>
  );
}
