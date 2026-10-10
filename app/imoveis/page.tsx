import type { Metadata } from "next";
import Link from "next/link";
import { PropertyCard } from "@/components/PropertyCard";
import { Reveal } from "@/components/Reveal";
import { SearchForm } from "@/components/SearchForm";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader, headerActionClass } from "@/components/SiteHeader";
import { buscar, faixas, filtrosDeParams, filtrosParaQuery, linkWhatsApp, plural } from "@/lib/imoveis";

export const metadata: Metadata = { title: "Imóveis" };

export default async function ImoveisPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const filtros = filtrosDeParams(await searchParams);
  const resultados = buscar(filtros);
  const faixa = faixas[filtros.op].find((x) => x.id === filtros.preco);

  const resumo = [
    filtros.lancamento && "Lançamentos",
    filtros.tipo,
    filtros.bairro,
    faixa?.label,
    filtros.quartos ? `${filtros.quartos}+ quartos` : null,
  ].filter(Boolean) as string[];

  const titulo =
    filtros.op === "alugar"
      ? `${plural(resultados.length, "imóvel", "imóveis")} para alugar`
      : `${plural(resultados.length, "imóvel", "imóveis")} à venda`;

  return (
    <>
      <SiteHeader
        action={
          <a
            href={linkWhatsApp("Olá! Estou vendo os imóveis da Calmeira e queria ajuda.")}
            target="_blank"
            rel="noopener noreferrer"
            className={headerActionClass}
          >
            Falar com a gente
          </a>
        }
      />
      <main className="wrap">
        <nav aria-label="Você está em" className="pb-0.5 text-[13px] text-ink-muted">
          <Link href="/" className="inline-flex min-h-[44px] items-center hover:text-ink">
            Início
          </Link>
          <span aria-hidden> · </span>
          <span>{filtros.op === "alugar" ? "Alugar" : "Comprar"}</span>
        </nav>

        <div className="rise">
          <p className="eyebrow">Resultado da busca</p>
          <h1 className="d2 mt-2">{titulo}</h1>
          <p className="mt-2 text-[14px] text-ink-muted">
            {resumo.length ? resumo.join(" · ") : "Todos os tipos e bairros"} · valores fictícios
          </p>
        </div>

        <SearchForm key={filtrosParaQuery(filtros)} initial={filtros} className="mt-6" />

        <h2 className="sr-only">Imóveis encontrados</h2>
        {resultados.length > 0 ? (
          <div className="mt-10 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {resultados.map((i, n) => (
              <Reveal key={i.id} delay={(n % 3) * 60}>
                <PropertyCard imovel={i} priority={n < 1} />
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-lg border border-line bg-surface px-6 py-12 text-center">
            <p className="d3">Nenhum imóvel com esses filtros</p>
            <p className="mx-auto mt-2 max-w-[42ch] text-[15px] text-ink-2">
              A curadoria é pequena de propósito. Tente outro bairro ou uma faixa de preço mais larga.
            </p>
            <Link href={`/imoveis?op=${filtros.op}`} className="btn btn-pine mt-6">
              Limpar filtros
            </Link>
          </div>
        )}
      </main>
      <SiteFooter />
    </>
  );
}
