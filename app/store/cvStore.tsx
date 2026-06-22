'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CVData, TemplateId, AppLanguage, User } from '@/app/types/cv';

const defaultCV: CVData = {
  personal: { firstName:'', lastName:'', email:'', phone:'', city:'', country:'', jobTitle:'', photo:'', summary:'', linkedin:'' },
  experience: [], education: [], skills: [], languages: [], certificates: [], trainings: [], additional: ''
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
  try { const s = localStorage.getItem('bircv_data'); return s ? JSON.parse(s) : null; } catch { return null; }
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
    } catch {}
  }
}

interface CVContextType {
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
    if (typeof window !== 'undefined') localStorage.setItem('bircv_lang', l);
  };
  useEffect(() => {
    const saved = localStorage.getItem('bircv_lang') as AppLanguage | null;
    if (saved === 'az' || saved === 'en') setLangState(saved);
  }, []);
  const [user, setUserState] = useState<User | null>(null);

  useEffect(() => { setUserState(loadUser()); }, []);
  // İlk mount-da localStorage-dan yüklə (yalnız bir dəfə).
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    const saved = loadCV();
    if (saved) setCVData(saved);
    setHydrated(true);
  }, []);
  // Yalnız hydrate olduqdan sonra yaz — başlanğıc boş state köhnə datanı silməsin.
  useEffect(() => { if (hydrated) saveCV(cvData); }, [cvData, hydrated]);
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
