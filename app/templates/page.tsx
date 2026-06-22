import type { Metadata } from "next";
import TemplatesClient from "./TemplatesClient";

export const metadata: Metadata = {
  title: "CV Şablonları – 9 Peşəkar Dizayn",
  description:
    "9 peşəkar CV şablonu arasından seç: Kompakt, Modern, Minimal, Bold, Designer, Header, Elegant, Klassik, Executive. Azərbaycan dilində pulsuz CV şablonları.",
  alternates: { canonical: "https://bircv.az/templates" },
};

export default function Page() {
  return <TemplatesClient />;
}
