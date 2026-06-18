'use client';
import Link from 'next/link';
import { CVProvider } from '@/app/store/cvStore';
import { useCVStore } from '@/app/store/cvStore';
import Navbar from '@/app/components/Navbar';
import AuthModal from '@/app/components/AuthModal';
import ChatWidget from '@/app/components/ChatWidget';
import { Sparkles } from 'lucide-react';

function LandingInner() {
  const { lang } = useCVStore();

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0f' }}>
      <Navbar />
      <AuthModal />
      <ChatWidget />

      {/* HERO */}
      <section className="hero-pad" style={{ textAlign: 'center', padding: '80px 24px 60px', maxWidth: 800, margin: '0 auto' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: 'rgba(124,110,248,0.12)', border: '1px solid rgba(124,110,248,0.3)',
          borderRadius: 40, padding: '6px 18px', marginBottom: 32
        }}>
          <Sparkles size={14} style={{ color: '#7C6EF8' }} />
          <span style={{ fontSize: 13.5, color: '#a89ef8', fontWeight: 600 }}>AI ilə gücləndirilib</span>
        </div>

        <h1 style={{ fontSize: 'clamp(36px, 6vw, 64px)', fontWeight: 900, lineHeight: 1.1, color: '#fff', marginBottom: 24, letterSpacing: -1.5 }}>
          {lang === 'az' ? (
            <span>Peşəkar CV-ni <span style={{ background: 'linear-gradient(135deg, #7C6EF8, #a89ef8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>dəqiqələr içində</span> yarat</span>
          ) : (
            <span>Create a professional CV <span style={{ background: 'linear-gradient(135deg, #7C6EF8, #a89ef8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>in minutes</span></span>
          )}
        </h1>

        <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.55)', maxWidth: 520, margin: '0 auto 40px', lineHeight: 1.7 }}>
          {lang === 'az' ? 'AI dəstəyi ilə təcrübənizi və bacarıqlarınızı peşəkar CV formatında təqdim edin, hazır CV-nizi isə dərhal PDF olaraq yükləyin.' : 'Use AI to professionally write your work experience and download a PDF instantly.'}
        </p>

        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/create" style={{ background: '#7C6EF8', color: '#fff', textDecoration: 'none', borderRadius: 12, padding: '14px 28px', fontSize: 15, fontWeight: 700 }}>
            <Sparkles size={16} style={{ display: 'inline', verticalAlign: '-3px', marginRight: 6 }} />{lang === 'az' ? 'CV Yaratmağa Başla' : 'Start Creating CV'}
          </Link>
          <Link href="/templates" style={{ background: 'transparent', color: '#fff', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 12, padding: '14px 28px', fontSize: 15, fontWeight: 600 }}>
            {lang === 'az' ? 'Nümunələrə bax' : 'View Examples'}
          </Link>
        </div>
      </section>


      {/* Stats */}
      <section className="grid-resp-4" style={{ maxWidth: 800, margin: '0 auto', padding: '0 24px 80px', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16 }}>
        {[{ val: '2 dq', label: lang === 'az' ? 'ortalama vaxt' : 'average time' }, { val: '6+', label: lang === 'az' ? 'CV şablonu' : 'CV templates' }, { val: 'AI', label: lang === 'az' ? 'mətn yaradır' : 'generates text' }, { val: 'PDF', label: lang === 'az' ? 'anında yüklə' : 'instant download' }].map(s => (
          <div key={s.val} style={{ background: '#111118', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, padding: '20px 16px', textAlign: 'center' }}>
            <div style={{ fontSize: 24, fontWeight: 900, color: '#7C6EF8', marginBottom: 4 }}>{s.val}</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)' }}>{s.label}</div>
          </div>
        ))}
      </section>

      {/* HOW IT WORKS */}
      <section id="how" style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px 100px' }}>
        <h2 style={{ textAlign: 'center', fontSize: 32, fontWeight: 800, color: '#fff', marginBottom: 48 }}>{lang === 'az' ? 'Necə işləyir?' : 'How it works?'}</h2>
        <div className="grid-resp-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
          {[
            { num: '01', title: lang === 'az' ? 'Məlumatları daxil et' : 'Enter your info', desc: lang === 'az' ? 'Formu doldurun, şəkil yükləyin' : 'Fill the form and upload a photo' },
            { num: '02', title: lang === 'az' ? 'AI ilə yaz' : 'Write with AI', desc: lang === 'az' ? 'Bir düyməylə peşəkar mətn' : 'Professional text with one click' },
            { num: '03', title: lang === 'az' ? 'PDF yüklə' : 'Download PDF', desc: lang === 'az' ? 'Anında hazır, işə müraciət et' : 'Instantly ready to apply' },
          ].map(step => (
            <div key={step.num} style={{ background: '#111118', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: '28px 24px' }}>
              <div style={{ fontSize: 36, fontWeight: 900, color: 'rgba(124,110,248,0.3)', marginBottom: 12 }}>{step.num}</div>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 8 }}>{step.title}</h3>
              <p style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.45)', lineHeight: 1.6, margin: 0 }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section style={{ background: '#111118', borderTop: '1px solid rgba(255,255,255,0.07)', padding: '60px 24px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 30, fontWeight: 800, color: '#fff', marginBottom: 12 }}>{lang === 'az' ? 'Planlar & Xidmətlər' : 'Plans & Services'}</h2>
          <p style={{ color: 'rgba(255,255,255,0.45)', marginBottom: 40, fontSize: 15 }}>{lang === 'az' ? 'Pulsuz başla, istədiyin zaman yüksəlt' : 'Start free, upgrade anytime'}</p>
          <div className="grid-resp-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
            {[
              { name: lang === 'az' ? 'Pulsuz' : 'Free', price: '0', showPrice: true, features: ['1 CV', lang === 'az' ? '3 pulsuz şablon' : '3 free templates', 'PDF yüklə'], color: '#374151', highlight: false },
              { name: 'Premium', price: '20', showPrice: true, features: [lang === 'az' ? 'Limitsiz CV' : 'Unlimited CVs', lang === 'az' ? 'Bütün şablonlar' : 'All templates', 'HR Dəstəyi'], color: '#7C6EF8', highlight: true },
              { name: 'HR', price: lang === 'az' ? 'Təklif al' : 'Get a quote', showPrice: false, features: [lang === 'az' ? 'CV Yazılması' : 'CV writing', lang === 'az' ? 'Onlayn konsultasiya' : 'Online consultation', lang === 'az' ? 'Ekspert rəyi' : 'Expert review'], color: '#059669', highlight: false },
            ].map(plan => (
              <div key={plan.name} style={{ background: plan.highlight ? 'rgba(124,110,248,0.08)' : 'rgba(255,255,255,0.03)', border: `1px solid ${plan.highlight ? 'rgba(124,110,248,0.4)' : 'rgba(255,255,255,0.08)'}`, borderRadius: 16, padding: '28px 20px', position: 'relative' }}>
                {plan.highlight && <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: '#7C6EF8', color: '#fff', fontSize: 11, fontWeight: 700, padding: '3px 12px', borderRadius: 20 }}>{lang === 'az' ? 'Tövsiyə edilir' : 'Recommended'}</div>}
                <div style={{ fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 8 }}>{plan.name}</div>
                <div style={{ fontSize: 30, fontWeight: 900, color: plan.color, marginBottom: 16 }}>{plan.price}{plan.showPrice && <span style={{ fontSize: 14, fontWeight: 500, color: 'rgba(255,255,255,0.4)' }}> AZN</span>}</div>
                {plan.features.map(f => <div key={f} style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', padding: '5px 0', borderBottom: '1px solid rgba(255,255,255,0.05)', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ color: plan.color }}>✓</span>{f}</div>)}
                <Link href="/create" style={{ display: 'block', textAlign: 'center', marginTop: 20, background: plan.highlight ? '#7C6EF8' : 'transparent', border: `1px solid ${plan.color}`, color: '#fff', textDecoration: 'none', borderRadius: 8, padding: '10px', fontSize: 13, fontWeight: 600 }}>{lang === 'az' ? 'Başla' : 'Get Started'}</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '24px', textAlign: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, marginBottom: 8 }}>
          <span style={{ fontSize: 18, fontWeight: 800, color: '#fff' }}>bir</span>
          <span style={{ fontSize: 18, fontWeight: 800, color: '#7C6EF8' }}>CV</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginBottom: 10 }}>
          <Link href="/privacy" style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>
            {lang === 'az' ? 'Gizlilik Siyasəti' : 'Privacy Policy'}
          </Link>
          <Link href="/terms" style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>
            {lang === 'az' ? 'İstifadə Şərtləri' : 'Terms of Service'}
          </Link>
        </div>
        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)', margin: 0 }}>© 2026 BirCV · bircv.az · support@bircv.az</p>
      </footer>
    </div>
  );
}

export default function HomePage() {
  return (
    <CVProvider>
      <LandingInner />
    </CVProvider>
  );
}
