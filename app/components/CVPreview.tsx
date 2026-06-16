'use client';
import { CVData, TemplateId } from '@/app/types/cv';
import KompaktTemplate from '@/app/components/templates/KompaktTemplate';
import ModernTemplate  from '@/app/components/templates/ModernTemplate';
import MinimalTemplate from '@/app/components/templates/MinimalTemplate';
import BoldTemplate    from '@/app/components/templates/BoldTemplate';

interface CVPreviewProps {
  data: CVData; template: TemplateId; lang: 'az'|'en';
  previewRef?: React.RefObject<HTMLDivElement>; forPDF?: boolean;
}

const MONTHS_AZ = ['','Yan','Fev','Mar','Apr','May','İyn','İyl','Avq','Sen','Okt','Noy','Dek'];
const MONTHS_EN = ['','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
function fmtDate(month:string,year:string,lang:'az'|'en'){
  const arr=lang==='az'?MONTHS_AZ:MONTHS_EN;const m=parseInt(month);
  if(!year)return'';return`${m&&arr[m]?arr[m]+' ':''}${year}`;
}

const BG:Record<string,string>={
  A:'#1d1d1f',B:'#003087',C:'#2196f3',D:'#673ab7',E:'#009688',F:'#1877f2',
  G:'#4285f4',H:'#ff5722',I:'#3f51b5',J:'#e91e63',K:'#c62828',L:'#00897b',
  M:'#1565c0',N:'#e50914',O:'#ff6d00',P:'#0a66c2',Q:'#6d4c41',R:'#d32f2f',
  S:'#1db954',T:'#cc0000',U:'#37474f',V:'#4a148c',W:'#0277bd',X:'#424242',
  Y:'#f57f17',Z:'#00695c',
};

// ── Shared module-level components (no nesting = no SWC parse issues) ─────────

function SvgLogo({ name, size=40 }:{ name:string; size?:number }) {
  const ch = (name||'?').charAt(0).toUpperCase();
  const bg = BG[ch]||'#6366f1';
  const r  = Math.round(size*0.24);
  const fs = Math.round(size*0.44);
  const cx = size/2;
  const cy = size*0.64;
  return (
    <svg width={size} height={size} viewBox={'0 0 '+size+' '+size} style={{flexShrink:0,display:'block'}}>
      <rect width={size} height={size} rx={r} ry={r} fill={bg}/>
      <text x={cx} y={cy} textAnchor="middle" fill="white" fontSize={fs}
        fontWeight="800" fontFamily="Arial,Helvetica,sans-serif">{ch}</text>
    </svg>
  );
}

function BulletDot({ color='#888' }:{ color?:string }) {
  return <div style={{width:4,height:4,borderRadius:'50%',background:color,flexShrink:0,marginTop:4}}/>;
}

function SkillSvg({ text }:{ text:string }) {
  const cw = Math.max(Math.round(text.length*5.9)+24, 44);
  const vb = '0 0 '+cw+' 24';
  return (
    <svg width={cw} height={24} viewBox={vb} style={{display:'block'}}>
      <rect width={cw} height={24} rx={8} ry={8} fill="#ede9fe" stroke="#c4b5fd" strokeWidth={1}/>
      <text x={cw/2} y={15.5} textAnchor="middle" fill="#4338ca"
        fontSize={10} fontWeight="600" fontFamily="Arial,Helvetica,sans-serif">{text}</text>
    </svg>
  );
}

// Contact icon circle with SVG (no emoji)
function CIcon({ type, stroke='#6b7280', fill='#f3f4f6', size=22 }:{
  type:'email'|'phone'|'pin'|'link'; stroke?:string; fill?:string; size?:number;
}) {
  const hs = size/2;
  return (
    <svg width={size} height={size} viewBox={'0 0 '+size+' '+size} style={{display:'block',flexShrink:0}}>
      <circle cx={hs} cy={hs} r={hs} fill={fill}/>
      {type==='email' && (
        <g>
          <rect x={size*0.23} y={size*0.32} width={size*0.55} height={size*0.36} rx={1.5}
            fill="none" stroke={stroke} strokeWidth={1.4}/>
          <path d={'M'+size*0.23+' '+size*0.39+'l'+size*0.27+' '+size*0.18+' '+size*0.27+'-'+size*0.18}
            fill="none" stroke={stroke} strokeWidth={1.4}/>
        </g>
      )}
      {type==='phone' && (
        <path d="M15.2 14.1c-.3-.3-1.1-.7-1.4-.7s-.5.1-.8.4l-.4.4c-.1.1-.3.2-.4.1-.4-.2-1.1-.7-1.7-1.3-.6-.6-1.1-1.3-1.3-1.7-.1-.2 0-.3.1-.4l.4-.4c.3-.3.4-.5.4-.8s-.5-1.1-.7-1.4c-.3-.3-.6-.4-.9-.2-.5.4-1.1.9-1 1.6.1.7.5 1.9 1.9 3.3s2.6 1.8 3.3 1.9c.7.1 1.2-.5 1.6-1 .2-.3.1-.6-.2-.9z"
            fill={stroke}/>
      )}
      {type==='pin' && (
        <g>
          <path d={'M'+hs+' '+(size*0.22)+'a'+(size*0.28)+' '+(size*0.28)+' 0 0 1 '+(size*0.28)+' '+(size*0.28)+'c0 '+(size*0.33)+'-'+(size*0.28)+' '+(size*0.5)+'-'+(size*0.28)+' '+(size*0.5)+'s-'+(size*0.28)+'-'+(size*0.17)+'-'+(size*0.28)+'-'+(size*0.5)+'a'+(size*0.28)+' '+(size*0.28)+' 0 0 1 '+(size*0.28)+'-'+(size*0.28)+'z'}
            fill="none" stroke={stroke} strokeWidth={1.4}/>
          <circle cx={hs} cy={size*0.41} r={size*0.11} fill={stroke}/>
        </g>
      )}
      {type==='link' && (
        <path d={'M'+size*0.37+' '+size*0.59+'a'+size*0.21+' '+size*0.21+' 0 0 0 '+size*0.27+' 0l'+size*0.1+'-'+size*0.1+'a'+size*0.21+' '+size*0.21+' 0 0 0-'+size*0.27+'-'+size*0.27+'l-'+size*0.05+' '+size*0.05+' M'+size*0.63+' '+size*0.41+'a'+size*0.21+' '+size*0.21+' 0 0 0-'+size*0.27+' 0L'+size*0.31+' '+size*0.5+'a'+size*0.21+' '+size*0.21+' 0 0 0 '+size*0.27+' '+size*0.27+'l'+size*0.05+'-'+size*0.05}
          fill="none" stroke={stroke} strokeWidth={1.5} strokeLinecap="round"/>
      )}
    </svg>
  );
}

function langPct(l:string){
  return l.includes('Ana')||l.includes('Native')||l==='C2'?100
    :l==='C1'?84:l==='B2'?68:l==='B1'?52:l==='A2'?36:22;
}

// ── ElegantTemplate ───────────────────────────────────────────────────────────
function ElegantTemplate({data,lang,forPDF}:{data:CVData;lang:'az'|'en';forPDF?:boolean}){
  const{personal:p,experience,education,skills,languages,additional}=data;
  const certs=(data as any).certificates||[];const trains=(data as any).trainings||[];
  const present=lang==='az'?'İndiyə qədər':'Present';
  function ST({c}:{c:string}){return(
    <div style={{fontSize:9,fontWeight:700,textTransform:'uppercase' as const,letterSpacing:2.5,color:'#8a7f6a',borderBottom:'0.5px solid #c8c0a8',paddingBottom:5,marginBottom:10}}>{c}</div>
  );}
  return(
    <div style={{fontFamily:'"Inter","Segoe UI",Arial,sans-serif',background:'#fafaf8',color:'#2d2d2d',width:'100%',height:'100%',overflow:'hidden',fontSize:10}}>
      <div style={{padding:'24px 30px 16px',textAlign:'center',borderBottom:'0.5px solid #c8c0a8',background:'#fff'}}>
        {p.photo&&<img src={p.photo} alt="photo" style={{width:56,height:56,borderRadius:'50%',objectFit:'cover',border:'1px solid #c8c0a8',marginBottom:10}}/>}
        <div style={{fontSize:22,fontWeight:700,letterSpacing:2,textTransform:'uppercase' as const,color:'#1a1a1a',marginBottom:3}}>{p.firstName} {p.lastName}</div>
        {p.jobTitle&&<div style={{fontSize:10,color:'#8a7f6a',letterSpacing:2.5,textTransform:'uppercase' as const,marginBottom:9,fontStyle:'italic'}}>{p.jobTitle}</div>}
        <div style={{display:'flex',justifyContent:'center',gap:16,fontSize:9.5,color:'#8a7f6a',flexWrap:'wrap' as const}}>
          {p.email&&<span>{p.email}</span>}{p.phone&&<span>{p.phone}</span>}
          {p.city&&<span>{p.city}{p.country?', '+p.country:''}</span>}{p.linkedin&&<span>{p.linkedin}</span>}
        </div>
      </div>
      <div style={{padding:'16px 30px',display:'flex',gap:22,overflowY:forPDF?'visible':'auto',height:forPDF?'auto':'calc(100% - 130px)'}}>
        <div style={{width:'34%',borderRight:'0.5px solid #d4cfc0',paddingRight:18,flexShrink:0,display:'flex',flexDirection:'column',gap:14}}>
          {skills.length>0&&(<div><ST c={lang==='az'?'Bacarıqlar':'Skills'}/>{skills.map((s,i)=><div key={i} style={{fontSize:10,color:'#4a4438',borderBottom:'0.5px solid #ede8dc',padding:'4px 0'}}>{s}</div>)}</div>)}
          {languages.length>0&&(<div><ST c={lang==='az'?'Dillər':'Languages'}/>{languages.map((l,i)=><div key={i} style={{fontSize:10,color:'#4a4438',display:'flex',justifyContent:'space-between',borderBottom:'0.5px solid #ede8dc',padding:'4px 0'}}><span style={{fontWeight:600}}>{l.name}</span><span style={{color:'#8a7f6a',fontSize:9}}>{l.level}</span></div>)}</div>)}
          {education.length>0&&(<div><ST c={lang==='az'?'Təhsil':'Education'}/>{education.map(edu=><div key={edu.id} style={{marginBottom:9}}><div style={{fontWeight:600,fontSize:10.5,lineHeight:1.3}}>{edu.degree||edu.school}</div>{edu.school&&edu.degree&&<div style={{fontSize:10,color:'#8a7f6a',fontStyle:'italic'}}>{edu.school}</div>}<div style={{fontSize:9,color:'#a09585'}}>{edu.startYear}{edu.endYear?' – '+edu.endYear:''}</div></div>)}</div>)}
          {trains.length>0&&(<div><ST c={lang==='az'?'Təlimlər':'Training'}/>{trains.map((tr:any,i:number)=><div key={i} style={{marginBottom:7}}><div style={{fontWeight:600,fontSize:10}}>{tr.name}</div><div style={{fontSize:9.5,color:'#8a7f6a'}}>{tr.provider}{tr.year?' · '+tr.year:''}</div></div>)}</div>)}
        </div>
        <div style={{flex:1,display:'flex',flexDirection:'column',gap:14}}>
          {p.summary&&(<div><ST c={lang==='az'?'Haqqımda':'About'}/><div style={{fontSize:10,color:'#4a4438',lineHeight:1.8,fontStyle:'italic'}}>{p.summary}</div></div>)}
          {experience.length>0&&(<div><ST c={lang==='az'?'Karyera':'Career'}/>{experience.map(exp=><div key={exp.id} style={{marginBottom:12}}><div style={{fontWeight:700,fontSize:11,lineHeight:1.3}}>{exp.jobTitle}</div><div style={{fontSize:10,color:'#8a7f6a',display:'flex',justifyContent:'space-between',marginBottom:4,gap:8}}><span style={{fontStyle:'italic'}}>{exp.company}</span><span style={{fontSize:9,flexShrink:0}}>{fmtDate(exp.startMonth,exp.startYear,lang)} – {exp.current?present:fmtDate(exp.endMonth,exp.endYear,lang)}</span></div>{exp.description&&<div style={{fontSize:9.5,color:'#4a4438',lineHeight:1.7}}>{exp.description.split('\n').filter((l:string)=>l.trim()).map((line:string,i:number)=><div key={i} style={{display:'flex',alignItems:'flex-start',gap:5,marginBottom:2}}><span style={{color:'#b8a898',flexShrink:0,marginTop:1}}>•</span><span>{line.replace(/^[•\-]\s*/,'')}</span></div>)}</div>}</div>)}</div>)}
          {certs.length>0&&(<div><ST c={lang==='az'?'Sertifikatlar':'Certificates'}/>{certs.map((c:any,i:number)=><div key={i} style={{display:'flex',justifyContent:'space-between',fontSize:10,marginBottom:3}}><div><span style={{fontWeight:600}}>{c.name}</span>{c.issuer&&<span style={{color:'#8a7f6a'}}> · {c.issuer}</span>}</div>{c.year&&<span style={{color:'#8a7f6a',flexShrink:0,marginLeft:8}}>{c.year}</span>}</div>)}</div>)}
          {additional&&(<div><ST c={lang==='az'?'Əlavə':'Additional'}/><div style={{fontSize:10,color:'#4a4438',lineHeight:1.65,whiteSpace:'pre-line'}}>{additional}</div></div>)}
        </div>
      </div>
    </div>
  );
}

// ── KlassikTemplate ───────────────────────────────────────────────────────────
function KlassikTemplate({data,lang}:{data:CVData;lang:'az'|'en'}){
  const{personal:p,experience,education,skills,languages,additional}=data;
  const certs=(data as any).certificates||[];const trains=(data as any).trainings||[];
  const present=lang==='az'?'İndiyə qədər':'Present';
  function SH({c}:{c:string}){return(
    <div style={{fontSize:10,fontWeight:700,textTransform:'uppercase' as const,letterSpacing:1.5,borderBottom:'1px solid #bbb',paddingBottom:4,marginBottom:10,color:'#222'}}>{c}</div>
  );}
  return(
    <div style={{fontFamily:'"Georgia","Times New Roman",Times,serif',background:'#fff',color:'#111',width:'100%',height:'100%',padding:'26px 30px',overflow:'hidden',fontSize:10}}>
      <div style={{textAlign:'center',borderBottom:'2px solid #111',paddingBottom:12,marginBottom:16}}>
        {p.photo&&<img src={p.photo} alt="photo" style={{width:52,height:52,borderRadius:'50%',objectFit:'cover',float:'right'}}/>}
        <div style={{fontSize:22,fontWeight:700,marginBottom:3,textTransform:'uppercase' as const,letterSpacing:1}}>{p.firstName} {p.lastName}</div>
        {p.jobTitle&&<div style={{fontSize:10.5,color:'#444',marginBottom:7}}>{p.jobTitle}</div>}
        <div style={{fontSize:9.5,color:'#555',display:'flex',justifyContent:'center',gap:14,flexWrap:'wrap' as const}}>
          {p.email&&<span>{p.email}</span>}{p.phone&&<span>{p.phone}</span>}
          {p.city&&<span>{p.city}{p.country?', '+p.country:''}</span>}{p.linkedin&&<span>{p.linkedin}</span>}
        </div>
      </div>
      {p.summary&&<div style={{fontSize:10.5,color:'#333',lineHeight:1.75,marginBottom:14}}>{p.summary}</div>}
      {experience.length>0&&(<div style={{marginBottom:14}}><SH c={lang==='az'?'İş Təcrübəsi':'Work Experience'}/><div style={{display:'flex',flexDirection:'column',gap:11}}>{experience.map(exp=><div key={exp.id}><div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',gap:8}}><span style={{fontSize:11.5,fontWeight:700,lineHeight:1.3}}>{exp.jobTitle}</span><span style={{fontSize:9.5,color:'#555',flexShrink:0}}>{fmtDate(exp.startMonth,exp.startYear,lang)} – {exp.current?present:fmtDate(exp.endMonth,exp.endYear,lang)}</span></div><div style={{fontSize:10.5,color:'#555',fontStyle:'italic',marginBottom:4}}>{exp.company}{exp.city?', '+exp.city:''}</div>{exp.description&&<div style={{fontSize:10,color:'#333',lineHeight:1.65}}>{exp.description.split('\n').filter((l:string)=>l.trim()).map((line:string,i:number)=><div key={i} style={{display:'flex',alignItems:'flex-start',gap:5,marginBottom:2}}><span style={{flexShrink:0,color:'#888',marginTop:1}}>•</span><span>{line.replace(/^[•\-]\s*/,'')}</span></div>)}</div>}</div>)}</div></div>)}
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:18}}>
        <div style={{display:'flex',flexDirection:'column',gap:12}}>
          {education.length>0&&(<div><SH c={lang==='az'?'Təhsil':'Education'}/>{education.map(edu=><div key={edu.id} style={{marginBottom:9}}><div style={{fontWeight:700,fontSize:11}}>{edu.degree||edu.school}</div>{edu.school&&edu.degree&&<div style={{fontSize:10,color:'#555',fontStyle:'italic'}}>{edu.school}</div>}<div style={{fontSize:9.5,color:'#777'}}>{edu.startYear}{edu.endYear?' – '+edu.endYear:''}</div></div>)}</div>)}
          {trains.length>0&&(<div><SH c={lang==='az'?'Təlimlər':'Training'}/>{trains.map((tr:any,i:number)=><div key={i} style={{marginBottom:6,fontSize:10}}><div style={{fontWeight:600}}>{tr.name}</div><div style={{color:'#555',fontStyle:'italic'}}>{tr.provider}{tr.year?' · '+tr.year:''}</div></div>)}</div>)}
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:12}}>
          {skills.length>0&&(<div><SH c={lang==='az'?'Bacarıqlar':'Skills'}/><div style={{fontSize:10,color:'#333',lineHeight:2}}>{skills.join(', ')}</div></div>)}
          {languages.length>0&&(<div><SH c={lang==='az'?'Dillər':'Languages'}/>{languages.map((l,i)=><div key={i} style={{fontSize:10,display:'flex',justifyContent:'space-between',marginBottom:3}}><span>{l.name}</span><span style={{color:'#777'}}>{l.level}</span></div>)}</div>)}
          {certs.length>0&&(<div><SH c={lang==='az'?'Sertifikatlar':'Certificates'}/>{certs.map((c:any,i:number)=><div key={i} style={{display:'flex',justifyContent:'space-between',fontSize:10,marginBottom:3}}><div><span style={{fontWeight:600}}>{c.name}</span>{c.issuer&&<span style={{color:'#777'}}> · {c.issuer}</span>}</div>{c.year&&<span style={{color:'#777',flexShrink:0,marginLeft:8}}>{c.year}</span>}</div>)}</div>)}
          {additional&&(<div><SH c={lang==='az'?'Əlavə':'Additional'}/><div style={{fontSize:10,color:'#333',lineHeight:1.65,whiteSpace:'pre-line'}}>{additional}</div></div>)}
        </div>
      </div>
    </div>
  );
}

// ── ExecutiveTemplate ─────────────────────────────────────────────────────────
function ExecutiveTemplate({data,lang,forPDF}:{data:CVData;lang:'az'|'en';forPDF?:boolean}){
  const{personal:p,experience,education,skills,languages,additional}=data;
  const certs=(data as any).certificates||[];const trains=(data as any).trainings||[];
  const present=lang==='az'?'İndiyə qədər':'Present';
  const ov=forPDF?'visible':'auto';
  function LeftSec({title}:{title:string}){return(
    <div style={{marginBottom:12}}><div style={{fontSize:9,fontWeight:800,color:'#fff',letterSpacing:1.5,textTransform:'uppercase' as const,marginBottom:4}}>{title}</div><div style={{height:1,background:'rgba(255,255,255,0.22)',marginBottom:7}}/></div>
  );}
  function RightSec({title}:{title:string}){return(
    <div style={{display:'flex',alignItems:'flex-start',gap:9,marginBottom:9}}>
      <svg width={20} height={20} viewBox="0 0 20 20" style={{flexShrink:0,marginTop:2}}>
        <circle cx={10} cy={10} r={10} fill="#1e2a3a"/>
        <circle cx={10} cy={10} r={3} fill="white"/>
      </svg>
      <div style={{paddingTop:1}}><div style={{fontSize:11,fontWeight:800,color:'#1e2a3a',letterSpacing:0.2}}>{title}</div><div style={{height:1.5,background:'#1e2a3a',marginTop:3}}/></div>
    </div>
  );}
  return(
    <div style={{fontFamily:'"Inter","Segoe UI",Arial,sans-serif',background:'#fff',width:'100%',height:'100%',display:'flex',overflow:'hidden',fontSize:10}}>
      <div style={{width:'30%',background:'#1e2a3a',display:'flex',flexDirection:'column',overflowY:ov as any,flexShrink:0}}>
        <div style={{padding:'20px 14px 12px',display:'flex',justifyContent:'center'}}>
          <div style={{width:80,height:80,borderRadius:'50%',overflow:'hidden',border:'3px solid rgba(255,255,255,0.25)'}}>
            {p.photo?<img src={p.photo} alt="" style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:'top',display:'block'}}/>
              :<div style={{width:'100%',height:'100%',background:'rgba(255,255,255,0.08)',display:'flex',alignItems:'center',justifyContent:'center'}}><svg width="32" height="32" viewBox="0 0 24 24" fill="rgba(255,255,255,0.4)"><path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/></svg></div>}
          </div>
        </div>
        <div style={{padding:'0 14px 16px',display:'flex',flexDirection:'column',gap:12}}>
          <div><LeftSec title={lang==='az'?'Əlaqə':'Contact'}/>
            <div style={{display:'flex',flexDirection:'column',gap:6}}>
              {p.phone&&<div style={{display:'flex',alignItems:'flex-start',gap:7}}><div style={{marginTop:2}}><CIcon type="phone" fill="transparent" stroke="rgba(255,255,255,0.7)" size={11}/></div><span style={{fontSize:9.5,color:'rgba(255,255,255,0.8)',lineHeight:1.4}}>{p.phone}</span></div>}
              {p.email&&<div style={{display:'flex',alignItems:'flex-start',gap:7}}><div style={{marginTop:2}}><CIcon type="email" fill="transparent" stroke="rgba(255,255,255,0.7)" size={11}/></div><span style={{fontSize:9.5,color:'rgba(255,255,255,0.8)',lineHeight:1.4,wordBreak:'break-all'}}>{p.email}</span></div>}
              {p.city&&<div style={{display:'flex',alignItems:'flex-start',gap:7}}><div style={{marginTop:2}}><CIcon type="pin" fill="transparent" stroke="rgba(255,255,255,0.7)" size={11}/></div><span style={{fontSize:9.5,color:'rgba(255,255,255,0.8)',lineHeight:1.4}}>{p.city}{p.country?', '+p.country:''}</span></div>}
              {p.linkedin&&<div style={{display:'flex',alignItems:'flex-start',gap:7}}><div style={{marginTop:2}}><CIcon type="link" fill="transparent" stroke="rgba(255,255,255,0.7)" size={11}/></div><span style={{fontSize:9.5,color:'rgba(255,255,255,0.8)',lineHeight:1.4,wordBreak:'break-all'}}>{p.linkedin}</span></div>}
            </div>
          </div>
          {skills.length>0&&<div><LeftSec title={lang==='az'?'Bacarıqlar':'Skills'}/><div style={{display:'flex',flexDirection:'column',gap:5}}>{skills.map((s,i)=><div key={i} style={{display:'flex',alignItems:'flex-start',gap:7,fontSize:10,color:'rgba(255,255,255,0.82)'}}><BulletDot color="rgba(255,255,255,0.55)"/>{s}</div>)}</div></div>}
          {languages.length>0&&<div><LeftSec title={lang==='az'?'Dillər':'Languages'}/><div style={{display:'flex',flexDirection:'column',gap:3}}>{languages.map((l,i)=><div key={i} style={{display:'flex',justifyContent:'space-between',fontSize:10,color:'rgba(255,255,255,0.82)'}}><span>{l.name}</span>{l.level&&<span style={{color:'rgba(255,255,255,0.5)',fontSize:9}}>{l.level}</span>}</div>)}</div></div>}
          {trains.length>0&&<div><LeftSec title={lang==='az'?'Təlimlər':'Training'}/><div style={{display:'flex',flexDirection:'column',gap:6}}>{trains.map((tr:any,i:number)=><div key={i}><div style={{fontSize:10,fontWeight:600,color:'rgba(255,255,255,0.88)',lineHeight:1.3}}>{tr.name}</div><div style={{fontSize:9,color:'rgba(255,255,255,0.5)'}}>{tr.provider}{tr.year?' · '+tr.year:''}</div></div>)}</div></div>}
        </div>
      </div>
      <div style={{flex:1,display:'flex',flexDirection:'column',overflowY:ov as any}}>
        <div style={{background:'#1e2a3a',padding:'20px 20px 14px'}}>
          <div style={{fontSize:22,fontWeight:900,color:'#fff',letterSpacing:0.3,textTransform:'uppercase' as const,lineHeight:1.1}}>{p.firstName} {p.lastName}</div>
          {p.jobTitle&&<div style={{fontSize:10.5,color:'rgba(255,255,255,0.65)',marginTop:4,letterSpacing:1.2,textTransform:'uppercase' as const}}>{p.jobTitle}</div>}
        </div>
        <div style={{flex:1,padding:'14px 20px',display:'flex',flexDirection:'column',gap:14}}>
          {p.summary&&<div><RightSec title={lang==='az'?'Profil':'Profile'}/><div style={{fontSize:10,color:'#444',lineHeight:1.7}}>{p.summary}</div></div>}
          {experience.length>0&&<div><RightSec title={lang==='az'?'İş Təcrübəsi':'Work Experience'}/><div style={{display:'flex',flexDirection:'column',gap:9}}>{experience.map(exp=><div key={exp.id} style={{display:'flex',gap:0}}><div style={{display:'flex',flexDirection:'column',alignItems:'center',width:18,flexShrink:0}}><div style={{width:7,height:7,borderRadius:'50%',border:'2px solid #1e2a3a',background:'#fff',flexShrink:0,marginTop:3}}/><div style={{width:1,flex:1,background:'#ddd',marginTop:2}}/></div><div style={{flex:1,paddingBottom:7,paddingLeft:8}}><div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',gap:6}}><div style={{fontSize:11,fontWeight:700,color:'#1e2a3a',lineHeight:1.3}}>{exp.jobTitle}</div><div style={{fontSize:9,color:'#777',flexShrink:0,fontStyle:'italic'}}>{exp.startYear}{exp.endYear||exp.current?' – '+(exp.current?present:exp.endYear):''}</div></div><div style={{fontSize:10,color:'#555',marginBottom:3}}>{exp.company}{exp.city?' · '+exp.city:''}</div>{exp.description&&<div style={{fontSize:9.5,color:'#444',lineHeight:1.65}}>{exp.description.split('\n').filter((l:string)=>l.trim()).map((line:string,i:number)=><div key={i} style={{display:'flex',alignItems:'flex-start',gap:5,marginBottom:2}}><span style={{flexShrink:0,marginTop:1}}>•</span><span>{line.replace(/^[•\-]\s*/,'')}</span></div>)}</div>}</div></div>)}</div></div>}
          {education.length>0&&<div><RightSec title={lang==='az'?'Təhsil':'Education'}/><div style={{display:'flex',flexDirection:'column',gap:7}}>{education.map(edu=><div key={edu.id} style={{display:'flex',gap:0}}><div style={{display:'flex',flexDirection:'column',alignItems:'center',width:18,flexShrink:0}}><div style={{width:7,height:7,borderRadius:'50%',border:'2px solid #1e2a3a',background:'#fff',flexShrink:0,marginTop:3}}/></div><div style={{flex:1,paddingLeft:8}}><div style={{display:'flex',justifyContent:'space-between',gap:6}}><div style={{fontSize:11,fontWeight:700,color:'#1e2a3a',lineHeight:1.3}}>{edu.degree||edu.school}</div><span style={{fontSize:9,color:'#777',fontStyle:'italic',flexShrink:0}}>{edu.startYear}{edu.endYear?' – '+edu.endYear:''}</span></div>{edu.school&&edu.degree&&<div style={{fontSize:10,color:'#555'}}>{edu.school}</div>}</div></div>)}</div></div>}
          {certs.length>0&&(<div><RightSec title={lang==='az'?'Sertifikatlar':'Certificates'}/><div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:6}}>{certs.map((c:any,i:number)=>(<div key={i} style={{background:'rgba(30,42,58,0.04)',border:'1px solid rgba(30,42,58,0.12)',borderRadius:7,padding:'7px 10px'}}><div style={{fontSize:10,fontWeight:700,color:'#1e2a3a',lineHeight:1.35}}>{c.name}</div>{c.issuer&&<div style={{fontSize:8.5,color:'#555',marginTop:2}}>{c.issuer}</div>}{c.year&&<div style={{fontSize:8.5,color:'#999',marginTop:1}}>{c.year}</div>}</div>))}</div></div>)}
          {additional&&<div><RightSec title={lang==='az'?'Əlavə':'Additional'}/><div style={{fontSize:10,color:'#444',lineHeight:1.65,whiteSpace:'pre-line'}}>{additional}</div></div>}
        </div>
      </div>
    </div>
  );
}

