'use client';
import { CVData } from '@/app/types/cv';

const MONTHS_AZ = ['','Yan','Fev','Mar','Apr','May','İyn','İyl','Avq','Sen','Okt','Noy','Dek'];
const MONTHS_EN = ['','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
function fmtDate(month:string,year:string,lang:'az'|'en'){const arr=lang==='az'?MONTHS_AZ:MONTHS_EN;const m=parseInt(month);if(!year)return'';return`${m&&arr[m]?arr[m]+' ':''}${year}`;}

export default function KompaktTemplate({ data, lang, forPDF }: { data: CVData; lang: 'az'|'en'; forPDF?: boolean }) {
  const { personal:p, experience, education, skills, languages, additional } = data;
  const certs  = (data as any).certificates || [];
  const trains = (data as any).trainings    || [];
  const present = lang==='az'?'İndiyə qədər':'Present';
  const ov = forPDF ? 'visible' : 'auto';

  // SVG section header icon — no flex centering needed
  const SecHead = ({ children }: { children: string }) => (
    <div style={{ marginBottom: 8, marginTop: 2 }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 7 }}>
        <svg width="16" height="16" viewBox="0 0 16 16" style={{ flexShrink:0, marginTop:1 }}>
          <rect width="16" height="16" rx="3" fill="#1a1a2e"/>
          <circle cx="8" cy="8" r="2.5" fill="white"/>
        </svg>
        <span style={{ fontSize:11, fontWeight:800, color:'#1a1a2e', letterSpacing:0.8, textTransform:'uppercase' as const }}>{children}</span>
      </div>
      <div style={{ height:1.5, background:'#1a1a2e', marginTop:5 }} />
    </div>
  );

  const SideHead = ({ children }: { children: string }) => (
    <div style={{ background:'#1a1a2e', padding:'4px 10px', borderRadius:3, marginBottom:8 }}>
      <div style={{ fontSize:9.5, fontWeight:700, color:'#fff', letterSpacing:1, textTransform:'uppercase' as const }}>{children}</div>
    </div>
  );

  // Bullet dot with marginTop instead of alignItems:center
  const Dot = ({ color='#1a1a2e' }: { color?:string }) => (
    <div style={{ width:4, height:4, borderRadius:'50%', background:color, flexShrink:0, marginTop:4 }} />
  );

  return (
    <div style={{ fontFamily:'"Inter","Segoe UI",Arial,sans-serif', background:'#fff', width:'100%', height:'100%', display:'flex', overflow:'hidden', color:'#1a1a2e', fontSize:10 }}>

      {/* LEFT SIDEBAR */}
      <div style={{ width:'30%', background:'#f4f4f7', display:'flex', flexDirection:'column', overflowY:ov as any, flexShrink:0 }}>
        <div style={{ padding:'20px 14px 12px', display:'flex', flexDirection:'column', alignItems:'center', gap:8 }}>
          <div style={{ width:80, height:80, borderRadius:'50%', overflow:'hidden', border:'3px solid #fff', flexShrink:0 }}>
            {p.photo
              ? <img src={p.photo} alt="" style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'top', display:'block' }} />
              : <div style={{ width:'100%', height:'100%', background:'#d0d0d8', display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="#888"><path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/></svg>
                </div>
            }
          </div>
        </div>

        <div style={{ padding:'0 14px 18px', display:'flex', flexDirection:'column', gap:0 }}>
          {/* Contact */}
          <div style={{ marginBottom:14 }}>
            <SideHead>{lang==='az'?'Əlaqə':'Contact'}</SideHead>
            <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
              {p.phone   && <div><div style={{ fontSize:8.5, fontWeight:700, color:'#1a1a2e', textTransform:'uppercase', letterSpacing:0.5 }}>{lang==='az'?'Telefon':'Phone'}</div><div style={{ fontSize:9.5, color:'#444', lineHeight:1.4 }}>{p.phone}</div></div>}
              {p.email   && <div><div style={{ fontSize:8.5, fontWeight:700, color:'#1a1a2e', textTransform:'uppercase', letterSpacing:0.5 }}>Email</div><div style={{ fontSize:9.5, color:'#444', wordBreak:'break-all', lineHeight:1.4 }}>{p.email}</div></div>}
              {p.city    && <div><div style={{ fontSize:8.5, fontWeight:700, color:'#1a1a2e', textTransform:'uppercase', letterSpacing:0.5 }}>{lang==='az'?'Ünvan':'Location'}</div><div style={{ fontSize:9.5, color:'#444', lineHeight:1.4 }}>{p.city}{p.country?', '+p.country:''}</div></div>}
              {p.linkedin && <div><div style={{ fontSize:8.5, fontWeight:700, color:'#1a1a2e', textTransform:'uppercase', letterSpacing:0.5 }}>LinkedIn</div><div style={{ fontSize:9.5, color:'#1a6ef5', wordBreak:'break-all', lineHeight:1.4 }}>{p.linkedin}</div></div>}
            </div>
          </div>

          {/* Education */}
          {education.length>0 && (
            <div style={{ marginBottom:14 }}>
              <SideHead>{lang==='az'?'Təhsil':'Education'}</SideHead>
              <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                {education.map(edu => (
                  <div key={edu.id}>
                    <div style={{ fontSize:10, fontWeight:700, color:'#1a1a2e', lineHeight:1.35 }}>{edu.degree||edu.school}</div>
                    {edu.school&&edu.degree && <div style={{ fontSize:9.5, color:'#555', lineHeight:1.3 }}>{edu.school}</div>}
                    <div style={{ fontSize:9, color:'#777' }}>{edu.startYear}{edu.endYear?` – ${edu.endYear}`:''}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills — Dot with marginTop */}
          {skills.length>0 && (
            <div style={{ marginBottom:14 }}>
              <SideHead>{lang==='az'?'Bacarıqlar':'Skills'}</SideHead>
              <div style={{ display:'flex', flexDirection:'column', gap:5 }}>
                {skills.map((s,i) => (
                  <div key={i} style={{ display:'flex', alignItems:'flex-start', gap:7, fontSize:10, color:'#333' }}>
                    <Dot />{s}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {languages.length>0 && (
            <div style={{ marginBottom:14 }}>
              <SideHead>{lang==='az'?'Dillər':'Languages'}</SideHead>
              <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
                {languages.map((l,i) => (
                  <div key={i} style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', fontSize:10 }}>
                    <div style={{ display:'flex', alignItems:'flex-start', gap:6 }}>
                      <Dot /><span style={{ color:'#333' }}>{l.name}</span>
                    </div>
                    {l.level && <span style={{ fontSize:9, color:'#777', fontWeight:600, paddingTop:1 }}>{l.level}</span>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Trainings */}
          {trains.length>0 && (
            <div>
              <SideHead>{lang==='az'?'Təlimlər':'Training'}</SideHead>
              <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
                {trains.map((tr:any,i:number) => (
                  <div key={i}>
                    <div style={{ fontSize:10, fontWeight:700, color:'#1a1a2e', lineHeight:1.3 }}>{tr.name}</div>
                    <div style={{ fontSize:9.5, color:'#555' }}>{tr.provider}</div>
                    {tr.year && <div style={{ fontSize:9, color:'#777' }}>{tr.year}</div>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* RIGHT MAIN */}
      <div style={{ flex:1, display:'flex', flexDirection:'column', overflowY:ov as any }}>
        <div style={{ padding:'20px 20px 14px', borderBottom:'2px solid #f0f0f4' }}>
          <div style={{ fontSize:22, fontWeight:800, color:'#1a1a2e', letterSpacing:-0.3, lineHeight:1.1, textTransform:'uppercase' as const }}>
            {p.firstName} {p.lastName}
          </div>
          {p.jobTitle && <div style={{ fontSize:11.5, color:'#555', fontWeight:500, marginTop:4, letterSpacing:0.3 }}>{p.jobTitle}</div>}
          {p.summary  && <div style={{ fontSize:10, color:'#555', lineHeight:1.7, marginTop:8 }}>{p.summary}</div>}
        </div>

        <div style={{ flex:1, padding:'14px 20px', display:'flex', flexDirection:'column', gap:14 }}>
          {/* Experience */}
          {experience.length>0 && (
            <div>
              <SecHead>{lang==='az'?'Peşəkar Təcrübə':'Professional Experience'}</SecHead>
              <div style={{ display:'flex', flexDirection:'column', gap:10, marginTop:6 }}>
                {experience.map(exp => (
                  <div key={exp.id} style={{ display:'flex', gap:10 }}>
                    <div style={{ width:56, flexShrink:0, textAlign:'right' as const }}>
                      <div style={{ fontSize:9, color:'#666', lineHeight:1.5, fontWeight:500 }}>
                        {exp.startYear}<br />{exp.current?(lang==='az'?'İndi':'Now'):(exp.endYear||'')}
                      </div>
                    </div>
                    <div style={{ width:1.5, background:'#d0d0d8', flexShrink:0, borderRadius:1 }} />
                    <div style={{ flex:1 }}>
                      <div style={{ fontSize:11, fontWeight:700, color:'#1a1a2e', lineHeight:1.3 }}>{exp.jobTitle}</div>
                      <div style={{ fontSize:10, color:'#555', marginBottom:3 }}>
                        {exp.company}{exp.city?' · '+exp.city:''}
                        {exp.current && <span style={{ color:'#1a6ef5', fontWeight:600, fontSize:9, marginLeft:5 }}>({present})</span>}
                      </div>
                      {exp.description && (
                        <div style={{ fontSize:9.5, color:'#444', lineHeight:1.65 }}>
                          {exp.description.split('\n').filter((l:string)=>l.trim()).map((line:string,i:number) => (
                            <div key={i} style={{ display:'flex', alignItems:'flex-start', gap:5, marginBottom:2 }}>
                              <span style={{ flexShrink:0, color:'#888', marginTop:1 }}>•</span>
                              <span>{line.replace(/^[•\-]\s*/,'')}</span>
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

          {/* Certificates */}
          {certs.length>0 && (
            <div>
              <SecHead>{lang==='az'?'Sertifikatlar':'Certificates'}</SecHead>
              <div style={{ display:'flex', flexDirection:'column', gap:4, marginTop:5 }}>
                {certs.map((cert:any,i:number) => (
                  <div key={i} style={{ display:'flex', justifyContent:'space-between', fontSize:10 }}>
                    <div>
                      <span style={{ fontWeight:600, color:'#1a1a2e' }}>{cert.name}</span>
                      {cert.issuer && <span style={{ color:'#777', marginLeft:5 }}>· {cert.issuer}</span>}
                    </div>
                    {cert.year && <span style={{ color:'#777', flexShrink:0, marginLeft:8 }}>{cert.year}</span>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Additional */}
          {additional && (
            <div>
              <SecHead>{lang==='az'?'Əlavə Məlumat':'Additional'}</SecHead>
              <div style={{ fontSize:10, color:'#444', lineHeight:1.65, marginTop:5, whiteSpace:'pre-line' }}>{additional}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
