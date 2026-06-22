import type { Metadata } from "next";
import CreateClient from "./CreateClient";

export const metadata: Metadata = {
  title: "CV Yarat – Süni İntellekt ilə Pulsuz CV Düzəlt",
  description:
    "Süni intellekt köməyilə dəqiqələr içində CV yarat. Şəxsi məlumatlarını daxil et, şablon seç, AI ilə mətn yarat və PDF olaraq yüklə.",
  alternates: { canonical: "https://bircv.az/create" },
};

export default function Page() {
  return <CreateClient />;
}
