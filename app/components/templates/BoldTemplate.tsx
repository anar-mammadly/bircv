'use client';
import { CVData } from '@/app/types/cv';

const MONTHS_AZ = ['','Yan','Fev','Mar','Apr','May','İyn','İyl','Avq','Sen','Okt','Noy','Dek'];
const MONTHS_EN = ['','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
function fmtDate(month:string,year:string,lang:'az'|'en'){const arr=lang==='az'?MONTHS_AZ:MONTHS_EN;const m=parseInt(month);if(!year)return'';return`${m&&arr[m]?arr[m]+' ':''}${year}`;}

export default function BoldTemplate({ data, lang, forPDF }: { data: CVData; lang: 'az'|'en'; forPDF?: boolean }) {
  const { personal:p, experience, education, skills, languages, additional } = data;
  const certs  = (data as any).certificates || [];
  const trains = (data as any).trainings    || [];
  const present = lang==='az'?'İndiyə qədər':'Present';

  const SecHead = ({ children }: { children: string }) => (
    <div style={{ marginBottom:10 }}>
      <div style={{ display:'inline-block', fontSize:9.5, fontWeight:900, textTransform:'uppercase' as const, letterSpacing:1.5, background:'#111', color:'#fff', padding:'3px 10px', marginBottom:8 }}>{children}</div>
    </div>
  );

  return (
    <div style={{ fontFamily:'"Inter","Segoe UI",Arial,sans-serif', background:'#fff', color:'#0a0a0a', width:'100%', height:'100%', overflow:'hidden', fontSize:10 }}>

      {/* Header */}
      <div style={{ background:'#111', padding:'24px 26px 18px', color:'#fff' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:14 }}>
          <div>
            <div style={{ display:'flex', gap:8, alignItems:'flex-end', flexWrap:'wrap' as const }}>
              <span style={{ fontSize:24, fontWeight:900, letterSpacing:-1, lineHeight:1.1, textTransform:'uppercase' as const }}>{p.firstName}</span>
              <span style={{ fontSize:24, fontWeight:900, letterSpacing:-1, lineHeight:1.1, textTransform:'uppercase' as const, color:'#FFD60A' }}>{p.lastName}</span>
            </div>
            {p.jobTitle && <div style={{ fontSize:10.5, fontWeight:600, color:'rgba(255,255,255,0.65)', marginTop:5, textTransform:'uppercase' as const, letterSpacing:1.8 }}>{p.jobTitle}</div>}
            <div style={{ display:'flex', gap:14, marginTop:8, fontSize:9.5, color:'rgba(255,255,255,0.55)', flexWrap:'wrap' as const }}>
              {p.email    && <span>{p.email}</span>}
              {p.phone    && <span>{p.phone}</span>}
              {p.city     && <span>{p.city}{p.country?', '+p.country:''}</span>}
              {p.linkedin && <span>{p.linkedin}</span>}
            </div>
          </div>
          {p.photo && <img src={p.photo} alt="photo" style={{ width:62, height:62, borderRadius:'50%', objectFit:'cover', border:'2px solid rgba(255,255,255,0.3)', flexShrink:0 }} />}
        </div>
      </div>

      <div style={{ padding:'16px 26px', display:'flex', flexDirection:'column', gap:14, overflowY:forPDF?'visible':'auto', height:forPDF?'auto':'calc(100% - 115px)' }}>
        {p.summary && (
          <div style={{ fontSize:10, color:'#374151', lineHeight:1.7, borderLeft:'4px solid #FFD60A', paddingLeft:10 }}>{p.summary}</div>
        )}

        {experience.length>0 && (
          <div>
            <SecHead>{lang==='az'?'İş Təcrübəsi':'Work Experience'}</SecHead>
            <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
              {experience.map(exp => (
                <div key={exp.id} style={{ borderLeft:'3px solid #FFD60A', paddingLeft:10 }}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:8 }}>
                    <span style={{ fontWeight:800, fontSize:11, textTransform:'uppercase' as const, letterSpacing:0.2, lineHeight:1.3 }}>{exp.jobTitle}</span>
                    <span style={{ fontSize:9, color:'#6b7280', fontWeight:500, flexShrink:0 }}>{fmtDate(exp.startMonth,exp.startYear,lang)} – {exp.current?present:fmtDate(exp.endMonth,exp.endYear,lang)}</span>
                  </div>
                  <div style={{ fontSize:10, color:'#6b7280', fontWeight:600, marginBottom:3 }}>{exp.company}{exp.city?' · '+exp.city:''}</div>
                  {exp.description && (
                    <div style={{ fontSize:9.5, color:'#4b5563', lineHeight:1.65 }}>
                      {exp.description.split('\n').filter((l:string)=>l.trim()).map((line:string,i:number) => (
                        <div key={i} style={{ display:'flex', alignItems:'flex-start', gap:5, marginBottom:2 }}>
                          <span style={{ color:'#FFD60A', flexShrink:0, fontWeight:900, marginTop:1 }}>•</span>
                          <span>{line.replace(/^[•\-]\s*/,'')}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:18 }}>
          {education.length>0 && (
            <div>
              <SecHead>{lang==='az'?'Təhsil':'Education'}</SecHead>
              <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                {education.map(edu => (
                  <div key={edu.id}>
                    <div style={{ fontWeight:700, fontSize:10.5 }}>{edu.degree||edu.school}</div>
                    {edu.school&&edu.degree && <div style={{ fontSize:10, color:'#6b7280' }}>{edu.school}</div>}
                    <div style={{ fontSize:9, color:'#9ca3af' }}>{edu.startYear}{edu.endYear?' – '+edu.endYear:''}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
            {skills.length>0 && (
              <div>
                <SecHead>{lang==='az'?'Bacarıqlar':'Skills'}</SecHead>
                <div style={{ display:'flex', flexWrap:'wrap' as const, gap:4, marginTop:4 }}>
                  {skills.map((s,i) => <div key={i} style={{ fontSize:9.5, padding:'3px 8px', background:'#FFD60A', color:'#111', fontWeight:700, borderRadius:2, display:'block' }}>{s}</div>)}
                </div>
              </div>
            )}
            {languages.length>0 && (
              <div>
                <SecHead>{lang==='az'?'Dillər':'Languages'}</SecHead>
                <div style={{ display:'flex', flexDirection:'column', gap:4, marginTop:4 }}>
                  {languages.map((l,i) => (
                    <div key={i} style={{ fontSize:10, display:'flex', justifyContent:'space-between' }}>
                      <span style={{ fontWeight:600 }}>{l.name}</span>
                      <span style={{ color:'#6b7280' }}>{l.level}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {certs.length>0 && (
          <div>
            <SecHead>{lang==='az'?'Sertifikatlar':'Certificates'}</SecHead>
            <div style={{ display:'flex', flexDirection:'column', gap:3 }}>
              {certs.map((c:any,i:number) => (
                <div key={i} style={{ display:'flex', justifyContent:'space-between', fontSize:10 }}>
                  <div><span style={{ fontWeight:600 }}>{c.name}</span>{c.issuer&&<span style={{ color:'#9ca3af' }}> · {c.issuer}</span>}</div>
                  {c.year&&<span style={{ color:'#9ca3af', flexShrink:0, marginLeft:8 }}>{c.year}</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {trains.length>0 && (
          <div>
            <SecHead>{lang==='az'?'Təlimlər':'Training'}</SecHead>
            <div style={{ display:'flex', flexDirection:'column', gap:3 }}>
              {trains.map((tr:any,i:number) => (
                <div key={i} style={{ fontSize:10 }}>
                  <span style={{ fontWeight:600 }}>{tr.name}</span>
                  {tr.provider&&<span style={{ color:'#9ca3af' }}> · {tr.provider}</span>}
                  {tr.year&&<span style={{ color:'#9ca3af' }}> · {tr.year}</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {additional && (
          <div>
            <SecHead>{lang==='az'?'Əlavə':'Additional'}</SecHead>
            <div style={{ fontSize:10, color:'#374151', lineHeight:1.65, marginTop:4, whiteSpace:'pre-line' }}>{additional}</div>
          </div>
        )}
      </div>
    </div>
  );
}
