import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader, headerActionClass } from "@/components/SiteHeader";

export default function NotFound() {
  return (
    <>
      <SiteHeader
        action={
          <Link href="/imoveis" className={headerActionClass}>
            Ver imóveis
          </Link>
        }
      />
      <main className="wrap pt-16">
        <p className="eyebrow">Página não encontrada</p>
        <h1 className="d2 mt-2 max-w-[18ch]">Esse endereço não leva a nenhum imóvel.</h1>
        <Link href="/" className="btn btn-pine mt-8">
          Voltar ao início
        </Link>
      </main>
      <SiteFooter />
    </>
  );
}
