export interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  country: string;
  jobTitle: string;
  photo?: string;
  summary?: string;
  linkedin?: string;
}

export interface WorkExperience {
  id: string;
  jobTitle: string;
  company: string;
  city: string;
  country: string;
  startMonth: string;
  startYear: string;
  endMonth: string;
  endYear: string;
  current: boolean;
  description: string;
}

export interface Education {
  id: string;
  institutionType: 'university' | 'school' | 'college' | 'other';
  institutionTypeCustom?: string;
  school: string;
  degree: string;
  educationLevel: string;
  city: string;
  country: string;
  startYear: string;
  endYear: string;
}

export interface Certificate {
  id: string;
  name: string;
  issuer: string;
  year: string;
}

export interface Training {
  id: string;
  name: string;
  provider: string;
  year: string;
  description: string;
}

export interface Language {
  id: string;
  name: string;
  level: string;
}

export interface Project {
  id: string;
  name: string;
  link: string;
  description: string;
}

export interface CustomSection {
  id: string;
  title: string;
  content: string;
}

export interface CVData {
  personal: PersonalInfo;
  experience: WorkExperience[];
  education: Education[];
  skills: string[];
  languages: Language[];
  certificates: Certificate[];
  trainings: Training[];
  projects?: Project[];
  customSections?: CustomSection[];
  additional: string;
}

export type TemplateId = 'kompakt' | 'modern' | 'minimal' | 'bold' | 'elegant' | 'klassik' | 'designer' | 'executive' | 'header' | 'editorial' | 'corporate' | 'swiss' | 'creative' | 'tech' | 'sidebar';

export interface Template {
  id: TemplateId;
  name: string;
  nameAz: string;
  premium: boolean;
  description: string;
}

export type AppLanguage = 'az' | 'en';

export interface User {
  id: string;
  name: string;
  email: string;
  plan: 'free' | 'premium' | 'admin';
  cvCount: number;
}
