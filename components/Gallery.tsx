"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image, { getImageProps } from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { fotos, type FotoKey } from "@/data/fotos";

export function Gallery({
  nome,
  capa,
  destaqueMobile,
  grade,
  todas,
}: {
  nome: string;
  capa: FotoKey;
  destaqueMobile?: FotoKey;
  grade: FotoKey[];
  todas: FotoKey[];
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [atual, setAtual] = useState(0);
  const [jaAbriu, setJaAbriu] = useState(false);

  const abrir = (key: FotoKey) => {
    setAtual(Math.max(0, todas.indexOf(key)));
    setJaAbriu(true);
    dialogRef.current?.showModal();
  };
  const passo = useCallback(
    (d: number) => setAtual((i) => (i + d + todas.length) % todas.length),
    [todas.length],
  );

  useEffect(() => {
    const dlg = dialogRef.current;
    if (!dlg) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") passo(1);
      if (e.key === "ArrowLeft") passo(-1);
    };
    dlg.addEventListener("keydown", onKey);
    return () => dlg.removeEventListener("keydown", onKey);
  }, [passo]);

  const desk = fotos[capa];
  const mob = fotos[destaqueMobile ?? capa];
  const common = { alt: "", fill: true, priority: true } as const;
  const { props: deskProps } = getImageProps({ ...common, src: desk.src, sizes: "(min-width: 1280px) 590px, 46vw" });
  const {
    props: { srcSet: mobSrcSet, ...mobProps },
  } = getImageProps({ ...common, src: mob.src, sizes: "100vw" });

  const restantes = todas.length - 1 - grade.length;
  const tileCls =
    "group relative block aspect-square overflow-hidden rounded-md bg-sand lg:aspect-auto";
  const imgCls = "scale-on-hover object-cover transition-transform duration-[600ms] ease-calm group-hover:scale-[1.03]";

  return (
    <>
      <div className="grid grid-cols-2 gap-2 lg:grid-cols-[2fr_1fr_1fr] lg:grid-rows-[240px_240px]">
        <button
          type="button"
          onClick={() => abrir(window.matchMedia("(min-width: 1024px)").matches ? capa : destaqueMobile ?? capa)}
          className={`${tileCls} col-span-2 aspect-[4/5] lg:col-span-1 lg:row-span-2`}
          aria-label={`Abrir galeria de ${nome}: ${mob.alt}`}
        >
          <picture>
            <source media="(min-width: 1024px)" srcSet={deskProps.srcSet} sizes={deskProps.sizes} />
            <source media="(max-width: 1023px)" srcSet={mobSrcSet} sizes={mobProps.sizes} />
            {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
            <img {...mobProps} className={imgCls} />
          </picture>
        </button>
        {grade.map((key, n) => {
          const f = fotos[key];
          const ultimo = n === grade.length - 1;
          return (
            <button
              key={key}
              type="button"
              onClick={() => abrir(key)}
              className={tileCls}
              aria-label={ultimo && restantes > 0 ? `+${restantes} fotos: ver as ${todas.length} fotos` : `Ampliar foto: ${f.alt}`}
            >
              <Image src={f.src} alt="" fill sizes="(min-width: 1024px) 300px, 50vw" className={imgCls} />
              {ultimo && restantes > 0 && (
                <span className="absolute bottom-2.5 right-2.5 rounded-full bg-paper/[0.92] px-3 py-[7px] text-[12px] font-semibold text-ink">
                  +{restantes} fotos
                </span>
              )}
            </button>
          );
        })}
      </div>

      <dialog
        ref={dialogRef}
        aria-label={`Fotos de ${nome}`}
        className="m-0 h-[100dvh] max-h-none w-screen max-w-none bg-graphite p-0 text-graphite-fg backdrop:bg-ink/80"
        onClick={(e) => {
          if (e.target === e.currentTarget) dialogRef.current?.close();
        }}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between px-4 py-2 lg:px-8">
            <p className="text-[13px] font-semibold tabular-nums text-graphite-muted" aria-live="polite">
              {atual + 1} / {todas.length}
            </p>
            <p className="flex items-center gap-1.5 rounded-full border border-graphite-2 px-2.5 py-[6px] text-[9px] font-semibold uppercase leading-none tracking-[0.16em] text-graphite-muted">
              <i aria-hidden className="h-[5px] w-[5px] rounded-full bg-pine-onDark" />
              Demonstração
            </p>
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full hover:bg-graphite-2"
              aria-label="Fechar galeria"
            >
              <X strokeWidth={1.6} className="h-5 w-5" aria-hidden />
            </button>
          </div>
          <div className="relative flex-1">
            {jaAbriu &&
              todas.map((key, n) => (
                <Image
                  key={key}
                  src={fotos[key].src}
                  alt={n === atual ? fotos[key].alt : ""}
                  aria-hidden={n !== atual}
                  fill
                  loading="eager"
                  sizes="100vw"
                  className={`object-contain transition-opacity duration-300 ease-calm ${
                    n === atual ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}
          </div>
          <div className="flex items-center justify-between gap-4 px-4 py-4 lg:px-8">
            <button
              type="button"
              onClick={() => passo(-1)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-graphite-2 hover:bg-graphite-2"
              aria-label="Foto anterior"
            >
              <ChevronLeft strokeWidth={1.6} className="h-5 w-5" aria-hidden />
            </button>
            <p className="min-w-0 truncate text-center text-[13px] text-graphite-muted">{fotos[todas[atual]].alt}</p>
            <button
              type="button"
              onClick={() => passo(1)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-graphite-2 hover:bg-graphite-2"
              aria-label="Próxima foto"
            >
              <ChevronRight strokeWidth={1.6} className="h-5 w-5" aria-hidden />
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
