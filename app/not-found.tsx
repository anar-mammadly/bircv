import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="grid min-h-dvh place-items-center bg-bg px-6">
      <div className="max-w-[420px] text-center">
        <div className="font-display text-[6.5rem] font-bold leading-none tracking-tight text-primary">404</div>
        <h1 className="t-h2 mt-4">Səhifə tapılmadı</h1>
        <p className="mt-2.5 text-ink-2">Axtardığınız səhifə mövcud deyil və ya köçürülüb.</p>
        <Link href="/" className="btn-primary btn-lg mt-7">Ana səhifəyə qayıt</Link>
      </div>
    </main>
  );
}
