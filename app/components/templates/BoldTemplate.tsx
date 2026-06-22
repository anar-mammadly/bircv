'use client';
import { CVData } from '@/app/types/cv';

const MONTHS_AZ = ['','Yan','Fev','Mar','Apr','May','İyn','İyl','Avq','Sen','Okt','Noy','Dek'];
const MONTHS_EN = ['','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
function fmtDate(month:string,year:string,lang:'az'|'en'){const arr=lang==='az'?MONTHS_AZ:MONTHS_EN;const m=parseInt(month);if(!year)return'';return`${m&&arr[m]?arr[m]+' ':''}${year}`;}

export default function BoldTemplate({ data, lang }: { data: CVData; lang: 'az'|'en' }) {
  const { personal:p, experience, education, skills, languages, additional } = data;
  const certs  = (data as any).certificates || [];
  const trains = (data as any).trainings    || [];
  const present = lang==='az'?'İndiyə qədər':'Present';

  const SecHead = ({ children }: { children: string }) => (
    <div style={{ marginBottom:12 }}>
      <div style={{ display:'inline-block', fontFamily:'"Archivo",sans-serif', fontSize:10, fontWeight:900, textTransform:'uppercase' as const, letterSpacing:1.5, background:'#0a0a0a', color:'#fff', padding:'5px 12px', marginBottom:8, transform:'skewX(-6deg)' }}>
        <span style={{ display:'inline-block', transform:'skewX(6deg)' }}>{children}</span>
      </div>
    </div>
  );

  return (
    <div style={{ fontFamily:'"Inter","Segoe UI",Arial,sans-serif', background:'#fff', color:'#0a0a0a', width:'100%', minHeight:'297mm', fontSize:10.5, display:'flex', flexDirection:'column' }}>

      {/* Header */}
      <div style={{ background:'#0a0a0a', padding:'30px 28px 22px', color:'#fff', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', top:0, right:0, width:160, height:'100%', background:'linear-gradient(135deg,transparent 40%,#FFD60A 40%,#FFD60A 44%,transparent 44%)', opacity:0.9 }}/>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:14, position:'relative' }}>
          <div>
            <div style={{ display:'flex', gap:9, alignItems:'flex-end', flexWrap:'wrap' as const, fontFamily:'"Archivo",sans-serif' }}>
              <span style={{ fontSize:30, fontWeight:900, letterSpacing:-1, lineHeight:1.1, textTransform:'uppercase' as const }}>{p.firstName}</span>
              <span style={{ fontSize:30, fontWeight:900, letterSpacing:-1, lineHeight:1.1, textTransform:'uppercase' as const, color:'#FFD60A' }}>{p.lastName}</span>
            </div>
            {p.jobTitle && <div style={{ fontSize:11, fontWeight:700, color:'rgba(255,255,255,0.65)', marginTop:7, textTransform:'uppercase' as const, letterSpacing:1.8, fontFamily:'"Archivo",sans-serif' }}>{p.jobTitle}</div>}
            <div style={{ display:'flex', gap:14, marginTop:10, fontSize:10, color:'rgba(255,255,255,0.55)', flexWrap:'wrap' as const }}>
              {p.email    && <span>{p.email}</span>}
              {p.phone    && <span>{p.phone}</span>}
              {p.city     && <span>{p.city}{p.country?', '+p.country:''}</span>}
              {p.linkedin && <span>{p.linkedin}</span>}
            </div>
          </div>
          {p.photo && <img src={p.photo} alt="photo" style={{ width:66, height:66, borderRadius:'50%', objectFit:'cover', border:'2px solid rgba(255,255,255,0.3)', flexShrink:0 }} />}
        </div>
      </div>

      <div style={{ padding:'20px 28px', display:'flex', flexDirection:'column', gap:20, paddingBottom:'20px' }}>
        {p.summary && (
          <div style={{ fontSize:10.5, color:'#374151', lineHeight:1.75, borderLeft:'4px solid #FFD60A', paddingLeft:12 }}>{p.summary}</div>
        )}

        {experience.length>0 && (
          <div>
            <SecHead>{lang==='az'?'İş Təcrübəsi':'Work Experience'}</SecHead>
            <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
              {experience.map(exp => (
                <div key={exp.id} style={{ borderLeft:'3px solid #FFD60A', paddingLeft:12 }}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:8 }}>
                    <span style={{ fontWeight:800, fontSize:11.5, textTransform:'uppercase' as const, letterSpacing:0.2, lineHeight:1.35, fontFamily:'"Archivo",sans-serif' }}>{exp.jobTitle}</span>
                    <span style={{ fontSize:9.5, color:'#6b7280', fontWeight:500, flexShrink:0 }}>{fmtDate(exp.startMonth,exp.startYear,lang)} – {exp.current?present:fmtDate(exp.endMonth,exp.endYear,lang)}</span>
                  </div>
                  <div style={{ fontSize:10.5, color:'#6b7280', fontWeight:600, marginBottom:4 }}>{exp.company}{exp.city?' · '+exp.city:''}</div>
                  {exp.description && (
                    <div style={{ fontSize:10, color:'#4b5563', lineHeight:1.7 }}>
                      {exp.description.split('\n').filter((l:string)=>l.trim()).map((line:string,i:number) => (
                        <div key={i} style={{ display:'flex', alignItems:'flex-start', gap:5, marginBottom:3 }}>
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

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:22 }}>
          {education.length>0 && (
            <div>
              <SecHead>{lang==='az'?'Təhsil':'Education'}</SecHead>
              <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                {education.map(edu => (
                  <div key={edu.id}>
                    <div style={{ fontWeight:700, fontSize:11, fontFamily:'"Archivo",sans-serif' }}>{edu.degree||edu.school}</div>
                    {edu.school&&edu.degree && <div style={{ fontSize:10.5, color:'#6b7280' }}>{edu.school}</div>}
                    <div style={{ fontSize:9.5, color:'#9ca3af' }}>{edu.startYear}{edu.endYear?' – '+edu.endYear:''}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
            {skills.length>0 && (
              <div>
                <SecHead>{lang==='az'?'Bacarıqlar':'Skills'}</SecHead>
                <div style={{ display:'flex', flexWrap:'wrap' as const, gap:5, marginTop:4 }}>
                  {skills.map((s,i) => <div key={i} style={{ fontSize:10, padding:'4px 9px', background:'#FFD60A', color:'#111', fontWeight:700, borderRadius:2, display:'block' }}>{s}</div>)}
                </div>
              </div>
            )}
            {languages.length>0 && (
              <div>
                <SecHead>{lang==='az'?'Dillər':'Languages'}</SecHead>
                <div style={{ display:'flex', flexDirection:'column', gap:5, marginTop:4 }}>
                  {languages.map((l,i) => (
                    <div key={i} style={{ fontSize:10.5, display:'flex', justifyContent:'space-between' }}>
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
            <div style={{ display:'flex', flexDirection:'column', gap:5 }}>
              {certs.map((c:any,i:number) => (
                <div key={i} style={{ display:'flex', justifyContent:'space-between', fontSize:10.5 }}>
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
            <div style={{ display:'flex', flexDirection:'column', gap:5 }}>
              {trains.map((tr:any,i:number) => (
                <div key={i} style={{ fontSize:10.5 }}>
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
            <div style={{ fontSize:10.5, color:'#374151', lineHeight:1.7, marginTop:4, whiteSpace:'pre-line' }}>{additional}</div>
          </div>
        )}
      </div>
    </div>
  );
}
