'use client';
import { useRef, useState, ReactNode, useId } from 'react';
import {
  User, Briefcase, GraduationCap, Zap, Globe, Award, BookOpen, Pin, ChevronDown, Sparkles, ImagePlus, RefreshCw,
  Plus, Trash2, ArrowUp, ArrowDown, FolderGit2, LayoutList, Check, X,
} from 'lucide-react';
import { useCVStore } from '@/app/store/cvStore';
import { CVData, WorkExperience } from '@/app/types/cv';
import { t } from '@/app/store/translations';
import { streamGenerate, AI_MESSAGES } from '@/lib/ai';
import { fileToPhoto } from '@/lib/image';
import { useToast } from '@/app/components/ui/Toaster';

const MONTHS = {
  az: ['Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'İyun', 'İyul', 'Avqust', 'Sentyabr', 'Oktyabr', 'Noyabr', 'Dekabr'],
  en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
};
const LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'Ana dili', 'Native'];
const YEARS = Array.from({ length: 50 }, (_, i) => String(new Date().getFullYear() + 1 - i));
const SUMMARY_MAX = 600;
const DESC_MAX = 900;

const uid = () => Math.random().toString(36).slice(2, 10);
const move = <T,>(list: T[], i: number, dir: -1 | 1): T[] => {
  const j = i + dir;
  if (j < 0 || j >= list.length) return list;
  const c = list.slice(); [c[i], c[j]] = [c[j], c[i]];
  return c;
};

// ── primitives ───────────────────────────────────────────────────────────────
function Field({ label, children, className = '', hint, htmlFor }: { label: string; children: ReactNode; className?: string; hint?: ReactNode; htmlFor?: string }) {
  return (
    <div className={className}>
      <div className="mb-1.5 flex items-baseline justify-between gap-2">
        <label htmlFor={htmlFor} className="text-[0.75rem] font-medium text-ink-2">{label}</label>
        {hint && <span className="text-caption text-muted">{hint}</span>}
      </div>
      {children}
    </div>
  );
}

function Section({ title, icon, count, done, defaultOpen = false, children }: {
  title: string; icon: ReactNode; count?: number; done?: boolean; defaultOpen?: boolean; children: ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();
  return (
    <section className="card-flat overflow-hidden">
      <h3>
        <button type="button" onClick={() => setOpen(o => !o)} aria-expanded={open} aria-controls={id}
          className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors hover:bg-surface-2">
          <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg transition-colors ${done ? 'bg-success-soft text-success' : 'bg-surface-2 text-ink-2'}`}>
            {done ? <Check size={16} /> : icon}
          </span>
          <span className="flex-1 text-[0.9375rem] font-semibold text-ink">{title}</span>
          {!!count && <span className="badge-muted">{count}</span>}
          <ChevronDown size={18} className={`text-muted transition-transform duration-200 ${open ? 'rotate-180' : ''}`} aria-hidden />
        </button>
      </h3>
      <div id={id} role="region" className={`grid transition-[grid-template-rows] duration-300 ease-out ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
        <div className="overflow-hidden">
          <div className={`border-t border-line px-4 py-4 ${open ? '' : 'invisible'}`}>{children}</div>
        </div>
      </div>
    </section>
  );
}

function Entry({ title, index, total, onMove, onRemove, children, removeLabel, moveLabels }: {
  title: string; index: number; total: number; onMove: (d: -1 | 1) => void; onRemove: () => void; children: ReactNode; removeLabel: string; moveLabels: [string, string];
}) {
  return (
    <div className="rounded-xl border border-line bg-bg/60 p-3.5 animate-rise">
      <div className="mb-3 flex items-center gap-2">
        <span className="grid h-6 min-w-6 place-items-center rounded-md bg-surface-3 px-1 text-caption font-semibold text-ink-2">{index + 1}</span>
        <span className="min-w-0 flex-1 truncate text-[0.8125rem] font-semibold text-ink">{title}</span>
        <button type="button" className="btn-ghost btn-icon h-8 w-8" disabled={index === 0} onClick={() => onMove(-1)} aria-label={moveLabels[0]}><ArrowUp size={15} /></button>
        <button type="button" className="btn-ghost btn-icon h-8 w-8" disabled={index === total - 1} onClick={() => onMove(1)} aria-label={moveLabels[1]}><ArrowDown size={15} /></button>
        <button type="button" className="btn-ghost btn-icon h-8 w-8 hover:!bg-danger-soft hover:!text-danger" onClick={onRemove} aria-label={removeLabel}><Trash2 size={15} /></button>
      </div>
      {children}
    </div>
  );
}

function AddButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick}
      className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-dashed border-line-strong text-[0.875rem] font-semibold text-primary transition-colors hover:border-primary hover:bg-primary-soft">
      <Plus size={16} />{label}
    </button>
  );
}

