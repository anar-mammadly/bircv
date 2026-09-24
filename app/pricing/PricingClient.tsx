'use client';
import Link from 'next/link';
import { Check, Minus, MessageCircle, PenLine, FileText } from 'lucide-react';
import { useCVStore } from '@/app/store/cvStore';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { waLink, SUPPORT_EMAIL } from '@/lib/config';

export default function PricingClient() {
  const { lang } = useCVStore();
  const az = lang === 'az';

  const plans = [
    {
      name: az ? 'Pulsuz' : 'Free', price: 0, period: '', highlight: false,
      blurb: az ? 'İlk CV-nizi yaratmaq üçün.' : 'Everything to create your first CV.',
      features: [
        [true, az ? '2 CV yükləmə' : '2 CV downloads'], [true, az ? '6 pulsuz şablon' : '6 free templates'], [true, az ? '5 AI sorğusu' : '5 AI requests'],
        [true, az ? 'A4 PDF, real mətn' : 'A4 PDF with real text'], [false, az ? 'Premium şablonlar' : 'Premium templates'], [false, az ? 'HR dəstəyi' : 'HR support'],
      ] as [boolean, string][],
      cta: az ? 'Pulsuz başla' : 'Start free', href: '/create', wa: null as string | null,
    },
    {
      name: 'Premium', price: 20, period: az ? '/ay' : '/mo', highlight: true,
      blurb: az ? 'Limitsiz CV və bütün dizaynlar.' : 'Unlimited CVs and every design.',
      features: [
        [true, az ? 'Limitsiz CV' : 'Unlimited CVs'], [true, az ? 'Bütün şablonlar' : 'All templates'], [true, az ? 'Limitsiz AI yazı' : 'Unlimited AI writing'],
        [true, az ? 'A4 PDF, real mətn' : 'A4 PDF with real text'], [true, az ? 'Prioritet dəstək' : 'Priority support'], [true, az ? 'Yeni şablonlara erkən giriş' : 'Early access to new templates'],
      ] as [boolean, string][],
      cta: az ? 'Premium al' : 'Get Premium', href: null,
      wa: az ? 'Salam! Premium abunəliyi almaq istəyirəm (20 AZN/ay).' : 'Hello! I want to get the Premium subscription (20 AZN/mo).',
    },
  ];

  const services = [
    { Icon: MessageCircle, title: az ? 'HR onlayn konsultasiya' : 'HR online consultation', price: null as number | null, desc: az ? 'HR mütəxəssisi ilə 30 dəqiqəlik video görüş.' : '30-minute video call with an HR specialist.', wa: az ? 'Salam! HR Onlayn Konsultasiya xidməti haqqında sorğum var.' : 'Hello! I have an inquiry about the HR Online Consultation service.' },
    { Icon: PenLine, title: az ? 'HR CV yazımı' : 'HR CV writing', price: 15, desc: az ? 'HR mütəxəssisi CV-nizi sıfırdan yazır. 2 iş günü.' : 'An HR specialist writes your CV from scratch. 2 business days.', wa: az ? 'Salam! Professional HR CV Yazımı sifariş etmək istəyirəm (15 AZN).' : 'Hello! I want to order Professional HR CV Writing (15 AZN).' },
    { Icon: FileText, title: az ? 'Əlavə CV' : 'Extra CV', price: 5, desc: az ? 'Pulsuz plan üçün əlavə CV hüququ.' : 'An additional CV for the free plan.', wa: az ? 'Salam! Əlavə CV sifariş etmək istəyirəm (5 AZN).' : 'Hello! I want to order an Extra CV (5 AZN).' },
  ];

  return (
    <div className="min-h-dvh">
      <Navbar />
      <main className="section py-12 lg:py-16">
        <div className="mx-auto max-w-[56ch] text-center animate-rise">
          <p className="eyebrow">{az ? 'Qiymət' : 'Pricing'}</p>
          <h1 className="t-h1 mt-3">{az ? 'Sadə qiymətlər' : 'Simple pricing'}</h1>
          <p className="mt-3 text-[1.0625rem] text-ink-2">{az ? 'Gizli ödəniş yoxdur. İstənilən vaxt ləğv edin.' : 'No hidden fees. Cancel anytime.'}</p>
        </div>

        <div className="mx-auto mt-12 grid max-w-[820px] gap-5 md:grid-cols-2">
          {plans.map(p => (
            <div key={p.name} className={`relative flex flex-col rounded-sheet border p-7 ${p.highlight ? 'border-primary bg-surface shadow-lg ring-1 ring-primary' : 'border-line bg-surface shadow-sm'}`}>
              {p.highlight && <span className="badge-primary absolute -top-3 left-7 h-6 px-3 text-[0.75rem]">{az ? 'Tövsiyə edilir' : 'Recommended'}</span>}
              <h2 className="font-display text-xl font-semibold text-ink">{p.name}</h2>
              <p className="mt-1 text-small text-ink-2">{p.blurb}</p>
              <div className="mt-5 flex items-baseline gap-1"><span className="font-display text-5xl font-bold tracking-tight text-ink">{p.price}</span><span className="text-lg font-semibold text-ink">AZN</span><span className="text-ink-2">{p.period}</span></div>
              <ul className="my-6 flex flex-1 flex-col gap-3">
                {p.features.map(([ok, f]) => (
                  <li key={f} className={`flex items-start gap-2.5 text-[0.9375rem] ${ok ? 'text-ink' : 'text-muted line-through decoration-line-strong'}`}>
                    {ok ? <Check size={17} className="mt-0.5 shrink-0 text-success" /> : <Minus size={17} className="mt-0.5 shrink-0" />}{f}
                  </li>
                ))}
              </ul>
              {p.href
                ? <Link href={p.href} className="btn-secondary btn-lg w-full">{p.cta}</Link>
                : <a href={waLink(p.wa!)} target="_blank" rel="noopener noreferrer" className="btn-primary btn-lg w-full">{p.cta}</a>}
            </div>
          ))}
        </div>

        <div className="mt-20">
          <div className="max-w-[56ch]"><h2 className="t-h2">{az ? 'Əlavə xidmətlər' : 'Extra services'}</h2><p className="mt-2 text-ink-2">{az ? 'Bir dəfəlik ödənişlər.' : 'One-time payments.'}</p></div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {services.map(s => (
              <div key={s.title} className="card flex flex-col p-6">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary-soft text-primary"><s.Icon size={21} /></span>
                <h3 className="t-h3 mt-4 text-[1.0625rem]">{s.title}</h3>
                <p className="mt-1.5 flex-1 text-small text-ink-2">{s.desc}</p>
                <div className="mt-4 font-display text-2xl font-bold text-ink">{s.price != null ? `${s.price} AZN` : (az ? 'Təklif al' : 'Get a quote')}</div>
                <a href={waLink(s.wa)} target="_blank" rel="noopener noreferrer" className="btn-secondary mt-3 w-full">{az ? 'WhatsApp ilə yaz' : 'Message on WhatsApp'}</a>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-14 text-center text-small text-ink-2">{az ? 'Suallarınız var? ' : 'Questions? '}<a href={`mailto:${SUPPORT_EMAIL}`} className="font-semibold text-primary hover:underline">{SUPPORT_EMAIL}</a></p>
      </main>
      <Footer />
    </div>
  );
}
