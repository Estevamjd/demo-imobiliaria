import type { Metadata } from "next";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader, headerActionClass } from "@/components/SiteHeader";
import Link from "next/link";
import { creditos } from "@/data/creditos";

export const metadata: Metadata = { title: "Créditos" };

export default function CreditosPage() {
  return (
    <>
      <SiteHeader
        action={
          <Link href="/imoveis" className={headerActionClass}>
            Ver imóveis
          </Link>
        }
      />
      <main className="wrap pt-6">
        <p className="eyebrow">Créditos</p>
        <h1 className="d2 mt-2">Fotos, fontes e ícones</h1>
        <p className="mt-3 max-w-[60ch] text-ink-2">
          Site de demonstração de uma imobiliária fictícia. Todas as fotos são de bancos gratuitos, sem pessoas.
        </p>
        <ul className="mt-8 border-t border-line">
          {creditos.map((c) => (
            <li key={c.arquivo} className="flex flex-col gap-1 border-b border-line py-3 text-[14px] md:flex-row md:justify-between">
              <span className="font-semibold">{c.arquivo}</span>
              <span className="text-ink-2">
                {c.autor} ·{" "}
                <a href={c.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
                  {c.fonte}
                </a>{" "}
                · {c.licenca}
              </span>
            </li>
          ))}
          <li className="border-b border-line py-3 text-[14px] text-ink-2">
            Fontes Instrument Serif e Manrope (SIL OFL 1.1, Google Fonts) · Ícones Lucide (ISC)
          </li>
        </ul>
      </main>
      <SiteFooter />
    </>
  );
}
