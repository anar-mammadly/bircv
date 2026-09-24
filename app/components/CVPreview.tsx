'use client';
import { CVData, TemplateId } from '@/app/types/cv';
import { ExtraSections } from '@/app/components/templates/shared';
import HeaderTemplate  from '@/app/components/templates/HeaderTemplate';
import DesignerTemplate from '@/app/components/templates/DesignerTemplate';
import KompaktTemplate from '@/app/components/templates/KompaktTemplate';
import ModernTemplate  from '@/app/components/templates/ModernTemplate';
import MinimalTemplate from '@/app/components/templates/MinimalTemplate';
import BoldTemplate    from '@/app/components/templates/BoldTemplate';
import EditorialTemplate from '@/app/components/templates/EditorialTemplate';
import CorporateTemplate from '@/app/components/templates/CorporateTemplate';
import SwissTemplate    from '@/app/components/templates/SwissTemplate';
import CreativeTemplate from '@/app/components/templates/CreativeTemplate';
import TechTemplate     from '@/app/components/templates/TechTemplate';
import SidebarTemplate  from '@/app/components/templates/SidebarTemplate';


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

// Inline bullet helper — no div, no flex offset needed
function Bul({color='#888',text,style={}}:{color?:string;text?:string;style?:any}){
  return(
    <div style={{fontSize:10,lineHeight:'15px',marginBottom:3,...style}}>
      <span style={{marginRight:6,color,fontWeight:700}}>•</span>{text}
    </div>
  );
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
  const BRONZE = '#9C6B3E';
  function ST({c}:{c:string}){return(
    <div style={{fontFamily:'"Playfair Display",serif',fontSize:10,fontWeight:600,fontStyle:'italic' as const,letterSpacing:1,color:BRONZE,borderBottom:'0.5px solid #d9c3a3',paddingBottom:6,marginBottom:11}}>{c}</div>
  );}
  return(
    <div style={{fontFamily:'"Lora",serif',background:'#fdfbf8',color:'#2d2823',width:'100%',minHeight:'297mm',fontSize:10.5,display:'flex',flexDirection:'column'}}>
      <div style={{padding:'32px 32px 22px',textAlign:'center',background:'#fff',position:'relative'}}>
        {p.photo&&<img src={p.photo} alt="photo" style={{width:64,height:64,borderRadius:'50%',objectFit:'cover',objectPosition:'top',border:`2px solid ${BRONZE}`,margin:'0 auto 14px',display:'block'}}/>}
        <div style={{fontFamily:'"Playfair Display",serif',fontSize:28,fontWeight:600,letterSpacing:1,color:'#1a1614',marginBottom:6}}>{p.firstName} {p.lastName}</div>
        {p.jobTitle&&<div style={{fontSize:10.5,color:BRONZE,letterSpacing:3,textTransform:'uppercase' as const,marginBottom:12,fontWeight:600}}>{p.jobTitle}</div>}
        <div style={{height:1,width:46,background:BRONZE,margin:'0 auto 12px'}}/>
        <div style={{display:'flex',justifyContent:'center',gap:16,fontSize:9.5,color:'#9C6B3E',flexWrap:'wrap' as const}}>
          {p.email&&<span>{p.email}</span>}{p.phone&&<span>{p.phone}</span>}
          {p.city&&<span>{p.city}{p.country?', '+p.country:''}</span>}{p.linkedin&&<span>{p.linkedin}</span>}
        </div>
      </div>
      <div style={{padding:'20px 32px',display:'flex',gap:24,paddingBottom:'18px',flex:1}}>
        <div style={{width:'34%',borderRight:'0.5px solid #d4cfc0',paddingRight:20,flexShrink:0,display:'flex',flexDirection:'column',gap:18}}>
          {skills.length>0&&(<div><ST c={lang==='az'?'Bacarıqlar':'Skills'}/>{skills.map((s,i)=><div key={i} style={{fontSize:10,color:'#4a4438',borderBottom:'0.5px solid #ede8dc',padding:'4px 0'}}>{s}</div>)}</div>)}
          {languages.length>0&&(<div><ST c={lang==='az'?'Dillər':'Languages'}/>{languages.map((l,i)=><div key={i} style={{fontSize:10,color:'#4a4438',display:'flex',justifyContent:'space-between',borderBottom:'0.5px solid #ede8dc',padding:'4px 0'}}><span style={{fontWeight:600}}>{l.name}</span><span style={{color:'#9C6B3E',fontSize:9}}>{l.level}</span></div>)}</div>)}
          {education.length>0&&(<div><ST c={lang==='az'?'Təhsil':'Education'}/>{education.map(edu=><div key={edu.id} style={{marginBottom:9}}><div style={{fontWeight:600,fontSize:10.5,lineHeight:1.3}}>{edu.degree||edu.school}</div>{edu.school&&edu.degree&&<div style={{fontSize:10,color:'#9C6B3E',fontStyle:'italic'}}>{edu.school}</div>}<div style={{fontSize:9,color:'#b5a48c'}}>{edu.startYear}{edu.endYear?' – '+edu.endYear:''}</div></div>)}</div>)}
          {trains.length>0&&(<div><ST c={lang==='az'?'Təlimlər':'Training'}/>{trains.map((tr:any,i:number)=><div key={i} style={{marginBottom:7}}><div style={{fontWeight:600,fontSize:10}}>{tr.name}</div><div style={{fontSize:9.5,color:'#9C6B3E'}}>{tr.provider}{tr.year?' · '+tr.year:''}</div></div>)}</div>)}
        </div>
        <div style={{flex:1,display:'flex',flexDirection:'column',gap:18}}>
          {p.summary&&(<div><ST c={lang==='az'?'Haqqımda':'About'}/><div style={{fontSize:10,color:'#4a4438',lineHeight:1.8,fontStyle:'italic'}}>{p.summary}</div></div>)}
          {experience.length>0&&(<div><ST c={lang==='az'?'Karyera':'Career'}/>{experience.map(exp=><div key={exp.id} style={{marginBottom:13}}><div style={{fontFamily:'"Playfair Display",serif',fontWeight:600,fontSize:12.5,lineHeight:1.3,color:'#1a1614'}}>{exp.jobTitle}</div><div style={{fontSize:10,color:BRONZE,display:'flex',justifyContent:'space-between',marginBottom:4,gap:8}}><span style={{fontStyle:'italic'}}>{exp.company}</span><span style={{fontSize:9,flexShrink:0}}>{fmtDate(exp.startMonth,exp.startYear,lang)} – {exp.current?present:fmtDate(exp.endMonth,exp.endYear,lang)}</span></div>{exp.description&&<div style={{fontSize:9.5,color:'#4a4438',lineHeight:1.75}}>{exp.description.split('\n').filter((l:string)=>l.trim()).map((line:string,i:number)=><div key={i} style={{display:'flex',alignItems:'flex-start',gap:5,marginBottom:2}}><span style={{color:BRONZE,flexShrink:0,marginTop:1}}>·</span><span>{line.replace(/^[•\-]\s*/,'')}</span></div>)}</div>}</div>)}</div>)}
          {certs.length>0&&(<div><ST c={lang==='az'?'Sertifikatlar':'Certificates'}/>{certs.map((c:any,i:number)=><div key={i} style={{display:'flex',justifyContent:'space-between',fontSize:10,marginBottom:3}}><div><span style={{fontWeight:600}}>{c.name}</span>{c.issuer&&<span style={{color:'#9C6B3E'}}> · {c.issuer}</span>}</div>{c.year&&<span style={{color:'#9C6B3E',flexShrink:0,marginLeft:8}}>{c.year}</span>}</div>)}</div>)}
          <ExtraSections data={data} lang={lang} Heading={({children}:{children:string})=><ST c={children}/>} color="#4a4438" muted="#9C6B3E" accent="#1a1614" gap={14} fontSize={10}/>
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
  const MAROON = '#6B1E23';
  function SH({c}:{c:string}){return(
    <div style={{fontSize:9.5,fontWeight:700,textTransform:'uppercase' as const,letterSpacing:2,borderBottom:`1.5px solid ${MAROON}`,paddingBottom:5,marginBottom:11,color:'#1a1a1a'}}>{c}</div>
  );}
  return(
    <div style={{fontFamily:'"Source Serif 4",Georgia,serif',background:'#fff',color:'#111',width:'100%',minHeight:'297mm',padding:'32px 36px',fontSize:10.5,display:'flex',flexDirection:'column'}}>
      <div style={{textAlign:'center',borderTop:'3px double #111',borderBottom:'1.5px solid #111',padding:'10px 0 16px',marginBottom:22}}>
        {p.photo&&<img src={p.photo} alt="photo" style={{width:56,height:56,borderRadius:'50%',objectFit:'cover',float:'right'}}/>}
        <div style={{fontSize:25,fontWeight:700,marginBottom:5,letterSpacing:0.5}}>{p.firstName} {p.lastName}</div>
        {p.jobTitle&&<div style={{fontSize:11,color:MAROON,marginBottom:9,fontStyle:'italic' as const,letterSpacing:0.5}}>{p.jobTitle}</div>}
        <div style={{fontSize:9.5,color:'#555',display:'flex',justifyContent:'center',gap:14,flexWrap:'wrap' as const}}>
          {p.email&&<span>{p.email}</span>}{p.phone&&<span>{p.phone}</span>}
          {p.city&&<span>{p.city}{p.country?', '+p.country:''}</span>}{p.linkedin&&<span>{p.linkedin}</span>}
        </div>
      </div>
      {p.summary&&<div style={{fontSize:11,color:'#333',lineHeight:1.85,marginBottom:20}}>{p.summary}</div>}
      {experience.length>0&&(<div style={{marginBottom:20}}><SH c={lang==='az'?'İş Təcrübəsi':'Work Experience'}/><div style={{display:'flex',flexDirection:'column',gap:14}}>{experience.map(exp=><div key={exp.id}><div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',gap:8}}><span style={{fontSize:11.5,fontWeight:700,lineHeight:1.3}}>{exp.jobTitle}</span><span style={{fontSize:9.5,color:'#555',flexShrink:0}}>{fmtDate(exp.startMonth,exp.startYear,lang)} – {exp.current?present:fmtDate(exp.endMonth,exp.endYear,lang)}</span></div><div style={{fontSize:10.5,color:'#555',fontStyle:'italic',marginBottom:4}}>{exp.company}{exp.city?', '+exp.city:''}</div>{exp.description&&<div style={{fontSize:10,color:'#333',lineHeight:1.65}}>{exp.description.split('\n').filter((l:string)=>l.trim()).map((line:string,i:number)=><div key={i} style={{display:'flex',alignItems:'flex-start',gap:5,marginBottom:2}}><span style={{flexShrink:0,color:'#888',marginTop:1}}>•</span><span>{line.replace(/^[•\-]\s*/,'')}</span></div>)}</div>}</div>)}</div></div>)}
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:22}}>
        <div style={{display:'flex',flexDirection:'column',gap:16}}>
          {education.length>0&&(<div><SH c={lang==='az'?'Təhsil':'Education'}/>{education.map(edu=><div key={edu.id} style={{marginBottom:10}}><div style={{fontWeight:700,fontSize:11.5}}>{edu.degree||edu.school}</div>{edu.school&&edu.degree&&<div style={{fontSize:10.5,color:'#555',fontStyle:'italic'}}>{edu.school}</div>}<div style={{fontSize:10,color:'#777'}}>{edu.startYear}{edu.endYear?' – '+edu.endYear:''}</div></div>)}</div>)}
          {trains.length>0&&(<div><SH c={lang==='az'?'Təlimlər':'Training'}/>{trains.map((tr:any,i:number)=><div key={i} style={{marginBottom:7,fontSize:10.5}}><div style={{fontWeight:600}}>{tr.name}</div><div style={{color:'#555',fontStyle:'italic'}}>{tr.provider}{tr.year?' · '+tr.year:''}</div></div>)}</div>)}
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:16}}>
          {skills.length>0&&(<div><SH c={lang==='az'?'Bacarıqlar':'Skills'}/><div style={{fontSize:10.5,color:'#333',lineHeight:2.1}}>{skills.join(', ')}</div></div>)}
          {languages.length>0&&(<div><SH c={lang==='az'?'Dillər':'Languages'}/>{languages.map((l,i)=><div key={i} style={{fontSize:10.5,display:'flex',justifyContent:'space-between',marginBottom:4}}><span>{l.name}</span><span style={{color:'#777'}}>{l.level}</span></div>)}</div>)}
          {certs.length>0&&(<div><SH c={lang==='az'?'Sertifikatlar':'Certificates'}/>{certs.map((c:any,i:number)=><div key={i} style={{display:'flex',justifyContent:'space-between',fontSize:10.5,marginBottom:4}}><div><span style={{fontWeight:600}}>{c.name}</span>{c.issuer&&<span style={{color:'#777'}}> · {c.issuer}</span>}</div>{c.year&&<span style={{color:'#777',flexShrink:0,marginLeft:8}}>{c.year}</span>}</div>)}</div>)}
          <ExtraSections data={data} lang={lang} Heading={({children}:{children:string})=><SH c={children}/>} color="#333" muted="#666" accent="#111" gap={16} fontSize={10.5}/>
          {additional&&(<div><SH c={lang==='az'?'Əlavə':'Additional'}/><div style={{fontSize:10.5,color:'#333',lineHeight:1.7,whiteSpace:'pre-line'}}>{additional}</div></div>)}
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
  const NAVY='#14213D'; const GOLD='#C9A24B';
  function LeftSec({title}:{title:string}){return(
    <div style={{marginBottom:12}}>
      <div style={{fontSize:9,fontWeight:700,color:GOLD,letterSpacing:1.8,
        textTransform:'uppercase' as const,lineHeight:'18px',marginBottom:3}}>{title}</div>
      <div style={{height:1,background:'rgba(201,162,75,0.35)',marginBottom:7}}/>
    </div>
  );}
  function RightSec({title}:{title:string}){return(
    <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:10}}>
      <div style={{fontFamily:'"Fraunces",serif',fontSize:13,fontWeight:600,color:NAVY,letterSpacing:0.2}}>{title}</div>
      <div style={{flex:1,height:1.5,background:`linear-gradient(90deg,${GOLD},transparent)`}}/>
    </div>
  );}
  return(
    <div style={{fontFamily:'"IBM Plex Sans","Segoe UI",Arial,sans-serif',background:'#fff',width:'100%',minHeight:'297mm',display:'flex',fontSize:10.5}}>
      <div style={{width:'30%',background:NAVY,display:'flex',flexDirection:'column',flexShrink:0}}>
        <div style={{padding:'22px 14px 14px',display:'flex',justifyContent:'center'}}>
          <div style={{width:82,height:82,borderRadius:'50%',overflow:'hidden',border:`3px solid ${GOLD}`}}>
            {p.photo?<img src={p.photo} alt="" style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:'top',display:'block'}}/>
              :<div style={{width:'100%',height:'100%',background:'rgba(255,255,255,0.08)',display:'flex',alignItems:'center',justifyContent:'center'}}><svg width="32" height="32" viewBox="0 0 24 24" fill="rgba(255,255,255,0.4)"><path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/></svg></div>}
          </div>
        </div>
        <div style={{padding:'0 14px 16px',display:'flex',flexDirection:'column',gap:16}}>
          <div><LeftSec title={lang==='az'?'Əlaqə':'Contact'}/>
            <div style={{display:'flex',flexDirection:'column',gap:6}}>
              {p.phone&&<div style={{display:'flex',alignItems:'flex-start',gap:7}}><div style={{marginTop:2}}><CIcon type="phone" fill="transparent" stroke="rgba(255,255,255,0.7)" size={11}/></div><span style={{fontSize:9.5,color:'rgba(255,255,255,0.8)',lineHeight:1.4}}>{p.phone}</span></div>}
              {p.email&&<div style={{display:'flex',alignItems:'flex-start',gap:7}}><div style={{marginTop:2}}><CIcon type="email" fill="transparent" stroke="rgba(255,255,255,0.7)" size={11}/></div><span style={{fontSize:9.5,color:'rgba(255,255,255,0.8)',lineHeight:1.4,wordBreak:'break-all'}}>{p.email}</span></div>}
              {p.city&&<div style={{display:'flex',alignItems:'flex-start',gap:7}}><div style={{marginTop:2}}><CIcon type="pin" fill="transparent" stroke="rgba(255,255,255,0.7)" size={11}/></div><span style={{fontSize:9.5,color:'rgba(255,255,255,0.8)',lineHeight:1.4}}>{p.city}{p.country?', '+p.country:''}</span></div>}
              {p.linkedin&&<div style={{display:'flex',alignItems:'flex-start',gap:7}}><div style={{marginTop:2}}><CIcon type="link" fill="transparent" stroke="rgba(255,255,255,0.7)" size={11}/></div><span style={{fontSize:9.5,color:'rgba(255,255,255,0.8)',lineHeight:1.4,wordBreak:'break-all'}}>{p.linkedin}</span></div>}
            </div>
          </div>
          {skills.length>0&&<div><LeftSec title={lang==='az'?'Bacarıqlar':'Skills'}/><div style={{display:'flex',flexDirection:'column',gap:5}}>{skills.map((s,i)=><Bul key={i} color="rgba(255,255,255,0.55)" text={s} style={{color:'rgba(255,255,255,0.82)'}}/>)}</div></div>}
          {languages.length>0&&<div><LeftSec title={lang==='az'?'Dillər':'Languages'}/><div style={{display:'flex',flexDirection:'column',gap:3}}>{languages.map((l,i)=><div key={i} style={{display:'flex',justifyContent:'space-between',fontSize:10,color:'rgba(255,255,255,0.82)'}}><span>{l.name}</span>{l.level&&<span style={{color:'rgba(255,255,255,0.5)',fontSize:9}}>{l.level}</span>}</div>)}</div></div>}
          {trains.length>0&&<div><LeftSec title={lang==='az'?'Təlimlər':'Training'}/><div style={{display:'flex',flexDirection:'column',gap:6}}>{trains.map((tr:any,i:number)=><div key={i}><div style={{fontSize:10,fontWeight:600,color:'rgba(255,255,255,0.88)',lineHeight:1.3}}>{tr.name}</div><div style={{fontSize:9,color:'rgba(255,255,255,0.5)'}}>{tr.provider}{tr.year?' · '+tr.year:''}</div></div>)}</div></div>}
        </div>
      </div>
      <div style={{flex:1,display:'flex',flexDirection:'column'}}>
        <div style={{background:NAVY,padding:'22px 22px 16px'}}>
          <div style={{fontFamily:'"Fraunces",serif',fontSize:25,fontWeight:600,color:'#fff',letterSpacing:0.2,lineHeight:1.15}}>{p.firstName} {p.lastName}</div>
          {p.jobTitle&&<div style={{fontSize:10.5,color:GOLD,marginTop:5,letterSpacing:1.4,textTransform:'uppercase' as const,fontWeight:600}}>{p.jobTitle}</div>}
        </div>
        <div style={{flex:1,padding:'20px 24px',display:'flex',flexDirection:'column',gap:19}}>
          {p.summary&&<div><RightSec title={lang==='az'?'Profil':'Profile'}/><div style={{fontSize:10,color:'#444',lineHeight:1.7}}>{p.summary}</div></div>}
          {experience.length>0&&<div><RightSec title={lang==='az'?'İş Təcrübəsi':'Work Experience'}/><div style={{display:'flex',flexDirection:'column',gap:9}}>{experience.map(exp=><div key={exp.id} style={{display:'flex',gap:0}}><div style={{display:'flex',flexDirection:'column',alignItems:'center',width:18,flexShrink:0}}><div style={{width:7,height:7,borderRadius:'50%',border:`2px solid ${GOLD}`,background:'#fff',flexShrink:0,marginTop:3}}/><div style={{width:1,flex:1,background:'#e5dcc8',marginTop:2}}/></div><div style={{flex:1,paddingBottom:7,paddingLeft:8}}><div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',gap:6}}><div style={{fontSize:11,fontWeight:700,color:NAVY,lineHeight:1.3}}>{exp.jobTitle}</div><div style={{fontSize:9,color:'#777',flexShrink:0,fontStyle:'italic'}}>{exp.startYear}{exp.endYear||exp.current?' – '+(exp.current?present:exp.endYear):''}</div></div><div style={{fontSize:10,color:'#555',marginBottom:3}}>{exp.company}{exp.city?' · '+exp.city:''}</div>{exp.description&&<div style={{fontSize:9.5,color:'#444',lineHeight:1.65}}>{exp.description.split('\n').filter((l:string)=>l.trim()).map((line:string,i:number)=><div key={i} style={{display:'flex',alignItems:'flex-start',gap:5,marginBottom:2}}><span style={{flexShrink:0,marginTop:1,color:GOLD}}>•</span><span>{line.replace(/^[•\-]\s*/,'')}</span></div>)}</div>}</div></div>)}</div></div>}
          {education.length>0&&<div><RightSec title={lang==='az'?'Təhsil':'Education'}/><div style={{display:'flex',flexDirection:'column',gap:7}}>{education.map(edu=><div key={edu.id} style={{display:'flex',gap:0}}><div style={{display:'flex',flexDirection:'column',alignItems:'center',width:18,flexShrink:0}}><div style={{width:7,height:7,borderRadius:'50%',border:`2px solid ${GOLD}`,background:'#fff',flexShrink:0,marginTop:3}}/></div><div style={{flex:1,paddingLeft:8}}><div style={{display:'flex',justifyContent:'space-between',gap:6}}><div style={{fontSize:11,fontWeight:700,color:NAVY,lineHeight:1.3}}>{edu.degree||edu.school}</div><span style={{fontSize:9,color:'#777',fontStyle:'italic',flexShrink:0}}>{edu.startYear}{edu.endYear?' – '+edu.endYear:''}</span></div>{edu.school&&edu.degree&&<div style={{fontSize:10,color:'#555'}}>{edu.school}</div>}</div></div>)}</div></div>}
          {certs.length>0&&(<div><RightSec title={lang==='az'?'Sertifikatlar':'Certificates'}/><div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:6}}>{certs.map((c:any,i:number)=>(<div key={i} style={{background:'rgba(201,162,75,0.06)',border:'1px solid rgba(201,162,75,0.3)',borderRadius:7,padding:'7px 10px'}}><div style={{fontSize:10,fontWeight:700,color:NAVY,lineHeight:1.35}}>{c.name}</div>{c.issuer&&<div style={{fontSize:8.5,color:'#555',marginTop:2}}>{c.issuer}</div>}{c.year&&<div style={{fontSize:8.5,color:'#999',marginTop:1}}>{c.year}</div>}</div>))}</div></div>)}
          <ExtraSections data={data} lang={lang} Heading={({children}:{children:string})=><RightSec title={children}/>} color="#444" muted="#777" accent="#1e2a3a" gap={14} fontSize={10}/>
          {additional&&<div><RightSec title={lang==='az'?'Əlavə':'Additional'}/><div style={{fontSize:10,color:'#444',lineHeight:1.65,whiteSpace:'pre-line'}}>{additional}</div></div>}
        </div>
      </div>
    </div>
  );
}

