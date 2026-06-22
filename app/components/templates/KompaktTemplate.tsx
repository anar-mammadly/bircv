'use client';
import { CVData } from '@/app/types/cv';

const MONTHS_AZ = ['','Yan','Fev','Mar','Apr','May','İyn','İyl','Avq','Sen','Okt','Noy','Dek'];
const MONTHS_EN = ['','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
function fmtDate(month:string,year:string,lang:'az'|'en'){const arr=lang==='az'?MONTHS_AZ:MONTHS_EN;const m=parseInt(month);if(!year)return'';return`${m&&arr[m]?arr[m]+' ':''}${year}`;}

export default function KompaktTemplate({ data, lang }: { data: CVData; lang: 'az'|'en' }) {
  const { personal:p, experience, education, skills, languages, additional } = data;
  const certs  = (data as any).certificates || [];
  const trains = (data as any).trainings    || [];
  const present = lang==='az'?'İndiyə qədər':'Present';

  const ACCENT = '#4338CA';

  function SecHead({ children }:{ children:string }) {
    return (
      <div style={{ marginBottom:9, marginTop:2 }}>
        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
          <div style={{ width:7, height:7, borderRadius:2, background:ACCENT, flexShrink:0, transform:'rotate(45deg)' }}/>
          <span style={{ fontSize:11.5, fontWeight:800, color:'#16162c', letterSpacing:0.6, textTransform:'uppercase' as const }}>{children}</span>
        </div>
        <div style={{ height:2, background:`linear-gradient(90deg,${ACCENT},rgba(67,56,202,0.08))`, marginTop:6, borderRadius:1 }}/>
      </div>
    );
  }

  function SideHead({ children }:{ children:string }) {
    return (
      <div style={{ marginBottom:9 }}>
        <div style={{ fontSize:9.5, fontWeight:700, color:ACCENT, letterSpacing:1.4, textTransform:'uppercase' as const }}>{children}</div>
        <div style={{ height:1.5, width:22, background:ACCENT, marginTop:4, borderRadius:1 }}/>
      </div>
    );
  }

  return (
    <div style={{ fontFamily:'"Manrope","Segoe UI",Arial,sans-serif', background:'#fff', width:'100%', display:'flex', color:'#16162c', fontSize:10.5, minHeight:'297mm' }}>

      {/* LEFT SIDEBAR */}
      <div style={{ width:'30%', background:'#f7f7fb', display:'flex', flexDirection:'column', flexShrink:0 }}>
        <div style={{ padding:'24px 16px 16px', display:'flex', flexDirection:'column', alignItems:'center', gap:10 }}>
          <div style={{ width:86, height:86, borderRadius:'50%', overflow:'hidden', flexShrink:0, padding:3, background:`linear-gradient(135deg,${ACCENT},#7C6EF8)` }}>
            <div style={{ width:'100%', height:'100%', borderRadius:'50%', overflow:'hidden', border:'2.5px solid #fff' }}>
              {p.photo
                ? <img src={p.photo} alt="" style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'top', display:'block' }}/>
                : <div style={{ width:'100%', height:'100%', background:'#e2e1f5', display:'flex', alignItems:'center', justifyContent:'center' }}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill={ACCENT}><path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/></svg>
                  </div>}
            </div>
          </div>
        </div>
        <div style={{ padding:'0 18px 24px', display:'flex', flexDirection:'column', gap:0 }}>
          <div style={{ marginBottom:20 }}>
            <SideHead>{lang==='az'?'Əlaqə':'Contact'}</SideHead>
            <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
              {p.phone&&<div><div style={{ fontSize:9, fontWeight:700, color:'#9290ad', textTransform:'uppercase', letterSpacing:0.5 }}>{lang==='az'?'Telefon':'Phone'}</div><div style={{ fontSize:10, color:'#2b2b45', fontWeight:500, lineHeight:1.45 }}>{p.phone}</div></div>}
              {p.email&&<div><div style={{ fontSize:9, fontWeight:700, color:'#9290ad', textTransform:'uppercase', letterSpacing:0.5 }}>Email</div><div style={{ fontSize:10, color:'#2b2b45', fontWeight:500, wordBreak:'break-all', lineHeight:1.45 }}>{p.email}</div></div>}
              {p.city&&<div><div style={{ fontSize:9, fontWeight:700, color:'#9290ad', textTransform:'uppercase', letterSpacing:0.5 }}>{lang==='az'?'Ünvan':'Location'}</div><div style={{ fontSize:10, color:'#2b2b45', fontWeight:500, lineHeight:1.45 }}>{p.city}{p.country?', '+p.country:''}</div></div>}
              {p.linkedin&&<div><div style={{ fontSize:9, fontWeight:700, color:'#9290ad', textTransform:'uppercase', letterSpacing:0.5 }}>LinkedIn</div><div style={{ fontSize:10, color:ACCENT, fontWeight:600, wordBreak:'break-all', lineHeight:1.45 }}>{p.linkedin}</div></div>}
            </div>
          </div>
          {education.length>0&&<div style={{ marginBottom:20 }}><SideHead>{lang==='az'?'Təhsil':'Education'}</SideHead><div style={{ display:'flex', flexDirection:'column', gap:10 }}>{education.map(edu=><div key={edu.id}><div style={{ fontSize:10.5, fontWeight:700, lineHeight:1.4, color:'#16162c' }}>{edu.degree||edu.school}</div>{edu.school&&edu.degree&&<div style={{ fontSize:10, color:'#5b5a73', lineHeight:1.35 }}>{edu.school}</div>}<div style={{ fontSize:9.5, color:'#9290ad', fontWeight:600 }}>{edu.startYear}{edu.endYear?' – '+edu.endYear:''}</div></div>)}</div></div>}
          {skills.length>0&&<div style={{ marginBottom:20 }}><SideHead>{lang==='az'?'Bacarıqlar':'Skills'}</SideHead><div style={{ display:'flex', flexWrap:'wrap' as const, gap:5 }}>{skills.map((s,i)=><div key={i} style={{ fontSize:9.5, color:ACCENT, background:'#eceaf9', padding:'3px 9px', borderRadius:20, fontWeight:600 }}>{s}</div>)}</div></div>}
          {languages.length>0&&<div style={{ marginBottom:20 }}><SideHead>{lang==='az'?'Dillər':'Languages'}</SideHead><div style={{ display:'flex', flexDirection:'column', gap:8 }}>{languages.map((l,i)=><div key={i} style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', fontSize:10.5 }}><span style={{ color:'#2b2b45', fontWeight:500 }}>{l.name}</span>{l.level&&<span style={{ fontSize:9, color:ACCENT, fontWeight:700, background:'#eceaf9', padding:'1px 7px', borderRadius:10 }}>{l.level}</span>}</div>)}</div></div>}
          {trains.length>0&&<div><SideHead>{lang==='az'?'Təlimlər':'Training'}</SideHead><div style={{ display:'flex', flexDirection:'column', gap:8 }}>{trains.map((tr:any,i:number)=><div key={i}><div style={{ fontSize:10.5, fontWeight:700, lineHeight:1.35, color:'#16162c' }}>{tr.name}</div><div style={{ fontSize:10, color:'#5b5a73' }}>{tr.provider}</div>{tr.year&&<div style={{ fontSize:9.5, color:'#9290ad', fontWeight:600 }}>{tr.year}</div>}</div>)}</div></div>}
        </div>
      </div>

      {/* RIGHT MAIN */}
      <div style={{ flex:1, display:'flex', flexDirection:'column' }}>
        <div style={{ padding:'24px 26px 18px', borderBottom:'1px solid #ececf3' }}>
          <div style={{ fontSize:26, fontWeight:800, letterSpacing:-0.5, lineHeight:1.15, color:'#16162c' }}>{p.firstName} {p.lastName}</div>
          {p.jobTitle&&<div style={{ fontSize:12.5, color:ACCENT, fontWeight:700, marginTop:5, letterSpacing:0.2 }}>{p.jobTitle}</div>}
          {p.summary&&<div style={{ fontSize:10.5, color:'#5b5a73', lineHeight:1.75, marginTop:10 }}>{p.summary}</div>}
        </div>
        <div style={{ padding:'20px 26px', display:'flex', flexDirection:'column', gap:22 }}>
          {experience.length>0&&<div><SecHead>{lang==='az'?'Peşəkar Təcrübə':'Professional Experience'}</SecHead><div style={{ display:'flex', flexDirection:'column', gap:15, marginTop:8 }}>{experience.map(exp=><div key={exp.id} style={{ display:'flex', gap:12 }}><div style={{ width:60, flexShrink:0, textAlign:'right' as const }}><div style={{ fontSize:9.5, color:'#9290ad', lineHeight:1.55, fontWeight:600 }}>{exp.startYear}<br/>{exp.current?(lang==='az'?'İndi':'Now'):(exp.endYear||'')}</div></div><div style={{ width:2, background:'#eceaf9', flexShrink:0, borderRadius:1 }}/><div style={{ flex:1 }}><div style={{ fontSize:11.5, fontWeight:700, lineHeight:1.35, color:'#16162c' }}>{exp.jobTitle}</div><div style={{ fontSize:10.5, color:'#5b5a73', fontWeight:500, marginBottom:4 }}>{exp.company}{exp.city?' · '+exp.city:''}{exp.current&&<span style={{ color:ACCENT, fontWeight:700, fontSize:9.5, marginLeft:5 }}>({present})</span>}</div>{exp.description&&<div style={{ fontSize:10, color:'#444', lineHeight:1.7 }}>{exp.description.split('\n').filter((l:string)=>l.trim()).map((line:string,i:number)=><div key={i} style={{ display:'flex', alignItems:'flex-start', gap:5, marginBottom:3 }}><span style={{ flexShrink:0, color:ACCENT, marginTop:1 }}>•</span><span>{line.replace(/^[•\-]\s*/,'')}</span></div>)}</div>}</div></div>)}</div></div>}
          {certs.length>0&&<div><SecHead>{lang==='az'?'Sertifikatlar':'Certificates'}</SecHead><div style={{ display:'flex', flexDirection:'column', gap:6, marginTop:6 }}>{certs.map((c:any,i:number)=><div key={i} style={{ display:'flex', justifyContent:'space-between', fontSize:10.5 }}><div><span style={{ fontWeight:600, color:'#16162c' }}>{c.name}</span>{c.issuer&&<span style={{ color:'#9290ad' }}> · {c.issuer}</span>}</div>{c.year&&<span style={{ color:'#9290ad', flexShrink:0, marginLeft:8, fontWeight:600 }}>{c.year}</span>}</div>)}</div></div>}
          {additional&&<div><SecHead>{lang==='az'?'Əlavə Məlumat':'Additional'}</SecHead><div style={{ fontSize:10.5, color:'#444', lineHeight:1.7, marginTop:6, whiteSpace:'pre-line' }}>{additional}</div></div>}
        </div>
      </div>
    </div>
  );
}
