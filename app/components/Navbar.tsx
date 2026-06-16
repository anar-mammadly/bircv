'use client';
import Link from 'next/link';
import { useCVStore } from '@/app/store/cvStore';

export default function Navbar() {
  const { lang, setLang, user, setShowAuthModal, setAuthMode } = useCVStore();

  return (
    <nav className="nav-shell" style={{
      background: 'rgba(10,10,15,0.85)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(255,255,255,0.07)',
      position: 'sticky', top: 0, zIndex: 100,
      padding: '0 2rem'
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', alignItems: 'center', height: 64, gap: 40 }}>
        {/* Logo */}
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 2, marginRight: 'auto' }}>
          <span style={{ fontSize: 22, fontWeight: 800, color: '#fff', letterSpacing: -0.5 }}>bir</span>
          <span style={{ fontSize: 22, fontWeight: 800, color: '#7C6EF8', letterSpacing: -0.5 }}>CV</span>
        </Link>

        {/* Nav links */}
        <div className="nav-links" style={{ display: 'flex', gap: 32, flex: 1 }}>
          {[
            { href: '/#how', label: lang === 'az' ? 'Necə işləyir' : 'How it works' },
            { href: '/templates', label: lang === 'az' ? 'Şablonlar' : 'Templates' },
            { href: '/pricing', label: lang === 'az' ? 'Qiymət' : 'Pricing' },
          ].map(link => (
            <Link key={link.href} href={link.href} style={{
              color: 'rgba(255,255,255,0.55)', textDecoration: 'none',
              fontSize: 14, fontWeight: 500, transition: 'color 0.2s'
            }}
              onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}
            >{link.label}</Link>
          ))}
        </div>

        {/* Right side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          {/* Lang toggle */}
          <button
            onClick={() => setLang(lang === 'az' ? 'en' : 'az')}
            style={{
              background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 8, padding: '5px 12px', color: 'rgba(255,255,255,0.7)',
              fontSize: 13, fontWeight: 600, cursor: 'pointer', letterSpacing: 0.5
            }}
          >
            {lang === 'az' ? 'AZ' : 'EN'} <span style={{ opacity: 0.4 }}>|</span> {lang === 'az' ? 'EN' : 'AZ'}
          </button>

          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>
                {user.name}
                {user.plan === 'premium' && (
                  <span style={{ marginLeft: 6, background: '#7C6EF8', color: '#fff', fontSize: 10, padding: '2px 6px', borderRadius: 4, fontWeight: 700 }}>PRO</span>
                )}
              </span>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => { setAuthMode('login'); setShowAuthModal(true); }} style={{
                background: 'transparent', border: '1px solid rgba(255,255,255,0.15)',
                color: 'rgba(255,255,255,0.8)', borderRadius: 8, padding: '7px 16px',
                fontSize: 13, fontWeight: 500, cursor: 'pointer'
              }}>
                {lang === 'az' ? 'Daxil Ol' : 'Login'}
              </button>
              <Link href="/create" style={{
                background: '#7C6EF8', color: '#fff', border: 'none',
                borderRadius: 8, padding: '7px 18px', fontSize: 13, fontWeight: 600,
                cursor: 'pointer', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6
              }}>
                {lang === 'az' ? 'CV Yarat →' : 'Create CV →'}
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
