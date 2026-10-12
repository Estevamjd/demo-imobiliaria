import Image from "next/image";
import Link from "next/link";
import { PropertyCard } from "@/components/PropertyCard";
import { Reveal } from "@/components/Reveal";
import { SearchForm } from "@/components/SearchForm";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader, headerActionClass } from "@/components/SiteHeader";
import { fotos } from "@/data/fotos";
import { bairros, destaquesHome, getImovel, imovelHero, type Imovel } from "@/data/imoveis";
import { filtrosVazios, linkWhatsApp } from "@/lib/imoveis";

export default function Home() {
  const hero = getImovel(imovelHero)!;
  const destaques = destaquesHome.map((id) => getImovel(id)).filter(Boolean) as Imovel[];

  return (
    <>
      <SiteHeader
        action={
          <a
            href={linkWhatsApp("Olá! Vim pelo site da Calmeira e queria conversar.")}
            target="_blank"
            rel="noopener noreferrer"
            className={headerActionClass}
          >
            Falar com a gente
          </a>
        }
      />

      <main>
        <section className="wrap pt-3 lg:pt-8" aria-labelledby="hero-title">
          <div className="grid gap-6 lg:grid-cols-[5fr_7fr] lg:items-end lg:gap-14">
            <div className="rise lg:pb-[120px]">
              <p className="eyebrow">Imóveis selecionados · Vila Serena</p>
              <h1 id="hero-title" className="d1 mt-3.5">
                Casas com luz, madeira e <em className="italic text-pine">tempo</em> para morar.
              </h1>
              <p className="mt-4 max-w-[34ch] text-[16px] text-ink-2 lg:text-[18px]">
                Uma curadoria pequena de imóveis residenciais, visitados um a um antes de entrar no site.
              </p>
            </div>

            <Link
              href={`/imoveis/${hero.id}`}
              className="group relative block aspect-square overflow-hidden rounded-lg bg-sand lg:aspect-auto lg:h-[600px]"
              aria-label={`${hero.nome}, Bairro ${hero.bairro}: ver imóvel`}
            >
              <Image
                src={fotos.pergola.src}
                alt={fotos.pergola.alt}
                fill
                priority
                sizes="(min-width: 1280px) 680px, (min-width: 1024px) 55vw, 100vw"
                className="scale-on-hover object-cover transition-transform duration-[600ms] ease-calm group-hover:scale-[1.03]"
                style={{ objectPosition: "center 70%" }}
              />
            </Link>
          </div>

          <SearchForm initial={filtrosVazios} className="-mt-14 lg:-mt-16 lg:ml-auto lg:w-[calc(100%-96px)]" />
        </section>

        <section className="wrap pt-[72px]" aria-labelledby="destaques-title">
          <Reveal className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Destaques da semana</p>
              <h2 id="destaques-title" className="d2 mt-2">
                Escolhidos a dedo
              </h2>
            </div>
            <Link
              href="/imoveis"
              className="inline-flex min-h-[44px] items-end whitespace-nowrap pb-1 text-[14px] font-semibold text-pine"
            >
              <span className="border-b border-current pb-0.5">Ver todos</span>
            </Link>
          </Reveal>
          <div className="grid gap-7 md:grid-cols-3">
            {destaques.map((i, n) => (
              <Reveal key={i.id} delay={n * 60}>
                <PropertyCard imovel={i} />
              </Reveal>
            ))}
          </div>
        </section>

        <section className="wrap pt-[72px]" aria-labelledby="bairros-title">
          <Reveal>
            <h2 id="bairros-title" className="eyebrow">
              Bairros
            </h2>
            <ul className="mt-3.5 flex flex-wrap gap-2.5">
              {bairros.map((b) => (
                <li key={b}>
                  <Link
                    href={`/imoveis?op=comprar&bairro=${encodeURIComponent(b)}`}
                    className="inline-flex min-h-[44px] items-center rounded-full border border-line-strong px-4 text-[14px] font-medium transition-colors duration-200 hover:border-ink-muted hover:bg-surface"
                  >
                    {b}
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </section>

        <section className="wrap" aria-labelledby="atendimento-title">
          <Reveal className="mt-[88px] grid overflow-hidden rounded-lg bg-graphite text-graphite-fg lg:grid-cols-2">
            <div className="px-6 py-9 lg:p-16">
              <p className="eyebrow text-graphite-muted">Atendimento</p>
              <h2 id="atendimento-title" className="d2 mt-2.5">
                Gostou de uma casa? A conversa começa no WhatsApp.
              </h2>
              <p className="mb-6 mt-3.5 max-w-[40ch] text-graphite-muted">
                Você manda a mensagem, a gente responde com horários de visita e a ficha completa do imóvel.
              </p>
              <Link href="/imoveis" className="btn btn-light">
                Ver imóveis com visita esta semana
              </Link>
            </div>
            <div className="relative h-[260px] lg:h-full lg:min-h-[380px]">
              <Image
                src={fotos["sala-quente"].src}
                alt={fotos["sala-quente"].alt}
                fill
                sizes="(min-width: 1024px) 640px, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
