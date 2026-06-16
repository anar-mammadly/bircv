'use client';
import { useRef, useState, useEffect } from 'react';
import { useCVStore } from '@/app/store/cvStore';
import Navbar from '@/app/components/Navbar';
import CVForm from '@/app/components/CVForm';
import CVPreview from '@/app/components/CVPreview';
import TemplateSelector from '@/app/components/TemplateSelector';
import AuthModal from '@/app/components/AuthModal';
import ServicesPanel from '@/app/components/ServicesPanel';
import ChatWidget from '@/app/components/ChatWidget';
import { CVProvider } from '@/app/store/cvStore';
import { t } from '@/app/store/translations';
import { CVData } from '@/app/types/cv';
import { Eye, Lock, UserPlus, FileText, Pencil, Check } from 'lucide-react';

const d1 = 'Playwright & Selenium ile test avtomatlasdirmasi. Postman ile API testi. GitHub vasitesile kod idaresi.';
const d2 = 'Avtomatlasdirma sistemlerini inkisaf etdirdi. Komanda ile Agile metodologiya uzre isledi.';
const d3 = 'QA problemlerinin hellline cavabdeh oldu. Musteri daxili sistemlerini saxladi.';

const DEMO_CV: CVData = {
  personal: {
    firstName: 'Anar', lastName: 'Mammadov', email: 'anar@gmail.com',
    phone: '+994 51 560 06 25', city: 'Baku', country: 'Azerbaijan',
    jobTitle: 'QA Automation Engineer', photo: '',
    linkedin: 'linkedin.com/in/anarmammadly',
    summary: 'Automation test solutions engineer with expertise in Playwright, Selenium and Postman.',
  },
  experience: [
    { id:'e1', jobTitle:'QA Automation Engineer', company:'Google',    city:'Baku', country:'Azerbaijan', startMonth:'8', startYear:'2023', endMonth:'',  endYear:'',     current:true,  description:d1 },
    { id:'e2', jobTitle:'QA Engineer',            company:'Microsoft', city:'Baku', country:'Azerbaijan', startMonth:'3', startYear:'2021', endMonth:'7',  endYear:'2023', current:false, description:d2 },
    { id:'e3', jobTitle:'Junior QA Engineer',     company:'Amazon',    city:'Baku', country:'Azerbaijan', startMonth:'1', startYear:'2019', endMonth:'2',  endYear:'2021', current:false, description:d3 },
  ],
  education: [
    { id:'edu1', institutionType:'university' as const, institutionTypeCustom:'', school:'MIT',     degree:'Computer Science',     educationLevel:'Master',   city:'Boston', country:'USA', startYear:'2022', endYear:'2024' },
    { id:'edu2', institutionType:'university' as const, institutionTypeCustom:'', school:'Harvard', degree:'Software Engineering', educationLevel:'Bachelor', city:'Boston', country:'USA', startYear:'2016', endYear:'2020' },
  ],
  skills: ['Playwright', 'Selenium', 'Postman', 'RestAssured', 'GitHub', 'Agile/Scrum', 'SQL', 'JIRA'],
  languages: [
    { id:'l1', name:'Azerbaijani', level:'Native' },
    { id:'l2', name:'English',     level:'B2' },
    { id:'l3', name:'Russian',     level:'B1' },
  ],
  certificates: [
    { id:'c1', name:'ISTQB Foundation Level',    issuer:'Coursera', year:'2022' },
    { id:'c2', name:'Automation QA Certificate', issuer:'Udemy',    year:'2023' },
    { id:'c3', name:'AWS Cloud Practitioner',    issuer:'Amazon',   year:'2023' },
  ],
  trainings: [
    { id:'t1', name:'QA Automation Bootcamp',   provider:'Narix Academy',              year:'2022', description:'Selenium, Playwright, TestNG' },
    { id:'t2', name:'Advanced API Testing',     provider:'Test Automation University', year:'2023', description:'REST, GraphQL, Postman' },
    { id:'t3', name:'CI/CD with Jenkins',       provider:'Udemy',                      year:'2023', description:'Jenkins, GitHub Actions' },
  ],
  additional: 'GitHub: github.com/anarmammadov',
};

