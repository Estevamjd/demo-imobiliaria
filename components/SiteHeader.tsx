import Link from "next/link";
import { linkWhatsApp } from "@/lib/imoveis";
import { Wordmark } from "./Wordmark";

const linkCls = "inline-flex min-h-[44px] items-center transition-colors duration-200 hover:text-ink";

export function SiteHeader({ action }: { action: React.ReactNode }) {
  return (
    <header className="wrap flex h-16 items-center justify-between">
      <Wordmark href="/" />
      <nav aria-label="Principal" className="hidden gap-8 text-[14px] font-medium text-ink-2 lg:flex">
        <Link href="/imoveis?op=comprar" className={linkCls}>
          Comprar
        </Link>
        <Link href="/imoveis?op=alugar" className={linkCls}>
          Alugar
        </Link>
        <Link href="/imoveis?op=comprar&lancamento=1" className={linkCls}>
          Lançamentos
        </Link>
        <a
          href={linkWhatsApp("Olá! Quero anunciar meu imóvel com a Calmeira.")}
          target="_blank"
          rel="noopener noreferrer"
          className={linkCls}
        >
          Anunciar
        </a>
      </nav>
      {action}
    </header>
  );
}

export const headerActionClass = "btn btn-ghost min-h-[44px] px-4 text-[14px]";
