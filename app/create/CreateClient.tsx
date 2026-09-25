'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import {
  Download, Loader2, Check, Pencil, Palette, Eye, Sparkles, Lock, Cloud, CloudOff, FileText, ZoomIn, Moon, Sun, Info,
} from 'lucide-react';
import { useCVStore } from '@/app/store/cvStore';
import CVForm from '@/app/components/CVForm';
import CVDocument, { CVLayout } from '@/app/components/CVDocument';
import FontPopover from '@/app/components/design/FontPopover';
import TemplatePicker from '@/app/components/design/TemplatePicker';
import ServicesPanel from '@/app/components/ServicesPanel';
import Modal from '@/app/components/ui/Modal';
import Logo from '@/app/components/ui/Logo';
import { useToast } from '@/app/components/ui/Toaster';
import { DEMO_CV_AZ, DEMO_CV_EN } from '@/lib/cv/demo';
import { isPremiumTemplate, TEMPLATE_BY_ID } from '@/lib/cv/templates';
import { exportCvPdf, cvFilename } from '@/lib/pdf/exportCv';
import { CVData } from '@/app/types/cv';

type Tab = 'content' | 'design' | 'preview';

function isEmptyCv(d: CVData) {
  const p = d.personal;
  return !(p.firstName || p.lastName || p.jobTitle || p.summary || p.email || d.experience.length || d.education.length || d.skills.length
    || d.languages.length || (d.certificates || []).length || (d.trainings || []).length || (d.projects || []).length || (d.customSections || []).length || d.additional);
}

const SIZES = [{ v: 0.94, l: 'S' }, { v: 1, l: 'M' }, { v: 1.06, l: 'L' }];

