import type { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "BirCV – Azərbaycan dilində Pulsuz CV Düzəlt",
  description:
    "Pulsuz CV düzəlt, süni intellekt köməyilə dəqiqələr içində peşəkar CV hazırla. Azərbaycan dilində CV şablonları, PDF yüklə, iş axtarışına başla.",
  alternates: { canonical: "https://bircv.az/" },
};

export default function Page() {
  return <HomeClient />;
}