// ── HeaderTemplate ────────────────────────────────────────────────────────────
// ── Template registry ─────────────────────────────────────────────────────────
// The page/pagination/PDF machinery lives in CVDocument.tsx; this file only knows how to
// render one template as a single, tall, edge-to-edge document.
export function renderTemplate(template: TemplateId, data: CVData, lang: 'az'|'en') {
  switch (template) {
    case 'kompakt':   return <KompaktTemplate  data={data} lang={lang} />;
    case 'modern':    return <ModernTemplate   data={data} lang={lang} />;
    case 'minimal':   return <MinimalTemplate  data={data} lang={lang} />;
    case 'bold':      return <BoldTemplate     data={data} lang={lang} />;
    case 'elegant':   return <ElegantTemplate  data={data} lang={lang} />;
    case 'klassik':   return <KlassikTemplate  data={data} lang={lang} />;
    case 'designer':  return <DesignerTemplate data={data} lang={lang} />;
    case 'executive': return <ExecutiveTemplate data={data} lang={lang} />;
    case 'header':    return <HeaderTemplate   data={data} lang={lang} />;
    case 'editorial': return <EditorialTemplate data={data} lang={lang} />;
    case 'corporate': return <CorporateTemplate data={data} lang={lang} />;
    case 'swiss':     return <SwissTemplate    data={data} lang={lang} />;
    case 'creative':  return <CreativeTemplate data={data} lang={lang} />;
    case 'tech':      return <TechTemplate     data={data} lang={lang} />;
    case 'sidebar':   return <SidebarTemplate  data={data} lang={lang} />;
    default:          return <KompaktTemplate  data={data} lang={lang} />;
  }
}
