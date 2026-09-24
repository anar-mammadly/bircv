import Link from 'next/link';

export function LogoMark({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <rect width="32" height="32" rx="9" fill="rgb(var(--primary))" />
      <path d="M10 8.5h8.2L23 13.3V23a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 9 23V10a1.5 1.5 0 0 1 1-1.5Z" fill="rgb(var(--on-primary))" opacity=".95" />
      <path d="M18.2 8.5v3.6a1.2 1.2 0 0 0 1.2 1.2H23" fill="rgb(var(--primary))" opacity=".35" />
      <rect x="12" y="16" width="8" height="1.6" rx=".8" fill="rgb(var(--primary))" />
      <rect x="12" y="19.6" width="5.5" height="1.6" rx=".8" fill="rgb(var(--primary))" opacity=".55" />
    </svg>
  );
}

export default function Logo({ href = '/' }: { href?: string }) {
  return (
    <Link href={href} className="flex items-center gap-2 rounded-md" aria-label="BirCV">
      <LogoMark />
      <span className="font-display text-[1.35rem] font-bold leading-none tracking-tight text-ink">
        bir<span className="text-primary">CV</span>
      </span>
    </Link>
  );
}