export default function CreateClient() {
  const {
    cvData, setCVData, selectedTemplate, setSelectedTemplate, cvSettings, setCvSettings, lang, setLang, theme, setTheme,
    user, setUser, setShowAuthModal, setAuthMode, saveState, lastSaved,
  } = useCVStore();
  const { toast } = useToast();
  const az = lang === 'az';
  const layoutRef = useRef<CVLayout | null>(null);
  const [tab, setTab] = useState<Tab>('content');
  const [pages, setPages] = useState(1);
  const [zoom, setZoom] = useState<'fit' | 'full'>('fit');
  // Desktop preview: size one A4 page to the space that is actually available, so the CV reads as a whole
  // without scrolling. Only the displayed scale changes — the layout/PDF source is untouched.
  const previewRef = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState({ w: 0, h: 0 });
  const [desk, setDesk] = useState(false);
  useEffect(() => {
    const el = previewRef.current; if (!el) return;
    const ro = new ResizeObserver(() => setBox({ w: el.clientWidth, h: el.clientHeight }));
    ro.observe(el);
    const mq = window.matchMedia('(min-width: 1024px)');
    const on = () => setDesk(mq.matches);
    on(); mq.addEventListener('change', on);
    return () => { ro.disconnect(); mq.removeEventListener('change', on); };
  }, []);
  const MIN_PAGE_W = 430;     // never shrink below a readable size
  const fitW = Math.floor(Math.min(box.w - 48, (box.h - 32) * (210 / 297)));
  const pageW = zoom === 'full' ? 794 : desk && box.w > 0 ? Math.max(MIN_PAGE_W, Math.min(794, fitW)) : null;
  const [pdf, setPdf] = useState<'idle' | 'preparing' | 'done'>('idle');
  const [limitModal, setLimitModal] = useState(false);
  const [premiumModal, setPremiumModal] = useState(false);
  const [sidebarTab, setSidebarTab] = useState<'content' | 'design'>('content');

  // /templates → /create?template=<id>
  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get('template');
    if (id && TEMPLATE_BY_ID[id as keyof typeof TEMPLATE_BY_ID]) setSelectedTemplate(id as any);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const empty = useMemo(() => isEmptyCv(cvData), [cvData]);
  // Empty editor → sample content. A photo the user already uploaded always replaces the default sample photo.
  const shown = useMemo(() => {
    if (!empty) return cvData;
    const demo = az ? DEMO_CV_AZ : DEMO_CV_EN;
    return { ...demo, personal: { ...demo.personal, photo: cvData.personal.photo || demo.personal.photo } };
  }, [empty, cvData, az]);
  const isPro = user?.plan === 'premium' || user?.plan === 'admin';

  // mobile tab ↔ desktop sidebar tab
  const setMobileTab = (t: Tab) => { setTab(t); if (t !== 'preview') setSidebarTab(t); };

  const registerDownload = () => {
    if (!user) return;
    fetch('/api/cv-download', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ userId: user.id }) })
      .then(r => r.json()).then(d => { if (d.ok) setUser({ ...user, cvCount: d.cvCount }); })
      .catch(() => setUser({ ...user, cvCount: user.cvCount + 1 }));
  };

  const handleDownload = async () => {
    if (!user) { setAuthMode('register'); setShowAuthModal(true); return; }
    if (user.plan === 'free' && user.cvCount >= 2) { setLimitModal(true); return; }
    if (isPremiumTemplate(selectedTemplate) && !isPro) { setPremiumModal(true); return; }
    if (empty) { toast({ kind: 'info', title: az ? 'Əvvəlcə məlumatlarınızı əlavə edin' : 'Add your details first' }); setMobileTab('content'); return; }
    if (!layoutRef.current) { toast({ kind: 'error', title: az ? 'Önizləmə hələ hazır deyil' : 'Preview is not ready yet' }); return; }
    setPdf('preparing');
    try {
      await exportCvPdf(layoutRef.current, cvFilename(cvData.personal.firstName, cvData.personal.lastName));
      registerDownload();
      setPdf('done');
      toast({ kind: 'success', title: az ? 'CV-niz hazırdır' : 'Your CV is ready', description: az ? 'PDF faylı yükləndi.' : 'The PDF has been downloaded.' });
      setTimeout(() => setPdf('idle'), 2200);
    } catch (e) {
      console.error('[pdf]', e);
      setPdf('idle');
      toast({ kind: 'error', title: az ? 'PDF yaradıla bilmədi' : 'Could not generate the PDF', description: az ? 'Zəhmət olmasa yenidən cəhd edin.' : 'Please try again.' });
    }
  };

  // The sample never overwrites a photo the user has already uploaded.
  const loadSample = () => { const demo = az ? DEMO_CV_AZ : DEMO_CV_EN; setCVData({ ...demo, personal: { ...demo.personal, photo: cvData.personal.photo || demo.personal.photo } }); toast({ kind: 'success', title: az ? 'Nümunə yükləndi' : 'Sample loaded' }); };

  // "saved 2 min ago" ticker
  const [, tick] = useState(0);
  useEffect(() => { const id = setInterval(() => tick(x => x + 1), 30000); return () => clearInterval(id); }, []);
  const savedLabel = () => {
    if (saveState === 'saving') return az ? 'Saxlanılır…' : 'Saving…';
    if (saveState === 'error') return az ? 'Yadda saxlanmadı' : 'Not saved';
    if (!lastSaved) return az ? 'Avtomatik saxlanır' : 'Autosaves';
    const m = Math.floor((Date.now() - lastSaved) / 60000);
    return m < 1 ? (az ? 'Saxlandı' : 'Saved') : (az ? `${m} dəq əvvəl saxlandı` : `Saved ${m} min ago`);
  };

  const downloadLabel = pdf === 'preparing' ? (az ? 'PDF hazırlanır…' : 'Generating PDF…') : pdf === 'done' ? (az ? 'Hazırdır' : 'Done') : (az ? 'PDF yüklə' : 'Download PDF');
  const DownloadBtn = ({ className = '' }: { className?: string }) => (
    <button onClick={handleDownload} disabled={pdf === 'preparing'} className={`btn-primary ${className}`} aria-live="polite">
      {pdf === 'preparing' ? <Loader2 size={16} className="spin" /> : pdf === 'done' ? <Check size={16} /> : <Download size={16} />}
      <span>{downloadLabel}</span>
    </button>
  );

  const tabs: { id: Tab; label: string; icon: typeof Pencil }[] = [
    { id: 'content', label: az ? 'Məzmun' : 'Content', icon: Pencil },
    { id: 'design', label: az ? 'Dizayn' : 'Design', icon: Palette },
    { id: 'preview', label: az ? 'Önizləmə' : 'Preview', icon: Eye },
  ];

  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-bg">
      {/* ── app bar ── */}
      <header className="flex h-14 shrink-0 items-center gap-3 border-b border-line bg-surface px-3 sm:px-5">
        <Logo />
        <div className="hidden items-center gap-2 text-small text-muted sm:flex" aria-live="polite">
          <span className="mx-1 h-4 w-px bg-line" />
          {saveState === 'error' ? <CloudOff size={14} className="text-warning" /> : saveState === 'saving' ? <Loader2 size={14} className="spin" /> : <Cloud size={14} />}
          <span className={saveState === 'error' ? 'text-warning' : ''}>{savedLabel()}</span>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <div className="seg hidden sm:inline-flex" role="group" aria-label="Language">
            {(['az', 'en'] as const).map(l => <button key={l} aria-pressed={lang === l} onClick={() => setLang(l)}>{l.toUpperCase()}</button>)}
          </div>
          <button className="btn-ghost btn-icon sm:hidden" onClick={() => setLang(az ? 'en' : 'az')} aria-label="Language"><span className="text-[0.75rem] font-bold">{lang.toUpperCase()}</span></button>
          <button className="btn-secondary btn-icon hidden sm:inline-flex" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label="Theme">{theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}</button>
          {!user && <button className="btn-ghost hidden md:inline-flex" onClick={() => { setAuthMode('login'); setShowAuthModal(true); }}>{az ? 'Daxil ol' : 'Log in'}</button>}
          <DownloadBtn />
        </div>
      </header>

      <div className="flex min-h-0 flex-1">
        {/* ── editor sidebar ── */}
        <aside className={`${tab === 'preview' ? 'hidden' : 'flex'} min-h-0 w-full flex-col border-r border-line bg-bg lg:flex lg:w-[440px] lg:shrink-0 xl:w-[480px]`}>
          <div className="hidden shrink-0 border-b border-line px-4 py-3 lg:block">
            <div className="seg w-full" role="tablist">
              {(['content', 'design'] as const).map(t => (
                <button key={t} role="tab" aria-selected={sidebarTab === t} onClick={() => setSidebarTab(t)} className="flex-1">
                  {t === 'content' ? (az ? 'Məzmun' : 'Content') : (az ? 'Dizayn' : 'Design')}
                </button>
              ))}
            </div>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-28 pt-4 lg:pb-8" key={sidebarTab}>
            <div className="animate-rise">
              {sidebarTab === 'content' ? (
                <div className="flex flex-col gap-3">
                  {empty && (
                    <div className="card-flat flex items-center gap-3 border-primary/30 bg-primary-soft/50 p-4">
                      <Sparkles size={18} className="shrink-0 text-primary" aria-hidden />
                      <div className="min-w-0 flex-1">
                        <div className="text-[0.875rem] font-semibold text-ink">{az ? 'Boş CV' : 'Blank CV'}</div>
                        <div className="text-small text-ink-2">{az ? 'Formu doldurun və ya nümunə ilə başlayın.' : 'Fill in the form, or start from a sample.'}</div>
                      </div>
                      <button onClick={loadSample} className="btn-secondary btn-sm shrink-0">{az ? 'Nümunə yüklə' : 'Load sample'}</button>
                    </div>
                  )}
                  <CVForm />
                  <ServicesPanel />
                </div>
              ) : (
                <div className="flex flex-col gap-7">
                  <DesignBlock title={az ? 'Şablon' : 'Template'} action={<FontPopover value={cvSettings.font} onChange={f => setCvSettings({ font: f })} lang={lang} />}>
                    <TemplatePicker value={selectedTemplate} onChange={setSelectedTemplate} lang={lang} font={cvSettings.font} isPro={!!isPro} />
                  </DesignBlock>
                  <DesignBlock title={az ? 'Mətn ölçüsü' : 'Text size'}>
                    <div className="seg" role="group" aria-label={az ? 'Mətn ölçüsü' : 'Text size'}>
                      {SIZES.map(s => <button key={s.v} aria-pressed={cvSettings.textScale === s.v} onClick={() => setCvSettings({ textScale: s.v })} className="w-14">{s.l}</button>)}
                    </div>
                  </DesignBlock>
                </div>
              )}
            </div>
          </div>
        </aside>

        {/* ── preview ── */}
        <main className={`${tab === 'preview' ? 'flex' : 'hidden'} min-h-0 min-w-0 flex-1 flex-col bg-surface-2 lg:flex`}>
          <div className="flex h-12 shrink-0 items-center gap-3 border-b border-line bg-surface/70 px-4 backdrop-blur">
            <span className="flex items-center gap-2 text-small font-medium text-ink-2"><FileText size={15} />{az ? 'A4 önizləmə' : 'A4 preview'} · {pages} {az ? 'səhifə' : pages === 1 ? 'page' : 'pages'}</span>
            <div className="seg ml-auto" role="group" aria-label="Zoom">
              <button aria-pressed={zoom === 'fit'} onClick={() => setZoom('fit')}>{az ? 'Sığdır' : 'Fit'}</button>
              <button aria-pressed={zoom === 'full'} onClick={() => setZoom('full')}><ZoomIn size={14} className="mr-1 inline" />100%</button>
            </div>
          </div>
          {empty && (
            <div className="mx-4 mt-3 flex shrink-0 items-center gap-2 self-center rounded-xl border border-primary/25 bg-primary-soft px-3.5 py-2 text-small text-primary" role="status">
              <Info size={15} className="shrink-0" />{az ? 'Bu, nümunə məzmundur. Yazmağa başlayanda CV-niz burada görünəcək.' : 'This is sample content. Your CV appears here as you type.'}
            </div>
          )}
          <div ref={previewRef} className="flex min-h-0 flex-1 flex-col overflow-auto px-3 py-5 pb-32 sm:px-8 lg:px-6 lg:py-4 lg:pb-4">
            <div className="mx-auto my-auto shrink-0 transition-[width] duration-300 ease-out"
              style={pageW ? { width: pageW } : { width: '100%', maxWidth: 860 }}>
              <CVDocument data={shown} template={selectedTemplate} lang={lang} font={cvSettings.font} textScale={cvSettings.textScale}
                layoutRef={layoutRef} onLayout={l => setPages(l.pages)} />
            </div>
          </div>
        </main>
      </div>

      {/* ── mobile bottom navigation ── */}
      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-surface/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden" aria-label="Editor">
        <div className="grid grid-cols-3">
          {tabs.map(t => (
            <button key={t.id} onClick={() => setMobileTab(t.id)} aria-current={tab === t.id ? 'page' : undefined}
              className={`relative flex h-14 flex-col items-center justify-center gap-0.5 text-[0.6875rem] font-semibold transition-colors ${tab === t.id ? 'text-primary' : 'text-muted'}`}>
              <t.icon size={19} aria-hidden />{t.label}
              {tab === t.id && <span className="absolute inset-x-6 top-0 h-0.5 rounded-full bg-primary" />}
            </button>
          ))}
        </div>
      </nav>

      {/* ── gating modals ── */}
      <Modal open={limitModal} onClose={() => setLimitModal(false)} title={az ? 'CV limitinə çatdınız' : 'CV limit reached'}>
        <p className="mb-5 text-body text-ink-2">{az ? 'Pulsuz planda 2 CV yükləmək mümkündür. Limitsiz CV və bütün şablonlar üçün Premium plana keçin.' : 'The free plan includes 2 CV downloads. Upgrade to Premium for unlimited CVs and every template.'}</p>
        <Link href="/pricing" className="btn-primary btn-lg w-full"><Sparkles size={16} />{az ? 'Premium-a keç' : 'Upgrade to Premium'}</Link>
      </Modal>
      <Modal open={premiumModal} onClose={() => setPremiumModal(false)} title={az ? 'Bu şablon Premium-dur' : 'This template is Premium'}>
        <p className="mb-5 text-body text-ink-2">{az ? 'Bu şablonla PDF yükləmək üçün Premium lazımdır. Önizləməni pulsuz görə bilərsiniz — və ya pulsuz şablon seçin.' : 'Downloading with this template needs Premium. Previewing is free — or pick a free template.'}</p>
        <div className="grid gap-2">
          <Link href="/pricing" className="btn-primary btn-lg"><Lock size={15} />{az ? 'Premium-a keç' : 'Upgrade to Premium'}</Link>
          <button className="btn-secondary btn-lg" onClick={() => { setPremiumModal(false); setMobileTab('design'); }}>{az ? 'Pulsuz şablon seç' : 'Choose a free template'}</button>
        </div>
      </Modal>
    </div>
  );
}

function DesignBlock({ title, hint, action, children }: { title: string; hint?: string; action?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section>
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <h3 className="t-h3 text-[1.05rem]">{title}</h3>
          {hint && <p className="mt-0.5 text-small text-muted">{hint}</p>}
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}
