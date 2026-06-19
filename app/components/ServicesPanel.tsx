'use client';
import { useState } from 'react';
import { useCVStore } from '@/app/store/cvStore';
import { waLink, SUPPORT_EMAIL } from '@/lib/config';
import { Crown, Target, PenLine, FileText, Sparkles, MessageCircle, X, ChevronDown } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const services: {
  id: string; Icon: LucideIcon; title: string; titleEn: string;
  desc: string; descEn: string; price: number; badge: string; badgeEn: string; color: string;
}[] = [
  {
    id: 'premium_sub', Icon: Crown,
    title: 'Premium Abunəlik', titleEn: 'Premium Subscription',
    desc: 'Bütün premium şablonlar + limitsiz CV + prioritet dəstək',
    descEn: 'All premium templates + unlimited CVs + priority support',
    price: 20, badge: 'Aylıq', badgeEn: 'Monthly', color: '#7C6EF8',
  },
  {
    id: 'hr_consult', Icon: Target,
    title: 'HR Onlayn Konsultasiya', titleEn: 'HR Online Consultation',
    desc: 'Professional HR mütəxəssisi ilə 30 dəqiqəlik video görüş',
    descEn: '30-minute video call with a professional HR specialist',
    price: 20, badge: 'Bir dəfəlik', badgeEn: 'One-time', color: '#059669',
  },
  {
    id: 'hr_build', Icon: PenLine,
    title: 'HR CV Yazımı', titleEn: 'HR CV Writing',
    desc: 'Professional HR tərəfindən CV-nizi hazır şəkildə yığılması',
    descEn: 'Your CV written professionally by an HR specialist',
    price: 15, badge: 'Bir dəfəlik', badgeEn: 'One-time', color: '#0284c7',
  },
  {
    id: 'extra_cv', Icon: FileText,
    title: 'Əlavə CV', titleEn: 'Extra CV',
    desc: 'CV hazırlamaq (pulsuz plan üçün)',
    descEn: 'Create an extra CV (for free plan)',
    price: 5, badge: 'Bir dəfəlik', badgeEn: 'One-time', color: '#d97706',
  },
];

