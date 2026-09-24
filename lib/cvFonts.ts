// Central CV font registry. The SAME static TTF files (public/fonts/cv) feed both the
// browser preview (@font-face in app/cv-fonts.css) and the PDF export (jsPDF embedding).

export type CVFontId = 'template' | 'poppins' | 'bricolage-grotesque' | 'inter' | 'manrope' | 'plus-jakarta-sans';

export interface CVFontOption {
  id: CVFontId;
  name: string;      // display name, rendered in the font itself
  css: string;       // CSS family name
  note: { az: string; en: string };
}

/** Fonts the user can pick in the editor ('template' = keep each template's own typography). */
export const CV_FONT_OPTIONS: CVFontOption[] = [
  { id: 'poppins',             name: 'Poppins',             css: 'Poppins',             note: { az: 'Həndəsi, aydın, müasir', en: 'Geometric, clear, modern' } },
  { id: 'bricolage-grotesque', name: 'Bricolage Grotesque', css: 'Bricolage Grotesque', note: { az: 'Xarakterli, redaksiya üslubu', en: 'Characterful, editorial' } },
  { id: 'inter',               name: 'Inter',               css: 'Inter',               note: { az: 'Neytral, ekranda ideal', en: 'Neutral, screen-perfect' } },
  { id: 'manrope',             name: 'Manrope',             css: 'Manrope',             note: { az: 'Yumşaq, müasir grotesk', en: 'Soft, modern grotesque' } },
  { id: 'plus-jakarta-sans',   name: 'Plus Jakarta Sans',   css: 'Plus Jakarta Sans',   note: { az: 'Zərif və peşəkar', en: 'Elegant and professional' } },
];

export const DEFAULT_CV_FONT: CVFontId = 'template';

export function fontCss(id: CVFontId): string | null {
  return CV_FONT_OPTIONS.find(f => f.id === id)?.css ?? null;
}

// ── file registry (CSS family → available static instances) ─────────────────
const ALL = [300, 400, 500, 600, 700, 800, 900];
const FAMILIES: { css: string; slug: string; weights: number[]; italics: number[] }[] = [
  { css: 'Poppins',             slug: 'poppins',             weights: ALL, italics: [] },
  { css: 'Bricolage Grotesque', slug: 'bricolage-grotesque', weights: ALL, italics: [] },
  { css: 'Inter',               slug: 'inter',               weights: ALL, italics: [] },
  { css: 'Manrope',             slug: 'manrope',             weights: ALL, italics: [] },
  { css: 'Plus Jakarta Sans',   slug: 'plus-jakarta-sans',   weights: ALL, italics: [] },
  { css: 'Space Grotesk',       slug: 'space-grotesk',       weights: ALL, italics: [] },
  { css: 'Work Sans',           slug: 'work-sans',           weights: ALL, italics: [] },
  { css: 'Archivo',             slug: 'archivo',             weights: ALL, italics: [] },
  { css: 'Libre Franklin',      slug: 'libre-franklin',      weights: ALL, italics: [] },
  { css: 'Playfair Display',    slug: 'playfair-display',    weights: ALL, italics: [400, 600] },
  { css: 'Lora',                slug: 'lora',                weights: ALL, italics: [400, 600] },
  { css: 'Source Serif 4',      slug: 'source-serif-4',      weights: ALL, italics: [400, 600] },
  { css: 'Fraunces',            slug: 'fraunces',            weights: ALL, italics: [] },
  { css: 'IBM Plex Sans',       slug: 'ibm-plex-sans',       weights: ALL, italics: [] },
];

export interface FontFile { weight: number; italic: boolean; url: string }

const REGISTRY = new Map<string, FontFile[]>();
for (const f of FAMILIES) {
  const files: FontFile[] = [
    ...f.weights.map(w => ({ weight: w, italic: false, url: `/fonts/cv/${f.slug}-${w}.ttf` })),
    ...f.italics.map(w => ({ weight: w, italic: true, url: `/fonts/cv/${f.slug}-${w}i.ttf` })),
  ];
  REGISTRY.set(f.css.toLowerCase(), files);
}

export function isKnownFamily(css: string) { return REGISTRY.has(css.toLowerCase()); }
export function familyFiles(css: string): FontFile[] { return REGISTRY.get(css.toLowerCase()) || []; }
export function allFamilies() { return FAMILIES; }

/** CSS font matching (weight only, no synthesis): what the browser would pick for these files. */
export function resolveFontFile(css: string, weight: number, italic: boolean): FontFile | null {
  const files = familyFiles(css);
  if (!files.length) return null;
  const pool = files.filter(f => f.italic === italic);
  const use = pool.length ? pool : files.filter(f => !f.italic);   // no italic cut → upright (font-synthesis: none)
  const ws = use.map(f => f.weight).sort((a, b) => a - b);
  const pick = (cands: number[]) => cands.length ? cands[0] : undefined;
  const lower = (w: number) => ws.filter(x => x <= w).reverse();
  const higher = (w: number) => ws.filter(x => x >= w);
  let target: number | undefined;
  if (ws.includes(weight)) target = weight;
  else if (weight < 400) target = pick(lower(weight)) ?? pick(higher(weight));
  else if (weight > 500) target = pick(higher(weight)) ?? pick(lower(weight));
  else target = pick(weight === 400 ? [500] : [400]) ?? pick(lower(weight)) ?? pick(higher(weight));
  return use.find(f => f.weight === target) || null;
}
