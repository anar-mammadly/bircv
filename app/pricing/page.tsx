import type { Metadata } from "next";
import PricingClient from "./PricingClient";

export const metadata: Metadata = {
  title: "Qiymətlər – Pulsuz və Premium Planlar",
  description:
    "BirCV qiymət planları: pulsuz plan ilə 2 CV hazırla, Premium plan ilə limitsiz CV, bütün şablonlar və HR dəstəyi. Gizli ödəniş yoxdur, istənilən vaxt ləğv et.",
  alternates: { canonical: "https://bircv.az/pricing" },
};

export default function Page() {
  return <PricingClient />;
}
