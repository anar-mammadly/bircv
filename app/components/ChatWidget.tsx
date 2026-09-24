'use client';
import { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { MessageCircle, X, Send } from 'lucide-react';
import { useCVStore } from '@/app/store/cvStore';

interface Msg { from: 'bot' | 'user'; text: string }

export default function ChatWidget() {
  const { lang } = useCVStore();
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const endRef = useRef<HTMLDivElement>(null);

  const greeting = lang === 'az'
    ? 'Salam! BirCV dəstək xidmətinə xoş gəldiniz. Sizə necə kömək edə bilərik?'
    : 'Hi! Welcome to BirCV support. How can we help you?';

  useEffect(() => { if (open && msgs.length === 0) setMsgs([{ from: 'bot', text: greeting }]); /* eslint-disable-next-line */ }, [open]);
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [msgs]);
  useEffect(() => {
    if (!open) return;
    const k = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', k);
    return () => document.removeEventListener('keydown', k);
  }, [open]);

  const quick = lang === 'az'
    ? ['CV-ni necə yükləyim?', 'Premium nədir?', 'Şəkil əlavə edə bilmirəm']
    : ['How do I download my CV?', 'What is Premium?', "I can't add a photo"];

  const answer = (q: string): string => {
    const t = q.toLowerCase();
    if (t.includes('yüklə') || t.includes('download') || t.includes('pdf'))
      return lang === 'az' ? 'CV-ni yükləmək üçün əvvəlcə qeydiyyatdan keçin, sonra "PDF yüklə" düyməsinə basın.' : 'To download your CV, register first, then press the "Download PDF" button.';
    if (t.includes('premium'))
      return lang === 'az' ? 'Premium limitsiz CV, bütün şablonlar, limitsiz AI və HR dəstəyi verir. Qiymət səhifəsinə baxın.' : 'Premium gives unlimited CVs, all templates, unlimited AI and HR support. See the Pricing page.';
    if (t.includes('şəkil') || t.includes('foto') || t.includes('photo') || t.includes('image'))
      return lang === 'az' ? 'Yalnız PNG, JPG və JPEG formatlı şəkillər qəbul olunur.' : 'Only PNG, JPG and JPEG images are accepted.';
    return lang === 'az' ? 'Sualınızı support@bircv.az ünvanına yaza bilərsiniz, komandamız tezliklə cavab verəcək.' : 'You can email us at support@bircv.az and our team will get back to you shortly.';
  };

  const send = (text: string) => {
    const q = text.trim();
    if (!q) return;
    setMsgs(m => [...m, { from: 'user', text: q }]);
    setInput('');
    setTimeout(() => setMsgs(m => [...m, { from: 'bot', text: answer(q) }]), 450);
  };

  // On the editor the mobile bottom bar owns the corner; keep the launcher above it.
  const inEditor = path === '/create';

  return (
    <>
      <button onClick={() => setOpen(o => !o)} aria-label={lang === 'az' ? 'Dəstək çatı' : 'Support chat'} aria-expanded={open}
        className={`fixed right-4 z-[150] grid h-12 w-12 place-items-center rounded-full bg-ink text-bg shadow-lg transition-transform duration-150 ease-out hover:scale-105 active:scale-95 sm:right-6 ${inEditor ? 'bottom-24 lg:bottom-6' : 'bottom-5 sm:bottom-6'}`}>
        {open ? <X size={20} /> : <MessageCircle size={20} />}
      </button>

      {open && (
        <div role="dialog" aria-label="Support" className={`fixed right-4 z-[150] flex h-[440px] max-h-[calc(100dvh-140px)] w-[min(360px,calc(100vw-32px))] animate-pop flex-col overflow-hidden rounded-sheet border border-line bg-surface shadow-lg sm:right-6 ${inEditor ? 'bottom-40 lg:bottom-20' : 'bottom-20 sm:bottom-24'}`}>
          <div className="flex items-center gap-3 border-b border-line px-4 py-3">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-primary-soft text-primary"><MessageCircle size={17} /></span>
            <div className="leading-tight">
              <div className="text-[0.875rem] font-semibold text-ink">{lang === 'az' ? 'BirCV Dəstək' : 'BirCV Support'}</div>
              <div className="flex items-center gap-1.5 text-caption text-muted"><span className="h-1.5 w-1.5 rounded-full bg-success" />{lang === 'az' ? 'Onlayn' : 'Online'}</div>
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-2.5 overflow-y-auto p-4" aria-live="polite">
            {msgs.map((m, i) => (
              <div key={i} className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-[0.8125rem] leading-relaxed ${m.from === 'user' ? 'self-end rounded-br-md bg-primary text-on-primary' : 'self-start rounded-bl-md bg-surface-2 text-ink'}`}>{m.text}</div>
            ))}
            {msgs.length <= 1 && (
              <div className="mt-1 flex flex-wrap gap-1.5">
                {quick.map(q => <button key={q} onClick={() => send(q)} className="chip transition-colors hover:border-primary hover:text-primary">{q}</button>)}
              </div>
            )}
            <div ref={endRef} />
          </div>
          <form onSubmit={e => { e.preventDefault(); send(input); }} className="flex gap-2 border-t border-line p-3">
            <input value={input} onChange={e => setInput(e.target.value)} placeholder={lang === 'az' ? 'Mesaj yazın…' : 'Type a message…'} aria-label="Message" className="input" />
            <button type="submit" aria-label="Send" className="btn-primary btn-icon h-10 w-10"><Send size={16} /></button>
          </form>
        </div>
      )}
    </>
  );
}
