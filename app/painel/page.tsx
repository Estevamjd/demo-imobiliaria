import type { Metadata } from "next";
import { Painel } from "@/components/painel/Painel";

export const metadata: Metadata = { title: "Painel de leads" };

export default function PainelPage() {
  return <Painel />;
}
