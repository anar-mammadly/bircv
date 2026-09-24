import type { Metadata, Viewport } from "next";
import "./cv-fonts.css";
import "./cv-scope.css";
import "./globals.css";
import Providers from "./providers";

const SITE_URL = "https://bircv.az";
const TITLE = "BirCV – Azərbaycan dilində CV Yarat və Hazırla";
const DESCRIPTION =
  "BirCV ilə pulsuz CV düzəlt: süni intellekt köməyilə dəqiqələr içində peşəkar CV hazırlayın, Azərbaycan dilində şablonlar seçin, PDF yükləyin. İş axtarışı, karyera və CV konsultasiyası üçün bir nömrəli platforma.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: TITLE, template: "%s | BirCV" },
  description: DESCRIPTION,
  keywords: [
    "cv", "cv düzəltmək", "cv yaratmaq", "bircv", "bircv.az",
    "azərbaycan dilində cv", "pulsuz cv şablonları", "iş axtarışı",
    "karyera", "cv konsultasiya", "online cv",
  ],
  alternates: { canonical: SITE_URL },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "az_AZ",
    url: SITE_URL,
    siteName: "BirCV",
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "BirCV",
      url: SITE_URL,
      logo: `${SITE_URL}/icon.svg`,
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "BirCV",
      inLanguage: "az",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": "SoftwareApplication",
      name: "BirCV",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      url: SITE_URL,
      offers: { "@type": "Offer", price: "0", priceCurrency: "AZN" },
      description: DESCRIPTION,
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="az" data-theme="light" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "try{var t=localStorage.getItem('bircv_theme');document.documentElement.setAttribute('data-theme',t==='dark'?'dark':'light');var l=localStorage.getItem('bircv_lang');if(l==='az'||l==='en')document.documentElement.lang=l}catch(e){}" }} />
        {['inter-400', 'inter-600', 'bricolage-grotesque-700'].map(f => (
          <link key={f} rel="preload" as="font" type="font/ttf" crossOrigin="anonymous" href={`/fonts/cv/${f}.ttf`} />
        ))}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body><Providers>{children}</Providers></body>
    </html>
  );
}