export default function ServicesPanel() {
  const { lang, user } = useCVStore();
  const [modal, setModal] = useState<typeof services[0] | null>(null);
  const [open, setOpen] = useState(false);

  const handleBuy = (svc: typeof services[0]) => {
    if (svc.id === 'premium_sub') {
      // Premium → pricing səhifəsinə yönləndir
      window.location.href = '/pricing';
      return;
    }
    // Digərləri → modal aç
    setModal(svc);
    if (svc.id === 'premium_sub') {
      fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user?.email || 'guest', plan: 'premium' }),
      }).catch(() => {});
    }
  };

  return (
    <>
      {/* ── Xidmət modal ─────────────────────────────────────────────────── */}
      {modal && (
        <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.75)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:2000, padding:'0 16px' }}>
          <div style={{ background:'#111118', border:'1px solid rgba(255,255,255,0.1)', borderRadius:20, padding:32, maxWidth:400, width:'100%' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20 }}>
              <div style={{ width:44, height:44, borderRadius:12, background:`${modal.color}20`, display:'flex', alignItems:'center', justifyContent:'center' }}>
                <modal.Icon size={22} style={{ color: modal.color }} />
              </div>
              <button onClick={()=>setModal(null)} style={{ background:'none', border:'none', color:'rgba(255,255,255,0.4)', cursor:'pointer', padding:4 }}>
                <X size={20} />
              </button>
            </div>
            <h2 style={{ color:'#fff', fontSize:18, fontWeight:800, margin:'0 0 8px' }}>
              {lang==='az' ? modal.title : modal.titleEn}
            </h2>
            <p style={{ color:'rgba(255,255,255,0.5)', fontSize:13, lineHeight:1.6, margin:'0 0 24px' }}>
              {lang==='az' ? modal.desc : modal.descEn}
            </p>
            {modal.id !== 'hr_consult' && (
              <div style={{ background:'rgba(255,255,255,0.04)', borderRadius:12, padding:'14px 16px', marginBottom:24, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                <span style={{ color:'rgba(255,255,255,0.5)', fontSize:13 }}>
                  {lang==='az' ? modal.badge : modal.badgeEn}
                </span>
                <span style={{ color:'#fff', fontSize:22, fontWeight:900 }}>{modal.price} AZN</span>
              </div>
            )}
            <a
              href={waLink(modal.id === 'hr_consult'
                ? `${modal.title} xidməti haqqında sorğum var`
                : `${modal.title} xidmətini almaq istəyirəm`)}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display:'block', background:modal.color, color:'#fff', borderRadius:12, padding:'13px 0', fontSize:15, fontWeight:700, textDecoration:'none', textAlign:'center', marginBottom:10 }}
            >
              {lang==='az' ? 'Sifariş ver' : 'Order now'}
            </a>
            <button onClick={()=>setModal(null)} style={{ width:'100%', background:'transparent', border:'1px solid rgba(255,255,255,0.1)', color:'rgba(255,255,255,0.45)', borderRadius:12, padding:'11px 0', fontSize:13, cursor:'pointer' }}>
              {lang==='az' ? 'Bağla' : 'Close'}
            </button>
          </div>
        </div>
      )}

      {/* ── Panel (accordion) ───────────────────────────────────────────── */}
      <div style={{ border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, overflow: 'hidden' }}>
        <button onClick={() => setOpen(!open)} style={{
          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '14px 18px', background: 'rgba(255,255,255,0.03)', border: 'none', cursor: 'pointer', color: '#fff'
        }}>
          <span style={{ fontSize: 14, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 9 }}>
            <span style={{ display: 'inline-flex', color: '#a89ef8' }}><Sparkles size={16} /></span>
            {lang==='az' ? 'Əlavə Xidmətlər' : 'Extra Services'}
          </span>
          <ChevronDown size={18} style={{ opacity: 0.45, transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }} />
        </button>

        {open && (
          <div style={{ padding: '16px 18px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <p style={{ fontSize:12, color:'rgba(255,255,255,0.4)', marginBottom:16, marginTop:0 }}>
              {lang==='az' ? 'Karyera inkişafınızı sürətləndirin' : 'Accelerate your career growth'}
            </p>

            <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
              {services.map(svc => (
                <div key={svc.id} style={{ background:'rgba(255,255,255,0.025)', border:'1px solid rgba(255,255,255,0.06)', borderRadius:12, padding:'14px', display:'flex', alignItems:'center', gap:12 }}>
                  <span style={{ flexShrink:0, color:svc.color, display:'inline-flex' }}><svc.Icon size={24} /></span>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:2 }}>
                      <span style={{ fontSize:13, fontWeight:700, color:'#fff' }}>
                        {lang==='az' ? svc.title : svc.titleEn}
                      </span>
                      <span style={{ fontSize:10, background:`${svc.color}25`, color:svc.color, padding:'2px 6px', borderRadius:4, fontWeight:600, flexShrink:0 }}>
                        {lang==='az' ? svc.badge : svc.badgeEn}
                      </span>
                    </div>
                    <p style={{ fontSize:11, color:'rgba(255,255,255,0.4)', margin:0, lineHeight:1.4 }}>
                      {lang==='az' ? svc.desc : svc.descEn}
                    </p>
                  </div>
                  <button
                    onClick={() => handleBuy(svc)}
                    style={{ background:svc.color, color:'#fff', border:'none', borderRadius:8, padding:'8px 12px', cursor:'pointer', fontSize:12, fontWeight:700, flexShrink:0, whiteSpace:'nowrap' as const }}
                  >
                    {svc.id === 'hr_consult'
                      ? (lang==='az' ? 'Sorğu göndər' : 'Send inquiry')
                      : `${svc.price} AZN`}
                  </button>
                </div>
              ))}
            </div>

            <div style={{ marginTop:14, padding:'12px', background:'rgba(124,110,248,0.07)', borderRadius:10, border:'1px dashed rgba(124,110,248,0.25)' }}>
              <p style={{ fontSize:12, color:'rgba(255,255,255,0.55)', margin:0, textAlign:'center' }}>
                <MessageCircle size={13} style={{ display:'inline', verticalAlign:'-2px', marginRight:4 }} />
                {lang==='az' ? `Suallarınız üçün: ${SUPPORT_EMAIL}` : `Questions? ${SUPPORT_EMAIL}`}
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
