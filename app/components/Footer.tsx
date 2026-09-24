'use client';
import Link from 'next/link';
import { useCVStore } from '@/app/store/cvStore';
import { SUPPORT_EMAIL } from '@/lib/config';
import Logo from '@/app/components/ui/Logo';

export default function Footer() {
  const { lang } = useCVStore();
  const az = lang === 'az';
  return (
    <footer className="border-t border-line">
      <div className="section flex flex-col gap-8 py-10 md:flex-row md:items-start md:justify-between">
        <div className="max-w-xs">
          <Logo />
          <p className="mt-3 text-small text-ink-2">{az ? 'Azərbaycan dilində peşəkar CV — dəqiqələr içində, A4 PDF olaraq.' : 'Professional CVs in minutes — as a print-perfect A4 PDF.'}</p>
        </div>
        <nav className="grid grid-cols-2 gap-x-14 gap-y-2 text-small" aria-label="Footer">
          <Link href="/create" className="text-ink-2 hover:text-ink">{az ? 'CV yarat' : 'Create CV'}</Link>
          <Link href="/privacy" className="text-ink-2 hover:text-ink">{az ? 'Gizlilik siyasəti' : 'Privacy policy'}</Link>
          <Link href="/templates" className="text-ink-2 hover:text-ink">{az ? 'Şablonlar' : 'Templates'}</Link>
          <Link href="/terms" className="text-ink-2 hover:text-ink">{az ? 'İstifadə şərtləri' : 'Terms of service'}</Link>
          <Link href="/pricing" className="text-ink-2 hover:text-ink">{az ? 'Qiymət' : 'Pricing'}</Link>
          <a href={`mailto:${SUPPORT_EMAIL}`} className="text-ink-2 hover:text-ink">{SUPPORT_EMAIL}</a>
        </nav>
      </div>
      <div className="section flex flex-col gap-1 border-t border-line py-5 text-caption text-muted sm:flex-row sm:justify-between">
        <span>© {new Date().getFullYear()} BirCV · bircv.az</span>
        <span>Developed by <a href="https://narix.az" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-ink">Narix</a></span>
      </div>
    </footer>
  );
}
