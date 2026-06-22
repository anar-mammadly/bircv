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
      <div style={{ fontSize: 9.5, fontWeight: 500, textTransform: 'uppercase' as const, letterSpacing: 3, color: '#a8a8a8', marginBottom: 6, fontFamily: '"Work Sans",sans-serif' }}>
        {children}
      </div>
      <div style={{ height: 0.5, background: '#e8e8e8' }} />
    </div>
  );

  return (
    <div style={{
      fontFamily: '"Work Sans","Segoe UI",Arial,sans-serif',
      background: '#fff', color: '#1c1c1c',
      width: '100%', minHeight: '297mm',
      padding: '38px 40px', fontSize: 10.5,
      display: 'flex', flexDirection: 'column'
    }}>

      {/* Header */}
      <div style={{ marginBottom: 26, paddingBottom: 18, borderBottom: '1px solid #ececec' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 14 }}>
          <div style={{ flex: 1 }}>
            <h1 style={{
              fontSize: 28, fontWeight: 300, margin: '0 0 5px',
              letterSpacing: 0.5, lineHeight: 1.2, color: '#0a0a0a'
            }}>
              {p.firstName} <span style={{ fontWeight: 600 }}>{p.lastName}</span>
            </h1>
            {p.jobTitle && (
              <p style={{ fontSize: 11, color: '#a8a8a8', margin: '0 0 12px', fontWeight: 500, letterSpacing: 2.5, textTransform: 'uppercase' as const }}>
                {p.jobTitle}
              </p>
            )}
            <div style={{ display: 'flex', gap: 16, fontSize: 9.5, color: '#888', flexWrap: 'wrap' as const }}>
              {p.email && <span>{p.email}</span>}
              {p.phone && <span>{p.phone}</span>}
              {p.city && <span>{p.city}{p.country ? ', ' + p.country : ''}</span>}
              {p.linkedin && <span>{p.linkedin}</span>}
            </div>
          </div>
          {p.photo && (
            <img src={p.photo} alt="photo" style={{
              width: 58, height: 58, borderRadius: '50%',
              objectFit: 'cover', flexShrink: 0
            }} />
          )}
        </div>
      </div>

      {/* Summary */}
      {p.summary && (
        <p style={{ fontSize: 10.5, color: '#374151', lineHeight: 1.8, marginBottom: 20 }}>
          {p.summary}
        </p>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div style={{ marginBottom: 20 }}>
          <SecHead>{lang === 'az' ? 'İş Təcrübəsi' : 'Experience'}</SecHead>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 10 }}>
            {experience.map(exp => (
              <div key={exp.id} style={{ display: 'flex', gap: 14 }}>
                {/* Date */}
                <div style={{ width: 88, fontSize: 9.5, color: '#9ca3af', lineHeight: 1.55, flexShrink: 0, paddingTop: 2 }}>
                  <div>{fmtDate(exp.startMonth, exp.startYear, lang)}</div>
                  <div>{exp.current ? present : fmtDate(exp.endMonth, exp.endYear, lang)}</div>
                </div>
                {/* Content */}
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 11.5, color: '#111', lineHeight: 1.35 }}>{exp.jobTitle}</div>
                  <div style={{ fontSize: 10.5, color: '#6b7280', marginBottom: 5 }}>
                    {exp.company}{exp.city ? ', ' + exp.city : ''}
                  </div>
                  {exp.description && (
                    <div style={{ fontSize: 10, color: '#4b5563', lineHeight: 1.7 }}>
                      {exp.description.split('\n').filter((l: string) => l.trim()).map((line: string, i: number) => (
                        <div key={i} style={{ display: 'flex', gap: 5, marginBottom: 3 }}>
                          <span style={{ flexShrink: 0, color: '#c4c4c4' }}>–</span>
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
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {education.length > 0 && (
            <div>
              <SecHead>{lang === 'az' ? 'Təhsil' : 'Education'}</SecHead>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 8 }}>
                {education.map(edu => (
                  <div key={edu.id}>
                    <div style={{ fontWeight: 700, fontSize: 11, color: '#111', lineHeight: 1.35 }}>
                      {edu.degree || edu.school}
                    </div>
                    {edu.school && edu.degree && <div style={{ fontSize: 10.5, color: '#6b7280' }}>{edu.school}</div>}
                    <div style={{ fontSize: 9.5, color: '#9ca3af', marginTop: 2 }}>
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
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 8 }}>
                {certs.map((c: any, i: number) => (
                  <div key={i} style={{ fontSize: 10 }}>
                    <span style={{ fontWeight: 600 }}>{c.name}</span>
                    {c.issuer && <span style={{ color: '#9ca3af' }}> · {c.issuer}</span>}
                    {c.year && <span style={{ color: '#9ca3af' }}> · {c.year}</span>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {skills.length > 0 && (
            <div>
              <SecHead>{lang === 'az' ? 'Bacarıqlar' : 'Skills'}</SecHead>
              <div style={{ fontSize: 10.5, color: '#374151', lineHeight: 2.1, marginTop: 8 }}>
                {skills.join(' · ')}
              </div>
            </div>
          )}
          {languages.length > 0 && (
            <div>
              <SecHead>{lang === 'az' ? 'Dillər' : 'Languages'}</SecHead>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 5, marginTop: 8 }}>
                {languages.map((l, i) => (
                  <div key={i} style={{ fontSize: 10.5, display: 'flex', justifyContent: 'space-between' }}>
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
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 8 }}>
                {trains.map((tr: any, i: number) => (
                  <div key={i} style={{ fontSize: 10 }}>
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
              <p style={{ fontSize: 10.5, color: '#374151', lineHeight: 1.7, margin: '8px 0 0', whiteSpace: 'pre-line' }}>
                {additional}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
