'use client';
import { CVData } from '@/app/types/cv';

const MONTHS_AZ = ['','Yan','Fev','Mar','Apr','May','İyn','İyl','Avq','Sen','Okt','Noy','Dek'];
const MONTHS_EN = ['','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
function fmtDate(month:string,year:string,lang:'az'|'en'){const arr=lang==='az'?MONTHS_AZ:MONTHS_EN;const m=parseInt(month);if(!year)return'';return`${m&&arr[m]?arr[m]+' ':''}${year}`;}

// SVG contact icon for the header — renders perfectly in html2canvas
function ContactSVG({ type }: { type: 'email'|'phone'|'pin'|'link' }) {
  const s = { width:10, height:10, display:'block' as const };
  if (type==='email')  return <svg {...s} viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/></svg>;
  if (type==='phone')  return <svg {...s} viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="2" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-8.19-8.19 19.79 19.79 0 01-3.07-8.63A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>;
  if (type==='pin')    return <svg {...s} viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>;
  return <svg {...s} viewBox="0 0 24 24" fill="rgba(255,255,255,0.9)"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>;
}

export default function ModernTemplate({ data, lang }: { data: CVData; lang: 'az'|'en' }) {
  const { personal:p, experience, education, skills, languages, additional } = data;
  const certs  = (data as any).certificates || [];
  const trains = (data as any).trainings    || [];
  const present = lang==='az'?'İndiyə qədər':'Present';

  const SecLabel = ({ children }: { children: string }) => (
    <div style={{ fontSize:9.5, fontWeight:800, color:'#6c5ce7', textTransform:'uppercase' as const, letterSpacing:1.5, borderBottom:'2px solid #6c5ce7', paddingBottom:6, marginBottom:12 }}>
      {children}
    </div>
  );

  return (
    <div style={{ fontFamily:'"Inter","Segoe UI",Arial,sans-serif', background:'#fff', color:'#1a1a2e', width:'100%', minHeight:'297mm', fontSize:10.5, display:'flex', flexDirection:'column' }}>

      {/* Header */}
      <div style={{ background:'#6c5ce7', padding:'26px 28px 20px', color:'#fff' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:14 }}>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:24, fontWeight:800, letterSpacing:-0.5, lineHeight:1.2 }}>{p.firstName} {p.lastName}</div>
            {p.jobTitle && <div style={{ fontSize:12, marginTop:4, fontWeight:500, letterSpacing:0.8, color:'rgba(255,255,255,0.9)' }}>{p.jobTitle}</div>}
            {/* SVG icons — no emoji */}
            <div style={{ display:'flex', alignItems:'flex-start', gap:12, marginTop:12, flexWrap:'wrap' as const }}>
              {p.email    && <div style={{ display:'flex', alignItems:'flex-start', gap:4 }}><div style={{ marginTop:1 }}><ContactSVG type="email"/></div><span style={{ fontSize:10, color:'rgba(255,255,255,0.9)' }}>{p.email}</span></div>}
              {p.phone    && <div style={{ display:'flex', alignItems:'flex-start', gap:4 }}><div style={{ marginTop:1 }}><ContactSVG type="phone"/></div><span style={{ fontSize:10, color:'rgba(255,255,255,0.9)' }}>{p.phone}</span></div>}
              {p.city     && <div style={{ display:'flex', alignItems:'flex-start', gap:4 }}><div style={{ marginTop:1 }}><ContactSVG type="pin"/></div><span style={{ fontSize:10, color:'rgba(255,255,255,0.9)' }}>{p.city}{p.country?', '+p.country:''}</span></div>}
              {p.linkedin && <div style={{ display:'flex', alignItems:'flex-start', gap:4 }}><div style={{ marginTop:1 }}><ContactSVG type="link"/></div><span style={{ fontSize:10, color:'rgba(255,255,255,0.9)' }}>{p.linkedin}</span></div>}
            </div>
          </div>
          {p.photo && <img src={p.photo} alt="photo" style={{ width:72, height:72, borderRadius:'50%', objectFit:'cover', border:'3px solid rgba(255,255,255,0.4)', flexShrink:0 }} />}
        </div>
      </div>

      <div style={{ padding:'20px 28px', display:'flex', flexDirection:'column', gap:20, paddingBottom:'20px' }}>
        {p.summary && (
          <div>
            <SecLabel>{lang==='az'?'Özəl':'Summary'}</SecLabel>
            <div style={{ fontSize:10.5, color:'#374151', lineHeight:1.75 }}>{p.summary}</div>
          </div>
        )}

        {experience.length>0 && (
          <div>
            <SecLabel>{lang==='az'?'İş Təcrübəsi':'Work Experience'}</SecLabel>
            <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
              {experience.map(exp => (
                <div key={exp.id} style={{ paddingLeft:12, borderLeft:'2px solid #e0d9ff' }}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:8 }}>
                    <span style={{ fontWeight:700, fontSize:11.5, color:'#1a1a2e', lineHeight:1.35 }}>{exp.jobTitle}</span>
                    <span style={{ fontSize:9.5, color:'#9ca3af', flexShrink:0, fontWeight:500 }}>{fmtDate(exp.startMonth,exp.startYear,lang)} – {exp.current?present:fmtDate(exp.endMonth,exp.endYear,lang)}</span>
                  </div>
                  <div style={{ fontSize:10.5, color:'#6c5ce7', fontWeight:600, marginBottom:4 }}>{exp.company}{exp.city?' · '+exp.city:''}</div>
                  {exp.description && (
                    <div style={{ fontSize:10, color:'#4b5563', lineHeight:1.7 }}>
                      {exp.description.split('\n').filter((l:string)=>l.trim()).map((line:string,i:number) => (
                        <div key={i} style={{ display:'flex', alignItems:'flex-start', gap:5, marginBottom:3 }}>
                          <span style={{ color:'#6c5ce7', flexShrink:0, marginTop:1 }}>•</span>
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
              <SecLabel>{lang==='az'?'Təhsil':'Education'}</SecLabel>
              <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                {education.map(edu => (
                  <div key={edu.id}>
                    <div style={{ fontWeight:700, fontSize:11, lineHeight:1.35 }}>{edu.degree||edu.school}</div>
                    {edu.school&&edu.degree && <div style={{ fontSize:10, color:'#6b7280' }}>{edu.school}</div>}
                    <div style={{ fontSize:9.5, color:'#9ca3af', fontWeight:500 }}>{edu.startYear}{edu.endYear?' – '+edu.endYear:''}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
            {skills.length>0 && (
              <div>
                <SecLabel>{lang==='az'?'Bacarıqlar':'Skills'}</SecLabel>
                <div style={{ display:'flex', flexWrap:'wrap' as const, gap:5, marginTop:4 }}>
                  {skills.map((s,i) => (
                    <div key={i} style={{ fontSize:10, padding:'4px 9px', background:'#f0eeff', color:'#6c5ce7', borderRadius:4, fontWeight:600, display:'block' }}>{s}</div>
                  ))}
                </div>
              </div>
            )}
            {languages.length>0 && (
              <div>
                <SecLabel>{lang==='az'?'Dillər':'Languages'}</SecLabel>
                <div style={{ display:'flex', flexDirection:'column', gap:5 }}>
                  {languages.map((l,i) => (
                    <div key={i} style={{ display:'flex', justifyContent:'space-between', fontSize:10.5 }}>
                      <span style={{ fontWeight:500 }}>{l.name}</span>
                      <span style={{ color:'#9ca3af' }}>{l.level}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {certs.length>0 && (
          <div>
            <SecLabel>{lang==='az'?'Sertifikatlar':'Certificates'}</SecLabel>
            <div style={{ display:'flex', flexDirection:'column', gap:5 }}>
              {certs.map((c:any,i:number) => (
                <div key={i} style={{ display:'flex', justifyContent:'space-between', fontSize:10.5 }}>
                  <div><span style={{ fontWeight:600 }}>{c.name}</span>{c.issuer&&<span style={{ color:'#9ca3af', marginLeft:5 }}>· {c.issuer}</span>}</div>
                  {c.year&&<span style={{ color:'#9ca3af', flexShrink:0, marginLeft:8 }}>{c.year}</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {trains.length>0 && (
          <div>
            <SecLabel>{lang==='az'?'Təlimlər':'Training'}</SecLabel>
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
            <SecLabel>{lang==='az'?'Əlavə':'Additional'}</SecLabel>
            <div style={{ fontSize:10.5, color:'#4b5563', lineHeight:1.7, whiteSpace:'pre-line' }}>{additional}</div>
          </div>
        )}
      </div>
    </div>
  );
}
