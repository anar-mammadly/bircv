'use client';
import { useState, useRef, useEffect } from 'react';
import { useCVStore } from '@/app/store/cvStore';
import { MessageCircle, X, Send } from 'lucide-react';

interface Msg { from: 'bot' | 'user'; text: string; }

export default function ChatWidget() {
  const { lang } = useCVStore();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const endRef = useRef<HTMLDivElement>(null);

  const greeting = lang === 'az'
    ? 'Salam! 👋 BirCV dəstək xidmətinə xoş gəldiniz. Sizə necə kömək edə bilərik?'
    : 'Hi! 👋 Welcome to BirCV support. How can we help you?';

  useEffect(() => {
    if (open && msgs.length === 0) setMsgs([{ from: 'bot', text: greeting }]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [msgs]);

  const quick = lang === 'az'
    ? ['CV-ni necə yükləyim?', 'Premium nədir?', 'Şəkil əlavə edə bilmirəm']
    : ['How do I download my CV?', 'What is Premium?', "I can't add a photo"];

  const answer = (q: string): string => {
    const t = q.toLowerCase();
    if (t.includes('yüklə') || t.includes('download') || t.includes('pdf'))
      return lang === 'az'
        ? 'CV-ni yükləmək üçün əvvəlcə qeydiyyatdan keçin, sonra önizləmə üzərindəki "PDF Yüklə" düyməsinə basın.'
        : 'To download your CV, register first, then click the "Download PDF" button above the preview.';
    if (t.includes('premium'))
      return lang === 'az'
        ? 'Premium sınırsız CV, bütün şablonlar və HR dəstəyi verir. Ətraflı üçün Qiymət səhifəsinə baxın.'
        : 'Premium gives unlimited CVs, all templates and HR support. See the Pricing page for details.';
    if (t.includes('şəkil') || t.includes('foto') || t.includes('photo') || t.includes('image'))
      return lang === 'az'
        ? 'Yalnız PNG, JPG və JPEG formatlı şəkillər qəbul olunur. Faylın formatını yoxlayın.'
        : 'Only PNG, JPG and JPEG images are accepted. Please check your file format.';
    return lang === 'az'
      ? 'Sualınızı support@bircv.az ünvanına yaza bilərsiniz, komandamız tezliklə cavab verəcək.'
      : 'You can email us at support@bircv.az and our team will get back to you shortly.';
  };

  const send = (text: string) => {
    const q = text.trim();
    if (!q) return;
    setMsgs(m => [...m, { from: 'user', text: q }]);
    setInput('');
    setTimeout(() => setMsgs(m => [...m, { from: 'bot', text: answer(q) }]), 450);
  };

  return (
    <>
      {/* Launcher */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-label="chat"
        style={{
          position: 'fixed', right: 20, bottom: 20, zIndex: 1100,
          width: 56, height: 56, borderRadius: '50%', border: 'none', cursor: 'pointer',
          background: '#7C6EF8', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 8px 24px rgba(124,110,248,0.5)',
        }}
      >
        {open ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Panel */}
      {open && (
        <div style={{
          position: 'fixed', right: 20, bottom: 88, zIndex: 1100,
          width: 'min(360px, calc(100vw - 40px))', height: 460, maxHeight: 'calc(100vh - 120px)',
          background: '#111118', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 16,
          display: 'flex', flexDirection: 'column', overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
        }}>
          {/* Header */}
          <div style={{ background: '#7C6EF8', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <MessageCircle size={18} color="#fff" />
            </div>
            <div>
              <div style={{ color: '#fff', fontWeight: 700, fontSize: 14 }}>BirCV Dəstək</div>
              <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: 11, display: 'flex', alignItems: 'center', gap: 5 }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#34d399', display: 'inline-block' }} />
                {lang === 'az' ? 'Onlayn' : 'Online'}
              </div>
            </div>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '14px', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {msgs.map((m, i) => (
              <div key={i} style={{ alignSelf: m.from === 'user' ? 'flex-end' : 'flex-start', maxWidth: '82%' }}>
                <div style={{
                  background: m.from === 'user' ? '#7C6EF8' : 'rgba(255,255,255,0.06)',
                  color: m.from === 'user' ? '#fff' : 'rgba(255,255,255,0.85)',
                  padding: '9px 12px', borderRadius: 12, fontSize: 13, lineHeight: 1.5,
                }}>{m.text}</div>
              </div>
            ))}
            {msgs.length <= 1 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 4 }}>
                {quick.map(q => (
                  <button key={q} onClick={() => send(q)} style={{
                    background: 'rgba(124,110,248,0.12)', border: '1px solid rgba(124,110,248,0.3)',
                    color: '#a89ef8', borderRadius: 16, padding: '6px 12px', fontSize: 12, cursor: 'pointer',
                  }}>{q}</button>
                ))}
              </div>
            )}
            <div ref={endRef} />
          </div>

          {/* Input */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', padding: 10, display: 'flex', gap: 8 }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') send(input); }}
              placeholder={lang === 'az' ? 'Mesaj yazın...' : 'Type a message...'}
              style={{
                flex: 1, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 10, padding: '10px 12px', color: '#fff', fontSize: 13, outline: 'none',
              }}
            />
            <button onClick={() => send(input)} aria-label="send" style={{
              background: '#7C6EF8', border: 'none', borderRadius: 10, width: 42, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff',
            }}>
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
