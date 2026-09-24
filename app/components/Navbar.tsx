'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Menu, X, Moon, Sun, LogOut, ArrowRight } from 'lucide-react';
import { useCVStore } from '@/app/store/cvStore';
import Logo from '@/app/components/ui/Logo';

export default function Navbar() {
  const { lang, setLang, user, setUser, setShowAuthModal, setAuthMode, theme, setTheme } = useCVStore();
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => { setOpen(false); }, [path]);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 4);
    on(); window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  useEffect(() => {
    if (!open) return;
    const k = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', k);
    return () => document.removeEventListener('keydown', k);
  }, [open]);

  const links = [
    { href: '/#how', label: lang === 'az' ? 'Necə işləyir' : 'How it works' },
    { href: '/templates', label: lang === 'az' ? 'Şablonlar' : 'Templates' },
    { href: '/pricing', label: lang === 'az' ? 'Qiymət' : 'Pricing' },
  ];
  const login = () => { setAuthMode('login'); setShowAuthModal(true); setOpen(false); };

  const Controls = (
    <>
      <div className="seg" role="group" aria-label="Language">
        {(['az', 'en'] as const).map(l => (
          <button key={l} aria-pressed={lang === l} onClick={() => setLang(l)}>{l.toUpperCase()}</button>
        ))}
      </div>
      <button className="btn-secondary btn-icon" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        aria-label={theme === 'dark' ? (lang === 'az' ? 'Açıq rejim' : 'Light mode') : (lang === 'az' ? 'Tünd rejim' : 'Dark mode')}>
        {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
      </button>
    </>
  );

  return (
    <header className={`sticky top-0 z-[100] border-b transition-colors duration-200 ${scrolled || open ? 'border-line bg-bg/85 backdrop-blur-xl' : 'border-transparent bg-bg/0'}`}>
      <div className="section flex h-16 items-center gap-8">
        <Logo />
        <nav className="hidden flex-1 items-center gap-1 md:flex" aria-label="Main">
          {links.map(l => (
            <Link key={l.href} href={l.href}
              className={`rounded-lg px-3 py-2 text-[0.875rem] font-medium transition-colors hover:bg-surface-2 hover:text-ink ${path === l.href ? 'text-ink' : 'text-ink-2'}`}>
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto hidden items-center gap-2 md:flex">
          {Controls}
          {user ? (
            <>
              <div className="flex items-center gap-2 pl-2 text-[0.875rem] font-medium text-ink-2">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-primary-soft text-[0.8rem] font-bold text-primary" aria-hidden>{(user.name || user.email)[0]?.toUpperCase()}</span>
                <span className="max-w-[120px] truncate">{user.name}</span>
                {user.plan === 'premium' && <span className="badge-primary">PRO</span>}
                {user.plan === 'admin' && <span className="badge-success">ADMIN</span>}
              </div>
              <button className="btn-ghost btn-icon" onClick={() => setUser(null)} aria-label={lang === 'az' ? 'Çıxış' : 'Log out'}><LogOut size={16} /></button>
            </>
          ) : (
            <button className="btn-ghost" onClick={login}>{lang === 'az' ? 'Daxil ol' : 'Log in'}</button>
          )}
          <Link href="/create" className="btn-primary">{lang === 'az' ? 'CV yarat' : 'Create CV'}<ArrowRight size={15} /></Link>
        </div>

        <button className="btn-secondary btn-icon ml-auto md:hidden" onClick={() => setOpen(o => !o)} aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? 'Close menu' : 'Open menu'}>
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {open && (
        <div id="mobile-menu" className="animate-fade border-t border-line bg-bg md:hidden">
          <div className="section flex flex-col gap-1 py-4">
            {links.map(l => (
              <Link key={l.href} href={l.href} className="rounded-lg px-3 py-3 text-[1rem] font-medium text-ink hover:bg-surface-2">{l.label}</Link>
            ))}
            <div className="my-2 h-px bg-line" />
            <div className="flex items-center justify-between gap-2 px-1">{Controls}</div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {user ? (
                <button className="btn-secondary col-span-2 h-11" onClick={() => { setUser(null); setOpen(false); }}><LogOut size={16} />{lang === 'az' ? 'Çıxış' : 'Log out'} · {user.name}</button>
              ) : (
                <button className="btn-secondary h-11" onClick={login}>{lang === 'az' ? 'Daxil ol' : 'Log in'}</button>
              )}
              <Link href="/create" className={`btn-primary h-11 ${user ? 'col-span-2' : ''}`}>{lang === 'az' ? 'CV yarat' : 'Create CV'}</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
