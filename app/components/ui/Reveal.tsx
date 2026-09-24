'use client';
import { useEffect, useRef, ReactNode } from 'react';

/** Fades content in once when it scrolls into view. Content stays visible without JS and with reduced motion. */
export default function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    if (typeof IntersectionObserver === 'undefined') { el.classList.add('in'); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add('in'); io.disconnect(); } }, { rootMargin: '0px 0px -8% 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${className}`} style={delay ? { transitionDelay: `${delay}ms` } : undefined}>{children}</div>;
}