// ── HeaderTemplate ────────────────────────────────────────────────────────────
function HeaderTemplate({data,lang,forPDF}:{data:CVData;lang:'az'|'en';forPDF?:boolean}){
  const{personal:p,experience,education,skills,languages,additional}=data;
  const certs=(data as any).certificates||[];const trains=(data as any).trainings||[];
  const present=lang==='az'?'İndiyə qədər':'Present';
  function Sec({title}:{title:string}){return(
    <div style={{marginBottom:7}}><div style={{fontSize:9,fontWeight:800,letterSpacing:1.5,textTransform:'uppercase' as const,color:'#1a1a2e',marginBottom:4}}>{title}</div><div style={{height:1.5,background:'#1a1a2e'}}/></div>
  );}
  return(
    <div style={{fontFamily:'"Inter","Segoe UI",Arial,sans-serif',background:'#fff',width:'100%',height:'100%',display:'flex',flexDirection:'column',overflow:'hidden',fontSize:10,color:'#1a1a2e'}}>
      <div style={{background:'#1a1a2e',padding:'16px 22px',display:'flex',alignItems:'flex-start',gap:16,flexShrink:0}}>
        <div style={{width:68,height:68,borderRadius:'50%',overflow:'hidden',border:'3px solid rgba(255,255,255,0.25)',flexShrink:0}}>
          {p.photo?<img src={p.photo} alt="" style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:'top',display:'block'}}/>
            :<div style={{width:'100%',height:'100%',background:'rgba(255,255,255,0.12)',display:'flex',alignItems:'center',justifyContent:'center'}}><svg width="28" height="28" viewBox="0 0 24 24" fill="rgba(255,255,255,0.45)"><path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/></svg></div>}
        </div>
        <div style={{paddingTop:4}}>
          <div style={{fontSize:22,fontWeight:900,color:'#fff',letterSpacing:-0.3,textTransform:'uppercase' as const,lineHeight:1.1}}>{p.firstName} {p.lastName}</div>
          {p.jobTitle&&<div style={{fontSize:10.5,color:'rgba(255,255,255,0.65)',marginTop:3,letterSpacing:1.2,textTransform:'uppercase' as const}}>{p.jobTitle}</div>}
        </div>
      </div>
      <div style={{background:'#f7f7f7',borderBottom:'1px solid #e5e5e5',padding:'6px 22px',display:'flex',alignItems:'flex-start',gap:14,flexWrap:'wrap' as const,flexShrink:0}}>
        {p.phone&&<div style={{display:'flex',alignItems:'flex-start',gap:4}}><div style={{marginTop:2}}><CIcon type="phone" fill="transparent" stroke="#555" size={10}/></div><span style={{fontSize:9.5,color:'#444'}}>{p.phone}</span></div>}
        {p.email&&<div style={{display:'flex',alignItems:'flex-start',gap:4}}><div style={{marginTop:2}}><CIcon type="email" fill="transparent" stroke="#555" size={10}/></div><span style={{fontSize:9.5,color:'#444'}}>{p.email}</span></div>}
        {p.city&&<div style={{display:'flex',alignItems:'flex-start',gap:4}}><div style={{marginTop:2}}><CIcon type="pin" fill="transparent" stroke="#555" size={10}/></div><span style={{fontSize:9.5,color:'#444'}}>{p.city}{p.country?', '+p.country:''}</span></div>}
        {p.linkedin&&<div style={{display:'flex',alignItems:'flex-start',gap:4}}><div style={{marginTop:2}}><CIcon type="link" fill="transparent" stroke="#1a6ef5" size={10}/></div><span style={{fontSize:9.5,color:'#1a6ef5'}}>{p.linkedin}</span></div>}
      </div>
      <div style={{flex:1,display:'flex',overflowY:forPDF?'visible':'auto'}}>
        <div style={{width:'33%',padding:'13px 14px',borderRight:'1px solid #e5e5e5',display:'flex',flexDirection:'column',gap:13,flexShrink:0}}>
          {p.summary&&<div><Sec title={lang==='az'?'Haqqımda':'About Me'}/><div style={{fontSize:9.5,color:'#444',lineHeight:1.65,marginTop:7}}>{p.summary}</div></div>}
          {education.length>0&&<div><Sec title={lang==='az'?'Təhsil':'Education'}/><div style={{display:'flex',flexDirection:'column',gap:7,marginTop:7}}>{education.map(edu=><div key={edu.id}><div style={{fontSize:10,fontWeight:700,color:'#1a1a2e',lineHeight:1.3}}>{edu.degree||edu.school}</div>{edu.school&&edu.degree&&<div style={{fontSize:9.5,color:'#555',fontStyle:'italic'}}>{edu.school}</div>}<div style={{fontSize:9,color:'#777'}}>{edu.startYear}{edu.endYear?' – '+edu.endYear:''}</div></div>)}</div></div>}
          {skills.length>0&&<div><Sec title={lang==='az'?'Bacarıqlar':'Skills'}/><div style={{display:'flex',flexDirection:'column',gap:5,marginTop:7}}>{skills.map((s,i)=><div key={i} style={{display:'flex',alignItems:'flex-start',gap:7,fontSize:10}}><BulletDot color="#1a1a2e"/>{s}</div>)}</div></div>}
          {languages.length>0&&<div><Sec title={lang==='az'?'Dillər':'Languages'}/><div style={{display:'flex',flexDirection:'column',gap:4,marginTop:7}}>{languages.map((l,i)=><div key={i} style={{display:'flex',justifyContent:'space-between',fontSize:10}}><span>{l.name}</span>{l.level&&<span style={{color:'#777',fontSize:9}}>{l.level}</span>}</div>)}</div></div>}
          {trains.length>0&&<div><Sec title={lang==='az'?'Təlimlər':'Training'}/><div style={{display:'flex',flexDirection:'column',gap:6,marginTop:7}}>{trains.map((tr:any,i:number)=><div key={i}><div style={{fontSize:10,fontWeight:600,color:'#1a1a2e',lineHeight:1.3}}>{tr.name}</div><div style={{fontSize:9,color:'#777'}}>{tr.provider}{tr.year?' · '+tr.year:''}</div></div>)}</div></div>}
        </div>
        <div style={{flex:1,padding:'13px 16px',display:'flex',flexDirection:'column',gap:13}}>
          {experience.length>0&&<div><Sec title={lang==='az'?'İş Təcrübəsi':'Experience'}/><div style={{display:'flex',flexDirection:'column',gap:9,marginTop:7}}>{experience.map(exp=><div key={exp.id} style={{display:'flex',gap:0}}><div style={{display:'flex',flexDirection:'column',alignItems:'center',width:16,flexShrink:0}}><div style={{width:7,height:7,borderRadius:'50%',border:'2px solid #1a1a2e',background:'#fff',flexShrink:0,marginTop:3}}/><div style={{width:1,flex:1,background:'#ddd',marginTop:2}}/></div><div style={{flex:1,paddingLeft:7,paddingBottom:7}}><div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',gap:6}}><div style={{fontSize:11,fontWeight:700,color:'#1a1a2e',lineHeight:1.3}}>{exp.jobTitle}</div><div style={{fontSize:9,color:'#777',fontStyle:'italic',flexShrink:0}}>{exp.startYear}{exp.endYear||exp.current?' – '+(exp.current?present:exp.endYear):''}</div></div><div style={{fontSize:10,color:'#555',marginBottom:3}}>{exp.company}{exp.city?' · '+exp.city:''}</div>{exp.description&&<div style={{fontSize:9.5,color:'#444',lineHeight:1.65}}>{exp.description.split('\n').filter((l:string)=>l.trim()).map((line:string,i:number)=><div key={i} style={{display:'flex',alignItems:'flex-start',gap:5,marginBottom:2}}><span style={{flexShrink:0,marginTop:1}}>•</span><span>{line.replace(/^[•\-]\s*/,'')}</span></div>)}</div>}</div></div>)}</div></div>}
          {certs.length>0&&<div><Sec title={lang==='az'?'Sertifikatlar':'Certificates'}/><div style={{display:'flex',flexDirection:'column',gap:4,marginTop:7}}>{certs.map((c:any,i:number)=><div key={i} style={{display:'flex',justifyContent:'space-between',fontSize:10}}><div><span style={{fontWeight:600}}>{c.name}</span>{c.issuer&&<span style={{color:'#777'}}> · {c.issuer}</span>}</div>{c.year&&<span style={{color:'#777',flexShrink:0,marginLeft:8}}>{c.year}</span>}</div>)}</div></div>}
          {additional&&<div><Sec title={lang==='az'?'Əlavə':'Additional'}/><div style={{fontSize:10,color:'#444',lineHeight:1.65,marginTop:7,whiteSpace:'pre-line'}}>{additional}</div></div>}
        </div>
      </div>
    </div>
  );
}

// ── DesignerTemplate ──────────────────────────────────────────────────────────
function DesignerTemplate({data,lang,forPDF}:{data:CVData;lang:'az'|'en';forPDF?:boolean}){
  const{personal:p,experience,education,skills,languages,additional}=data;
  const certs=(data as any).certificates||[];const trains=(data as any).trainings||[];

  function SecT({children}:{children:string}){return(
    <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:12}}>
      <span style={{fontSize:14,fontWeight:800,color:'#1e1b4b',letterSpacing:-0.2,whiteSpace:'nowrap' as const}}>{children}</span>
      <div style={{flex:1,height:1.5,background:'#e0e7ff'}}/>
    </div>
  );}

  const contactItems = [
    p.email    ? {l:'Email',v:p.email,t:'email' as const}    : null,
    p.linkedin ? {l:'LinkedIn',v:p.linkedin,t:'link' as const} : null,
    p.phone    ? {l:lang==='az'?'Telefon':'Phone',v:p.phone,t:'phone' as const} : null,
    p.city     ? {l:lang==='az'?'Şəhər':'Location',v:p.city+(p.country?', '+p.country:''),t:'pin' as const} : null,
  ].filter((x):x is {l:string;v:string;t:'email'|'link'|'phone'|'pin'} => x!==null);

  return(
    <div style={{fontFamily:'"Inter","Segoe UI",Arial,sans-serif',background:'#f8fafc',width:'100%',height:'100%',display:'flex',overflow:'hidden',fontSize:10}}>
      <div style={{width:'29%',flexShrink:0,background:'#f0fdfa',borderRight:'1px solid #f1f5f9',display:'flex',flexDirection:'column',overflowY:forPDF?'visible':'auto'}}>
        <div style={{position:'relative',width:'100%',paddingBottom:'100%',flexShrink:0}}>
          <div style={{position:'absolute',bottom:0,right:0,width:'86%',height:'86%',background:'#4f46e5',borderRadius:12,zIndex:0}}/>
          <div style={{position:'absolute',top:0,left:0,width:'86%',height:'86%',borderRadius:12,overflow:'hidden',border:'2.5px solid #fff',zIndex:1}}>
            {p.photo?<img src={p.photo} alt="" style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:'top center',display:'block'}}/>
              :<div style={{width:'100%',height:'100%',background:'#ddd6fe',display:'flex',alignItems:'center',justifyContent:'center'}}><svg width="36" height="36" viewBox="0 0 24 24" fill="rgba(124,58,237,0.3)"><path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/></svg></div>}
          </div>
        </div>
        <div style={{padding:'12px 14px 16px',display:'flex',flexDirection:'column',gap:10}}>
          <div style={{textAlign:'center'}}>
            <div style={{fontSize:16,fontWeight:800,color:'#111827',marginBottom:2,lineHeight:1.2}}>{p.firstName} {p.lastName}</div>
            <div style={{fontSize:10,fontWeight:700,color:'#4f46e5'}}>{p.jobTitle}</div>
          </div>
          {p.summary&&<div style={{padding:'6px 9px',background:'rgba(79,70,229,0.04)',borderRadius:6,borderLeft:'2px solid #c7d2fe'}}><div style={{fontSize:9,color:'#4b5563',fontStyle:'italic',lineHeight:1.55}}>{p.summary}</div></div>}
          <div style={{height:1,background:'#e5e7eb'}}/>
          <div style={{display:'flex',flexDirection:'column',gap:7}}>
            {contactItems.map((item,i)=>(
              <div key={i} style={{display:'flex',alignItems:'flex-start',gap:7}}>
                <div style={{marginTop:2}}><CIcon type={item.t} fill="#f3f4f6" stroke="#6b7280" size={22}/></div>
                <div style={{paddingTop:2}}>
                  <div style={{fontSize:8,color:'#9ca3af',fontWeight:700,textTransform:'uppercase' as const,letterSpacing:0.5,marginBottom:1}}>{item.l}</div>
                  <div style={{fontSize:9,color:'#374151',fontWeight:500,wordBreak:'break-all' as const,lineHeight:1.3}}>{item.v}</div>
                </div>
              </div>
            ))}
          </div>
          {languages.length>0&&(
            <div>
              <div style={{height:1,background:'#e5e7eb',marginBottom:10}}/>
              <div style={{fontSize:8,color:'#9ca3af',fontWeight:700,textTransform:'uppercase' as const,letterSpacing:1,marginBottom:8}}>{lang==='az'?'Dillər':'Languages'}</div>
              <div style={{display:'flex',flexDirection:'column',gap:8}}>
                {languages.map((l,i)=>(
                  <div key={i}>
                    <div style={{display:'flex',justifyContent:'space-between',marginBottom:5}}>
                      <span style={{fontSize:10,fontWeight:600,color:'#1f2937'}}>{l.name}</span>
                      <span style={{fontSize:9,color:'#9ca3af'}}>{l.level}</span>
                    </div>
                    <div style={{height:4,background:'#e0e7ff',borderRadius:2,overflow:'hidden'}}>
                      <div style={{height:4,width:langPct(l.level)+'%',background:'#4f46e5',borderRadius:2}}/>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {trains.length>0&&(
            <div>
              <div style={{height:1,background:'#e5e7eb',marginBottom:10}}/>
              <div style={{fontSize:8,color:'#9ca3af',fontWeight:700,textTransform:'uppercase' as const,letterSpacing:1,marginBottom:8}}>{lang==='az'?'Təlimlər':'Training'}</div>
              <div style={{display:'flex',flexDirection:'column',gap:8}}>
                {trains.map((tr:any,i:number)=>(
                  <div key={i} style={{display:'flex',alignItems:'flex-start',gap:7}}>
                    <div style={{width:26,height:26,borderRadius:6,background:'#6366f1',flexShrink:0,display:'flex',alignItems:'center',justifyContent:'center'}}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="#fff"><path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z"/></svg>
                    </div>
                    <div style={{paddingTop:2}}>
                      <div style={{fontSize:10,fontWeight:700,color:'#1e1b4b',lineHeight:1.3}}>{tr.name}</div>
                      <div style={{fontSize:9,color:'#6366f1',fontWeight:600}}>{tr.provider}{tr.year?' · '+tr.year:''}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <div style={{flex:1,overflowY:forPDF?'visible':'auto',background:'#fff'}}>
        <div style={{padding:'14px 16px',display:'flex',flexDirection:'column',gap:16}}>
          {experience.length>0&&(
            <section>
              <SecT>{lang==='az'?'İş Təcrübəsi':'Experience'}</SecT>
              <div style={{display:'flex',flexDirection:'column',gap:6}}>
                {experience.map((exp,idx)=>(
                  <div key={exp.id} style={{background:idx===0?'#f8faff':'#fafafa',borderRadius:12,padding:'9px 12px',border:idx===0?'1px solid #e0e7ff':'1px solid #f3f4f6'}}>
                    <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',gap:9}}>
                      <div style={{display:'flex',alignItems:'flex-start',gap:9}}>
                        <SvgLogo name={exp.company} size={40}/>
                        <div style={{paddingTop:2}}>
                          <div style={{fontSize:9.5,color:'#9ca3af',fontWeight:500,marginBottom:2,lineHeight:1.2}}>{exp.jobTitle}</div>
                          <div style={{fontSize:12,fontWeight:700,color:'#1e1b4b',lineHeight:1.2,marginBottom:3}}>{exp.company}</div>
                          {exp.description&&<div style={{fontSize:9,color:'#6b7280',lineHeight:1.5}}>{exp.description.split('\n').filter((l:string)=>l.trim()).slice(0,2).map((line:string,i:number)=><div key={i} style={{display:'flex',alignItems:'flex-start',gap:4,marginBottom:1}}><span style={{color:'#a5b4fc',flexShrink:0,lineHeight:1.5}}>•</span><span>{line.replace(/^[•\-]\s*/,'')}</span></div>)}</div>}
                        </div>
                      </div>
                      <div style={{textAlign:'right' as const,flexShrink:0,paddingTop:2}}>
                        {exp.current?<div style={{fontSize:9,color:'#7c3aed',fontWeight:700,background:'#f5f3ff',padding:'2px 8px',borderRadius:20,marginBottom:3,display:'inline-block'}}>{lang==='az'?'İndi':'Now'}</div>:<div style={{fontSize:9,color:'#6b7280',fontWeight:500,marginBottom:3}}>{fmtDate(exp.startMonth,exp.startYear,lang)} – {fmtDate(exp.endMonth,exp.endYear,lang)}</div>}
                        {exp.city&&<div style={{fontSize:8.5,color:'#9ca3af'}}>{exp.city}</div>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
          {skills.length>0&&(
            <section>
              <SecT>{lang==='az'?'Bacarıqlar':'Skills'}</SecT>
              <div style={{display:'flex',flexWrap:'wrap' as const,gap:5}}>
                {skills.map((s,i)=><SkillSvg key={i} text={s}/>)}
              </div>
            </section>
          )}
          {education.length>0&&(
            <section>
              <SecT>{lang==='az'?'Təhsil':'Education'}</SecT>
              <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:6}}>
                {education.map(edu=>(
                  <div key={edu.id} style={{background:'#f9fafb',borderRadius:12,padding:'10px',border:'1px solid #f3f4f6'}}>
                    <div style={{display:'flex',alignItems:'flex-start',gap:6,marginBottom:8}}>
                      <SvgLogo name={edu.school} size={32}/>
                      <div style={{paddingTop:7,fontSize:9,fontWeight:700,color:'#374151',lineHeight:1.2}}>{edu.school}</div>
                    </div>
                    <div style={{fontSize:10,fontWeight:700,color:'#1e1b4b',lineHeight:1.3,marginBottom:2}}>{edu.degree||'—'}</div>
                    <div style={{fontSize:9,color:'#9ca3af'}}>{edu.startYear}{edu.endYear?' – '+edu.endYear:''}</div>
                  </div>
                ))}
              </div>
            </section>
          )}
          {certs.length>0&&(
            <section>
              <SecT>{lang==='az'?'Sertifikatlar':'Certificates'}</SecT>
              <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:6}}>
                {certs.map((c:any,i:number)=>(
                  <div key={i} style={{background:'#fffbeb',borderRadius:12,padding:'10px',border:'1px solid #fef3c7'}}>
                    <div style={{display:'flex',alignItems:'flex-start',gap:6,marginBottom:8}}>
                      <SvgLogo name={c.issuer||c.name} size={32}/>
                      <div style={{paddingTop:7,fontSize:9,fontWeight:700,color:'#374151',lineHeight:1.2}}>{c.issuer}</div>
                    </div>
                    <div style={{fontSize:10,fontWeight:700,color:'#1e1b4b',lineHeight:1.3,marginBottom:2}}>{c.name}</div>
                    <div style={{fontSize:9,color:'#9ca3af'}}>{c.year}</div>
                  </div>
                ))}
              </div>
            </section>
          )}
          {additional&&(
            <section>
              <SecT>{lang==='az'?'Əlavə':'Additional'}</SecT>
              <div style={{fontSize:10,color:'#6b7280',lineHeight:1.7,whiteSpace:'pre-line' as const}}>{additional}</div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────
export default function CVPreview({ data, template, lang, previewRef, forPDF }: CVPreviewProps) {
  const renderTemplate = () => {
    switch (template) {
      case 'kompakt':   return <KompaktTemplate  data={data} lang={lang} forPDF={forPDF} />;
      case 'modern':    return <ModernTemplate   data={data} lang={lang} forPDF={forPDF} />;
      case 'minimal':   return <MinimalTemplate  data={data} lang={lang} />;
      case 'bold':      return <BoldTemplate     data={data} lang={lang} forPDF={forPDF} />;
      case 'elegant':   return <ElegantTemplate  data={data} lang={lang} forPDF={forPDF} />;
      case 'klassik':   return <KlassikTemplate  data={data} lang={lang} />;
      case 'designer':  return <DesignerTemplate data={data} lang={lang} forPDF={forPDF} />;
      case 'executive': return <ExecutiveTemplate data={data} lang={lang} forPDF={forPDF} />;
      case 'header':    return <HeaderTemplate   data={data} lang={lang} forPDF={forPDF} />;
      default:          return <KompaktTemplate  data={data} lang={lang} forPDF={forPDF} />;
    }
  };
  return (
    <div ref={previewRef} style={{ width: '100%', aspectRatio: '210/297', background: '#fff', borderRadius: 4, overflow: 'hidden', boxShadow: '0 4px 24px rgba(0,0,0,0.15)' }}>
      {renderTemplate()}
    </div>
  );
}
