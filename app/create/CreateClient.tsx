'use client';
import { useRef, useState, useEffect } from 'react';
import { useCVStore } from '@/app/store/cvStore';
import Navbar from '@/app/components/Navbar';
import CVForm from '@/app/components/CVForm';
import CVPreview from '@/app/components/CVPreview';
import TemplateSelector, { TEMPLATES } from '@/app/components/TemplateSelector';
import AuthModal from '@/app/components/AuthModal';
import ServicesPanel from '@/app/components/ServicesPanel';
import ChatWidget from '@/app/components/ChatWidget';
import { CVProvider } from '@/app/store/cvStore';
import { t } from '@/app/store/translations';
import { CVData } from '@/app/types/cv';
import { Eye, Lock, UserPlus, FileText, Pencil, Check } from 'lucide-react';

const DEMO_CV_AZ: CVData = {
  personal: {
    firstName: 'Anar', lastName: 'Məmmədov', email: 'anar.memmedov@gmail.com',
    phone: '+99451 123 45 67', city: 'Bakı', country: 'Azərbaycan',
    jobTitle: 'QA Avtomasiya Mühəndisi', photo: '',
    linkedin: 'linkedin.com/in/anarmammadly',
    summary: 'Playwright, Selenium və Postman üzrə təcrübəli QA avtomasiya mühəndisi. Komanda daxilində səmərəli ünsiyyət və analitik yanaşma ilə layihələrin keyfiyyətini artırır.',
  },
  experience: [
    { id:'e1', jobTitle:'QA Avtomasiya Mühəndisi', company:'Google',    city:'Bakı', country:'Azərbaycan', startMonth:'8', startYear:'2023', endMonth:'',  endYear:'',     current:true,  description:'Playwright və Selenium ilə test avtomatlaşdırma çərçivələri qurdu. Postman vasitəsilə API testlərini həyata keçirdi. GitHub üzərindən kod idarəetməsini təmin etdi.' },
    { id:'e2', jobTitle:'QA Mühəndisi',            company:'Microsoft', city:'Bakı', country:'Azərbaycan', startMonth:'3', startYear:'2021', endMonth:'7',  endYear:'2023', current:false, description:'Avtomatlaşdırma sistemlərini inkişaf etdirərək səmərəliliyi artırdı. Komanda ilə Agile metodologiyası üzrə işlədi.' },
    { id:'e3', jobTitle:'Kiçik QA Mühəndisi',      company:'Amazon',    city:'Bakı', country:'Azərbaycan', startMonth:'1', startYear:'2019', endMonth:'2',  endYear:'2021', current:false, description:'Müxtəlif relizlər üzrə QA problemlərinin həllinə cavabdeh oldu. Daxili müştəri sistemlərinin saxlanılmasını təmin etdi.' },
  ],
  education: [
    { id:'edu1', institutionType:'university' as const, institutionTypeCustom:'', school:'ADA Universiteti',          degree:'Kompüter Elmləri, Magistr',      educationLevel:'Magistr',  city:'Bakı', country:'Azərbaycan', startYear:'2022', endYear:'2024' },
    { id:'edu2', institutionType:'university' as const, institutionTypeCustom:'', school:'Bakı Dövlət Universiteti',  degree:'Tətbiqi Riyaziyyat, Bakalavr',    educationLevel:'Bakalavr', city:'Bakı', country:'Azərbaycan', startYear:'2015', endYear:'2019' },
  ],
  skills: ['Playwright', 'Selenium', 'Postman', 'RestAssured', 'GitHub', 'Agile/Scrum', 'SQL', 'JIRA'],
  languages: [
    { id:'l1', name:'Azərbaycan dili', level:'Ana dili' },
    { id:'l2', name:'İngilis dili',    level:'B2' },
    { id:'l3', name:'Rus dili',        level:'B1' },
  ],
  certificates: [
    { id:'c1', name:'ISTQB Foundation Level',     issuer:'Coursera', year:'2022' },
    { id:'c2', name:'Automation QA Certificate',  issuer:'Udemy',    year:'2023' },
    { id:'c3', name:'AWS Cloud Practitioner',     issuer:'Amazon',   year:'2023' },
  ],
  trainings: [
    { id:'t1', name:'QA Avtomasiya Bootcamp',     provider:'Narix Academy',              year:'2022', description:'Selenium, Playwright, TestNG' },
    { id:'t2', name:'Qabaqcıl API Testi',          provider:'Test Automation University', year:'2023', description:'REST, GraphQL, Postman' },
    { id:'t3', name:'Jenkins ilə CI/CD',           provider:'Udemy',                      year:'2023', description:'Jenkins, GitHub Actions' },
  ],
  additional: 'GitHub: github.com/anarmammadov',
};

