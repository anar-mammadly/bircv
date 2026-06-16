'use client';
import { CVData } from '@/app/types/cv';

const MONTHS_AZ = ['','Yan','Fev','Mar','Apr','May','İyn','İyl','Avq','Sen','Okt','Noy','Dek'];
const MONTHS_EN = ['','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

function fmtDate(month: string, year: string, lang: 'az' | 'en') {
  const arr = lang === 'az' ? MONTHS_AZ : MONTHS_EN;
  const m = parseInt(month);
  if (!year) return '';
  return `${m && arr[m] ? arr[m] + ' ' : ''}${year}`;
}

export default function MinimalTemplate({ data, lang }: { data: CVData; lang: 'az' | 'en' }) {
  const { personal: p, experience, education, skills, languages, additional } = data;
  const certs  = (data as any).certificates || [];
  const trains = (data as any).trainings    || [];
  const present = lang === 'az' ? 'İndiyə qədər' : 'Present';

  const SecHead = ({ children }: { children: string }) => (
    <div style={{ marginBottom: 10 }}>
      <div style={{ fontSize: 9.5, fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: 2, color: '#6b7280', marginBottom: 5 }}>
        {children}
      </div>
      <div style={{ height: 0.5, background: '#d1d5db' }} />
    </div>
  );

  return (
    <div style={{
      fontFamily: '"Inter","Segoe UI",Arial,sans-serif',
      background: '#fff', color: '#1c1c1c',
      width: '100%', height: '100%',
      padding: '28px 32px', overflow: 'hidden', fontSize: 10
    }}>

      {/* Header */}
      <div style={{ marginBottom: 18, paddingBottom: 14, borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 14 }}>
          <div style={{ flex: 1 }}>
            <h1 style={{
              fontSize: 23, fontWeight: 700, margin: '0 0 3px',
              letterSpacing: -0.5, lineHeight: 1.15, color: '#111'
            }}>
              {p.firstName} {p.lastName}
            </h1>
            {p.jobTitle && (
              <p style={{ fontSize: 11, color: '#6b7280', margin: '0 0 9px', fontWeight: 400, letterSpacing: 0.2 }}>
                {p.jobTitle}
              </p>
            )}
            <div style={{ display: 'flex', gap: 14, fontSize: 9.5, color: '#6b7280', flexWrap: 'wrap' as const }}>
              {p.email && <span>{p.email}</span>}
              {p.phone && <span>{p.phone}</span>}
              {p.city && <span>{p.city}{p.country ? ', ' + p.country : ''}</span>}
              {p.linkedin && <span>{p.linkedin}</span>}
            </div>
          </div>
          {p.photo && (
            <img src={p.photo} alt="photo" style={{
              width: 58, height: 58, borderRadius: '50%',
              objectFit: 'cover', flexShrink: 0, border: '1px solid #e5e7eb'
            }} />
          )}
        </div>
      </div>

      {/* Summary */}
      {p.summary && (
        <p style={{ fontSize: 10, color: '#374151', lineHeight: 1.75, marginBottom: 16 }}>
          {p.summary}
        </p>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div style={{ marginBottom: 16 }}>
          <SecHead>{lang === 'az' ? 'İş Təcrübəsi' : 'Experience'}</SecHead>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 8 }}>
            {experience.map(exp => (
              <div key={exp.id} style={{ display: 'flex', gap: 14 }}>
                {/* Date */}
                <div style={{ width: 86, fontSize: 9, color: '#9ca3af', lineHeight: 1.5, flexShrink: 0, paddingTop: 2 }}>
                  <div>{fmtDate(exp.startMonth, exp.startYear, lang)}</div>
                  <div>{exp.current ? present : fmtDate(exp.endMonth, exp.endYear, lang)}</div>
                </div>
                {/* Content */}
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 11, color: '#111', lineHeight: 1.3 }}>{exp.jobTitle}</div>
                  <div style={{ fontSize: 10, color: '#6b7280', marginBottom: 4 }}>
                    {exp.company}{exp.city ? ', ' + exp.city : ''}
                  </div>
                  {exp.description && (
                    <div style={{ fontSize: 9.5, color: '#4b5563', lineHeight: 1.65 }}>
                      {exp.description.split('\n').filter((l: string) => l.trim()).map((line: string, i: number) => (
                        <div key={i} style={{ display: 'flex', gap: 5, marginBottom: 2 }}>
                          <span style={{ flexShrink: 0, color: '#9ca3af' }}>•</span>
                          <span>{line.replace(/^[•\-]\s*/, '')}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2-col bottom */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {education.length > 0 && (
            <div>
              <SecHead>{lang === 'az' ? 'Təhsil' : 'Education'}</SecHead>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 6 }}>
                {education.map(edu => (
                  <div key={edu.id}>
                    <div style={{ fontWeight: 700, fontSize: 10.5, color: '#111', lineHeight: 1.3 }}>
                      {edu.degree || edu.school}
                    </div>
                    {edu.school && edu.degree && <div style={{ fontSize: 10, color: '#6b7280' }}>{edu.school}</div>}
                    <div style={{ fontSize: 9, color: '#9ca3af', marginTop: 1 }}>
                      {edu.startYear}{edu.endYear ? ' – ' + edu.endYear : ''}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {certs.length > 0 && (
            <div>
              <SecHead>{lang === 'az' ? 'Sertifikatlar' : 'Certificates'}</SecHead>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginTop: 6 }}>
                {certs.map((c: any, i: number) => (
                  <div key={i} style={{ fontSize: 9.5 }}>
                    <span style={{ fontWeight: 600 }}>{c.name}</span>
                    {c.issuer && <span style={{ color: '#9ca3af' }}> · {c.issuer}</span>}
                    {c.year && <span style={{ color: '#9ca3af' }}> · {c.year}</span>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {skills.length > 0 && (
            <div>
              <SecHead>{lang === 'az' ? 'Bacarıqlar' : 'Skills'}</SecHead>
              <div style={{ fontSize: 10, color: '#374151', lineHeight: 2, marginTop: 6 }}>
                {skills.join(' · ')}
              </div>
            </div>
          )}
          {languages.length > 0 && (
            <div>
              <SecHead>{lang === 'az' ? 'Dillər' : 'Languages'}</SecHead>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 3, marginTop: 6 }}>
                {languages.map((l, i) => (
                  <div key={i} style={{ fontSize: 10, display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#374151' }}>{l.name}</span>
                    <span style={{ color: '#9ca3af' }}>{l.level}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          {trains.length > 0 && (
            <div>
              <SecHead>{lang === 'az' ? 'Təlimlər' : 'Training'}</SecHead>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginTop: 6 }}>
                {trains.map((tr: any, i: number) => (
                  <div key={i} style={{ fontSize: 9.5 }}>
                    <span style={{ fontWeight: 600 }}>{tr.name}</span>
                    {tr.provider && <span style={{ color: '#9ca3af' }}> · {tr.provider}</span>}
                    {tr.year && <span style={{ color: '#9ca3af' }}> · {tr.year}</span>}
                  </div>
                ))}
              </div>
            </div>
          )}
          {additional && (
            <div>
              <SecHead>{lang === 'az' ? 'Əlavə' : 'Additional'}</SecHead>
              <p style={{ fontSize: 10, color: '#374151', lineHeight: 1.65, margin: '6px 0 0', whiteSpace: 'pre-line' }}>
                {additional}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
