import Image from "next/image";
import Link from "next/link";
import { fotos } from "@/data/fotos";
import type { Imovel } from "@/data/imoveis";
import { formatPreco, plural } from "@/lib/imoveis";

export function PropertyCard({ imovel, priority = false }: { imovel: Imovel; priority?: boolean }) {
  const foto = fotos[imovel.capa];
  return (
    <article className="group relative">
      <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-sand group-has-[a:focus-visible]:outline group-has-[a:focus-visible]:outline-2 group-has-[a:focus-visible]:outline-offset-2 group-has-[a:focus-visible]:outline-pine">
        <Image
          src={foto.src}
          alt={foto.alt}
          fill
          priority={priority}
          sizes="(min-width: 1280px) 395px, (min-width: 768px) 31vw, 100vw"
          className="scale-on-hover object-cover transition-transform duration-[600ms] ease-calm group-hover:scale-[1.03]"
          style={{ objectPosition: imovel.capaPos ?? "center" }}
        />
        <span className="absolute left-3 top-3 rounded-full bg-paper/[0.92] px-2.5 py-1.5 text-[11px] font-bold uppercase leading-none tracking-[0.08em]">
          {imovel.tipo}
          {imovel.lancamento && " · Lançamento"}
        </span>
      </div>
      <div className="mt-3.5 flex justify-between gap-3">
        <div className="min-w-0">
          <h3 className="d3">
            <Link
              href={`/imoveis/${imovel.id}`}
              className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
            >
              {imovel.nome}
            </Link>
          </h3>
          <p className="mt-1 text-[14px] text-ink-muted">Bairro {imovel.bairro}</p>
        </div>
        <p className="whitespace-nowrap text-[16px] font-semibold tabular-nums">{formatPreco(imovel)}</p>
      </div>
      <div className="mt-3 flex gap-4 border-t border-line pt-3 text-[13px] text-ink-2">
        <span>{plural(imovel.quartos, "quarto", "quartos")}</span>
        <span>{imovel.vagas === 0 ? "sem vaga" : plural(imovel.vagas, "vaga", "vagas")}</span>
        <span>{imovel.area} m²</span>
      </div>
    </article>
  );
}
