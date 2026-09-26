'use client';
import { Check } from 'lucide-react';
import Modal from '@/app/components/ui/Modal';
import { SAMPLE_PROFILES, SampleId } from '@/lib/cv/samples';

const NAME: Record<SampleId, { az: string; en: string }> = {
  qa: { az: 'Software QA Mühəndisi', en: 'Software QA Engineer' },
  backend: { az: 'Backend Proqramçı', en: 'Backend Developer' },
  devops: { az: 'DevOps Mühəndisi', en: 'DevOps Engineer' },
  marketing: { az: 'Marketinq Mütəxəssisi', en: 'Marketing Specialist' },
  sales: { az: 'Satış Mütəxəssisi', en: 'Sales Specialist' },
  hr: { az: 'HR Biznes Partnyoru', en: 'HR Business Partner' },
};

/** Opened by the "Load sample" button: pick which profession's sample CV to load. */
export default function SamplePicker({ open, onClose, onPick, lang }: {
  open: boolean; onClose: () => void; onPick: (id: SampleId) => void; lang: 'az' | 'en';
}) {
  const az = lang === 'az';
  return (
    <Modal open={open} onClose={onClose} title={az ? 'Nümunə seç' : 'Choose a sample'} size="lg">
      <p className="mb-4 text-small text-ink-2">{az ? 'Peşənizə uyğun nümunə ilə başlayın — sonra hər şeyi redaktə edə bilərsiniz.' : 'Start from a sample that matches your profession — everything stays editable.'}</p>
      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        {SAMPLE_PROFILES.map(s => {
          const data = s.data[lang];
          const name = [data.personal.firstName, data.personal.lastName].filter(Boolean).join(' ');
          return (
            <button key={s.id} type="button" onClick={() => { onPick(s.id); onClose(); }}
              className="group flex items-center gap-3.5 rounded-xl border border-line bg-surface p-3.5 text-left transition-colors hover:border-primary hover:bg-primary-soft/40">
              <img src={s.photo} alt="" className="h-14 w-14 shrink-0 rounded-full object-cover" style={{ objectPosition: 'top' }} />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[0.9375rem] font-semibold text-ink">{name}</span>
                <span className="block truncate text-small text-ink-2">{NAME[s.id][lang]}</span>
              </span>
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-line-strong text-transparent transition-colors group-hover:border-primary group-hover:bg-primary group-hover:text-on-primary">
                <Check size={13} strokeWidth={3} />
              </span>
            </button>
          );
        })}
      </div>
    </Modal>
  );
}
