import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BirCV – AI ilə Peşəkar CV Yarat",
  description: "Süni intellekt ilə dəqiqələr içində peşəkar CV hazırlayın. PDF yükləyin, şablonlar seçin.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="az" data-theme="light">
      <body>{children}</body>
    </html>
  );
}
