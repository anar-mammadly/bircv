'use client';
import Link from 'next/link';
import { CVProvider, useCVStore } from '@/app/store/cvStore';
import Navbar from '@/app/components/Navbar';
import AuthModal from '@/app/components/AuthModal';
import ChatWidget from '@/app/components/ChatWidget';

function PricingInner() {
  const { lang } = useCVStore();

  const plans = [
    {
      name: lang === 'az' ? 'Pulsuz' : 'Free', price: 0, period: '',
      color: '#374151', highlight: false,
      features: [
        lang === 'az' ? '✓ 1 CV hazırla' : '✓ Create 1 CV',
        lang === 'az' ? '✓ 6 pulsuz şablon' : '✓ 6 free templates',
        lang === 'az' ? '✓ AI mətn yaratma' : '✓ AI text generation',
        lang === 'az' ? '✓ PDF yüklə' : '✓ Download PDF',
        lang === 'az' ? '✗ Premium şablonlar' : '✗ Premium templates',
        lang === 'az' ? '✗ HR dəstəyi' : '✗ HR support',
      ],
      cta: lang === 'az' ? 'Pulsuz Başla' : 'Start Free',
    },
    {
      name: 'Premium', price: 20, period: lang === 'az' ? '/ay' : '/mo',
      color: '#7C6EF8', highlight: true,
      features: [
        lang === 'az' ? '✓ Sınırsız CV' : '✓ Unlimited CVs',
        lang === 'az' ? '✓ Bütün şablonlar' : '✓ All templates',
        lang === 'az' ? '✓ AI mətn yaratma' : '✓ AI text generation',
        lang === 'az' ? '✓ PDF yüklə' : '✓ Download PDF',
        lang === 'az' ? '✓ Prioritet dəstək' : '✓ Priority support',
        lang === 'az' ? '✓ Yeni şablonlara erkən giriş' : '✓ Early access to new templates',
      ],
      cta: lang === 'az' ? 'Premium Al' : 'Get Premium',
    },
  ];

  const oneTime = [
    { icon: '🎯', title: lang === 'az' ? 'HR Onlayn Konsultasiya' : 'HR Online Consultation', price: 20, desc: lang === 'az' ? 'Professional HR mütəxəssisi ilə 30 dəqiqəlik video görüş. CV-nizi birlikdə nəzərdən keçirin.' : '30-minute video call with an HR specialist. Review your CV together.' },
    { icon: '✍️', title: lang === 'az' ? 'Professional HR CV Yazımı' : 'Professional HR CV Writing', price: 15, desc: lang === 'az' ? 'HR mütəxəssisi CV-nizi sıfırdan yazır. 2 iş günü.' : 'An HR specialist writes your CV from scratch. 2 business days.' },
    { icon: '📄', title: lang === 'az' ? '2-ci CV (Free Plan)' : '2nd CV (Free Plan)', price: 5, desc: lang === 'az' ? 'Eyni hesabla ikinci CV hazırlamaq hüququ.' : 'Permission to create a second CV on the same account.' },
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
        <div className="grid-resp-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 60, maxWidth: 700, margin: '0 auto 60px' }}>
          {plans.map(plan => (
            <div key={plan.name} style={{
              background: plan.highlight ? 'rgba(124,110,248,0.08)' : '#111118',
              border: `1px solid ${plan.highlight ? 'rgba(124,110,248,0.4)' : 'rgba(255,255,255,0.08)'}`,
              borderRadius: 20, padding: '32px 24px', position: 'relative'
            }}>
              {plan.highlight && (
                <div style={{ position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)', background: '#7C6EF8', color: '#fff', fontSize: 12, fontWeight: 700, padding: '4px 16px', borderRadius: 20 }}>
                  {lang === 'az' ? '⭐ Tövsiyə edilir' : '⭐ Recommended'}
                </div>
              )}
              <h2 style={{ fontSize: 20, fontWeight: 800, color: '#fff', marginBottom: 8 }}>{plan.name}</h2>
              <div style={{ fontSize: 40, fontWeight: 900, color: plan.color, marginBottom: 24 }}>
                {plan.price} AZN<span style={{ fontSize: 16, fontWeight: 500, color: 'rgba(255,255,255,0.4)' }}>{plan.period}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
                {plan.features.map(f => (
                  <div key={f} style={{ fontSize: 13.5, color: f.startsWith('✓') ? '#fff' : 'rgba(255,255,255,0.25)' }}>{f}</div>
                ))}
              </div>
              <Link href="/create" style={{
                display: 'block', textAlign: 'center',
                background: plan.highlight ? '#7C6EF8' : 'transparent',
                border: `1px solid ${plan.color}`,
                color: '#fff', textDecoration: 'none', borderRadius: 10,
                padding: '12px', fontSize: 14, fontWeight: 700
              }}>
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        {/* One-time services */}
        <h2 style={{ fontSize: 28, fontWeight: 800, color: '#fff', textAlign: 'center', marginBottom: 8 }}>
          {lang === 'az' ? 'Əlavə Xidmətlər' : 'Extra Services'}
        </h2>
        <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.45)', marginBottom: 32, fontSize: 14 }}>
          {lang === 'az' ? 'Bir dəfəlik ödənişlər' : 'One-time payments'}
        </p>

        <div className="grid-resp-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {oneTime.map(svc => (
            <div key={svc.title} style={{ background: '#111118', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: '24px 20px' }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>{svc.icon}</div>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 8 }}>{svc.title}</h3>
              <p style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.45)', lineHeight: 1.6, marginBottom: 16 }}>{svc.desc}</p>
              <div style={{ fontSize: 24, fontWeight: 800, color: '#7C6EF8', marginBottom: 12 }}>{svc.price} AZN</div>
              <button
                onClick={() => alert(lang === 'az' ? `"${svc.title}" sifarişi üçün support@bircv.az ilə əlaqə saxlayın` : `Contact support@bircv.az to order "${svc.title}"`)}
                style={{ width: '100%', background: 'rgba(124,110,248,0.15)', border: '1px solid rgba(124,110,248,0.3)', color: '#a89ef8', borderRadius: 8, padding: '10px', cursor: 'pointer', fontSize: 13, fontWeight: 600 }}
              >
                {lang === 'az' ? 'Sifariş et' : 'Order'}
              </button>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 48, padding: '24px', background: 'rgba(255,255,255,0.02)', borderRadius: 16, border: '1px solid rgba(255,255,255,0.06)' }}>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 14, marginBottom: 4 }}>
            💬 {lang === 'az' ? 'Suallarınız üçün bizimlə əlaqə saxlayın' : 'Contact us for any questions'}
          </p>
          <a href="mailto:support@bircv.az" style={{ color: '#7C6EF8', textDecoration: 'none', fontSize: 15, fontWeight: 700 }}>support@bircv.az</a>
        </div>
      </div>
    </div>
  );
}

export default function PricingPage() {
  return <CVProvider><PricingInner /></CVProvider>;
}
