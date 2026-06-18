'use client';
import Link from 'next/link';
import { useCVStore } from '@/app/store/cvStore';

export default function Navbar() {
  const { lang, setLang, user, setUser, setShowAuthModal, setAuthMode, theme, setTheme } = useCVStore();

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
        <div className="nav-right" style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          {/* Lang toggle */}
          <button
            className="nav-icon-btn"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
            style={{ background: 'none', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.7)', borderRadius: 8, padding: '5px 10px', cursor: 'pointer', fontSize: 14, display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 }}
          >
            {theme === 'dark'
              ? <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
              : <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
            }
          </button>
          <button
            className="nav-lang-btn"
            onClick={() => setLang(lang === 'az' ? 'en' : 'az')}
            style={{
              background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 8, padding: '5px 12px', color: 'rgba(255,255,255,0.7)',
              fontSize: 13, fontWeight: 600, cursor: 'pointer', letterSpacing: 0.5, flexShrink: 0
            }}
          >
            {lang === 'az' ? 'AZ' : 'EN'} <span style={{ opacity: 0.4 }}>|</span> {lang === 'az' ? 'EN' : 'AZ'}
          </button>

          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span className="nav-username" style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>
                {user.name}
                {user.plan === 'premium' && (
                  <span style={{ marginLeft: 6, background: '#7C6EF8', color: '#fff', fontSize: 10, padding: '2px 6px', borderRadius: 4, fontWeight: 700 }}>PRO</span>
                )}
                {user.plan === 'admin' && (
                  <span style={{ marginLeft: 6, background: '#059669', color: '#fff', fontSize: 10, padding: '2px 6px', borderRadius: 4, fontWeight: 700 }}>ADMIN</span>
                )}
              </span>
              <button onClick={() => setUser(null)} style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.5)', borderRadius: 8, padding: '5px 12px', cursor: 'pointer', fontSize: 12, flexShrink: 0 }}>
                {lang === 'az' ? 'Çıxış' : 'Logout'}
              </button>
            </div>
          ) : (
            <div className="nav-auth-group" style={{ display: 'flex', gap: 10 }}>
              <button className="nav-login-btn" onClick={() => { setAuthMode('login'); setShowAuthModal(true); }} style={{
                background: 'transparent', border: '1px solid rgba(255,255,255,0.15)',
                color: 'rgba(255,255,255,0.8)', borderRadius: 8, padding: '7px 16px',
                fontSize: 13, fontWeight: 500, cursor: 'pointer', flexShrink: 0
              }}>
                {lang === 'az' ? 'Daxil Ol' : 'Login'}
              </button>
              <Link className="nav-cta-btn" href="/create" style={{
                background: '#7C6EF8', color: '#fff', border: 'none',
                borderRadius: 8, padding: '7px 18px', fontSize: 13, fontWeight: 600,
                cursor: 'pointer', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0, whiteSpace: 'nowrap'
              }}>
                {lang === 'az' ? 'CV Yarat' : 'Create CV'}<span className="nav-cta-arrow">→</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