function CreatePageInner() {
  const { cvData, setCVData, selectedTemplate, lang, user, setUser, setShowAuthModal, setAuthMode } = useCVStore();
  // previewRef — həm önizləmə, həm PDF capture üçün istifadə olunur
  const previewRef = useRef<HTMLDivElement>(null);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [pdfSuccess, setPdfSuccess] = useState(false);
  const [demoActive, setDemoActive] = useState(false);
  const [mobileTab, setMobileTab] = useState<'form' | 'preview'>('form');
  const [isMobile, setIsMobile] = useState(false);
  const tr = t[lang];

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 900);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const handleLoadDemo = () => {
    setCVData(DEMO_CV);
    setDemoActive(true);
    setTimeout(() => setDemoActive(false), 2000);
  };

  const handleDownload = () => {
    if (!user) { setAuthMode('register'); setShowAuthModal(true); return; }
    if (user.plan === 'free' && user.cvCount >= 1) {
      alert(lang === 'az'
        ? 'Pulsuz plan yalnız 1 CV yükləməyə icazə verir. Əlavə CV üçün Premium-a keçin.'
        : 'The free plan allows only 1 CV download. Upgrade to Premium for more.');
      return;
    }

    const el = previewRef.current;
    if (!el) return;

    // Preview-un cari render ölçüsünü al
    const rect = el.getBoundingClientRect();
    const W = Math.round(rect.width);
    const H = Math.round(rect.height);

    // 210mm @ 96dpi = 793.7px. Klonu bu ölçüyə çatdırmaq üçün scale hesabla.
    // transform: scale() layout dəyişmir — klon W×H piksel qalır, vizual A4 olur.
    // Buna görə overflow/layout problemi yoxdur, page 2 yoxdur.
    const scale = (793.7 / W).toFixed(6);

    const clone = el.cloneNode(true) as HTMLElement;
    clone.id = '__cv_print_root__';
    clone.style.cssText = [
      'position:absolute', 'top:0', 'left:0',
      `width:${W}px`, `height:${H}px`,
      'overflow:hidden', 'border-radius:0', 'box-shadow:none',
      `transform:scale(${scale})`, 'transform-origin:top left',
    ].join(';');
    document.body.appendChild(clone);

    const style = document.createElement('style');
    style.id = '__cv_print_style__';
    style.textContent = [
      '@media print {',
      '  @page { size:210mm 297mm; margin:0; }',
      '  html,body { width:210mm!important; height:297mm!important; overflow:hidden!important; margin:0!important; padding:0!important; }',
      '  body > *:not(#__cv_print_root__) { display:none!important; }',
      '  #__cv_print_root__ { display:block!important; position:absolute!important; top:0!important; left:0!important; }',
      '  * { -webkit-print-color-adjust:exact!important; print-color-adjust:exact!important; }',
      '}',
    ].join('\n');
    document.head.appendChild(style);

    window.print();

    document.body.removeChild(clone);
    const s = document.getElementById('__cv_print_style__');
    if (s) s.remove();

    setUser({ ...user, cvCount: user.cvCount + 1 });
    setPdfSuccess(true);
    setTimeout(() => setPdfSuccess(false), 2500);
  }

  // ── Shared top bar ────────────────────────────────────────────────────────
  const TopBar = () => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10, marginBottom: 16 }}>
      <h1 style={{ fontSize: 18, fontWeight: 800, color: '#fff', margin: 0 }}>
        {lang === 'az' ? 'CV Məlumatları' : 'CV Details'}
      </h1>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
        <button onClick={handleLoadDemo} style={{
          background: demoActive ? 'rgba(5,150,105,0.2)' : 'rgba(255,214,10,0.1)',
          border: `1px solid ${demoActive ? 'rgba(5,150,105,0.5)' : 'rgba(255,214,10,0.35)'}`,
          color: demoActive ? '#059669' : '#FFD60A',
          borderRadius: 8, padding: '6px 14px', cursor: 'pointer', fontSize: 12, fontWeight: 700, transition: 'all 0.3s',
        }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            {demoActive ? <Check size={13} /> : <Eye size={13} />}
            {demoActive ? (lang === 'az' ? 'Yükləndi!' : 'Loaded!') : (lang === 'az' ? 'Nümunəyə bax' : 'Load demo')}
          </span>
        </button>
        {!user && (
          <button onClick={() => { setAuthMode('register'); setShowAuthModal(true); }}
            style={{ background: 'rgba(124,110,248,0.15)', border: '1px solid rgba(124,110,248,0.3)', color: '#a89ef8', borderRadius: 8, padding: '6px 14px', cursor: 'pointer', fontSize: 12, fontWeight: 600 }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><UserPlus size={13} />{lang === 'az' ? 'Qeydiyyat' : 'Register'}</span>
          </button>
        )}
      </div>
    </div>
  );

  // ── Mobile tab switcher ───────────────────────────────────────────────────
  const MobileTabs = () => (
    <div style={{ display: 'flex', background: 'rgba(255,255,255,0.06)', borderRadius: 10, padding: 4, gap: 4, marginBottom: 16 }}>
      {(['form', 'preview'] as const).map(tab => (
        <button key={tab} onClick={() => setMobileTab(tab)} style={{
          flex: 1, padding: '9px 0', borderRadius: 7, border: 'none', cursor: 'pointer',
          fontSize: 13, fontWeight: 700, transition: 'all 0.2s',
          background: mobileTab === tab ? '#7C6EF8' : 'transparent',
          color: mobileTab === tab ? '#fff' : 'rgba(255,255,255,0.45)',
        }}>
          {tab === 'form'
            ? <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><Pencil size={13} />{lang === 'az' ? 'Məlumat' : 'Form'}</span>
            : <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><Eye size={13} />{lang === 'az' ? 'Önizləmə' : 'Preview'}</span>}
        </button>
      ))}
    </div>
  );

  // ── Preview panel ─────────────────────────────────────────────────────────
  const PreviewPanel = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
        <h2 style={{ fontSize: 15, fontWeight: 700, color: '#fff', margin: 0 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7 }}><FileText size={15} />{lang === 'az' ? 'Önizləmə' : 'Preview'}</span>
        </h2>
        <button onClick={handleDownload} disabled={pdfLoading} style={{
          background: pdfSuccess ? '#059669' : '#7C6EF8', color: '#fff', border: 'none',
          borderRadius: 10, padding: '9px 18px', cursor: pdfLoading ? 'wait' : 'pointer',
          fontSize: 13, fontWeight: 700, transition: 'all 0.3s',
        }}>
          {pdfSuccess
            ? (lang === 'az' ? '✓ Hazırdır!' : '✓ Done!')
            : pdfLoading
              ? (lang === 'az' ? 'Hazırlanır...' : 'Generating...')
              : tr.downloadPDF}
        </button>
      </div>
      {!user && (
        <div style={{ background: 'rgba(124,110,248,0.1)', border: '1px solid rgba(124,110,248,0.25)', borderRadius: 10, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          <Lock size={15} style={{ color: '#a89ef8', flexShrink: 0 }} />
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)', flex: 1 }}>
            {lang === 'az' ? 'PDF yükləmək üçün qeydiyyatdan keçin' : 'Register to download PDF'}
          </span>
          <button onClick={() => { setAuthMode('register'); setShowAuthModal(true); }}
            style={{ background: '#7C6EF8', color: '#fff', border: 'none', borderRadius: 6, padding: '5px 12px', cursor: 'pointer', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>
            {lang === 'az' ? 'Qeydiyyat' : 'Sign Up'}
          </button>
        </div>
      )}
      <TemplateSelector />
      <CVPreview data={cvData} template={selectedTemplate} lang={lang} previewRef={previewRef} />
    </div>
  );

  // ── Mobile layout ─────────────────────────────────────────────────────────
  if (isMobile) {
    return (
      <div style={{ minHeight: '100vh', background: '#0a0a0f' }}>
        <Navbar />
        <AuthModal />
        <ChatWidget />
        <div style={{ padding: '16px 14px' }}>
          <TopBar />
          <MobileTabs />
          {mobileTab === 'form' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <CVForm />
              <ServicesPanel />
            </div>
          ) : (
            <PreviewPanel />
          )}
        </div>
      </div>
    );
  }

  // ── Desktop layout ────────────────────────────────────────────────────────
  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0f' }}>
      <Navbar />
      <AuthModal />
      <ChatWidget />
      <div style={{
        maxWidth: 1440, margin: '0 auto', padding: '24px 20px',
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
        gap: 24, alignItems: 'start',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <TopBar />
          <CVForm />
          <ServicesPanel />
        </div>
        <div style={{ position: 'sticky', top: 80, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <PreviewPanel />
        </div>
      </div>
    </div>
  );
}

export default function CreatePage() {
  return <CVProvider><CreatePageInner /></CVProvider>;
}
