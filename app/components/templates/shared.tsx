import { CVData, WorkExperience } from '@/app/types/cv';

export type Lang = 'az' | 'en';

const MONTHS_AZ = ['', 'Yan', 'Fev', 'Mar', 'Apr', 'May', 'İyn', 'İyl', 'Avq', 'Sen', 'Okt', 'Noy', 'Dek'];
const MONTHS_EN = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function fmtDate(month: string, year: string, lang: Lang) {
  const arr = lang === 'az' ? MONTHS_AZ : MONTHS_EN;
  const m = parseInt(month);
  if (!year) return '';
  return `${m && arr[m] ? arr[m] + ' ' : ''}${year}`;
}

export const presentLabel = (lang: Lang) => (lang === 'az' ? 'İndiyə qədər' : 'Present');

export function dateRange(e: WorkExperience, lang: Lang) {
  const a = fmtDate(e.startMonth, e.startYear, lang);
  const b = e.current ? presentLabel(lang) : fmtDate(e.endMonth, e.endYear, lang);
  return [a, b].filter(Boolean).join(' – ');
}

export const eduRange = (s: string, e: string) => [s, e].filter(Boolean).join(' – ');

/** description → clean bullet lines (leading "•"/"-" stripped) */
export function bullets(text: string): string[] {
  return (text || '').split('\n').map(l => l.replace(/^\s*[•\-–·]\s*/, '').trim()).filter(Boolean);
}

export const L = {
  summary: (l: Lang) => (l === 'az' ? 'Haqqımda' : 'Profile'),
  experience: (l: Lang) => (l === 'az' ? 'İş təcrübəsi' : 'Experience'),
  education: (l: Lang) => (l === 'az' ? 'Təhsil' : 'Education'),
  skills: (l: Lang) => (l === 'az' ? 'Bacarıqlar' : 'Skills'),
  languages: (l: Lang) => (l === 'az' ? 'Dillər' : 'Languages'),
  certificates: (l: Lang) => (l === 'az' ? 'Sertifikatlar' : 'Certificates'),
  trainings: (l: Lang) => (l === 'az' ? 'Təlimlər' : 'Training'),
  projects: (l: Lang) => (l === 'az' ? 'Layihələr' : 'Projects'),
  additional: (l: Lang) => (l === 'az' ? 'Əlavə' : 'Additional'),
  contact: (l: Lang) => (l === 'az' ? 'Əlaqə' : 'Contact'),
};

export function parts(data: CVData) {
  return {
    p: data.personal,
    experience: data.experience || [],
    education: data.education || [],
    skills: data.skills || [],
    languages: data.languages || [],
    certs: data.certificates || [],
    trains: data.trainings || [],
    projects: (data.projects || []).filter(x => x.name || x.description || x.link),
    customs: (data.customSections || []).filter(x => x.title || x.content),
    additional: data.additional || '',
  };
}

export const fullName = (data: CVData) => [data.personal.firstName, data.personal.lastName].filter(Boolean).join(' ');
export const place = (p: CVData['personal']) => [p.city, p.country].filter(Boolean).join(', ');

/**
 * Projects + custom sections, rendered with the host template's own heading style.
 * `Heading` receives the title; layout stays generic so every template gets these sections.
 */
export function ExtraSections({ data, lang, Heading, color = '#374151', muted = '#6b7280', accent = '#111', gap = 16, fontSize = 10 }: {
  data: CVData; lang: Lang; Heading: (props: { children: string }) => JSX.Element; color?: string; muted?: string; accent?: string; gap?: number; fontSize?: number;
}) {
  const { projects, customs } = parts(data);
  if (!projects.length && !customs.length) return null;
  return (
    <>
      {projects.length > 0 && (
        <div style={{ marginBottom: gap }}>
          <Heading>{L.projects(lang)}</Heading>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {projects.map(pr => (
              <div key={pr.id} style={{ fontSize, lineHeight: 1.55, color }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, alignItems: 'baseline' }}>
                  <span style={{ fontWeight: 700, color: accent }}>{pr.name}</span>
                  {pr.link && <span style={{ fontSize: fontSize - 1, color: muted, overflowWrap: 'anywhere', textAlign: 'right' }}>{pr.link}</span>}
                </div>
                {pr.description && <div style={{ color, whiteSpace: 'pre-line' }}>{pr.description}</div>}
              </div>
            ))}
          </div>
        </div>
      )}
      {customs.map(cs => (
        <div key={cs.id} style={{ marginBottom: gap }}>
          <Heading>{cs.title || (lang === 'az' ? 'Bölmə' : 'Section')}</Heading>
          <div style={{ fontSize, lineHeight: 1.6, color, whiteSpace: 'pre-line', overflowWrap: 'anywhere' }}>{cs.content}</div>
        </div>
      ))}
    </>
  );
}

// ── small inline icons (SVG: rendered as vectors/rasters in the PDF, never emoji) ──
export function Icon({ name, size = 11, color = 'currentColor', stroke = 1.8 }: { name: 'mail' | 'phone' | 'pin' | 'link' | 'user'; size?: number; color?: string; stroke?: number }) {
  const common = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: color, strokeWidth: stroke, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, style: { display: 'block', flexShrink: 0 } };
  if (name === 'mail') return <svg {...common}><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M2 7l10 7 10-7" /></svg>;
  if (name === 'phone') return <svg {...common}><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" /></svg>;
  if (name === 'pin') return <svg {...common}><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>;
  if (name === 'link') return <svg {...common}><path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7" /><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7" /></svg>;
  return <svg {...common}><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></svg>;
}

export function contactItems(p: CVData['personal']) {
  return [
    p.email && { icon: 'mail' as const, text: p.email },
    p.phone && { icon: 'phone' as const, text: p.phone },
    place(p) && { icon: 'pin' as const, text: place(p) },
    p.linkedin && { icon: 'link' as const, text: p.linkedin },
  ].filter(Boolean) as { icon: 'mail' | 'phone' | 'pin' | 'link'; text: string }[];
}
