'use client';
import { useState, useRef } from 'react';
import { useCVStore } from '@/app/store/cvStore';
import { WorkExperience, Education, Language, Certificate, Training, CVData } from '@/app/types/cv';
import { t } from '@/app/store/translations';
import { User, Briefcase, GraduationCap, Zap, Globe, Award, BookOpen, Pin, ChevronDown, Sparkles, ImagePlus, RefreshCw } from 'lucide-react';

const MONTH_LABELS_AZ = ['Yanvar','Fevral','Mart','Aprel','May','İyun','İyul','Avqust','Sentyabr','Oktyabr','Noyabr','Dekabr'];
const MONTH_LABELS_EN = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const LEVELS = ['A1','A2','B1','B2','C1','C2','Ana dili','Native'];
const YEARS = Array.from({ length: 40 }, (_, i) => String(new Date().getFullYear() - i));

const inp: React.CSSProperties = {
  width: '100%', background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8,
  padding: '10px 12px', color: '#fff', fontSize: 13.5,
  outline: 'none', fontFamily: 'Inter, sans-serif', boxSizing: 'border-box'
};
const lbl: React.CSSProperties = {
  display: 'block', fontSize: 12, color: 'rgba(255,255,255,0.5)', marginBottom: 5, fontWeight: 500
};

function uid() { return Math.random().toString(36).slice(2); }

