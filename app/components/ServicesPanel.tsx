'use client';
import { useCVStore } from '@/app/store/cvStore';
import { Crown, Target, PenLine, FileText, Sparkles, MessageCircle } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const services: { id: string; Icon: LucideIcon; title: string; titleEn: string; desc: string; descEn: string; price: number; badge: string; badgeEn: string; color: string }[] = [
  {
    id: 'premium_sub',
    Icon: Crown,
    title: 'Premium Abunəlik',
    titleEn: 'Premium Subscription',
    desc: 'Bütün premium şablonlar + sınırsız CV + prioritet dəstək',
    descEn: 'All premium templates + unlimited CVs + priority support',
    price: 20,
    badge: 'Aylıq',
    badgeEn: 'Monthly',
    color: '#7C6EF8',
  },
  {
    id: 'hr_consult',
    Icon: Target,
    title: 'HR Onlayn Konsultasiya',
    titleEn: 'HR Online Consultation',
    desc: 'Professional HR mütəxəssisi ilə 30 dəqiqəlik video görüş',
    descEn: '30-minute video call with a professional HR specialist',
    price: 20,
    badge: 'Bir dəfəlik',
    badgeEn: 'One-time',
    color: '#059669',
  },
  {
    id: 'hr_build',
    Icon: PenLine,
    title: 'HR CV Yazımı',
    titleEn: 'HR CV Writing',
    desc: 'Professional HR tərəfindən CV-nizi hazır şəkildə yığılması',
    descEn: 'Your CV written professionally by an HR specialist',
    price: 15,
    badge: 'Bir dəfəlik',
    badgeEn: 'One-time',
    color: '#0284c7',
  },
  {
    id: 'second_cv',
    Icon: FileText,
    title: '2-ci CV Hazırlanması',
    titleEn: '2nd CV Creation',
    desc: 'Eyni hesabla ikinci CV hazırlamaq (pulsuz plan üçün)',
    descEn: 'Create a second CV on the same account (for free plan)',
    price: 5,
    badge: 'Bir dəfəlik',
    badgeEn: 'One-time',
    color: '#d97706',
  },
];

export default function ServicesPanel() {
  const { lang, user } = useCVStore();

  const handleBuy = (service: typeof services[0]) => {
    // Notify admin/system of subscription interest (best-effort).
    if (service.id === 'premium_sub') {
      fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user?.email || 'guest', plan: 'premium' }),
      }).catch(() => {});
    }
    // In production: redirect to payment gateway
    alert(lang === 'az'
      ? `"${service.title}" xidməti üçün ödəniş səhifəsinə yönləndirilirsiniz – ${service.price} AZN`
      : `Redirecting to payment for "${service.titleEn}" – ${service.price} AZN`
    );
  };

  return (
    <div style={{
      background: '#111118', border: '1px solid rgba(255,255,255,0.07)',
      borderRadius: 16, padding: '20px'
    }}>
      <h3 style={{ fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 8 }}>
        <Sparkles size={16} style={{ color: '#a89ef8' }} /> {lang === 'az' ? 'Əlavə Xidmətlər' : 'Extra Services'}
      </h3>
      <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginBottom: 16 }}>
        {lang === 'az' ? 'Karyera inkişafınızı sürətləndirin' : 'Accelerate your career growth'}
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {services.map(svc => (
          <div key={svc.id} style={{
            background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: 12, padding: '14px', display: 'flex', alignItems: 'center', gap: 12
          }}>
            <span style={{ flexShrink: 0, color: svc.color, display: 'inline-flex' }}><svc.Icon size={24} /></span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>
                  {lang === 'az' ? svc.title : svc.titleEn}
                </span>
                <span style={{ fontSize: 10, background: `${svc.color}25`, color: svc.color, padding: '2px 6px', borderRadius: 4, fontWeight: 600, flexShrink: 0 }}>
                  {lang === 'az' ? svc.badge : svc.badgeEn}
                </span>
              </div>
              <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', margin: 0, lineHeight: 1.4 }}>
                {lang === 'az' ? svc.desc : svc.descEn}
              </p>
            </div>
            <button
              onClick={() => handleBuy(svc)}
              style={{
                background: svc.color, color: '#fff', border: 'none',
                borderRadius: 8, padding: '8px 12px', cursor: 'pointer',
                fontSize: 12, fontWeight: 700, flexShrink: 0, whiteSpace: 'nowrap'
              }}
            >
              {svc.price} AZN
            </button>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 14, padding: '12px', background: 'rgba(124,110,248,0.07)', borderRadius: 10, border: '1px dashed rgba(124,110,248,0.25)' }}>
        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', margin: 0, textAlign: 'center' }}>
          <MessageCircle size={13} style={{ display: 'inline', verticalAlign: '-2px', marginRight: 4 }} />{lang === 'az' ? 'Suallarınız üçün: support@bircv.az' : 'Questions? support@bircv.az'}
        </p>
      </div>
    </div>
  );
}
