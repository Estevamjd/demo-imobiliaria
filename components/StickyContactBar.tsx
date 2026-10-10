"use client";

import { useEffect, useState } from "react";
import { WhatsAppIcon } from "./WhatsAppIcon";

/** Mobile-only bar, shown only while none of `hideWhenVisible` is on screen (gallery, price card, related list). */
export function StickyContactBar({
  waInteresse,
  waVisita,
  hideWhenVisible,
}: {
  waInteresse: string;
  waVisita: string;
  hideWhenVisible: string[];
}) {
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const els = hideWhenVisible.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const emTela = new Set<Element>();
    // Only the bottom strip where the bar sits matters, so the bar shows as soon as the gallery clears it.
    const faixa = 80;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) emTela.add(e.target);
          else emTela.delete(e.target);
        }
        setVisivel(emTela.size === 0);
      },
      { rootMargin: `-${Math.max(0, window.innerHeight - faixa)}px 0px 0px 0px` },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [hideWhenVisible]);

  return (
    <div
      inert={!visivel}
      className={`fixed bottom-[max(12px,env(safe-area-inset-bottom))] left-3 right-3 z-40 flex gap-2 transition-[opacity,transform] duration-300 ease-calm lg:hidden ${
        visivel ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0 motion-reduce:translate-y-0"
      }`}
    >
      <a href={waInteresse} target="_blank" rel="noopener noreferrer" className="btn btn-pine flex-1 shadow-soft">
        <WhatsAppIcon />
        WhatsApp
      </a>
      <a
        href={waVisita}
        target="_blank"
        rel="noopener noreferrer"
        className="btn flex-1 border-line-strong bg-surface text-ink shadow-soft"
      >
        Agendar visita
      </a>
    </div>
  );
}
