'use client';
import Link from 'next/link';
import { CVProvider, useCVStore } from '@/app/store/cvStore';
import Navbar from '@/app/components/Navbar';
import AuthModal from '@/app/components/AuthModal';
import ChatWidget from '@/app/components/ChatWidget';
import { waLink, SUPPORT_EMAIL } from '@/lib/config';


function PricingInner() {
  const { lang } = useCVStore();

  const plans = [
    {
      name: lang === 'az' ? 'Pulsuz' : 'Free', price: 0, period: '',
      color: '#374151', highlight: false,
      features: [
        lang === 'az' ? '✓ 2 CV hazırla' : '✓ Create 2 CVs',
        lang === 'az' ? '✓ 6 pulsuz şablon' : '✓ 6 free templates',
        lang === 'az' ? '✓ AI mətn yaratma' : '✓ AI text generation',
        lang === 'az' ? '✓ PDF yüklə' : '✓ Download PDF',
        lang === 'az' ? '✗ Premium şablonlar' : '✗ Premium templates',
        lang === 'az' ? '✗ HR dəstəyi' : '✗ HR support',
      ],
      cta: lang === 'az' ? 'Pulsuz Başla' : 'Start Free',
      href: '/create',
      wa: null,
    },
    {
      name: 'Premium', price: 20, period: lang === 'az' ? '/ay' : '/mo',
      color: '#7C6EF8', highlight: true,
      features: [
        lang === 'az' ? '✓ Limitsiz CV' : '✓ Unlimited CVs',
        lang === 'az' ? '✓ Bütün şablonlar' : '✓ All templates',
        lang === 'az' ? '✓ AI mətn yaratma' : '✓ AI text generation',
        lang === 'az' ? '✓ PDF yüklə' : '✓ Download PDF',
        lang === 'az' ? '✓ Prioritet dəstək' : '✓ Priority support',
        lang === 'az' ? '✓ Yeni şablonlara erkən giriş' : '✓ Early access to new templates',
      ],
      cta: lang === 'az' ? 'Premium Al' : 'Get Premium',
      href: null,
      wa: lang === 'az' ? 'Salam! Premium abunəliyi almaq istəyirəm (20 AZN/ay).' : 'Hello! I want to get Premium subscription (20 AZN/mo).',
    },
  ];

  const oneTime = [
    {
      icon: 'consult',
      title: lang === 'az' ? 'HR Onlayn Konsultasiya' : 'HR Online Consultation',
      price: null,
      desc: lang === 'az' ? 'Professional HR mütəxəssisi ilə 30 dəqiqəlik video görüş.' : '30-minute video call with an HR specialist.',
      wa: lang === 'az' ? 'Salam! HR Onlayn Konsultasiya xidməti haqqında sorğum var.' : 'Hello! I have an inquiry about the HR Online Consultation service.',
    },
    {
      icon: 'write',
      title: lang === 'az' ? 'Professional HR CV Yazımı' : 'Professional HR CV Writing',
      price: 15,
      desc: lang === 'az' ? 'HR mütəxəssisi CV-nizi sıfırdan yazır. 2 iş günü.' : 'An HR specialist writes your CV from scratch. 2 business days.',
      wa: lang === 'az' ? 'Salam! Professional HR CV Yazımı sifariş etmək istəyirəm (15 AZN).' : 'Hello! I want to order Professional HR CV Writing (15 AZN).',
    },
    {
      icon: 'doc',
      title: lang === 'az' ? 'Əlavə CV' : 'Extra CV',
      price: 5,
      desc: lang === 'az' ? 'CV hazırlamaq (pulsuz plan üçün).' : 'Create an extra CV (for free plan).',
      wa: lang === 'az' ? 'Salam! Əlavə CV sifariş etmək istəyirəm (5 AZN).' : 'Hello! I want to order Extra CV (5 AZN).',
    },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0f' }}>
      <Navbar />
      <AuthModal />
      <ChatWidget />

      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '60px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <h1 style={{ fontSize: 42, fontWeight: 900, color: '#fff', marginBottom: 14 }}>
            {lang === 'az' ? 'Sadə Qiymətlər' : 'Simple Pricing'}
          </h1>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.5)' }}>
            {lang === 'az' ? 'Gizli ödənişlər yoxdur. İstənilən vaxt ləğv edin.' : 'No hidden fees. Cancel anytime.'}
          </p>
        </div>

        {/* Plans */}
        <div className="grid-resp-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'stretch', gap: 20, marginBottom: 60, maxWidth: 700, margin: '0 auto 60px' }}>
          {plans.map(plan => (
            <div key={plan.name} style={{
              background: plan.highlight ? 'rgba(124,110,248,0.08)' : '#111118',
              border: `1px solid ${plan.highlight ? 'rgba(124,110,248,0.4)' : 'rgba(255,255,255,0.08)'}`,
              borderRadius: 20, padding: '32px 24px', position: 'relative',
              display: 'flex', flexDirection: 'column', height: '100%'
            }}>
              {plan.highlight && (
                <div style={{ position:'absolute', top:-14, left:'50%', transform:'translateX(-50%)', background:'#7C6EF8', color:'#fff', fontSize:12, fontWeight:700, padding:'4px 16px', borderRadius:20, whiteSpace:'nowrap' }}>
                  {lang === 'az' ? '⭐ Tövsiyə edilir' : '⭐ Recommended'}
                </div>
              )}
              <h2 style={{ fontSize:20, fontWeight:800, color:'#fff', marginBottom:8 }}>{plan.name}</h2>
              <div style={{ fontSize:32, fontWeight:900, color:plan.color, marginBottom:24, whiteSpace:'nowrap' }}>
                {plan.price} AZN<span style={{ fontSize:16, fontWeight:500, color:'rgba(255,255,255,0.4)' }}>{plan.period}</span>
              </div>
              <div style={{ display:'flex', flexDirection:'column', gap:10, marginBottom:28 }}>
                {plan.features.map(f => (
                  <div key={f} style={{ fontSize:13.5, color: f.startsWith('✓') ? '#fff' : 'rgba(255,255,255,0.25)' }}>{f}</div>
                ))}
              </div>
              {plan.href ? (
                <Link href={plan.href} style={{ display:'block', textAlign:'center', background:'transparent', border:`1px solid ${plan.color}`, color:'#fff', textDecoration:'none', borderRadius:10, padding:'12px', fontSize:14, fontWeight:700, marginTop:'auto' }}>
                  {plan.cta}
                </Link>
              ) : (
                <a href={waLink(plan.wa!)} target="_blank" rel="noopener noreferrer" style={{ display:'block', textAlign:'center', background:plan.color, color:'#fff', textDecoration:'none', borderRadius:10, padding:'12px', fontSize:14, fontWeight:700, marginTop:'auto' }}>
                  {plan.cta}
                </a>
              )}
            </div>
          ))}
        </div>

        {/* One-time services */}
        <h2 style={{ fontSize:28, fontWeight:800, color:'#fff', textAlign:'center', marginBottom:8 }}>
          {lang === 'az' ? 'Əlavə Xidmətlər' : 'Extra Services'}
        </h2>
        <p style={{ textAlign:'center', color:'rgba(255,255,255,0.45)', marginBottom:32, fontSize:14 }}>
          {lang === 'az' ? 'Bir dəfəlik ödənişlər' : 'One-time payments'}
        </p>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(220px, 1fr))', gap:16 }}>
          {oneTime.map(svc => (
            <div key={svc.title} style={{ display:'flex', flexDirection:'column', background:'#111118', border:'1px solid rgba(255,255,255,0.08)', borderRadius:16, padding:'24px 20px' }}>
              <div style={{ width:46, height:46, borderRadius:12, background:'rgba(124,110,248,0.12)', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:14 }}>
                {svc.icon === 'consult' && <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#a89ef8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>}
                {svc.icon === 'write' && <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#a89ef8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4z"/></svg>}
                {svc.icon === 'doc' && <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#a89ef8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>}
              </div>
              <h3 style={{ fontSize:15, fontWeight:700, color:'#fff', marginBottom:8 }}>{svc.title}</h3>
              <p style={{ fontSize:12.5, color:'rgba(255,255,255,0.45)', lineHeight:1.6, marginBottom:16 }}>{svc.desc}</p>
              <div style={{ fontSize:24, fontWeight:800, color:'#7C6EF8', marginBottom:12 }}>
                {svc.price != null ? `${svc.price} AZN` : (lang === 'az' ? 'Təklif al' : 'Get a quote')}
              </div>
              <a
                href={waLink(svc.wa)}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display:'block', textAlign:'center', background:'rgba(124,110,248,0.15)', border:'1px solid rgba(124,110,248,0.3)', color:'#a89ef8', borderRadius:8, padding:'10px', fontSize:13, fontWeight:600, textDecoration:'none', marginTop:'auto' }}
              >
                {lang === 'az' ? 'Təklif al' : 'Get a quote'}
              </a>
            </div>
          ))}
        </div>

        <div style={{ textAlign:'center', marginTop:48, padding:'24px', background:'rgba(255,255,255,0.02)', borderRadius:16, border:'1px solid rgba(255,255,255,0.06)' }}>
          <p style={{ color:'rgba(255,255,255,0.55)', fontSize:14, marginBottom:4 }}>
            {lang === 'az' ? 'Suallarınız üçün bizimlə əlaqə saxlayın' : 'Contact us for any questions'}
          </p>
          <a href={`mailto:${SUPPORT_EMAIL}`} style={{ color:'#7C6EF8', textDecoration:'none', fontSize:15, fontWeight:700 }}>{SUPPORT_EMAIL}</a>
        </div>
      </div>
    </div>
  );
}

export default function PricingPage() {
  return <CVProvider><PricingInner /></CVProvider>;
}
