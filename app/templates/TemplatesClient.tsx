'use client';
import Link from 'next/link';
import { CVProvider, useCVStore } from '@/app/store/cvStore';
import Navbar from '@/app/components/Navbar';
import AuthModal from '@/app/components/AuthModal';
import ChatWidget from '@/app/components/ChatWidget';

// ── Mini preview components ───────────────────────────────────────────────────

function AvatarIcon({ size, color }: { size:number; color:string }) {
  return (
    <svg width={size*0.52} height={size*0.52} viewBox="0 0 24 24" fill={color} style={{flexShrink:0}}>
      <circle cx="12" cy="8.2" r="4.2"/>
      <path d="M4 20.2c0-4.2 3.6-7.2 8-7.2s8 3 8 7.2V21H4v-0.8z"/>
    </svg>
  );
}

function KompaktPreview() {
  return (
    <div style={{width:'100%',height:'100%',background:'#fff',display:'flex',fontSize:6,fontFamily:'Manrope,Inter,sans-serif',overflow:'hidden'}}>
      <div style={{width:'36%',background:'#f7f7fb',padding:'12px 8px',display:'flex',flexDirection:'column',gap:6}}>
        <div style={{width:32,height:32,borderRadius:'50%',background:'linear-gradient(135deg,#4338CA,#7C6EF8)',margin:'0 auto 4px',padding:2,display:'flex',alignItems:'center',justifyContent:'center'}}><div style={{width:'100%',height:'100%',borderRadius:'50%',background:'#e2e1f5',display:'flex',alignItems:'center',justifyContent:'center'}}><AvatarIcon size={26} color="#4338CA"/></div></div>
        <div style={{color:'#16162c',fontWeight:800,fontSize:7,textAlign:'center',lineHeight:1.2}}>Əli Əliyev</div>
        <div style={{color:'#4338CA',fontSize:5,textAlign:'center',marginBottom:4,fontWeight:700}}>Frontend Dev</div>
        {[['Əlaqə','ali@gmail.com','+994 50 123 45 67'],['Bacarıqlar','React','TypeScript','Node.js']].map(([h,...items])=>(
          <div key={h} style={{borderTop:'0.5px solid rgba(67,56,202,0.12)',paddingTop:5}}>
            <div style={{color:'#4338CA',fontSize:4.5,fontWeight:700,marginBottom:3,textTransform:'uppercase',letterSpacing:0.8}}>{h}</div>
            {items.map(i=><div key={i} style={{color:'#5b5a73',fontSize:5,marginBottom:2}}>• {i}</div>)}
          </div>
        ))}
      </div>
      <div style={{flex:1,padding:'12px 9px',display:'flex',flexDirection:'column',gap:7}}>
        <div style={{borderBottom:'1.5px solid #ececf3',paddingBottom:3,marginBottom:4}}>
          <div style={{fontSize:11,fontWeight:800,color:'#16162c',letterSpacing:-0.3}}>Əli Əliyev</div>
          <div style={{fontSize:5.5,color:'#4338CA',fontWeight:700}}>Frontend Developer</div>
        </div>
        {[['Peşəkar Təcrübə','Frontend Dev','Kapital Bank · 2022–Now'],['Təhsil','BDU','Kompüter Müh. · 2018–2022']].map(([sec,t,s])=>(
          <div key={sec}>
            <div style={{display:'flex',alignItems:'center',gap:3,marginBottom:3}}><div style={{width:3,height:3,background:'#4338CA',transform:'rotate(45deg)',flexShrink:0}}/><div style={{color:'#16162c',fontSize:4.5,fontWeight:800,textTransform:'uppercase',letterSpacing:0.6}}>{sec}</div></div>
            <div style={{fontWeight:700,fontSize:6,color:'#16162c'}}>{t}</div>
            <div style={{color:'#6b7280',fontSize:5}}>{s}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ModernPreview() {
  return (
    <div style={{width:'100%',height:'100%',background:'#fff',fontSize:6,fontFamily:'"Space Grotesk",Inter,sans-serif',overflow:'hidden'}}>
      <div style={{background:'linear-gradient(120deg,#1E40AF,#3B82F6)',padding:'12px 14px',display:'flex',alignItems:'flex-start',gap:10}}>
        <div style={{width:38,height:38,borderRadius:'50%',background:'rgba(255,255,255,0.25)',border:'2px solid rgba(255,255,255,0.45)',flexShrink:0,display:'flex',alignItems:'center',justifyContent:'center'}}><AvatarIcon size={38} color="#fff"/></div>
        <div>
          <div style={{color:'#fff',fontWeight:700,fontSize:10,letterSpacing:-0.3}}>Əli Əliyev</div>
          <div style={{color:'rgba(255,255,255,0.9)',fontSize:6,marginTop:2,fontFamily:'Inter,sans-serif'}}>Frontend Developer</div>
          <div style={{color:'rgba(255,255,255,0.65)',fontSize:5,marginTop:2,fontFamily:'Inter,sans-serif'}}>ali@gmail.com · Bakı</div>
        </div>
      </div>
      <div style={{padding:'9px 14px',display:'grid',gridTemplateColumns:'1fr 1fr',gap:8,fontFamily:'Inter,sans-serif'}}>
        <div>
          <div style={{color:'#1E40AF',fontSize:4.5,fontWeight:700,textTransform:'uppercase',letterSpacing:1,marginBottom:4,display:'flex',alignItems:'center',gap:3}}>Experience<div style={{flex:1,height:1,background:'rgba(30,64,175,0.3)'}}/></div>
          <div style={{fontWeight:700,fontSize:6,color:'#1a1a2e'}}>Frontend Developer</div>
          <div style={{color:'#1E40AF',fontSize:5,fontWeight:600}}>Kapital Bank</div>
          <div style={{color:'#6b7280',fontSize:5,lineHeight:1.6,marginTop:2}}>• React, TypeScript<br/>• 30% performance gain</div>
        </div>
        <div>
          <div style={{color:'#1E40AF',fontSize:4.5,fontWeight:700,textTransform:'uppercase',letterSpacing:1,marginBottom:4,display:'flex',alignItems:'center',gap:3}}>Skills<div style={{flex:1,height:1,background:'rgba(30,64,175,0.3)'}}/></div>
          {[['React',90],['TypeScript',80],['Node.js',70]].map(([s,p])=>(
            <div key={s} style={{marginBottom:4}}>
              <div style={{display:'flex',justifyContent:'space-between',marginBottom:1}}>
                <span style={{color:'#374151',fontSize:5}}>{s}</span>
                <span style={{color:'#1E40AF',fontSize:4.5}}>{p}%</span>
              </div>
              <div style={{height:2.5,background:'#e5e7eb',borderRadius:2}}>
                <div style={{height:'100%',width:`${p}%`,background:'#1E40AF',borderRadius:2}}/>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MinimalPreview() {
  return (
    <div style={{width:'100%',height:'100%',background:'#fff',padding:'14px',fontSize:6,fontFamily:'"Work Sans",Inter,sans-serif',overflow:'hidden'}}>
      <div style={{borderBottom:'0.5px solid #ececec',paddingBottom:8,marginBottom:8}}>
        <div style={{fontSize:12,fontWeight:300,color:'#0a0a0a',letterSpacing:0.2}}>Əli <span style={{fontWeight:600}}>Əliyev</span></div>
        <div style={{fontSize:5.5,color:'#a8a8a8',marginTop:3,fontWeight:500,letterSpacing:1,textTransform:'uppercase'}}>Frontend Developer</div>
        <div style={{fontSize:5,color:'#888',marginTop:3}}>ali@gmail.com · Bakı</div>
      </div>
      <div style={{display:'flex',gap:10}}>
        <div style={{flex:1}}>
          <div style={{fontSize:4.5,fontWeight:500,textTransform:'uppercase',letterSpacing:2,color:'#a8a8a8',marginBottom:4}}>Experience</div>
          <div style={{fontWeight:700,fontSize:6.5,color:'#111'}}>Frontend Developer</div>
          <div style={{color:'#6b7280',fontSize:5}}>Kapital Bank · 2022–Now</div>
          <div style={{color:'#374151',fontSize:5,lineHeight:1.7,marginTop:2}}>– React development<br/>– API integrations</div>
          <div style={{fontWeight:700,fontSize:6.5,color:'#111',marginTop:6}}>UI Developer</div>
          <div style={{color:'#6b7280',fontSize:5}}>SoftCo · 2020–2022</div>
        </div>
        <div style={{width:'32%'}}>
          <div style={{fontSize:4.5,fontWeight:500,textTransform:'uppercase',letterSpacing:2,color:'#a8a8a8',marginBottom:4}}>Skills</div>
          <div style={{fontSize:5,color:'#374151',lineHeight:2}}>React · TypeScript · Node.js · Git</div>
          <div style={{fontSize:4.5,fontWeight:500,textTransform:'uppercase',letterSpacing:2,color:'#a8a8a8',marginTop:7,marginBottom:4}}>Languages</div>
          <div style={{fontSize:5,color:'#374151'}}>AZ, EN, RU</div>
        </div>
      </div>
    </div>
  );
}

function BoldPreview() {
  return (
    <div style={{width:'100%',height:'100%',background:'#fff',fontSize:6,fontFamily:'Inter,sans-serif',overflow:'hidden'}}>
      <div style={{background:'#0a0a0a',padding:'12px 14px'}}>
        <div style={{display:'flex',gap:4,alignItems:'flex-end',fontFamily:'"Archivo",sans-serif'}}>
          <span style={{color:'#fff',fontWeight:900,fontSize:11,letterSpacing:-0.5,textTransform:'uppercase'}}>Əli</span>
          <span style={{color:'#FFD60A',fontWeight:900,fontSize:11,letterSpacing:-0.5,textTransform:'uppercase'}}>Əliyev</span>
        </div>
        <div style={{color:'rgba(255,255,255,0.65)',fontSize:6,fontWeight:700,marginTop:3,textTransform:'uppercase',letterSpacing:1.2,fontFamily:'"Archivo",sans-serif'}}>Frontend Developer</div>
      </div>
      <div style={{padding:'10px 14px',display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
        <div>
          <div style={{display:'inline-block',fontSize:4.5,fontWeight:900,textTransform:'uppercase',letterSpacing:1,background:'#0a0a0a',color:'#fff',padding:'2px 6px',marginBottom:5}}>Experience</div>
          <div style={{fontWeight:800,fontSize:6.5,color:'#0a0a0a'}}>Frontend Dev</div>
          <div style={{color:'#6b7280',fontSize:5,fontWeight:600}}>Kapital Bank · 2022</div>
          <div style={{color:'#4b5563',fontSize:5,lineHeight:1.6,marginTop:2}}>• React apps<br/>• TypeScript migration</div>
        </div>
        <div>
          <div style={{display:'inline-block',fontSize:4.5,fontWeight:900,textTransform:'uppercase',letterSpacing:1,background:'#0a0a0a',color:'#fff',padding:'2px 6px',marginBottom:5}}>Skills</div>
          {['React','TypeScript','Node.js','PostgreSQL'].map(s=>(
            <div key={s} style={{fontSize:5,padding:'2px 6px',background:'#FFD60A',color:'#111',fontWeight:700,marginBottom:3,display:'block',width:'fit-content'}}>{s}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ElegantPreview() {
  return (
    <div style={{width:'100%',height:'100%',background:'#fdfbf8',fontSize:6,fontFamily:'Lora,Georgia,serif',overflow:'hidden'}}>
      <div style={{background:'#fff',padding:'14px',textAlign:'center'}}>
        <div style={{width:32,height:32,borderRadius:'50%',background:'#f0e9de',margin:'0 auto 6px',border:'1.5px solid #9C6B3E',display:'flex',alignItems:'center',justifyContent:'center'}}><AvatarIcon size={26} color="#9C6B3E"/></div>
        <div style={{fontFamily:'"Playfair Display",serif',color:'#1a1614',fontWeight:600,fontSize:10,letterSpacing:0.5}}>Əli Əliyev</div>
        <div style={{color:'#9C6B3E',fontSize:5.5,marginTop:3,letterSpacing:1.5,textTransform:'uppercase',fontWeight:600}}>Frontend Developer</div>
        <div style={{height:0.75,width:24,background:'#9C6B3E',margin:'6px auto'}}/>
        <div style={{color:'#9C6B3E',fontSize:5}}>ali@gmail.com · Bakı</div>
      </div>
      <div style={{padding:'10px 14px'}}>
        <div style={{fontFamily:'"Playfair Display",serif',fontStyle:'italic',color:'#9C6B3E',fontSize:6,letterSpacing:0.5,borderBottom:'0.5px solid #d9c3a3',paddingBottom:4,marginBottom:6}}>Career</div>
        <div style={{fontFamily:'"Playfair Display",serif',fontWeight:600,fontSize:7,color:'#1a1614'}}>Frontend Developer</div>
        <div style={{color:'#9C6B3E',fontSize:5,fontStyle:'italic',marginBottom:3}}>Kapital Bank · 2022–Now</div>
        <div style={{color:'#4a4438',fontSize:5,lineHeight:1.7}}>React, TypeScript, API integrations and performance optimization.</div>
        <div style={{display:'flex',flexWrap:'wrap',gap:4,marginTop:8}}>
          {['React','TypeScript','Node.js','CSS'].map(s=>(
            <span key={s} style={{color:'#4a4438',fontSize:4.5,borderBottom:'0.5px solid #ede8dc',paddingBottom:1}}>{s}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function KlassikPreview() {
  return (
    <div style={{width:'100%',height:'100%',background:'#fff',padding:'14px',fontSize:6,fontFamily:'"Source Serif 4",Georgia,serif',overflow:'hidden'}}>
      <div style={{textAlign:'center',borderTop:'2px double #111',borderBottom:'1px solid #111',padding:'7px 0 9px',marginBottom:8}}>
        <div style={{fontSize:13,fontWeight:700,color:'#111',letterSpacing:0.5}}>Əli Əliyev</div>
        <div style={{fontSize:5.5,color:'#6B1E23',marginTop:3,fontStyle:'italic'}}>Frontend Developer</div>
        <div style={{fontSize:5,color:'#6b7280',marginTop:3}}>ali@gmail.com · +994 50 123 45 67 · Bakı</div>
      </div>
      <div style={{marginBottom:7}}>
        <div style={{fontSize:6,fontWeight:700,textTransform:'uppercase',letterSpacing:1.5,borderBottom:'1.5px solid #6B1E23',marginBottom:4,paddingBottom:1.5,color:'#1a1a1a'}}>Work Experience</div>
        <div style={{display:'flex',justifyContent:'space-between',marginBottom:1}}>
          <span style={{fontWeight:700,fontSize:6.5}}>Frontend Developer</span>
          <span style={{fontSize:5.5,color:'#6b7280'}}>2022–Now</span>
        </div>
        <div style={{color:'#555',fontSize:5,fontStyle:'italic',marginBottom:2}}>Kapital Bank</div>
        <div style={{color:'#374151',fontSize:5,lineHeight:1.7,paddingLeft:6}}>
          • React and TypeScript for client-side development<br/>
          • RESTful API integrations, 30% speed improvement
        </div>
      </div>
      <div>
        <div style={{fontSize:6,fontWeight:700,textTransform:'uppercase',letterSpacing:1.5,borderBottom:'1.5px solid #6B1E23',marginBottom:4,paddingBottom:1.5,color:'#1a1a1a'}}>Education</div>
        <div style={{display:'flex',justifyContent:'space-between'}}>
          <span style={{fontWeight:700,fontSize:6}}>Baku State University</span>
          <span style={{fontSize:5.5,color:'#6b7280'}}>2018–2022</span>
        </div>
        <div style={{color:'#555',fontSize:5,fontStyle:'italic'}}>Computer Engineering, Bachelor</div>
      </div>
    </div>
  );
}

function DesignerPreview() {
  return (
    <div style={{width:'100%',height:'100%',background:'#f8fafc',fontSize:6,fontFamily:'Inter,sans-serif',overflow:'hidden',display:'flex'}}>
      <div style={{width:'34%',background:'#f0fdfa',borderRight:'1px solid #f1f5f9',padding:'10px 8px',display:'flex',flexDirection:'column',gap:6}}>
        <div style={{width:48,height:48,borderRadius:10,background:'linear-gradient(135deg,#7C3AED,#4f46e5)',flexShrink:0,margin:'0 auto',display:'flex',alignItems:'center',justifyContent:'center',border:'2px solid #fff'}}><AvatarIcon size={48} color="#fff"/></div>
        <div style={{textAlign:'center'}}>
          <div style={{fontFamily:'"Poppins",sans-serif',fontSize:7,fontWeight:700,color:'#111827'}}>Əli Əliyev</div>
          <div style={{fontSize:4.5,fontWeight:600,color:'#7C3AED',background:'#f3eefc',display:'inline-block',padding:'1px 6px',borderRadius:10,marginTop:2}}>Frontend Dev</div>
        </div>
        {[{l:'Email',v:'ali@gmail.com'},{l:'Phone',v:'+994501234567'},{l:'City',v:'Bakı'}].map(({l,v})=>(
          <div key={l} style={{display:'flex',flexDirection:'column'}}>
            <div style={{fontSize:4,color:'#9ca3af',fontWeight:700,textTransform:'uppercase',letterSpacing:0.5}}>{l}</div>
            <div style={{fontSize:5,color:'#374151',fontWeight:500,marginTop:1,wordBreak:'break-all'}}>{v}</div>
          </div>
        ))}
      </div>
      <div style={{flex:1,padding:'10px 9px',display:'flex',flexDirection:'column',gap:7}}>
        <div>
          <div style={{display:'flex',alignItems:'center',gap:4}}><span style={{fontFamily:'"Poppins",sans-serif',fontSize:9,fontWeight:700,color:'#1e1b4b',letterSpacing:-0.3}}>Experience</span><div style={{flex:1,height:1.5,background:'linear-gradient(90deg,#c7d2fe,transparent)'}}/></div>
          <div style={{marginTop:5}}>
            <div style={{fontSize:5,color:'#9ca3af'}}>Frontend Developer</div>
            <div style={{fontSize:6.5,fontWeight:700,color:'#1e1b4b'}}>Kapital Bank</div>
            <div style={{fontSize:4.5,color:'#7C3AED',fontWeight:600}}>2022–Now · Bakı</div>
          </div>
        </div>
        <div>
          <div style={{display:'flex',alignItems:'center',gap:4}}><span style={{fontFamily:'"Poppins",sans-serif',fontSize:9,fontWeight:700,color:'#1e1b4b'}}>Skills</span><div style={{flex:1,height:1.5,background:'linear-gradient(90deg,#c7d2fe,transparent)'}}/></div>
          <div style={{display:'flex',flexWrap:'wrap',gap:3,marginTop:5}}>
            {['React','TypeScript','Node.js','CSS'].map(s=>(
              <div key={s} style={{background:'#f3eefc',borderRadius:4,padding:'2px 5px',fontSize:4.5,color:'#7C3AED',fontWeight:600}}>{s}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ExecutivePreview() {
  return (
    <div style={{width:'100%',height:'100%',background:'#fff',display:'flex',fontSize:6,fontFamily:'"IBM Plex Sans",Inter,sans-serif',overflow:'hidden'}}>
      <div style={{width:'34%',background:'#14213D',padding:'12px 8px',display:'flex',flexDirection:'column',gap:6}}>
        <div style={{width:34,height:34,borderRadius:'50%',background:'rgba(255,255,255,0.1)',margin:'0 auto 4px',border:'2px solid #C9A24B',display:'flex',alignItems:'center',justifyContent:'center'}}><AvatarIcon size={34} color="rgba(255,255,255,0.7)"/></div>
        <div style={{color:'#C9A24B',fontSize:4.5,fontWeight:700,textTransform:'uppercase',letterSpacing:1,marginBottom:1}}>Contact</div>
        <div style={{height:0.5,background:'rgba(201,162,75,0.35)',marginBottom:2}}/>
        {['ali@gmail.com','+994501234567','Bakı, AZ'].map(c=>(
          <div key={c} style={{color:'rgba(255,255,255,0.8)',fontSize:4.5}}>{c}</div>
        ))}
        <div style={{color:'#C9A24B',fontSize:4.5,fontWeight:700,textTransform:'uppercase',letterSpacing:1,marginTop:4,marginBottom:1}}>Skills</div>
        <div style={{height:0.5,background:'rgba(201,162,75,0.35)',marginBottom:2}}/>
        {['React','TypeScript','Node.js'].map(s=>(
          <div key={s} style={{display:'flex',alignItems:'flex-start',gap:5}}>
            <div style={{width:3,height:3,borderRadius:'50%',background:'rgba(255,255,255,0.55)',flexShrink:0,marginTop:1}}/>
            <span style={{color:'rgba(255,255,255,0.82)',fontSize:4.5}}>{s}</span>
          </div>
        ))}
      </div>
      <div style={{flex:1,display:'flex',flexDirection:'column'}}>
        <div style={{background:'#14213D',padding:'12px 10px'}}>
          <div style={{fontFamily:'"Fraunces",serif',fontSize:10,fontWeight:600,color:'#fff',letterSpacing:0.2}}>Əli Əliyev</div>
          <div style={{fontSize:5.5,color:'#C9A24B',marginTop:3,letterSpacing:1,textTransform:'uppercase',fontWeight:600}}>Frontend Developer</div>
        </div>
        <div style={{flex:1,padding:'10px'}}>
          <div style={{display:'flex',alignItems:'center',gap:6,marginBottom:5}}>
            <div style={{fontFamily:'"Fraunces",serif',fontSize:7,fontWeight:600,color:'#14213D'}}>Experience</div>
            <div style={{flex:1,height:1,background:'linear-gradient(90deg,#C9A24B,transparent)'}}/>
          </div>
          <div style={{paddingLeft:6,borderLeft:'1.5px solid #e5dcc8',marginBottom:7}}>
            <div style={{fontWeight:700,fontSize:6,color:'#14213D'}}>Frontend Developer</div>
            <div style={{fontSize:5,color:'#555'}}>Kapital Bank · 2022–Now</div>
          </div>
          <div style={{display:'flex',alignItems:'center',gap:6,marginBottom:5}}>
            <div style={{fontFamily:'"Fraunces",serif',fontSize:7,fontWeight:600,color:'#14213D'}}>Education</div>
            <div style={{flex:1,height:1,background:'linear-gradient(90deg,#C9A24B,transparent)'}}/>
          </div>
          <div style={{paddingLeft:6,borderLeft:'1.5px solid #e5dcc8'}}>
            <div style={{fontWeight:700,fontSize:6,color:'#14213D'}}>Baku State University</div>
            <div style={{fontSize:5,color:'#555'}}>Computer Engineering · 2018–2022</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function HeaderPreview() {
  return (
    <div style={{width:'100%',height:'100%',background:'#fff',display:'flex',flexDirection:'column',fontSize:6,fontFamily:'"Libre Franklin",Inter,sans-serif',overflow:'hidden'}}>
      <div style={{background:'linear-gradient(110deg,#0F1E3D,#1B3A6B)',padding:'10px 12px',display:'flex',alignItems:'flex-start',gap:8}}>
        <div style={{width:34,height:34,borderRadius:8,background:'rgba(255,255,255,0.12)',border:'2px solid rgba(255,255,255,0.25)',flexShrink:0,display:'flex',alignItems:'center',justifyContent:'center'}}><AvatarIcon size={34} color="rgba(255,255,255,0.7)"/></div>
        <div style={{paddingTop:2}}>
          <div style={{fontSize:10,fontWeight:900,color:'#fff',letterSpacing:-0.3}}>Əli Əliyev</div>
          <div style={{fontSize:5.5,color:'#8FB1E8',marginTop:2,letterSpacing:1,textTransform:'uppercase',fontWeight:600}}>Frontend Developer</div>
        </div>
      </div>
      <div style={{background:'#f4f6fa',borderBottom:'1px solid #e5e8ef',padding:'4px 12px',display:'flex',gap:10}}>
        {['ali@gmail.com','+994501234567','Bakı'].map(c=>(
          <span key={c} style={{fontSize:5,color:'#444'}}>{c}</span>
        ))}
      </div>
      <div style={{flex:1,display:'flex'}}>
        <div style={{width:'33%',padding:'8px 9px',borderRight:'1px solid #e5e5e5',display:'flex',flexDirection:'column',gap:5}}>
          <div style={{fontSize:4.5,fontWeight:800,letterSpacing:1,textTransform:'uppercase',color:'#0F1E3D',marginBottom:3}}>Skills</div>
          <div style={{height:1.5,background:'linear-gradient(90deg,#0F1E3D,rgba(15,30,61,0.1))',marginBottom:3,marginTop:-4}}/>
          {['React','TypeScript','Node.js','CSS'].map(s=>(
            <div key={s} style={{fontSize:5,color:'#0F1E3D',background:'#eef1f7',padding:'1.5px 5px',borderRadius:3,fontWeight:600,width:'fit-content'}}>{s}</div>
          ))}
        </div>
        <div style={{flex:1,padding:'8px 9px'}}>
          <div style={{fontSize:4.5,fontWeight:800,letterSpacing:1,textTransform:'uppercase',color:'#0F1E3D',marginBottom:3}}>Experience</div>
          <div style={{height:1.5,background:'linear-gradient(90deg,#0F1E3D,rgba(15,30,61,0.1))',marginBottom:4,marginTop:-4}}/>
          <div style={{display:'flex',gap:0}}>
            <div style={{display:'flex',flexDirection:'column',alignItems:'center',width:12,flexShrink:0}}>
              <div style={{width:6,height:6,borderRadius:'50%',border:'1.5px solid #2563EB',background:'#fff',marginTop:2}}/>
              <div style={{width:1,flex:1,background:'#ddd',marginTop:1}}/>
            </div>
            <div style={{paddingLeft:5}}>
              <div style={{fontWeight:700,fontSize:6,color:'#0F1E3D'}}>Frontend Developer</div>
              <div style={{fontSize:5,color:'#555'}}>Kapital Bank · 2022–Now</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const PREVIEWS: Record<string, React.FC> = {
  kompakt: KompaktPreview, modern: ModernPreview, minimal: MinimalPreview,
  bold: BoldPreview, elegant: ElegantPreview, klassik: KlassikPreview,
  designer: DesignerPreview, executive: ExecutivePreview, header: HeaderPreview,
};

function TemplatesInner() {
  const { lang } = useCVStore();

  const templates = [
    { id:'kompakt',  name:'Kompakt',   desc: lang==='az'?'2-sütunlu, kompakt dizayn':'2-column, compact layout',            premium:false, color:'#4f46e5' },
    { id:'modern',   name:'Modern',    desc: lang==='az'?'Bənövşəyi aksent, bacarıq barları':'Purple accent, skill bars',    premium:false, color:'#7C6EF8' },
    { id:'minimal',  name:'Minimal',   desc: lang==='az'?'Minimalist, geniş ağ sahə':'Minimalist, lots of whitespace',       premium:false, color:'#6b7280' },
    { id:'bold',     name:'Bold',      desc: lang==='az'?'Güclü tipografiya, sarı aksent':'Strong typography, yellow accent', premium:false, color:'#ca8a04' },
    { id:'designer', name:'Designer',  desc: lang==='az'?'Müasir kart dizaynı':'Modern card-based design',                  premium:false, color:'#6366f1' },
    { id:'header',   name:'Header',    desc: lang==='az'?'Tam başlıq paneli':'Full-width header panel',                      premium:false, color:'#0284c7' },
    { id:'elegant',  name:'Elegant',   desc: lang==='az'?'Zərif qəhvəyi tonlar, serif':'Warm brown tones, serif font',       premium:true,  color:'#92400e' },
    { id:'klassik',  name:'Klassik',   desc: lang==='az'?'Ənənəvi, Times New Roman':'Traditional, Times New Roman',          premium:true,  color:'#374151' },
    { id:'executive',name:'Executive', desc: lang==='az'?'Tünd tərəfli korporativ stil':'Dark sidebar, corporate style',     premium:true,  color:'#1e2a3a' },
  ];

  return (
    <div style={{ minHeight:'100vh', background:'#0a0a0f' }}>
      <Navbar />
      <AuthModal />
      <ChatWidget />

      <div style={{ maxWidth:1200, margin:'0 auto', padding:'56px 24px 80px' }}>

        {/* Hero */}
        <div style={{ textAlign:'center', marginBottom:56 }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(124,110,248,0.1)', border:'1px solid rgba(124,110,248,0.25)', borderRadius:20, padding:'6px 16px', marginBottom:20 }}>
            <div style={{ width:6, height:6, borderRadius:'50%', background:'#7C6EF8' }}/>
            <span style={{ fontSize:12, color:'#a89ef8', fontWeight:600, fontFamily:'Plus Jakarta Sans,Inter,sans-serif' }}>
              {lang==='az' ? '9 Peşəkar Şablon' : '9 Professional Templates'}
            </span>
          </div>
          <h1 style={{ fontSize:44, fontWeight:900, color:'#fff', margin:'0 0 14px', letterSpacing:-1, fontFamily:'Plus Jakarta Sans,Inter,sans-serif', lineHeight:1.1 }}>
            {lang==='az' ? 'CV Şablonları' : 'CV Templates'}
          </h1>
          <p style={{ fontSize:16, color:'rgba(255,255,255,0.4)', fontFamily:'Plus Jakarta Sans,Inter,sans-serif', maxWidth:480, margin:'0 auto' }}>
            {lang==='az'
              ? 'İşəgötürən diqqətini çəkəcək peşəkar şablon seç'
              : 'Choose a professional template that captures recruiter attention'}
          </p>
        </div>

        {/* Grid */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:20 }}>
          {templates.map(tpl => {
            const Preview = PREVIEWS[tpl.id];
            return (
              <div
                key={tpl.id}
                style={{ background:'#111118', border:'1px solid rgba(255,255,255,0.07)', borderRadius:18, overflow:'hidden', transition:'border-color 0.2s,transform 0.2s', cursor:'pointer' }}
                onMouseEnter={e => { const d = e.currentTarget as HTMLDivElement; d.style.borderColor = tpl.color+'80'; d.style.transform = 'translateY(-3px)'; }}
                onMouseLeave={e => { const d = e.currentTarget as HTMLDivElement; d.style.borderColor = 'rgba(255,255,255,0.07)'; d.style.transform = 'translateY(0)'; }}
              >
                {/* Preview */}
                <div className="cv-preview-wrap" style={{ height:200, position:'relative', overflow:'hidden', background:'#f8f9fa' }}>
                  <div style={{ position:'absolute', inset:0 }}><Preview /></div>
                  {tpl.premium && (
                    <div style={{ position:'absolute', top:10, right:10, background:'rgba(17,17,24,0.85)', backdropFilter:'blur(8px)', border:'1px solid rgba(255,214,10,0.4)', color:'#FFD60A', fontSize:9.5, fontWeight:700, padding:'3px 10px', borderRadius:6, zIndex:10, fontFamily:'Plus Jakarta Sans,Inter,sans-serif', letterSpacing:0.5 }}>
                      PRO
                    </div>
                  )}
                  <div style={{ position:'absolute', bottom:0, left:0, right:0, height:36, background:'linear-gradient(transparent,rgba(17,17,24,0.5))', zIndex:5 }}/>
                </div>

                {/* Info */}
                <div style={{ padding:'14px 16px' }}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:4 }}>
                    <h3 style={{ fontSize:15, fontWeight:700, color:'#fff', margin:0, fontFamily:'Plus Jakarta Sans,Inter,sans-serif' }}>{tpl.name}</h3>
                    <span style={{ fontSize:10.5, color: tpl.premium ? '#FFD60A' : '#34d399', fontWeight:600, fontFamily:'Plus Jakarta Sans,Inter,sans-serif' }}>
                      {tpl.premium ? 'Premium' : (lang==='az' ? 'Pulsuz' : 'Free')}
                    </span>
                  </div>
                  <p style={{ fontSize:12, color:'rgba(255,255,255,0.38)', margin:'0 0 14px', lineHeight:1.5, fontFamily:'Plus Jakarta Sans,Inter,sans-serif' }}>{tpl.desc}</p>
                  <Link
                    href={`/create?template=${tpl.id}`}
                    style={{
                      display:'block', textAlign:'center',
                      background: tpl.premium ? 'rgba(255,214,10,0.08)' : `${tpl.color}18`,
                      border:`1px solid ${tpl.premium ? 'rgba(255,214,10,0.25)' : tpl.color+'35'}`,
                      color: tpl.premium ? '#FFD60A' : tpl.color,
                      textDecoration:'none', borderRadius:9, padding:'9px',
                      fontSize:12.5, fontWeight:600, fontFamily:'Plus Jakarta Sans,Inter,sans-serif',
                      letterSpacing:0.1,
                    }}
                  >
                    {tpl.premium
                      ? (lang==='az' ? 'Premium ilə istifadə et' : 'Use with Premium')
                      : (lang==='az' ? 'Bu şablonu seç' : 'Use this template')}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div style={{ marginTop:56, background:'rgba(124,110,248,0.06)', border:'1px solid rgba(124,110,248,0.15)', borderRadius:20, padding:'36px 32px', display:'flex', justifyContent:'space-between', alignItems:'center', gap:24, flexWrap:'wrap' }}>
          <div>
            <h3 style={{ fontSize:20, fontWeight:800, color:'#fff', margin:'0 0 6px', fontFamily:'Plus Jakarta Sans,Inter,sans-serif' }}>
              {lang==='az' ? 'Premium şablonlar sizin üçün' : 'Premium templates for you'}
            </h3>
            <p style={{ fontSize:13, color:'rgba(255,255,255,0.4)', margin:0, fontFamily:'Plus Jakarta Sans,Inter,sans-serif' }}>
              {lang==='az' ? 'Elegant, Klassik, Executive — aylıq 20 AZN ilə' : 'Elegant, Klassik, Executive — 20 AZN/month'}
            </p>
          </div>
          <div style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
            <Link href="/create" style={{ background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.12)', color:'rgba(255,255,255,0.7)', textDecoration:'none', borderRadius:10, padding:'11px 24px', fontSize:13, fontWeight:600, fontFamily:'Plus Jakarta Sans,Inter,sans-serif' }}>
              {lang==='az' ? 'CV Yarat' : 'Create CV'}
            </Link>
            <Link href="/pricing" style={{ background:'#7C6EF8', color:'#fff', textDecoration:'none', borderRadius:10, padding:'11px 24px', fontSize:13, fontWeight:700, fontFamily:'Plus Jakarta Sans,Inter,sans-serif' }}>
              {lang==='az' ? 'Premium Al' : 'Get Premium'}
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

export default function TemplatesClient() {
  return <CVProvider><TemplatesInner /></CVProvider>;
}
