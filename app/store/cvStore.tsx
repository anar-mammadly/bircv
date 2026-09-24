'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CVData, TemplateId, AppLanguage, User } from '@/app/types/cv';
import { CVFontId, DEFAULT_CV_FONT } from '@/lib/cvFonts';

export interface CVSettings { font: CVFontId; textScale: number }
const DEFAULT_SETTINGS: CVSettings = { font: DEFAULT_CV_FONT, textScale: 1 };
export type SaveState = 'idle' | 'saving' | 'saved' | 'error';

const defaultCV: CVData = {
  personal: { firstName:'', lastName:'', email:'', phone:'', city:'', country:'', jobTitle:'', photo:'', summary:'', linkedin:'' },
  experience: [], education: [], skills: [], languages: [], certificates: [], trainings: [], projects: [], customSections: [], additional: ''
};

function loadUser(): User | null {
  if (typeof window === 'undefined') return null;
  try { const s = localStorage.getItem('bircv_user'); return s ? JSON.parse(s) : null; } catch { return null; }
}
function saveUser(u: User | null) {
  if (typeof window === 'undefined') return;
  u ? localStorage.setItem('bircv_user', JSON.stringify(u)) : localStorage.removeItem('bircv_user');
}

function loadCV(): CVData | null {
  if (typeof window === 'undefined') return null;
  try {
    const s = localStorage.getItem('bircv_data');
    if (!s) return null;
    // Safe migration: older saves may lack newer sections — fill defaults, never drop user content.
    const r = JSON.parse(s);
    return {
      ...defaultCV, ...r,
      personal: { ...defaultCV.personal, ...(r.personal || {}) },
      experience: r.experience || [], education: r.education || [], skills: r.skills || [],
      languages: r.languages || [], certificates: r.certificates || [], trainings: r.trainings || [],
      projects: r.projects || [], customSections: r.customSections || [],
    } as CVData;
  } catch { return null; }
}
function saveCV(d: CVData) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem('bircv_data', JSON.stringify(d));
  } catch {
    // Quota aşılarsa (böyük foto) — fotosuz saxla ki, qalan data itməsin.
    try {
      const { photo, ...rest } = d.personal;
      localStorage.setItem('bircv_data', JSON.stringify({ ...d, personal: rest }));
    } catch { throw new Error('storage-full'); }
  }
}

function loadSettings(): { template?: TemplateId; settings: CVSettings } {
  if (typeof window === 'undefined') return { settings: DEFAULT_SETTINGS };
  try {
    const r = JSON.parse(localStorage.getItem('bircv_settings') || '{}');
    const scale = typeof r.textScale === 'number' && r.textScale >= 0.85 && r.textScale <= 1.15 ? r.textScale : 1;
    return { template: r.template, settings: { font: r.font || DEFAULT_CV_FONT, textScale: scale } };
  } catch { return { settings: DEFAULT_SETTINGS }; }
}

interface CVContextType {
  cvSettings: CVSettings;
  setCvSettings: (s: Partial<CVSettings>) => void;
  saveState: SaveState;
  lastSaved: number | null;
  cvData: CVData;
  setCVData: (data: CVData | ((prev: CVData) => CVData)) => void;
  updatePersonal: (field: string, value: string) => void;
  selectedTemplate: TemplateId;
  setSelectedTemplate: (t: TemplateId) => void;
  lang: AppLanguage;
  setLang: (l: AppLanguage) => void;
  user: User | null;
  setUser: (u: User | null) => void;
  showAuthModal: boolean;
  setShowAuthModal: (v: boolean) => void;
  authMode: 'login' | 'register';
  setAuthMode: (m: 'login' | 'register') => void;
  theme: 'dark' | 'light';
  setTheme: (t: 'dark' | 'light') => void;
}

const CVContext = createContext<CVContextType | null>(null);

export function CVProvider({ children }: { children: ReactNode }) {
  const [cvData, setCVData] = useState<CVData>(defaultCV);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateId>('kompakt');
  const [lang, setLangState] = useState<AppLanguage>('az');
  const setLang = (l: AppLanguage) => {
    setLangState(l);
    if (typeof window !== 'undefined') {
      document.documentElement.setAttribute('lang', l);
      localStorage.setItem('bircv_lang', l);
    }
  };
  useEffect(() => {
    const saved = localStorage.getItem('bircv_lang') as AppLanguage | null;
    const l = saved === 'az' || saved === 'en' ? saved : 'az';
    setLangState(l);
    document.documentElement.setAttribute('lang', l);
  }, []);
  const [user, setUserState] = useState<User | null>(null);

  useEffect(() => { setUserState(loadUser()); }, []);
  // İlk mount-da localStorage-dan yüklə (yalnız bir dəfə).
  const [hydrated, setHydrated] = useState(false);
  const [cvSettings, setCvSettingsState] = useState<CVSettings>(DEFAULT_SETTINGS);
  const [saveState, setSaveState] = useState<SaveState>('idle');
  const [lastSaved, setLastSaved] = useState<number | null>(null);
  useEffect(() => {
    const saved = loadCV();
    if (saved) setCVData(saved);
    const st = loadSettings();
    setCvSettingsState(st.settings);
    if (st.template) setSelectedTemplate(st.template);
    setHydrated(true);
  }, []);
  // Yalnız hydrate olduqdan sonra yaz — başlanğıc boş state köhnə datanı silməsin.
  // Debounced so typing stays smooth; drives the "Saving… / Saved" indicator.
  useEffect(() => {
    if (!hydrated) return;
    setSaveState('saving');
    const id = setTimeout(() => {
      try { saveCV(cvData); setSaveState('saved'); setLastSaved(Date.now()); } catch { setSaveState('error'); }
    }, 450);
    return () => clearTimeout(id);
  }, [cvData, hydrated]);
  useEffect(() => {
    if (!hydrated) return;
    try { localStorage.setItem('bircv_settings', JSON.stringify({ ...cvSettings, template: selectedTemplate })); } catch {}
  }, [cvSettings, selectedTemplate, hydrated]);
  const setCvSettings = (s: Partial<CVSettings>) => setCvSettingsState(prev => ({ ...prev, ...s }));
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('register');
  const [theme, setThemeState] = useState<'dark' | 'light'>('light');
  const setTheme = (t: 'dark' | 'light') => {
    setThemeState(t);
    if (typeof window !== 'undefined') {
      document.documentElement.setAttribute('data-theme', t);
      localStorage.setItem('bircv_theme', t);
    }
  };
  useEffect(() => {
    const saved = localStorage.getItem('bircv_theme') as 'dark'|'light'|null;
    const t = saved || 'light';
    setThemeState(t);
    document.documentElement.setAttribute('data-theme', t);
  }, []);

  const setUser = (u: User | null) => { setUserState(u); saveUser(u); };
  const updatePersonal = (field: string, value: string) =>
    setCVData(prev => ({ ...prev, personal: { ...prev.personal, [field]: value } }));

  return (
    <CVContext.Provider value={{
      cvSettings, setCvSettings, saveState, lastSaved,
      cvData, setCVData, updatePersonal,
      selectedTemplate, setSelectedTemplate,
      lang, setLang,
      user, setUser,
      showAuthModal, setShowAuthModal,
      authMode, setAuthMode,
      theme, setTheme,
    }}>
      {children}
    </CVContext.Provider>
  );
}

export function useCVStore() {
  const ctx = useContext(CVContext);
  if (!ctx) throw new Error('useCVStore must be used within CVProvider');
  return ctx;
}
