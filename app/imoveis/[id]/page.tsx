import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Gallery } from "@/components/Gallery";
import { PropertyCard } from "@/components/PropertyCard";
import { Reveal } from "@/components/Reveal";
import { SaveButton } from "@/components/SaveButton";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { StickyContactBar } from "@/components/StickyContactBar";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { getImovel, imoveis } from "@/data/imoveis";
import { formatPreco, fotosDaGaleria, linkWhatsApp, plural } from "@/lib/imoveis";

export const dynamicParams = false;

export function generateStaticParams() {
  return imoveis.map((i) => ({ id: i.id }));
}

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const imovel = getImovel((await params).id);
  return { title: imovel ? imovel.nome : "Imóvel" };
}

const brl = (v: number) => `R$ ${v.toLocaleString("pt-BR")}`;

export default async function ImovelPage({ params }: Props) {
  const imovel = getImovel((await params).id);
  if (!imovel) notFound();

  const venda = imovel.operacao === "comprar";
  const waInteresse = linkWhatsApp(`Olá! Tenho interesse no ${imovel.codigo} (${imovel.nome}).`);
  const waVisita = linkWhatsApp(`Olá! Quero agendar uma visita ao ${imovel.codigo} (${imovel.nome}).`);

  const facts = [
    { n: imovel.area, l: "m² privativos" },
    {
      n: imovel.quartos,
      l: `${imovel.quartos === 1 ? "quarto" : "quartos"}${imovel.suites ? `, ${plural(imovel.suites, "suíte", "suítes")}` : ""}`,
    },
    { n: imovel.vagas, l: imovel.vagas === 1 ? "vaga coberta" : "vagas cobertas" },
    imovel.terreno ? { n: imovel.terreno, l: "m² de terreno" } : { n: imovel.ano, l: "ano de construção" },
  ];

  const ficha: [string, string][] = [
    ["Código", imovel.codigo],
    ["Ano", String(imovel.ano)],
    ["Condomínio", imovel.condominio ? `${brl(imovel.condominio)}/mês` : "Não há"],
    ["IPTU anual", `${brl(imovel.iptu)}/ano`],
    venda
      ? ["Aceita financiamento", imovel.financiamento ? "Sim" : "Não"]
      : ["Garantia", "Seguro fiança ou caução"],
    ["Orientação solar", imovel.orientacao],
  ];

  const parecidos = imoveis
    .filter((i) => i.id !== imovel.id && i.operacao === imovel.operacao)
    .sort((a, b) => Number(b.bairro === imovel.bairro) - Number(a.bairro === imovel.bairro))
    .slice(0, 3);

  const crumbTipo = { Casa: "Casas", Apartamento: "Apartamentos", Sobrado: "Sobrados" }[imovel.tipo];

  return (
    <>
      <SiteHeader action={<SaveButton />} />
      <main className="wrap">
        <nav aria-label="Você está em" className="flex flex-wrap items-center pb-0.5 text-[13px] text-ink-muted">
          <Link href={`/imoveis?op=${imovel.operacao}`} className="inline-flex min-h-[44px] items-center hover:text-ink">
            {venda ? "Comprar" : "Alugar"}
          </Link>
          <span aria-hidden className="px-1">·</span>
          <Link
            href={`/imoveis?op=${imovel.operacao}&tipo=${imovel.tipo}`}
            className="inline-flex min-h-[44px] items-center hover:text-ink"
          >
            {crumbTipo}
          </Link>
          <span aria-hidden className="px-1">·</span>
          <Link
            href={`/imoveis?op=${imovel.operacao}&bairro=${encodeURIComponent(imovel.bairro)}`}
            className="inline-flex min-h-[44px] items-center hover:text-ink"
          >
            {imovel.bairro}
          </Link>
        </nav>

        <div id="galeria">
          <Gallery
          nome={imovel.nome}
          capa={imovel.capa}
          destaqueMobile={imovel.destaqueMobile}
          grade={imovel.galeria}
          todas={fotosDaGaleria(imovel)}
          />
        </div>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_400px] lg:gap-[72px]">
          <div className="min-w-0">
            <div className="rise">
              <span className="chip bg-pine-50 text-pine">
                {imovel.tipo} · {venda ? "Venda" : "Aluguel"}
              </span>
              <h1 className="d2 mt-3">{imovel.titulo}</h1>
              <p className="mt-2 text-ink-muted">Rua das Araucárias, 148 · Bairro {imovel.bairro} · Vila Serena</p>
            </div>

            <dl className="mt-7 grid grid-cols-2 border-t border-line md:grid-cols-4">
              {facts.map((f) => (
                <div key={f.l} className="flex flex-col-reverse border-b border-line py-4">
                  <dt className="text-[13px] text-ink-muted">{f.l}</dt>
                  <dd className="font-serif text-[30px] leading-none">{f.n}</dd>
                </div>
              ))}
            </dl>

            <p className="mt-7 max-w-[62ch] text-ink-2">{imovel.descricao}</p>

            <Reveal className="mt-7">
              <h2 className="mb-2 font-serif text-[26px] font-normal">Ficha do imóvel</h2>
              <dl className="grid grid-cols-[1fr_auto] text-[15px]">
                {ficha.map(([k, v]) => (
                  <div key={k} className="contents">
                    <dt className="border-b border-line py-3 text-ink-muted">{k}</dt>
                    <dd className="border-b border-line py-3 text-right font-semibold">{v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          <aside
            id="contato"
            aria-label="Valor e contato"
            className="self-start rounded-lg border border-line bg-surface p-6 lg:sticky lg:top-6"
          >
            <p className="eyebrow">{venda ? "Valor de venda" : "Valor do aluguel"}</p>
            <p className="mt-2 font-serif text-[40px] leading-none tabular-nums">{formatPreco(imovel)}</p>
            <p className="mt-1.5 text-[13px] text-ink-muted">Valores fictícios de demonstração</p>
            <dl className="mt-[18px] text-[14px]">
              <div className="flex justify-between border-b border-line py-2.5">
                <dt>Visitas</dt>
                <dd className="font-bold">Seg a sáb</dd>
              </div>
              <div className="flex justify-between border-b border-line py-2.5">
                <dt>Resposta</dt>
                <dd className="font-bold">No WhatsApp</dd>
              </div>
            </dl>
            <a href={waInteresse} target="_blank" rel="noopener noreferrer" className="btn btn-pine mt-3 w-full">
              <WhatsAppIcon />
              Conversar no WhatsApp
            </a>
            <a href={waVisita} target="_blank" rel="noopener noreferrer" className="btn btn-ghost mt-3 w-full">
              Agendar visita
            </a>
            <p className="mt-3 text-center text-[12px] text-ink-muted">
              Abre conversa com número fictício de demonstração.
            </p>
          </aside>
        </div>

        <section id="parecidos" className="pt-[72px]" aria-labelledby="parecidos-title">
          <Reveal className="mb-6">
            <p className="eyebrow">Na mesma linha</p>
            <h2 id="parecidos-title" className="d2 mt-2">
              Outros imóveis
            </h2>
          </Reveal>
          <div className="grid gap-7 md:grid-cols-3">
            {parecidos.map((i, n) => (
              <Reveal key={i.id} delay={n * 60}>
                <PropertyCard imovel={i} />
              </Reveal>
            ))}
          </div>
        </section>
      </main>

      <StickyContactBar
        waInteresse={waInteresse}
        waVisita={waVisita}
        hideWhenVisible={["galeria", "contato", "parecidos"]}
      />

      <SiteFooter />
      <div aria-hidden className="h-16 lg:hidden" />
    </>
  );
}
