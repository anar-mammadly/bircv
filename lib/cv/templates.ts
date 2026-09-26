import type { TemplateId } from '@/app/types/cv';

export type TemplateCategory = 'minimal' | 'professional' | 'creative' | 'executive' | 'ats' | 'modern';

export interface TemplateMeta {
  id: TemplateId;
  name: string;
  premium: boolean;               // paid plan required to download
  color: string;                  // dominant accent, used for small UI hints
  categories: TemplateCategory[];
  description: { az: string; en: string };
  origin: 'preserved' | 'improved' | 'new';
}

export const CATEGORY_LABEL: Record<TemplateCategory | 'all', { az: string; en: string }> = {
  all: { az: 'Hamısı', en: 'All' },
  minimal: { az: 'Minimal', en: 'Minimal' },
  professional: { az: 'Peşəkar', en: 'Professional' },
  creative: { az: 'Yaradıcı', en: 'Creative' },
  executive: { az: 'Rəhbər', en: 'Executive' },
  ats: { az: 'ATS uyğun', en: 'ATS-friendly' },
  modern: { az: 'Müasir', en: 'Modern' },
};

export const TEMPLATE_LIST: TemplateMeta[] = [
  { id: 'kompakt', name: 'Kompakt', premium: false, color: '#3F4BC6', categories: ['professional', 'ats'], origin: 'improved',
    description: { az: 'Sıx, səliqəli: indigo zolaq, tonlu sol sütun və güclü tipoqrafiya.', en: 'Dense yet tidy: indigo accent, tinted left rail and strong typography.' } },
  { id: 'modern', name: 'Modern', premium: true, color: '#2563EB', categories: ['modern', 'professional', 'ats'], origin: 'improved',
    description: { az: 'Havadar SaaS görünüşü: iri ad, yumşaq mavi vurğu və kart tipli yan sütun.', en: 'Airy SaaS look: oversized name, soft blue accent and card-style side column.' } },
  { id: 'minimal', name: 'Minimal', premium: false, color: '#374151', categories: ['minimal', 'ats'], origin: 'improved',
    description: { az: 'Tipoqrafiya əsaslı, tək sütun. ATS sistemləri üçün ideal.', en: 'Typography-led, single column. Ideal for ATS parsing.' } },
  { id: 'bold', name: 'Bold', premium: false, color: '#EAB308', categories: ['creative', 'modern'], origin: 'improved',
    description: { az: 'Qara başlıq, sarı vurğu — cəsarətli və yadda qalan.', en: 'Black header with a yellow accent — confident and memorable.' } },
  { id: 'designer', name: 'Designer', premium: true, color: '#3A1F3D', categories: ['creative', 'modern'], origin: 'improved',
    description: { az: 'Editorial bento: tünd erik başlıq kartı və modul kartlar.', en: 'Editorial bento: a deep plum hero card and modular cards.' } },
  { id: 'header', name: 'Header', premium: false, color: '#0F3D46', categories: ['professional', 'executive'], origin: 'improved',
    description: { az: 'Başlıq əsas elementdir: petrol banner və üzərinə keçən əlaqə zolağı.', en: 'The masthead is the design: a petrol banner with an overlapping contact bar.' } },
  { id: 'elegant', name: 'Elegant', premium: true, color: '#92400E', categories: ['executive', 'creative'], origin: 'improved',
    description: { az: 'Serif başlıqlar və mis vurğu ilə klassik zərifliyi.', en: 'Serif headings and a bronze accent for classic elegance.' } },
  { id: 'klassik', name: 'Klassik', premium: true, color: '#7F1D1D', categories: ['professional', 'ats'], origin: 'improved',
    description: { az: 'Ənənəvi format: bordo başlıqlar, tək sütun.', en: 'Traditional format: burgundy headings, single column.' } },
  { id: 'executive', name: 'Executive', premium: true, color: '#1E2A3A', categories: ['executive', 'professional'], origin: 'improved',
    description: { az: 'İdarəçi səviyyəsi üçün tünd sidebar və qızılı vurğu.', en: 'Dark sidebar with a gold accent for senior roles.' } },
  { id: 'editorial', name: 'Editorial', premium: true, color: '#B4452B', categories: ['professional', 'creative'], origin: 'new',
    description: { az: 'Jurnal üslubu: iri serif ad, kənar başlıqlar, geniş boşluq.', en: 'Magazine style: large serif name, margin labels, generous whitespace.' } },
  { id: 'corporate', name: 'Corporate', premium: true, color: '#0F1B2D', categories: ['executive', 'professional'], origin: 'new',
    description: { az: 'Tünd başlıq, qızılı vurğu və ikili sütun — korporativ və zərif.', en: 'Deep header, gold accent and a two-column body — corporate and refined.' } },
  { id: 'swiss', name: 'Swiss', premium: true, color: '#111111', categories: ['minimal', 'ats', 'modern'], origin: 'new',
    description: { az: 'Sırf tipoqrafiya: nazik xətlər, tarix sütunu, bir qırmızı nöqtə.', en: 'Pure typography: hairlines, a date column and a single red dot.' } },
  { id: 'creative', name: 'Creative', premium: true, color: '#FF5A36', categories: ['creative', 'modern'], origin: 'new',
    description: { az: 'Mərcan sidebar, iri ad və nömrələnmiş təcrübə.', en: 'Coral sidebar, oversized name and numbered experience.' } },
  { id: 'tech', name: 'Tech', premium: true, color: '#0E9F6E', categories: ['modern', 'professional', 'ats'], origin: 'new',
    description: { az: 'Sıx, oxunaqlı; mühəndis, QA və məhsul rolları üçün.', en: 'Compact and readable — built for engineering, QA and product roles.' } },
  { id: 'sidebar', name: 'Sidebar', premium: true, color: '#4F6F52', categories: ['executive', 'professional'], origin: 'new',
    description: { az: 'Sağda fil sümüyü sidebar, sol tərəfdə zaman xətti.', en: 'Ivory sidebar on the right with a timeline on the left.' } },
];

export const TEMPLATE_BY_ID = Object.fromEntries(TEMPLATE_LIST.map(t => [t.id, t])) as Record<TemplateId, TemplateMeta>;
export const isPremiumTemplate = (id: TemplateId) => !!TEMPLATE_BY_ID[id]?.premium;