function Empty({ text, action }: { text: string; action: ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-line-strong px-4 py-6 text-center">
      <p className="text-small text-muted">{text}</p>
      {action}
    </div>
  );
}

function AiButton({ busy, disabled, onClick, lang, hint }: { busy: boolean; disabled: boolean; onClick: () => void; lang: 'az' | 'en'; hint?: string }) {
  return (
    <button type="button" onClick={onClick} disabled={disabled || busy} title={disabled ? hint : undefined}
      className="inline-flex h-7 items-center gap-1.5 rounded-full border border-primary/25 bg-primary-soft px-3 text-caption font-semibold text-primary transition-colors hover:border-primary/50 disabled:border-line disabled:bg-surface-2 disabled:text-muted">
      {busy ? <RefreshCw size={12} className="spin" /> : <Sparkles size={12} />}
      {busy ? (lang === 'az' ? 'Yazılır…' : 'Writing…') : (lang === 'az' ? 'AI ilə yaz' : 'Write with AI')}
    </button>
  );
}

function DateSelects({ month, year, onMonth, onYear, disabled, lang, showMonth = true }: {
  month?: string; year: string; onMonth?: (v: string) => void; onYear: (v: string) => void; disabled?: boolean; lang: 'az' | 'en'; showMonth?: boolean;
}) {
  return (
    <div className={`grid gap-2 ${showMonth ? 'grid-cols-2' : 'grid-cols-1'}`}>
      {showMonth && (
        <select className="input" value={month} disabled={disabled} onChange={e => onMonth?.(e.target.value)} aria-label={lang === 'az' ? 'Ay' : 'Month'}>
          <option value="">{lang === 'az' ? 'Ay' : 'Month'}</option>
          {MONTHS[lang].map((m, i) => <option key={i} value={String(i + 1).padStart(2, '0')}>{m}</option>)}
        </select>
      )}
      <select className="input" value={year} disabled={disabled} onChange={e => onYear(e.target.value)} aria-label={lang === 'az' ? 'İl' : 'Year'}>
        <option value="">{lang === 'az' ? 'İl' : 'Year'}</option>
        {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
      </select>
    </div>
  );
}

// ── experience entry (owns its own AI state) ─────────────────────────────────
function ExpEntry({ exp, idx, total, lang, wantedTitle, onUpdate, onMove, onRemove }: {
  exp: WorkExperience; idx: number; total: number; lang: 'az' | 'en'; wantedTitle: string;
  onUpdate: (field: string, value: string | boolean) => void; onMove: (d: -1 | 1) => void; onRemove: () => void;
}) {
  const { user } = useCVStore();
  const tr = t[lang];
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const months = MONTHS[lang];
  const canAI = exp.jobTitle.trim().length > 0;

  const run = async () => {
    if (!canAI) return;
    setBusy(true); setErr('');
    const start = exp.startYear ? (exp.startMonth ? `${months[parseInt(exp.startMonth) - 1]} ${exp.startYear}` : exp.startYear) : (lang === 'az' ? 'bilinmir' : 'unknown');
    const end = exp.current ? (lang === 'az' ? 'hal-hazırda' : 'present') : exp.endYear ? (exp.endMonth ? `${months[parseInt(exp.endMonth) - 1]} ${exp.endYear}` : exp.endYear) : (lang === 'az' ? 'bilinmir' : 'unknown');
    const r = await streamGenerate({
      userId: user?.id, jobTitle: exp.jobTitle.trim(), wantedTitle: wantedTitle.trim(),
      employer: exp.company.trim() || (lang === 'az' ? 'şirkət' : 'a company'),
      city: exp.city.trim() || (lang === 'az' ? 'şəhər göstərilməyib' : 'location not specified'),
      startDate: start, endDate: end, language: lang,
    }, text => onUpdate('description', text));
    if (r !== 'ok') setErr(AI_MESSAGES[lang][r]);
    setBusy(false);
  };

  return (
    <Entry index={idx} total={total} onMove={onMove} onRemove={onRemove}
      title={exp.jobTitle || (lang === 'az' ? 'Yeni təcrübə' : 'New experience')}
      removeLabel={lang === 'az' ? 'Sil' : 'Remove'} moveLabels={[lang === 'az' ? 'Yuxarı' : 'Move up', lang === 'az' ? 'Aşağı' : 'Move down']}>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Field label={`${tr.jobTitle.replace(' (İstədiyiniz)', '').replace(' (Desired)', '')} *`} className="sm:col-span-2">
          <input className="input" value={exp.jobTitle} onChange={e => onUpdate('jobTitle', e.target.value)} placeholder={lang === 'az' ? 'Proqramçı, Mühasib…' : 'Developer, Accountant…'} />
        </Field>
        <Field label={tr.company}><input className="input" value={exp.company} onChange={e => onUpdate('company', e.target.value)} placeholder={lang === 'az' ? 'Kapital Bank' : 'Company name'} /></Field>
        <Field label={tr.location}><input className="input" value={exp.city} onChange={e => onUpdate('city', e.target.value)} placeholder="Bakı / Baku" /></Field>
        <Field label={tr.startDate}><DateSelects lang={lang} month={exp.startMonth} year={exp.startYear} onMonth={v => onUpdate('startMonth', v)} onYear={v => onUpdate('startYear', v)} /></Field>
        <Field label={tr.endDate}>
          <DateSelects lang={lang} month={exp.endMonth} year={exp.endYear} disabled={exp.current} onMonth={v => onUpdate('endMonth', v)} onYear={v => onUpdate('endYear', v)} />
          <label className="mt-2 flex cursor-pointer items-center gap-2 text-small text-ink-2">
            <input type="checkbox" checked={exp.current} onChange={e => onUpdate('current', e.target.checked)} className="h-4 w-4 accent-[rgb(var(--primary))]" />{tr.current}
          </label>
        </Field>
        <Field label={tr.description} className="sm:col-span-2" hint={`${exp.description.length}/${DESC_MAX}`}>
          <div className="mb-2 flex items-center justify-between gap-2">
            <span className="text-caption text-muted">{canAI ? (lang === 'az' ? 'Hər sətir ayrı nöqtədir' : 'One bullet per line') : (lang === 'az' ? 'AI üçün əvvəlcə vəzifə adı yazın' : 'Enter a job title to enable AI')}</span>
            <AiButton lang={lang} busy={busy} disabled={!canAI} onClick={run} hint={lang === 'az' ? 'Əvvəlcə vəzifə adı yazın' : 'Enter job title first'} />
          </div>
          {err && <p role="alert" className="mb-2 rounded-lg bg-danger-soft px-3 py-2 text-small text-danger">{err}</p>}
          <textarea className="input min-h-[112px] resize-y" maxLength={DESC_MAX} value={exp.description} onChange={e => onUpdate('description', e.target.value)}
            placeholder={lang === 'az' ? '• Nailiyyətlərinizi yazın və ya AI düyməsinə basın…' : '• Describe your achievements or press the AI button…'} />
        </Field>
      </div>
    </Entry>
  );
}

// ── main form ─────────────────────────────────────────────────────────────────
export default function CVForm() {
  const { cvData, setCVData, lang, user } = useCVStore();
  const { toast } = useToast();
  const tr = t[lang];
  const az = lang === 'az';
  const [skillInput, setSkillInput] = useState('');
  const photoRef = useRef<HTMLInputElement>(null);
  const [sumBusy, setSumBusy] = useState(false);
  const [sumErr, setSumErr] = useState('');
  const [emailTouched, setEmailTouched] = useState(false);

  const p = cvData.personal;
  const canSummary = p.jobTitle.trim().length > 0;
  const emailBad = emailTouched && p.email.trim() !== '' && !/^\S+@\S+\.\S+$/.test(p.email.trim());

  const set = (fn: (prev: CVData) => CVData) => setCVData((prev: CVData) => fn(prev));
  const updatePersonal = (field: string, value: string) => set(prev => ({ ...prev, personal: { ...prev.personal, [field]: value } }));

  // Removing never silently loses content: keep a snapshot and offer Undo.
  const removeWithUndo = (label: string, fn: (prev: CVData) => CVData) => {
    let snapshot: CVData | null = null;
    setCVData((prev: CVData) => { snapshot = prev; return fn(prev); });
    toast({ title: az ? `${label} silindi` : `${label} removed`, action: { label: az ? 'Geri qaytar' : 'Undo', onClick: () => snapshot && setCVData(snapshot) } });
  };

  const runSummary = async () => {
    if (!canSummary) return;
    setSumBusy(true); setSumErr('');
    const r = await streamGenerate({
      userId: user?.id, type: 'summary', jobTitle: p.jobTitle.trim(),
      city: [p.city, p.country].filter(Boolean).join(', '), skills: cvData.skills.slice(0, 6).join(', '), language: lang,
    }, text => updatePersonal('summary', text));
    if (r !== 'ok') setSumErr(AI_MESSAGES[lang][r]);
    setSumBusy(false);
  };

  const handlePhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    if (!['image/png', 'image/jpeg', 'image/jpg'].includes(file.type) && !/\.(png|jpe?g)$/i.test(file.name)) {
      toast({ kind: 'error', title: az ? 'Yalnız PNG, JPG və ya JPEG yükləyə bilərsiniz' : 'Only PNG, JPG or JPEG images are allowed' });
      return;
    }
    try { updatePersonal('photo', await fileToPhoto(file)); }
    catch { toast({ kind: 'error', title: az ? 'Şəkil oxunmadı' : 'Could not read the image' }); }
  };

  const moveLabels: [string, string] = [az ? 'Yuxarı' : 'Move up', az ? 'Aşağı' : 'Move down'];
  const removeLabel = az ? 'Sil' : 'Remove';
  const emptyAdd = (label: string, onClick: () => void) => (
    <button type="button" onClick={onClick} className="btn-secondary btn-sm"><Plus size={14} />{label}</button>
  );

  const certs = cvData.certificates || [];
  const trains = cvData.trainings || [];
  const projects = cvData.projects || [];
  const customs = cvData.customSections || [];

  return (
    <div className="flex flex-col gap-3">
      {/* ── Personal ── */}
      <Section title={tr.personal} icon={<User size={16} />} defaultOpen done={!!(p.firstName && p.lastName && p.email)}>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Field label={tr.firstName}><input className="input" autoComplete="given-name" value={p.firstName} onChange={e => updatePersonal('firstName', e.target.value)} placeholder="Əli" /></Field>
          <Field label={tr.lastName}><input className="input" autoComplete="family-name" value={p.lastName} onChange={e => updatePersonal('lastName', e.target.value)} placeholder="Əliyev" /></Field>
          <Field label={tr.email} hint={emailBad ? <span className="text-danger">{az ? 'E-poçt düzgün deyil' : 'Invalid email'}</span> : undefined}>
            <input className="input" type="email" autoComplete="email" inputMode="email" aria-invalid={emailBad} value={p.email} onBlur={() => setEmailTouched(true)} onChange={e => updatePersonal('email', e.target.value)} placeholder="ali@gmail.com" />
          </Field>
          <Field label={tr.phone}><input className="input" type="tel" autoComplete="tel" inputMode="tel" value={p.phone} onChange={e => updatePersonal('phone', e.target.value)} placeholder="+994 50 123 45 67" /></Field>
          <Field label={tr.city}><input className="input" value={p.city} onChange={e => updatePersonal('city', e.target.value)} placeholder="Bakı" /></Field>
          <Field label={tr.country}><input className="input" value={p.country} onChange={e => updatePersonal('country', e.target.value)} placeholder="Azərbaycan" /></Field>
          <Field label={tr.jobTitle} className="sm:col-span-2">
            <input className="input" value={p.jobTitle} onChange={e => updatePersonal('jobTitle', e.target.value)} placeholder={az ? 'Frontend Proqramçı, Mühasib…' : 'Frontend Developer, Accountant…'} />
          </Field>
          <Field label={tr.summary} className="sm:col-span-2" hint={`${(p.summary || '').length}/${SUMMARY_MAX}`}>
            <div className="mb-2 flex items-center justify-between gap-2">
              <span className="text-caption text-muted">{canSummary ? (az ? '2–3 cümlə kifayətdir' : '2–3 sentences is enough') : (az ? 'AI üçün əvvəlcə vəzifə adı yazın' : 'Enter a job title to enable AI')}</span>
              <AiButton lang={lang} busy={sumBusy} disabled={!canSummary} onClick={runSummary} hint={az ? 'Əvvəlcə vəzifə adı yazın' : 'Enter job title first'} />
            </div>
            {sumErr && <p role="alert" className="mb-2 rounded-lg bg-danger-soft px-3 py-2 text-small text-danger">{sumErr}</p>}
            <textarea className="input min-h-[92px] resize-y" maxLength={SUMMARY_MAX} value={p.summary || ''} onChange={e => updatePersonal('summary', e.target.value)} placeholder={az ? 'Özünüz haqqında qısa məlumat…' : 'A short introduction about yourself…'} />
          </Field>
          <Field label="LinkedIn" className="sm:col-span-2"><input className="input" value={p.linkedin || ''} onChange={e => updatePersonal('linkedin', e.target.value)} placeholder="linkedin.com/in/adınız" /></Field>
          <Field label={az ? 'Foto (istəyə bağlı)' : 'Photo (optional)'} className="sm:col-span-2">
            <input ref={photoRef} type="file" accept=".png,.jpg,.jpeg,image/png,image/jpeg" onChange={handlePhoto} className="hidden" />
            <div className="flex items-center gap-3">
              {p.photo
                ? <img src={p.photo} alt="" className="h-14 w-14 rounded-xl border border-line object-cover" />
                : <span className="grid h-14 w-14 place-items-center rounded-xl border border-dashed border-line-strong text-muted"><User size={20} /></span>}
              <button type="button" onClick={() => photoRef.current?.click()} className="btn-secondary btn-sm">
                {p.photo ? <RefreshCw size={14} /> : <ImagePlus size={14} />}{p.photo ? (az ? 'Dəyiş' : 'Change') : (az ? 'Foto yüklə' : 'Upload photo')}
              </button>
              {p.photo && <button type="button" onClick={() => updatePersonal('photo', '')} className="btn-ghost btn-sm"><X size={14} />{az ? 'Sil' : 'Remove'}</button>}
            </div>
          </Field>
        </div>
      </Section>

      {/* ── Experience ── */}
      <Section title={tr.experience} icon={<Briefcase size={16} />} count={cvData.experience.length} done={cvData.experience.length > 0}>
        <div className="flex flex-col gap-3">
          {cvData.experience.length === 0 && <Empty text={az ? 'Hələ iş təcrübəsi əlavə edilməyib.' : 'No experience added yet.'} action={emptyAdd(tr.addExperience, () => set(prev => ({ ...prev, experience: [...prev.experience, blankExp()] })))} />}
          {cvData.experience.map((exp, idx) => (
            <ExpEntry key={exp.id} exp={exp} idx={idx} total={cvData.experience.length} lang={lang} wantedTitle={p.jobTitle}
              onUpdate={(f, v) => set(prev => ({ ...prev, experience: prev.experience.map(e => (e.id === exp.id ? { ...e, [f]: v } : e)) }))}
              onMove={d => set(prev => ({ ...prev, experience: move(prev.experience, idx, d) }))}
              onRemove={() => removeWithUndo(exp.jobTitle || (az ? 'Təcrübə' : 'Experience'), prev => ({ ...prev, experience: prev.experience.filter(e => e.id !== exp.id) }))} />
          ))}
          {cvData.experience.length > 0 && <AddButton label={tr.addExperience} onClick={() => set(prev => ({ ...prev, experience: [...prev.experience, blankExp()] }))} />}
        </div>
      </Section>

      {/* ── Education ── */}
      <Section title={tr.education} icon={<GraduationCap size={16} />} count={cvData.education.length} done={cvData.education.length > 0}>
        <div className="flex flex-col gap-3">
          {cvData.education.length === 0 && <Empty text={az ? 'Hələ təhsil əlavə edilməyib.' : 'No education added yet.'} action={emptyAdd(tr.addEducation, () => set(prev => ({ ...prev, education: [...prev.education, blankEdu()] })))} />}
          {cvData.education.map((edu, idx) => (
            <Entry key={edu.id} index={idx} total={cvData.education.length} title={edu.school || (az ? 'Yeni təhsil' : 'New education')} removeLabel={removeLabel} moveLabels={moveLabels}
              onMove={d => set(prev => ({ ...prev, education: move(prev.education, idx, d) }))}
              onRemove={() => removeWithUndo(edu.school || (az ? 'Təhsil' : 'Education'), prev => ({ ...prev, education: prev.education.filter(e => e.id !== edu.id) }))}>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Field label={tr.school} className="sm:col-span-2"><input className="input" value={edu.school} onChange={e => updateList('education', edu.id, 'school', e.target.value)} placeholder={az ? 'Azərbaycan Texniki Universiteti' : 'MIT, Harvard…'} /></Field>
                <Field label={tr.degree} className="sm:col-span-2"><input className="input" value={edu.degree} onChange={e => updateList('education', edu.id, 'degree', e.target.value)} placeholder={az ? 'Kompüter Mühəndisliyi, Bakalavr' : 'Computer Science, Bachelor'} /></Field>
                <Field label={tr.startDate}><DateSelects lang={lang} showMonth={false} year={edu.startYear} onYear={v => updateList('education', edu.id, 'startYear', v)} /></Field>
                <Field label={tr.endDate}><DateSelects lang={lang} showMonth={false} year={edu.endYear} onYear={v => updateList('education', edu.id, 'endYear', v)} /></Field>
              </div>
            </Entry>
          ))}
          {cvData.education.length > 0 && <AddButton label={tr.addEducation} onClick={() => set(prev => ({ ...prev, education: [...prev.education, blankEdu()] }))} />}
        </div>
      </Section>

      {/* ── Skills ── */}
      <Section title={tr.skills} icon={<Zap size={16} />} count={cvData.skills.length} done={cvData.skills.length > 0}>
        {cvData.skills.length === 0 && <p className="mb-3 text-small text-muted">{az ? 'Hələ bacarıq əlavə edilməyib.' : 'No skills added yet.'}</p>}
        <div className="mb-3 flex flex-wrap gap-2">
          {cvData.skills.map(s => (
            <span key={s} className="inline-flex h-8 animate-pop items-center gap-1 rounded-full bg-primary-soft pl-3 pr-1 text-[0.8125rem] font-medium text-primary">
              {s}
              <button type="button" onClick={() => set(prev => ({ ...prev, skills: prev.skills.filter(x => x !== s) }))} aria-label={`${removeLabel}: ${s}`} className="grid h-6 w-6 place-items-center rounded-full hover:bg-primary/15"><X size={13} /></button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <input className="input" value={skillInput} onChange={e => setSkillInput(e.target.value)} placeholder={tr.skillsPlaceholder} aria-label={tr.skills}
            onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addSkill(); } }} />
          <button type="button" className="btn-secondary shrink-0" onClick={addSkill} disabled={!skillInput.trim()}><Plus size={16} />{az ? 'Əlavə et' : 'Add'}</button>
        </div>
      </Section>

      {/* ── Languages ── */}
      <Section title={tr.languages} icon={<Globe size={16} />} count={cvData.languages.length} done={cvData.languages.length > 0}>
        <div className="flex flex-col gap-3">
          {cvData.languages.length === 0 && <Empty text={az ? 'Hələ dil əlavə edilməyib.' : 'No languages added yet.'} action={emptyAdd(tr.addLanguage, () => set(prev => ({ ...prev, languages: [...prev.languages, { id: uid(), name: '', level: 'B2' }] })))} />}
          {cvData.languages.map((l, idx) => (
            <div key={l.id} className="grid grid-cols-[1fr_110px_auto] items-end gap-2 animate-rise">
              <Field label={tr.language}><input className="input" value={l.name} onChange={e => updateList('languages', l.id, 'name', e.target.value)} placeholder="Azərbaycan" /></Field>
              <Field label={tr.level}>
                <select className="input" value={l.level} onChange={e => updateList('languages', l.id, 'level', e.target.value)}>{LEVELS.map(v => <option key={v} value={v}>{v}</option>)}</select>
              </Field>
              <button type="button" className="btn-ghost btn-icon h-10 w-10 hover:!bg-danger-soft hover:!text-danger" aria-label={removeLabel}
                onClick={() => removeWithUndo(l.name || (az ? 'Dil' : 'Language'), prev => ({ ...prev, languages: prev.languages.filter(x => x.id !== l.id) }))}><Trash2 size={15} /></button>
              <span className="hidden">{idx}</span>
            </div>
          ))}
          {cvData.languages.length > 0 && <AddButton label={tr.addLanguage} onClick={() => set(prev => ({ ...prev, languages: [...prev.languages, { id: uid(), name: '', level: 'B2' }] }))} />}
        </div>
      </Section>

      {/* ── Certificates ── */}
      <Section title={az ? 'Sertifikatlar' : 'Certificates'} icon={<Award size={16} />} count={certs.length} done={certs.length > 0}>
        <div className="flex flex-col gap-3">
          {certs.length === 0 && <Empty text={az ? 'Hələ sertifikat əlavə edilməyib.' : 'No certificates added yet.'} action={emptyAdd(az ? 'Sertifikat əlavə et' : 'Add certificate', () => set(prev => ({ ...prev, certificates: [...(prev.certificates || []), { id: uid(), name: '', issuer: '', year: '' }] })))} />}
          {certs.map((c, idx) => (
            <Entry key={c.id} index={idx} total={certs.length} title={c.name || (az ? 'Yeni sertifikat' : 'New certificate')} removeLabel={removeLabel} moveLabels={moveLabels}
              onMove={d => set(prev => ({ ...prev, certificates: move(prev.certificates || [], idx, d) }))}
              onRemove={() => removeWithUndo(c.name || (az ? 'Sertifikat' : 'Certificate'), prev => ({ ...prev, certificates: (prev.certificates || []).filter(x => x.id !== c.id) }))}>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Field label={az ? 'Sertifikat adı' : 'Certificate name'} className="sm:col-span-2"><input className="input" value={c.name} onChange={e => updateList('certificates', c.id, 'name', e.target.value)} placeholder="ISTQB, AWS, Google Analytics…" /></Field>
                <Field label={az ? 'Verən qurum' : 'Issuer'}><input className="input" value={c.issuer} onChange={e => updateList('certificates', c.id, 'issuer', e.target.value)} placeholder="Coursera, Google…" /></Field>
                <Field label={az ? 'İl' : 'Year'}><DateSelects lang={lang} showMonth={false} year={c.year} onYear={v => updateList('certificates', c.id, 'year', v)} /></Field>
              </div>
            </Entry>
          ))}
          {certs.length > 0 && <AddButton label={az ? 'Sertifikat əlavə et' : 'Add certificate'} onClick={() => set(prev => ({ ...prev, certificates: [...(prev.certificates || []), { id: uid(), name: '', issuer: '', year: '' }] }))} />}
        </div>
      </Section>

      {/* ── Trainings ── */}
      <Section title={az ? 'Təlimlər' : 'Trainings'} icon={<BookOpen size={16} />} count={trains.length} done={trains.length > 0}>
        <div className="flex flex-col gap-3">
          {trains.length === 0 && <Empty text={az ? 'Hələ təlim əlavə edilməyib.' : 'No trainings added yet.'} action={emptyAdd(az ? 'Təlim əlavə et' : 'Add training', () => set(prev => ({ ...prev, trainings: [...(prev.trainings || []), { id: uid(), name: '', provider: '', year: '', description: '' }] })))} />}
          {trains.map((tr2, idx) => (
            <Entry key={tr2.id} index={idx} total={trains.length} title={tr2.name || (az ? 'Yeni təlim' : 'New training')} removeLabel={removeLabel} moveLabels={moveLabels}
              onMove={d => set(prev => ({ ...prev, trainings: move(prev.trainings || [], idx, d) }))}
              onRemove={() => removeWithUndo(tr2.name || (az ? 'Təlim' : 'Training'), prev => ({ ...prev, trainings: (prev.trainings || []).filter(x => x.id !== tr2.id) }))}>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Field label={az ? 'Təlim adı' : 'Training name'} className="sm:col-span-2"><input className="input" value={tr2.name} onChange={e => updateList('trainings', tr2.id, 'name', e.target.value)} placeholder="React Bootcamp, QA Intensive…" /></Field>
                <Field label={az ? 'Təlim verən' : 'Provider'}><input className="input" value={tr2.provider} onChange={e => updateList('trainings', tr2.id, 'provider', e.target.value)} placeholder="Narix Academy…" /></Field>
                <Field label={az ? 'İl' : 'Year'}><DateSelects lang={lang} showMonth={false} year={tr2.year} onYear={v => updateList('trainings', tr2.id, 'year', v)} /></Field>
                <Field label={az ? 'Açıqlama (istəyə bağlı)' : 'Description (optional)'} className="sm:col-span-2"><input className="input" value={tr2.description} onChange={e => updateList('trainings', tr2.id, 'description', e.target.value)} placeholder={az ? 'Qısa məlumat…' : 'Brief description…'} /></Field>
              </div>
            </Entry>
          ))}
          {trains.length > 0 && <AddButton label={az ? 'Təlim əlavə et' : 'Add training'} onClick={() => set(prev => ({ ...prev, trainings: [...(prev.trainings || []), { id: uid(), name: '', provider: '', year: '', description: '' }] }))} />}
        </div>
      </Section>

      {/* ── Projects & links ── */}
      <Section title={az ? 'Layihələr və linklər' : 'Projects & links'} icon={<FolderGit2 size={16} />} count={projects.length} done={projects.length > 0}>
        <div className="flex flex-col gap-3">
          {projects.length === 0 && <Empty text={az ? 'Layihə, portfolio və ya GitHub linki əlavə edin.' : 'Add a project, portfolio or GitHub link.'} action={emptyAdd(az ? 'Layihə əlavə et' : 'Add project', () => set(prev => ({ ...prev, projects: [...(prev.projects || []), { id: uid(), name: '', link: '', description: '' }] })))} />}
          {projects.map((pr, idx) => (
            <Entry key={pr.id} index={idx} total={projects.length} title={pr.name || (az ? 'Yeni layihə' : 'New project')} removeLabel={removeLabel} moveLabels={moveLabels}
              onMove={d => set(prev => ({ ...prev, projects: move(prev.projects || [], idx, d) }))}
              onRemove={() => removeWithUndo(pr.name || (az ? 'Layihə' : 'Project'), prev => ({ ...prev, projects: (prev.projects || []).filter(x => x.id !== pr.id) }))}>
              <div className="grid grid-cols-1 gap-3">
                <Field label={az ? 'Ad' : 'Name'}><input className="input" value={pr.name} onChange={e => updateList('projects', pr.id, 'name', e.target.value)} placeholder="Portfolio, Open-source tool…" /></Field>
                <Field label={az ? 'Link' : 'Link'}><input className="input" value={pr.link} onChange={e => updateList('projects', pr.id, 'link', e.target.value)} placeholder="github.com/adınız/layihə" /></Field>
                <Field label={az ? 'Qısa açıqlama' : 'Short description'}><textarea className="input min-h-[64px] resize-y" value={pr.description} onChange={e => updateList('projects', pr.id, 'description', e.target.value)} /></Field>
              </div>
            </Entry>
          ))}
          {projects.length > 0 && <AddButton label={az ? 'Layihə əlavə et' : 'Add project'} onClick={() => set(prev => ({ ...prev, projects: [...(prev.projects || []), { id: uid(), name: '', link: '', description: '' }] }))} />}
        </div>
      </Section>

      {/* ── Custom sections ── */}
      <Section title={az ? 'Xüsusi bölmələr' : 'Custom sections'} icon={<LayoutList size={16} />} count={customs.length} done={customs.length > 0}>
        <div className="flex flex-col gap-3">
          {customs.length === 0 && <Empty text={az ? 'Mükafatlar, könüllülük, nəşrlər və s. üçün öz bölməni yarat.' : 'Create your own section for awards, volunteering, publications and more.'} action={emptyAdd(az ? 'Bölmə əlavə et' : 'Add section', () => set(prev => ({ ...prev, customSections: [...(prev.customSections || []), { id: uid(), title: '', content: '' }] })))} />}
          {customs.map((cs, idx) => (
            <Entry key={cs.id} index={idx} total={customs.length} title={cs.title || (az ? 'Yeni bölmə' : 'New section')} removeLabel={removeLabel} moveLabels={moveLabels}
              onMove={d => set(prev => ({ ...prev, customSections: move(prev.customSections || [], idx, d) }))}
              onRemove={() => removeWithUndo(cs.title || (az ? 'Bölmə' : 'Section'), prev => ({ ...prev, customSections: (prev.customSections || []).filter(x => x.id !== cs.id) }))}>
              <div className="grid grid-cols-1 gap-3">
                <Field label={az ? 'Bölmə adı' : 'Section title'}><input className="input" value={cs.title} onChange={e => updateList('customSections', cs.id, 'title', e.target.value)} placeholder={az ? 'Mükafatlar' : 'Awards'} /></Field>
                <Field label={az ? 'Məzmun' : 'Content'}><textarea className="input min-h-[84px] resize-y" value={cs.content} onChange={e => updateList('customSections', cs.id, 'content', e.target.value)} /></Field>
              </div>
            </Entry>
          ))}
          {customs.length > 0 && <AddButton label={az ? 'Bölmə əlavə et' : 'Add section'} onClick={() => set(prev => ({ ...prev, customSections: [...(prev.customSections || []), { id: uid(), title: '', content: '' }] }))} />}
        </div>
      </Section>

      {/* ── Additional ── */}
      <Section title={tr.additional} icon={<Pin size={16} />} done={!!cvData.additional.trim()}>
        <textarea className="input min-h-[92px] resize-y" aria-label={tr.additional} value={cvData.additional} onChange={e => set(prev => ({ ...prev, additional: e.target.value }))} placeholder={tr.additionalPlaceholder} />
      </Section>
    </div>
  );

  // — helpers that need closure over `set` —
  function addSkill() {
    const s = skillInput.trim();
    if (!s) return;
    if (!cvData.skills.includes(s)) set(prev => ({ ...prev, skills: [...prev.skills, s] }));
    setSkillInput('');
  }
  function updateList(key: 'education' | 'languages' | 'certificates' | 'trainings' | 'projects' | 'customSections', id: string, field: string, value: string) {
    set(prev => ({ ...prev, [key]: ((prev as any)[key] || []).map((x: any) => (x.id === id ? { ...x, [field]: value } : x)) }));
  }
}

function blankExp(): WorkExperience {
  return { id: uid(), jobTitle: '', company: '', city: '', country: '', startMonth: '', startYear: '', endMonth: '', endYear: '', current: false, description: '' };
}
function blankEdu() {
  return { id: uid(), institutionType: 'university' as const, institutionTypeCustom: '', school: '', degree: '', educationLevel: '', city: '', country: '', startYear: '', endYear: '' };
}
