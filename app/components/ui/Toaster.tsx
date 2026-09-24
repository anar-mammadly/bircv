'use client';
import { createContext, useCallback, useContext, useRef, useState, ReactNode } from 'react';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';

type Kind = 'success' | 'error' | 'info';
interface ToastItem { id: number; kind: Kind; title: string; description?: string; action?: { label: string; onClick: () => void } }
interface ToastApi { toast: (t: { kind?: Kind; title: string; description?: string; duration?: number; action?: { label: string; onClick: () => void } }) => void }

const Ctx = createContext<ToastApi>({ toast: () => {} });
export const useToast = () => useContext(Ctx);

const ICON = { success: CheckCircle2, error: AlertTriangle, info: Info };
const TONE = { success: 'text-success', error: 'text-danger', info: 'text-primary' };

export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);
  const seq = useRef(0);
  const dismiss = useCallback((id: number) => setItems(x => x.filter(i => i.id !== id)), []);
  const toast = useCallback<ToastApi['toast']>(({ kind = 'info', title, description, duration, action }) => {
    const id = ++seq.current;
    setItems(x => [...x.slice(-2), { id, kind, title, description, action }]);
    duration = duration ?? (action ? 6000 : 3800);
    setTimeout(() => dismiss(id), duration);
  }, [dismiss]);

  return (
    <Ctx.Provider value={{ toast }}>
      {children}
      <div className="pointer-events-none fixed inset-x-0 bottom-4 z-[300] flex flex-col items-center gap-2 px-4 pb-[env(safe-area-inset-bottom)]" role="region" aria-label="Notifications">
        {items.map(t => {
          const Icon = ICON[t.kind];
          return (
            <div key={t.id} role={t.kind === 'error' ? 'alert' : 'status'}
              className="pointer-events-auto flex w-full max-w-sm animate-pop items-start gap-3 rounded-card border border-line bg-surface p-3.5 shadow-lg">
              <Icon size={18} className={`mt-0.5 shrink-0 ${TONE[t.kind]}`} aria-hidden />
              <div className="min-w-0 flex-1">
                <div className="text-[0.875rem] font-semibold text-ink">{t.title}</div>
                {t.description && <div className="mt-0.5 text-small text-ink-2">{t.description}</div>}
              </div>
              {t.action && <button onClick={() => { t.action!.onClick(); dismiss(t.id); }} className="btn-secondary btn-sm shrink-0">{t.action.label}</button>}
              <button onClick={() => dismiss(t.id)} aria-label="Close" className="btn-ghost btn-icon -mr-1 -mt-1 h-7 w-7"><X size={14} /></button>
            </div>
          );
        })}
      </div>
    </Ctx.Provider>
  );
}
