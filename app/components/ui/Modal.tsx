'use client';
import { ReactNode, useEffect, useRef, useId } from 'react';
import { X } from 'lucide-react';

interface Props {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg';
  /** mobile: slide up as a bottom sheet (default) */
  hideTitle?: boolean;
}

const W = { sm: 'sm:max-w-[400px]', md: 'sm:max-w-[480px]', lg: 'sm:max-w-[720px]' };

/** Accessible dialog: focus trap, Esc, scroll lock, restores focus. Bottom sheet on phones. */
export default function Modal({ open, onClose, title, children, size = 'sm', hideTitle }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const titleId = useId();
  // Keep the latest onClose in a ref: callers pass a new inline function every render, and depending on it
  // would re-run the focus effect on every keystroke and yank focus back to the first field.
  const closeRef = useRef(onClose);
  closeRef.current = onClose;

  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const focusables = () => Array.from(ref.current?.querySelectorAll<HTMLElement>('a[href],button:not([disabled]),input:not([disabled]),select,textarea,[tabindex]:not([tabindex="-1"])') || []);
    setTimeout(() => (ref.current?.querySelector<HTMLElement>('[data-autofocus]') || focusables()[1] || focusables()[0])?.focus(), 30);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { e.stopPropagation(); closeRef.current(); }
      if (e.key === 'Tab') {
        const f = focusables(); if (!f.length) return;
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = prevOverflow; prev?.focus?.(); };
  }, [open]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[200] flex items-end justify-center sm:items-center sm:p-4">
      <div className="absolute inset-0 animate-fade bg-ink/50 backdrop-blur-[2px]" onClick={onClose} aria-hidden />
      <div ref={ref} role="dialog" aria-modal="true" aria-labelledby={titleId}
        className={`relative flex max-h-[92dvh] w-full ${W[size]} animate-sheet flex-col rounded-t-sheet border border-line bg-surface shadow-lg sm:animate-pop sm:rounded-sheet`}>
        <div className="flex items-center justify-between gap-4 px-5 pt-5 sm:px-6">
          <h2 id={titleId} className={hideTitle ? 'sr-only' : 't-h3'}>{title}</h2>
          <button onClick={onClose} aria-label="Close" className="btn-ghost btn-icon -mr-2"><X size={18} /></button>
        </div>
        <div className="overflow-y-auto px-5 pb-6 pt-3 sm:px-6">{children}</div>
      </div>
    </div>
  );
}