const DEMO_CV_EN: CVData = {
  personal: {
    firstName: 'Anar', lastName: 'Mammadov', email: 'anar.mammadov@gmail.com',
    phone: '+99451 123 45 67', city: 'Baku', country: 'Azerbaijan',
    jobTitle: 'QA Automation Engineer', photo: '',
    linkedin: 'linkedin.com/in/anarmammadly',
    summary: 'Results-driven QA Automation Engineer experienced in Playwright, Selenium and Postman. Brings strong analytical thinking and effective collaboration to improve product quality.',
  },
  experience: [
    { id:'e1', jobTitle:'QA Automation Engineer', company:'Google',    city:'Baku', country:'Azerbaijan', startMonth:'8', startYear:'2023', endMonth:'',  endYear:'',     current:true,  description:'Built test automation frameworks using Playwright and Selenium. Conducted API testing with Postman. Managed source control workflows through GitHub.' },
    { id:'e2', jobTitle:'QA Engineer',            company:'Microsoft', city:'Baku', country:'Azerbaijan', startMonth:'3', startYear:'2021', endMonth:'7',  endYear:'2023', current:false, description:'Improved efficiency by developing and maintaining automation systems. Collaborated with cross-functional teams using Agile methodology.' },
    { id:'e3', jobTitle:'Junior QA Engineer',     company:'Amazon',    city:'Baku', country:'Azerbaijan', startMonth:'1', startYear:'2019', endMonth:'2',  endYear:'2021', current:false, description:'Resolved QA issues across multiple product releases. Maintained and supported internal customer-facing systems.' },
  ],
  education: [
    { id:'edu1', institutionType:'university' as const, institutionTypeCustom:'', school:'ADA University',         degree:"Computer Science, Master's",       educationLevel:"Master's",   city:'Baku', country:'Azerbaijan', startYear:'2022', endYear:'2024' },
    { id:'edu2', institutionType:'university' as const, institutionTypeCustom:'', school:'Baku State University',  degree:"Applied Mathematics, Bachelor's",  educationLevel:"Bachelor's", city:'Baku', country:'Azerbaijan', startYear:'2015', endYear:'2019' },
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
  const [showLimitModal, setShowLimitModal] = useState(false);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
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
    setCVData(lang === 'az' ? DEMO_CV_AZ : DEMO_CV_EN);
    setDemoActive(true);
    setTimeout(() => setDemoActive(false), 2000);
  };

  const registerDownload = () => {
    // DB-də CV sayını artır
    fetch('/api/cv-download', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: user!.id }),
    })
      .then(r => r.json())
      .then(data => { if (data.ok) setUser({ ...user!, cvCount: data.cvCount }); })
      .catch(() => setUser({ ...user!, cvCount: user!.cvCount + 1 }));

    setPdfSuccess(true);
    setTimeout(() => setPdfSuccess(false), 2500);
  };

  const isMobileDevice = () =>
    typeof navigator !== 'undefined' && /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  // ── Mobil (iOS/Android): birbaşa A4 PDF generasiya edib yükləyir, native print
  // dialoqundan istifadə etmir (ikisində də çap interfeysi qeyri-sabit/səliqəsizdir) ──
  const handleDownloadMobile = async () => {
    const el = previewRef.current;
    if (!el) return;
    setPdfLoading(true);
    // Clone into a detached node (like the desktop print path) instead of mutating the live
    // React-controlled ref directly — React re-renders (triggered by setPdfLoading above) would
    // otherwise reset any inline style we set on it back to its original off-screen position.
    const clone = el.cloneNode(true) as HTMLElement;
    clone.id = '__cv_mobile_pdf_root__';
    clone.style.cssText = `position:absolute;top:${window.scrollY}px;left:${window.scrollX}px;visibility:visible;z-index:9998;pointer-events:none;`;
    document.body.appendChild(clone);
    try {
      const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
        import('html2canvas'),
        import('jspdf'),
      ]);
      if (typeof document !== 'undefined' && 'fonts' in document) await document.fonts.ready;
      const pages = Array.from(clone.querySelectorAll<HTMLElement>('.__print_page'));
      const pdf = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' });
      for (let i = 0; i < pages.length; i++) {
        const canvas = await html2canvas(pages[i], { scale: 2, useCORS: true, backgroundColor: '#ffffff' });
        const imgData = canvas.toDataURL('image/jpeg', 0.95);
        if (i > 0) pdf.addPage();
        pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297);
      }
      const fn = cvData.personal.firstName.trim();
      const ln = cvData.personal.lastName.trim();
      const filename = ([fn, ln].filter(Boolean).join('-') || 'CV') + '-bircv.az.pdf';
      pdf.save(filename);
      registerDownload();
    } finally {
      document.body.removeChild(clone);
      setPdfLoading(false);
    }
  };

  // ── Desktop: brauzerin native çap dialoqu (Save as PDF) ──
  const handleDownloadDesktop = () => {
    const el = previewRef.current;
    if (!el) return;

    // CVPreview artıq previewRef daxilində nəzarət olunan səhifə sayı qədər,
    // hər biri dəqiq 210mm×297mm ölçüdə, overflow:hidden olan səhifə qutuları render edir
    // (ekranda göstərilən "vərəq-vərəq" önizləmə ilə tam eyni sayda). Çapda brauzerin öz
    // pagination alqoritminə güvənmirik — bu, ekranla çap nəticəsi arasında uyğunsuzluq
    // (məs. boş 2-ci səhifə) yaranmasının qarşısını tam kəsir.
    const clone = el.cloneNode(true) as HTMLElement;
    clone.id = '__cv_print_root__';
    clone.style.cssText = 'position:absolute;top:0;left:0;visibility:visible;';
    document.body.appendChild(clone);

    const style = document.createElement('style');
    style.id = '__cv_print_style__';
    style.textContent = [
      '@media print {',
      '  @page { size:A4; margin:0; }',
      '  html, body { margin:0!important; padding:0!important; }',
      '  body > *:not(#__cv_print_root__) { display:none!important; }',
      '  #__cv_print_root__ { display:block!important; position:absolute!important; top:0!important; left:0!important; visibility:visible!important; }',
      '  #__cv_print_root__ .__print_page { break-inside:avoid; }',
      '  * { -webkit-print-color-adjust:exact!important; print-color-adjust:exact!important; }',
      '}',
    ].join('\n');
    document.head.appendChild(style);

    // PDF fayl adı: "Ad-Soyad-bircv.az"
    const fn = cvData.personal.firstName.trim();
    const ln = cvData.personal.lastName.trim();
    const prevTitle = document.title;
    if (fn || ln) {
      document.title = [fn, ln].filter(Boolean).join('-') + '-bircv.az';
    }

    window.print();
    document.title = prevTitle;

    document.body.removeChild(clone);
    const s = document.getElementById('__cv_print_style__');
    if (s) s.remove();

    registerDownload();
  };

  const handleDownload = () => {
    if (!user) { setAuthMode('register'); setShowAuthModal(true); return; }
    if (user.plan !== 'admin' && user.plan === 'free' && user.cvCount >= 2) {
      setShowLimitModal(true);
      return;
    }
    // Premium şablon yalnız premium/admin plana sahib istifadəçilər üçün yüklənə bilər —
    // selectedTemplate UI-da seçilə bilsə də (önizləmə üçün), endirmə anında yenidən yoxlanılır.
    const isPremiumTemplate = TEMPLATES.find(t => t.id === selectedTemplate)?.premium;
    if (isPremiumTemplate && user.plan !== 'premium' && user.plan !== 'admin') {
      setShowPremiumModal(true);
      return;
    }

    if (isMobileDevice()) {
      handleDownloadMobile();
    } else {
      handleDownloadDesktop();
    }
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

  // ── Limit modal ──────────────────────────────────────────────────────────
  const limitModal = showLimitModal && (
    <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.75)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:2000, padding:'0 16px' }}>
      <div style={{ background:'#111118', border:'1px solid rgba(255,255,255,0.1)', borderRadius:20, padding:32, maxWidth:400, width:'100%', textAlign:'center' }}>
        <div style={{ width:56, height:56, borderRadius:'50%', background:'rgba(124,110,248,0.15)', border:'2px solid rgba(124,110,248,0.3)', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 16px' }}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#7C6EF8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2z"/>
          </svg>
        </div>
        <h2 style={{ color:'#fff', fontSize:20, fontWeight:800, margin:'0 0 10px' }}>
          {lang==='az' ? 'CV limitinə çatdınız' : 'CV limit reached'}
        </h2>
        <p style={{ color:'rgba(255,255,255,0.55)', fontSize:14, lineHeight:1.6, margin:'0 0 24px' }}>
          {lang==='az'
            ? 'Pulsuz planda 2 CV yükləmək mümkündür. Limitsiz CV üçün Premium plana keçin.'
            : 'Free plan allows 2 CV downloads. Upgrade to Premium for unlimited CVs.'}
        </p>
        <a href="/pricing" style={{ display:'block', background:'#7C6EF8', color:'#fff', borderRadius:12, padding:'13px 0', fontSize:15, fontWeight:700, textDecoration:'none', marginBottom:12 }}>
          {lang==='az' ? '✨ Premium-a keç' : '✨ Upgrade to Premium'}
        </a>
        <button onClick={()=>setShowLimitModal(false)} style={{ background:'transparent', border:'1px solid rgba(255,255,255,0.15)', color:'rgba(255,255,255,0.5)', borderRadius:12, padding:'11px 0', fontSize:14, cursor:'pointer', width:'100%' }}>
          {lang==='az' ? 'Bağla' : 'Close'}
        </button>
      </div>
    </div>
  );

  // ── Premium şablon modal ────────────────────────────────────────────────────
  const premiumModal = showPremiumModal && (
    <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.75)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:2000, padding:'0 16px' }}>
      <div style={{ background:'#111118', border:'1px solid rgba(255,255,255,0.1)', borderRadius:20, padding:32, maxWidth:400, width:'100%', textAlign:'center' }}>
        <div style={{ width:56, height:56, borderRadius:'50%', background:'rgba(255,214,10,0.12)', border:'2px solid rgba(255,214,10,0.3)', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 16px' }}>
          <Lock size={24} style={{ color: '#FFD60A' }} />
        </div>
        <h2 style={{ color:'#fff', fontSize:20, fontWeight:800, margin:'0 0 10px' }}>
          {lang==='az' ? 'Bu şablon Premium-dur' : 'This template is Premium'}
        </h2>
        <p style={{ color:'rgba(255,255,255,0.55)', fontSize:14, lineHeight:1.6, margin:'0 0 24px' }}>
          {lang==='az'
            ? 'Bu şablonla CV yükləmək üçün Premium plana keçməlisiniz. Pulsuz plan üçün başqa şablon seçin.'
            : 'Downloading with this template requires Premium. Choose a free template, or upgrade.'}
        </p>
        <a href="/pricing" style={{ display:'block', background:'#7C6EF8', color:'#fff', borderRadius:12, padding:'13px 0', fontSize:15, fontWeight:700, textDecoration:'none', marginBottom:12 }}>
          {lang==='az' ? '✨ Premium-a keç' : '✨ Upgrade to Premium'}
        </a>
        <button onClick={()=>setShowPremiumModal(false)} style={{ background:'transparent', border:'1px solid rgba(255,255,255,0.15)', color:'rgba(255,255,255,0.5)', borderRadius:12, padding:'11px 0', fontSize:14, cursor:'pointer', width:'100%' }}>
          {lang==='az' ? 'Bağla' : 'Close'}
        </button>
      </div>
    </div>
  );

  // ── PDF generasiya overlay (mobil) ──────────────────────────────────────────
  const pdfOverlay = pdfLoading && (
    <div style={{ position: 'fixed', inset: 0, background: '#0a0a0f', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14, zIndex: 9999 }}>
      <div style={{ width: 40, height: 40, border: '3px solid rgba(124,110,248,0.25)', borderTopColor: '#7C6EF8', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
      <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14, fontWeight: 600, margin: 0 }}>
        {lang === 'az' ? 'PDF hazırlanır...' : 'Generating PDF...'}
      </p>
    </div>
  );

  // ── Mobile layout ─────────────────────────────────────────────────────────
  if (isMobile) {
    return (
      <div style={{ minHeight: '100vh', background: '#0a0a0f' }}>
        <Navbar />
        <AuthModal />
        <ChatWidget />
        {limitModal}
        {premiumModal}
        {pdfOverlay}
        <div style={{ padding: '16px 14px' }}>
          {TopBar()}
          {MobileTabs()}
          {mobileTab === 'form' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <CVForm />
              <ServicesPanel />
            </div>
          ) : (
            PreviewPanel()
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
      {limitModal}
      {premiumModal}
      {pdfOverlay}
      <div style={{
        maxWidth: 1440, margin: '0 auto', padding: '24px 20px',
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
        gap: 24, alignItems: 'start',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {TopBar()}
          <CVForm />
          <ServicesPanel />
        </div>
        <div style={{ position: 'sticky', top: 80, display: 'flex', flexDirection: 'column', gap: 16 }}>
          {PreviewPanel()}
        </div>
      </div>
    </div>
  );
}

export default function CreateClient() {
  return <CVProvider><CreatePageInner /></CVProvider>;
}
