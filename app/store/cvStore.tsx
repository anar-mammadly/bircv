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
}

const CVContext = createContext<CVContextType | null>(null);

export function CVProvider({ children }: { children: ReactNode }) {
  const [cvData, setCVData] = useState<CVData>(defaultCV);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateId>('kompakt');
  const [lang, setLang] = useState<AppLanguage>('az');
  const [user, setUserState] = useState<User | null>(null);

  useEffect(() => { setUserState(loadUser()); }, []);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('register');

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