function AccordionSection({ title, icon, children, defaultOpen = false }: {
  title: string; icon: React.ReactNode; children: React.ReactNode; defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, overflow: 'hidden', marginBottom: 10 }}>
      <button onClick={() => setOpen(!open)} style={{
        width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '14px 18px', background: 'rgba(255,255,255,0.03)', border: 'none', cursor: 'pointer', color: '#fff'
      }}>
        <span style={{ fontSize: 14, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 9 }}>
          <span style={{ display: 'inline-flex', color: '#a89ef8' }}>{icon}</span>{title}
        </span>
        <ChevronDown size={18} style={{ opacity: 0.45, transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }} />
      </button>
      {open && <div style={{ padding: '16px 18px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>{children}</div>}
    </div>
  );
}

// ── Experience Block ──────────────────────────────────────────────────────────
function ExpBlock({ exp, idx, lang, wantedTitle, onUpdate, onRemove }: {
  exp: WorkExperience;
  idx: number;
  lang: 'az' | 'en';
  wantedTitle: string; // from personal.jobTitle
  onUpdate: (field: string, value: string | boolean) => void;
  onRemove: () => void;
}) {
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState('');
  const tr = t[lang];
  const months = lang === 'az' ? MONTH_LABELS_AZ : MONTH_LABELS_EN;

  // AI button is active only when jobTitle is filled
  const canAI = exp.jobTitle.trim().length > 0;

  const handleAI = async () => {
    if (!canAI) return;
    setAiLoading(true);
    setAiError('');

    // Build smart date strings
    const startStr = exp.startYear
      ? (exp.startMonth ? `${months[parseInt(exp.startMonth) - 1]} ${exp.startYear}` : exp.startYear)
      : (lang === 'az' ? 'bilinmir' : 'unknown');

    const endStr = exp.current
      ? (lang === 'az' ? 'hal-hazırda' : 'present')
      : exp.endYear
        ? (exp.endMonth ? `${months[parseInt(exp.endMonth) - 1]} ${exp.endYear}` : exp.endYear)
        : (lang === 'az' ? 'bilinmir' : 'unknown');

    // Use wantedTitle as context if company title differs
    const contextTitle = exp.jobTitle.trim();
    const companyStr = exp.company.trim() || (lang === 'az' ? 'şirkət' : 'a company');
    const cityStr = exp.city.trim() || (lang === 'az' ? 'şəhər göstərilməyib' : 'location not specified');

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobTitle: contextTitle,
          wantedTitle: wantedTitle.trim() || '',
          employer: companyStr,
          city: cityStr,
          startDate: startStr,
          endDate: endStr,
          language: lang,
        }),
      });

      if (!res.ok) throw new Error(`${res.status}`);

      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let acc = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        onUpdate('description', acc);
      }
    } catch (e: any) {
      setAiError(lang === 'az' ? 'Xəta baş verdi, yenidən cəhd edin' : 'Error occurred, please try again');
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div style={{ border: '1px solid rgba(255,255,255,0.07)', borderRadius: 10, padding: 14, marginBottom: 12 }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <span style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.4)' }}>
          #{idx + 1} {exp.jobTitle || (lang === 'az' ? 'Yeni Təcrübə' : 'New Experience')}
        </span>
        <button onClick={onRemove} style={{ background: 'none', border: 'none', color: 'rgba(255,80,80,0.6)', cursor: 'pointer', fontSize: 20, lineHeight: 1 }}>×</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {/* Job Title */}
        <div style={{ gridColumn: '1/-1' }}>
          <label style={lbl}>{tr.jobTitle} *</label>
          <input style={inp} value={exp.jobTitle}
            onChange={e => onUpdate('jobTitle', e.target.value)}
            placeholder={lang === 'az' ? 'Proqramçı, Mühasib...' : 'Developer, Accountant...'}
          />
        </div>

        {/* Company */}
        <div>
          <label style={lbl}>{tr.company}</label>
          <input style={inp} value={exp.company}
            onChange={e => onUpdate('company', e.target.value)}
            placeholder={lang === 'az' ? 'Kapital Bank' : 'Company name'}
          />
        </div>

        {/* City */}
        <div>
          <label style={lbl}>{tr.location}</label>
          <input style={inp} value={exp.city}
            onChange={e => onUpdate('city', e.target.value)}
            placeholder="Bakı / Baku"
          />
        </div>

        {/* Start */}
        <div>
          <label style={lbl}>{tr.startDate}</label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
            <select style={{ ...inp, color: exp.startMonth ? '#fff' : 'rgba(255,255,255,0.3)' }}
              value={exp.startMonth} onChange={e => onUpdate('startMonth', e.target.value)}>
              <option value="">{lang === 'az' ? 'Ay' : 'Month'}</option>
              {months.map((m, i) => <option key={i} value={String(i + 1).padStart(2, '0')}>{m}</option>)}
            </select>
            <select style={{ ...inp, color: exp.startYear ? '#fff' : 'rgba(255,255,255,0.3)' }}
              value={exp.startYear} onChange={e => onUpdate('startYear', e.target.value)}>
              <option value="">{lang === 'az' ? 'İl' : 'Year'}</option>
              {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>
        </div>

        {/* End */}
        <div>
          <label style={lbl}>{tr.endDate}</label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, opacity: exp.current ? 0.3 : 1 }}>
            <select disabled={exp.current} style={{ ...inp, color: exp.endMonth ? '#fff' : 'rgba(255,255,255,0.3)' }}
              value={exp.endMonth} onChange={e => onUpdate('endMonth', e.target.value)}>
              <option value="">{lang === 'az' ? 'Ay' : 'Month'}</option>
              {months.map((m, i) => <option key={i} value={String(i + 1).padStart(2, '0')}>{m}</option>)}
            </select>
            <select disabled={exp.current} style={{ ...inp, color: exp.endYear ? '#fff' : 'rgba(255,255,255,0.3)' }}
              value={exp.endYear} onChange={e => onUpdate('endYear', e.target.value)}>
              <option value="">{lang === 'az' ? 'İl' : 'Year'}</option>
              {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>
          <label style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8, cursor: 'pointer', fontSize: 12, color: 'rgba(255,255,255,0.55)' }}>
            <input type="checkbox" checked={exp.current} onChange={e => onUpdate('current', e.target.checked)} style={{ accentColor: '#7C6EF8' }} />
            {tr.current}
          </label>
        </div>

        {/* Description + AI */}
        <div style={{ gridColumn: '1/-1' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
            <label style={lbl}>{tr.description}</label>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 2 }}>
              {!canAI && (
                <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)' }}>
                  {lang === 'az' ? '* Vəzifə adı yazın' : '* Enter job title first'}
                </span>
              )}
              <button
                onClick={handleAI}
                disabled={!canAI || aiLoading}
                title={!canAI ? (lang === 'az' ? 'Əvvəlcə vəzifə adı yazın' : 'Enter job title first') : ''}
                style={{
                  background: canAI && !aiLoading ? 'rgba(124,110,248,0.2)' : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${canAI && !aiLoading ? 'rgba(124,110,248,0.4)' : 'rgba(255,255,255,0.1)'}`,
                  borderRadius: 6, color: canAI ? '#a89ef8' : 'rgba(255,255,255,0.25)',
                  padding: '4px 10px', cursor: canAI && !aiLoading ? 'pointer' : 'not-allowed',
                  fontSize: 11.5, fontWeight: 600, transition: 'all 0.2s'
                }}
              >
                {aiLoading ? <span style={{display:'inline-flex',alignItems:'center',gap:5}}><RefreshCw size={12} className="spin" />{lang === 'az' ? 'Yazılır...' : 'Writing...'}</span> : <span style={{display:'inline-flex',alignItems:'center',gap:5}}><Sparkles size={12} />{lang === 'az' ? 'AI ilə yaz' : 'Write with AI'}</span>}
              </button>
            </div>
          </div>

          {aiError && (
            <div style={{ fontSize: 11, color: '#f87171', marginBottom: 6, padding: '5px 8px', background: 'rgba(248,113,113,0.1)', borderRadius: 6 }}>
              ⚠ {aiError}
            </div>
          )}

          <textarea
            style={{ ...inp, minHeight: 110, resize: 'vertical', lineHeight: 1.7 }}
            value={exp.description}
            onChange={e => onUpdate('description', e.target.value)}
            placeholder={lang === 'az'
              ? '• AI düyməsinə basın və ya özünüz yazın...'
              : '• Click AI button or write manually...'}
          />
        </div>
      </div>
    </div>
  );
}

// ── Main Form ────────────────────────────────────────────────────────────────
export default function CVForm() {
  const { cvData, setCVData, lang } = useCVStore();
  const tr = t[lang];
  const [skillInput, setSkillInput] = useState('');
  const photoRef = useRef<HTMLInputElement>(null);

  const p = cvData.personal;

  const setCV = (updater: (prev: CVData) => CVData) => {
    setCVData((prev: CVData) => updater(prev));
  };

  const updatePersonal = (field: string, value: string) =>
    setCV(prev => ({ ...prev, personal: { ...prev.personal, [field]: value } }));

  // Experience
  const addExp = () => setCV(prev => ({
    ...prev,
    experience: [...prev.experience, { id: uid(), jobTitle: '', company: '', city: '', country: '', startMonth: '', startYear: '', endMonth: '', endYear: '', current: false, description: '' }]
  }));

  const updateExp = (id: string, field: string, value: string | boolean) =>
    setCV(prev => ({ ...prev, experience: prev.experience.map(e => e.id === id ? { ...e, [field]: value } : e) }));

  // For streaming: update description directly
  const updateExpDesc = (id: string, desc: string) =>
    setCVData((prev: CVData) => ({ ...prev, experience: prev.experience.map(e => e.id === id ? { ...e, description: desc } : e) }));

  const removeExp = (id: string) =>
    setCV(prev => ({ ...prev, experience: prev.experience.filter(e => e.id !== id) }));

  // Education
  const addEdu = () => setCV(prev => ({
    ...prev,
    education: [...prev.education, { id: uid(), institutionType: 'university', institutionTypeCustom: '', school: '', degree: '', educationLevel: '', city: '', country: '', startYear: '', endYear: '' }]
  }));
  const updateEdu = (id: string, field: string, value: string) =>
    setCV(prev => ({ ...prev, education: prev.education.map(e => e.id === id ? { ...e, [field]: value } : e) }));
  const removeEdu = (id: string) =>
    setCV(prev => ({ ...prev, education: prev.education.filter(e => e.id !== id) }));

  // Skills
  const addSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && skillInput.trim()) {
      e.preventDefault();
      const s = skillInput.trim();
      if (!cvData.skills.includes(s)) setCV(prev => ({ ...prev, skills: [...prev.skills, s] }));
      setSkillInput('');
    }
  };
  const removeSkill = (s: string) => setCV(prev => ({ ...prev, skills: prev.skills.filter(sk => sk !== s) }));

  // Languages
  const addLang = () => setCV(prev => ({ ...prev, languages: [...prev.languages, { id: uid(), name: '', level: 'B2' }] }));
  const addCert = () => setCV(prev => ({ ...prev, certificates: [...(prev.certificates||[]), { id: uid(), name: '', issuer: '', year: '' }] }));
  const removeCert = (id: string) => setCV(prev => ({ ...prev, certificates: (prev.certificates||[]).filter((c: any) => c.id !== id) }));
  const updateCert = (id: string, field: string, val: string) => setCV(prev => ({ ...prev, certificates: (prev.certificates||[]).map((c: any) => c.id === id ? { ...c, [field]: val } : c) }));
  const addTraining = () => setCV(prev => ({ ...prev, trainings: [...(prev.trainings||[]), { id: uid(), name: '', provider: '', year: '', description: '' }] }));
  const removeTraining = (id: string) => setCV(prev => ({ ...prev, trainings: (prev.trainings||[]).filter((t: any) => t.id !== id) }));
  const updateTraining = (id: string, field: string, val: string) => setCV(prev => ({ ...prev, trainings: (prev.trainings||[]).map((t: any) => t.id === id ? { ...t, [field]: val } : t) }));
  const updateLang = (id: string, field: string, value: string) =>
    setCV(prev => ({ ...prev, languages: prev.languages.map(l => l.id === id ? { ...l, [field]: value } : l) }));
  const removeLang = (id: string) => setCV(prev => ({ ...prev, languages: prev.languages.filter(l => l.id !== id) }));

  // Photo — only PNG / JPG / JPEG allowed
  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const allowed = ['image/png', 'image/jpeg', 'image/jpg'];
    const okExt = /\.(png|jpe?g)$/i.test(file.name);
    if (!allowed.includes(file.type) && !okExt) {
      alert(lang === 'az'
        ? 'Yalnız PNG, JPG və ya JPEG formatlı şəkillər yükləyə bilərsiniz.'
        : 'Only PNG, JPG or JPEG image formats are allowed.');
      e.target.value = '';
      return;
    }
    const reader = new FileReader();
    reader.onload = ev => updatePersonal('photo', ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>

      {/* ── Şəxsi Məlumat ── */}
      <AccordionSection title={tr.personal} icon={<User size={16} />} defaultOpen>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div>
            <label style={lbl}>{tr.firstName}</label>
            <input style={inp} value={p.firstName} onChange={e => updatePersonal('firstName', e.target.value)} placeholder="Əli" />
          </div>
          <div>
            <label style={lbl}>{tr.lastName}</label>
            <input style={inp} value={p.lastName} onChange={e => updatePersonal('lastName', e.target.value)} placeholder="Əliyev" />
          </div>
          <div>
            <label style={lbl}>{tr.email}</label>
            <input style={inp} type="email" value={p.email} onChange={e => updatePersonal('email', e.target.value)} placeholder="ali@gmail.com" />
          </div>
          <div>
            <label style={lbl}>{tr.phone}</label>
            <input style={inp} value={p.phone} onChange={e => updatePersonal('phone', e.target.value)} placeholder="+994 50 123 45 67" />
          </div>
          <div>
            <label style={lbl}>{tr.city}</label>
            <input style={inp} value={p.city} onChange={e => updatePersonal('city', e.target.value)} placeholder="Bakı" />
          </div>
          <div>
            <label style={lbl}>{tr.country}</label>
            <input style={inp} value={p.country} onChange={e => updatePersonal('country', e.target.value)} placeholder="Azərbaycan" />
          </div>
          <div style={{ gridColumn: '1/-1' }}>
            <label style={lbl}>{tr.jobTitle}</label>
            <input style={inp} value={p.jobTitle} onChange={e => updatePersonal('jobTitle', e.target.value)}
              placeholder={lang === 'az' ? 'Frontend Proqramçı, Mühasib...' : 'Frontend Developer, Accountant...'} />
          </div>
          <div style={{ gridColumn: '1/-1' }}>
            <label style={lbl}>{tr.summary}</label>
            <textarea style={{ ...inp, minHeight: 72, resize: 'vertical' }} value={p.summary || ''}
              onChange={e => updatePersonal('summary', e.target.value)}
              placeholder={lang === 'az' ? 'Özünüz haqqında qısa məlumat...' : 'Brief about yourself...'} />
          </div>
          <div style={{ gridColumn: '1/-1' }}>
            <label style={lbl}>LinkedIn</label>
            <input style={inp} value={p.linkedin || ''}
              onChange={e => updatePersonal('linkedin', e.target.value)}
              placeholder="linkedin.com/in/adınız" />
          </div>
          <div style={{ gridColumn: '1/-1' }}>
            <label style={lbl}>{lang === 'az' ? 'Foto (isteğe bağlı)' : 'Photo (optional)'}</label>
            <input ref={photoRef} type="file" accept=".png,.jpg,.jpeg,image/png,image/jpeg" onChange={handlePhoto} style={{ display: 'none' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              {p.photo && <img src={p.photo} alt="photo" style={{ width: 44, height: 44, borderRadius: 8, objectFit: 'cover' }} />}
              <button onClick={() => photoRef.current?.click()} style={{
                background: 'rgba(124,110,248,0.08)', border: '1px dashed rgba(124,110,248,0.35)',
                borderRadius: 8, color: '#a89ef8', padding: '7px 14px', cursor: 'pointer', fontSize: 12.5
              }}>
                <span style={{display:'inline-flex',alignItems:'center',gap:6}}>{p.photo ? <RefreshCw size={13} /> : <ImagePlus size={13} />}{p.photo ? (lang === 'az' ? 'Dəyiş' : 'Change') : (lang === 'az' ? 'Foto yüklə' : 'Upload photo')}</span>
              </button>
            </div>
          </div>
        </div>
      </AccordionSection>

      {/* ── İş Təcrübəsi ── */}
      <AccordionSection title={tr.experience} icon={<Briefcase size={16} />}>
        {cvData.experience.map((exp, idx) => (
          <ExpBlock
            key={exp.id}
            exp={exp}
            idx={idx}
            lang={lang}
            wantedTitle={p.jobTitle}
            onUpdate={(field, value) => {
              if (field === 'description') {
                updateExpDesc(exp.id, value as string);
              } else {
                updateExp(exp.id, field, value);
              }
            }}
            onRemove={() => removeExp(exp.id)}
          />
        ))}
        <button onClick={addExp} style={{
          width: '100%', background: 'rgba(124,110,248,0.07)',
          border: '1px dashed rgba(124,110,248,0.3)', borderRadius: 8,
          color: '#7C6EF8', padding: '10px', cursor: 'pointer', fontSize: 13, fontWeight: 600
        }}>
          + {tr.addExperience}
        </button>
      </AccordionSection>

      {/* ── Təhsil ── */}
      <AccordionSection title={tr.education} icon={<GraduationCap size={16} />}>
        {cvData.education.map((edu, idx) => (
          <div key={edu.id} style={{ border: '1px solid rgba(255,255,255,0.07)', borderRadius: 10, padding: 14, marginBottom: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>#{idx + 1}</span>
              <button onClick={() => removeEdu(edu.id)} style={{ background: 'none', border: 'none', color: 'rgba(255,80,80,0.6)', cursor: 'pointer', fontSize: 20 }}>×</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <div style={{ gridColumn: '1/-1' }}>
                <label style={lbl}>{tr.school}</label>
                <input style={inp} value={edu.school} onChange={e => updateEdu(edu.id, 'school', e.target.value)}
                  placeholder={lang === 'az' ? 'Azərbaycan Texniki Universiteti' : 'MIT, Harvard...'} />
              </div>
              <div style={{ gridColumn: '1/-1' }}>
                <label style={lbl}>{tr.degree}</label>
                <input style={inp} value={edu.degree} onChange={e => updateEdu(edu.id, 'degree', e.target.value)}
                  placeholder={lang === 'az' ? 'Kompüter Mühəndisliyi, Bakalavr' : 'Computer Science, Bachelor'} />
              </div>
              <div>
                <label style={lbl}>{tr.startDate}</label>
                <select style={{ ...inp, color: edu.startYear ? '#fff' : 'rgba(255,255,255,0.3)' }}
                  value={edu.startYear} onChange={e => updateEdu(edu.id, 'startYear', e.target.value)}>
                  <option value="">{lang === 'az' ? 'İl seçin' : 'Select year'}</option>
                  {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>
              <div>
                <label style={lbl}>{tr.endDate}</label>
                <select style={{ ...inp, color: edu.endYear ? '#fff' : 'rgba(255,255,255,0.3)' }}
                  value={edu.endYear} onChange={e => updateEdu(edu.id, 'endYear', e.target.value)}>
                  <option value="">{lang === 'az' ? 'İl seçin' : 'Select year'}</option>
                  {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>
            </div>
          </div>
        ))}
        <button onClick={addEdu} style={{
          width: '100%', background: 'rgba(124,110,248,0.07)',
          border: '1px dashed rgba(124,110,248,0.3)', borderRadius: 8,
          color: '#7C6EF8', padding: '10px', cursor: 'pointer', fontSize: 13, fontWeight: 600
        }}>
          + {tr.addEducation}
        </button>
      </AccordionSection>

      {/* ── Bacarıqlar ── */}
      <AccordionSection title={tr.skills} icon={<Zap size={16} />}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
          {cvData.skills.map((s, i) => (
            <span key={i} style={{
              background: 'rgba(124,110,248,0.14)', border: '1px solid rgba(124,110,248,0.28)',
              color: '#a89ef8', padding: '5px 12px', borderRadius: 20, fontSize: 13,
              display: 'flex', alignItems: 'center', gap: 6
            }}>
              {s}
              <button onClick={() => removeSkill(s)} style={{ background: 'none', border: 'none', color: '#a89ef8', cursor: 'pointer', fontSize: 15, padding: 0, lineHeight: 1 }}>×</button>
            </span>
          ))}
        </div>
        <input style={inp} value={skillInput} onChange={e => setSkillInput(e.target.value)} onKeyDown={addSkill}
          placeholder={tr.skillsPlaceholder} />
      </AccordionSection>

      {/* ── Dillər ── */}
      <AccordionSection title={tr.languages} icon={<Globe size={16} />}>
        {cvData.languages.map(l => (
          <div key={l.id} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: 10, marginBottom: 10, alignItems: 'end' }}>
            <div>
              <label style={lbl}>{tr.language}</label>
              <input style={inp} value={l.name} onChange={e => updateLang(l.id, 'name', e.target.value)} placeholder="Azərbaycan" />
            </div>
            <div>
              <label style={lbl}>{tr.level}</label>
              <select style={inp} value={l.level} onChange={e => updateLang(l.id, 'level', e.target.value)}>
                {LEVELS.map(lv => <option key={lv} value={lv}>{lv}</option>)}
              </select>
            </div>
            <button onClick={() => removeLang(l.id)} style={{ background: 'none', border: 'none', color: 'rgba(255,80,80,0.6)', cursor: 'pointer', fontSize: 22, paddingBottom: 10 }}>×</button>
          </div>
        ))}
        <button onClick={addLang} style={{
          width: '100%', background: 'rgba(124,110,248,0.07)',
          border: '1px dashed rgba(124,110,248,0.3)', borderRadius: 8,
          color: '#7C6EF8', padding: '10px', cursor: 'pointer', fontSize: 13, fontWeight: 600
        }}>
          + {tr.addLanguage}
        </button>
      </AccordionSection>

      {/* ── Əlavə ── */}
      <AccordionSection title={lang === 'az' ? 'Sertifikatlar' : 'Certificates'} icon={<Award size={16} />}>
        {(cvData.certificates||[]).map((cert: any, idx: number) => (
          <div key={cert.id} style={{ border: '1px solid rgba(255,255,255,0.07)', borderRadius: 10, padding: 14, marginBottom: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>#{idx + 1} {cert.name || (lang === 'az' ? 'Yeni Sertifikat' : 'New Certificate')}</span>
              <button onClick={() => removeCert(cert.id)} style={{ background: 'none', border: 'none', color: 'rgba(255,80,80,0.6)', cursor: 'pointer', fontSize: 20, lineHeight: 1 }}>×</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <div style={{ gridColumn: '1/-1' }}>
                <label style={lbl}>{lang === 'az' ? 'Sertifikat adı' : 'Certificate name'}</label>
                <input style={inp} value={cert.name} onChange={e => updateCert(cert.id, 'name', e.target.value)} placeholder="ISTQB, AWS, Google Analytics..." />
              </div>
              <div>
                <label style={lbl}>{lang === 'az' ? 'Verən qurum' : 'Issuer'}</label>
                <input style={inp} value={cert.issuer} onChange={e => updateCert(cert.id, 'issuer', e.target.value)} placeholder="Coursera, Google, Microsoft..." />
              </div>
              <div>
                <label style={lbl}>{lang === 'az' ? 'İl' : 'Year'}</label>
                <select style={{ ...inp, color: cert.year ? '#fff' : 'rgba(255,255,255,0.3)' }} value={cert.year} onChange={e => updateCert(cert.id, 'year', e.target.value)}>
                  <option value="">{lang === 'az' ? 'İl seçin' : 'Select year'}</option>
                  {YEARS.map((y: string) => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>
            </div>
          </div>
        ))}
        <button onClick={addCert} style={{ width: '100%', background: 'rgba(124,110,248,0.07)', border: '1px dashed rgba(124,110,248,0.3)', borderRadius: 8, color: '#7C6EF8', padding: '10px', cursor: 'pointer', fontSize: 13, fontWeight: 600 }}>
          + {lang === 'az' ? 'Sertifikat Əlavə Et' : 'Add Certificate'}
        </button>
      </AccordionSection>

      <AccordionSection title={lang === 'az' ? 'Təlimlər' : 'Trainings'} icon={<BookOpen size={16} />}>
        {(cvData.trainings||[]).map((tr2: any, idx: number) => (
          <div key={tr2.id} style={{ border: '1px solid rgba(255,255,255,0.07)', borderRadius: 10, padding: 14, marginBottom: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>#{idx + 1} {tr2.name || (lang === 'az' ? 'Yeni Təlim' : 'New Training')}</span>
              <button onClick={() => removeTraining(tr2.id)} style={{ background: 'none', border: 'none', color: 'rgba(255,80,80,0.6)', cursor: 'pointer', fontSize: 20, lineHeight: 1 }}>×</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <div style={{ gridColumn: '1/-1' }}>
                <label style={lbl}>{lang === 'az' ? 'Təlim adı' : 'Training name'}</label>
                <input style={inp} value={tr2.name} onChange={e => updateTraining(tr2.id, 'name', e.target.value)}
                  placeholder={lang === 'az' ? 'React Bootcamp, QA Intensive...' : 'React Bootcamp, QA Intensive...'} />
              </div>
              <div>
                <label style={lbl}>{lang === 'az' ? 'Təlim verən' : 'Provider'}</label>
                <input style={inp} value={tr2.provider} onChange={e => updateTraining(tr2.id, 'provider', e.target.value)}
                  placeholder={lang === 'az' ? 'Narix Academy, Code Academy...' : 'Narix Academy, Code Academy...'} />
              </div>
              <div>
                <label style={lbl}>{lang === 'az' ? 'İl' : 'Year'}</label>
                <select style={{ ...inp, color: tr2.year ? '#fff' : 'rgba(255,255,255,0.3)' }}
                  value={tr2.year} onChange={e => updateTraining(tr2.id, 'year', e.target.value)}>
                  <option value="">{lang === 'az' ? 'İl seçin' : 'Select year'}</option>
                  {YEARS.map((y: string) => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>
              <div style={{ gridColumn: '1/-1' }}>
                <label style={lbl}>{lang === 'az' ? 'Açıqlama (isteğe bağlı)' : 'Description (optional)'}</label>
                <input style={inp} value={tr2.description} onChange={e => updateTraining(tr2.id, 'description', e.target.value)}
                  placeholder={lang === 'az' ? 'Qısa məlumat...' : 'Brief description...'} />
              </div>
            </div>
          </div>
        ))}
        <button onClick={addTraining} style={{
          width: '100%', background: 'rgba(124,110,248,0.07)',
          border: '1px dashed rgba(124,110,248,0.3)', borderRadius: 8,
          color: '#7C6EF8', padding: '10px', cursor: 'pointer', fontSize: 13, fontWeight: 600
        }}>
          + {lang === 'az' ? 'Təlim Əlavə Et' : 'Add Training'}
        </button>
      </AccordionSection>

      <AccordionSection title={tr.additional} icon={<Pin size={16} />}>
        <textarea style={{ ...inp, minHeight: 90, resize: 'vertical' }}
          value={cvData.additional}
          onChange={e => setCV(prev => ({ ...prev, additional: e.target.value }))}
          placeholder={tr.additionalPlaceholder} />
      </AccordionSection>
    </div>
  );
}
