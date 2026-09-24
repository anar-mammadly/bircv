'use client';
import { useState, useId } from 'react';
import Link from 'next/link';
import { Crown, Target, PenLine, FileText, Sparkles, MessageCircle, ChevronDown } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useCVStore } from '@/app/store/cvStore';
import { waLink, SUPPORT_EMAIL } from '@/lib/config';
import Modal from '@/app/components/ui/Modal';

interface Service { id: string; Icon: LucideIcon; title: string; titleEn: string; desc: string; descEn: string; price: number; badge: string; badgeEn: string }

const services: Service[] = [
  { id: 'premium_sub', Icon: Crown, title: 'Premium abunəlik', titleEn: 'Premium subscription', desc: 'Bütün şablonlar + limitsiz CV + limitsiz AI', descEn: 'All templates + unlimited CVs + unlimited AI', price: 20, badge: 'Aylıq', badgeEn: 'Monthly' },
  { id: 'hr_consult', Icon: Target, title: 'HR onlayn konsultasiya', titleEn: 'HR online consultation', desc: 'HR mütəxəssisi ilə 30 dəqiqəlik video görüş', descEn: '30-minute video call with an HR specialist', price: 20, badge: 'Bir dəfəlik', badgeEn: 'One-time' },
  { id: 'hr_build', Icon: PenLine, title: 'HR CV yazımı', titleEn: 'HR CV writing', desc: 'CV-niz HR tərəfindən peşəkar şəkildə hazırlanır', descEn: 'Your CV written professionally by an HR specialist', price: 15, badge: 'Bir dəfəlik', badgeEn: 'One-time' },
  { id: 'extra_cv', Icon: FileText, title: 'Əlavə CV', titleEn: 'Extra CV', desc: 'Pulsuz plan üçün əlavə CV hüququ', descEn: 'An additional CV for the free plan', price: 5, badge: 'Bir dəfəlik', badgeEn: 'One-time' },
];

export default function ServicesPanel() {
  const { lang } = useCVStore();
  const az = lang === 'az';
  const [modal, setModal] = useState<Service | null>(null);
  const [open, setOpen] = useState(false);
  const id = useId();

  return (
    <>
      <Modal open={!!modal} onClose={() => setModal(null)} title={modal ? (az ? modal.title : modal.titleEn) : ''}>
        {modal && (
          <>
            <span className="mb-4 grid h-11 w-11 place-items-center rounded-xl bg-primary-soft text-primary"><modal.Icon size={22} /></span>
            <p className="mb-5 text-body text-ink-2">{az ? modal.desc : modal.descEn}</p>
            {modal.id !== 'hr_consult' && (
              <div className="mb-5 flex items-center justify-between rounded-xl bg-surface-2 px-4 py-3">
                <span className="text-small text-ink-2">{az ? modal.badge : modal.badgeEn}</span>
                <span className="font-display text-2xl font-bold text-ink">{modal.price} AZN</span>
              </div>
            )}
            <a href={waLink(modal.id === 'hr_consult' ? `${modal.title} xidməti haqqında sorğum var` : `${modal.title} xidmətini almaq istəyirəm`)}
              target="_blank" rel="noopener noreferrer" className="btn-primary btn-lg w-full">{az ? 'WhatsApp ilə sifariş ver' : 'Order via WhatsApp'}</a>
          </>
        )}
      </Modal>

      <section className="card-flat overflow-hidden">
        <h3>
          <button type="button" onClick={() => setOpen(o => !o)} aria-expanded={open} aria-controls={id} className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors hover:bg-surface-2">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-accent-soft text-accent"><Sparkles size={16} /></span>
            <span className="flex-1 text-[0.9375rem] font-semibold text-ink">{az ? 'Əlavə xidmətlər' : 'Extra services'}</span>
            <ChevronDown size={18} className={`text-muted transition-transform duration-200 ${open ? 'rotate-180' : ''}`} aria-hidden />
          </button>
        </h3>
        <div id={id} className={`grid transition-[grid-template-rows] duration-300 ease-out ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
          <div className="overflow-hidden">
            <div className={`flex flex-col gap-2 border-t border-line p-4 ${open ? '' : 'invisible'}`}>
              {services.map(svc => (
                <div key={svc.id} className="flex items-center gap-3 rounded-xl border border-line bg-bg/60 p-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-surface-2 text-ink-2"><svc.Icon size={18} /></span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                      <span className="text-[0.8125rem] font-semibold text-ink">{az ? svc.title : svc.titleEn}</span>
                      <span className="badge-muted">{az ? svc.badge : svc.badgeEn}</span>
                    </div>
                    <p className="text-caption text-muted">{az ? svc.desc : svc.descEn}</p>
                  </div>
                  {svc.id === 'premium_sub'
                    ? <Link href="/pricing" className="btn-primary btn-sm shrink-0">{svc.price} AZN</Link>
                    : <button onClick={() => setModal(svc)} className="btn-secondary btn-sm shrink-0">{svc.id === 'hr_consult' ? (az ? 'Sorğu' : 'Inquire') : `${svc.price} AZN`}</button>}
                </div>
              ))}
              <p className="flex items-center justify-center gap-1.5 pt-1 text-caption text-muted"><MessageCircle size={13} />{az ? `Suallar üçün: ${SUPPORT_EMAIL}` : `Questions? ${SUPPORT_EMAIL}`}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
