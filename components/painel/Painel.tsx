"use client";

import { CalendarDays, Check, House, Kanban, List, MessageSquare, Plus } from "lucide-react";
import Link from "next/link";
import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { Wordmark } from "@/components/Wordmark";
import { getImovel } from "@/data/imoveis";
import {
  colunas,
  estagios,
  iniciais,
  leadsIniciais,
  leadsReserva,
  origens,
  passosPorEstagio,
  type Estagio,
  type Lead,
  type Mensagem,
  type Origem,
} from "@/data/leads";

type Filtro = "todos" | Origem | "hoje";
type Vista = "pipeline" | "lista";

const label = (e: Estagio) => estagios.find((s) => s.id === e)!.label;
const EASE = "cubic-bezier(.2,.7,.2,1)";

function prefersReduced() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function rodape(l: Lead) {
  switch (l.estagio) {
    case "novo":
      return { texto: l.chegou, destaque: false };
    case "contatado":
      return { texto: l.followup ?? "D+1 amanhã", destaque: true };
    case "qualificado":
      return { texto: l.visita ?? "Visita a marcar", destaque: false };
    case "proposta":
      return { texto: "Aguardando", destaque: false };
    case "ganho":
      return { texto: "aceito", destaque: false };
    case "perdido":
      return { texto: "sem retorno", destaque: false };
  }
}

function imovelLabel(id: string) {
  const i = getImovel(id);
  return i ? `${i.nome} · ${i.codigo}` : id;
}

export function Painel() {
  const [leads, setLeads] = useState<Lead[]>(leadsIniciais);
  const [selId, setSelId] = useState(leadsIniciais[0].id);
  const [filtro, setFiltro] = useState<Filtro>("todos");
  const [vista, setVista] = useState<Vista>("pipeline");
  const [reserva, setReserva] = useState(0);
  const [assumidos, setAssumidos] = useState<Record<string, Mensagem>>({});
  const [flash, setFlash] = useState<{ id: string; n: number } | null>(null);
  const [dragOver, setDragOver] = useState<string | null>(null);

  const cardRefs = useRef(new Map<string, HTMLElement>());
  const colRefs = useRef(new Map<string, HTMLElement>());
  const boardRef = useRef<HTMLDivElement>(null);
  const detailRef = useRef<HTMLElement>(null);
  const pendingFlip = useRef<{ rects: Map<string, DOMRect>; movedId: string; scrollToCol?: string } | null>(null);

  const visiveis = useMemo(
    () =>
      leads.filter((l) =>
        filtro === "todos" ? true : filtro === "hoje" ? l.hoje : l.origem === filtro,
      ),
    [leads, filtro],
  );
  const sel = leads.find((l) => l.id === selId) ?? leads[0];

  const boardScrolls = () => {
    const b = boardRef.current;
    return !!b && b.scrollWidth > b.clientWidth + 1;
  };

  function snapshot() {
    const rects = new Map<string, DOMRect>();
    cardRefs.current.forEach((el, id) => rects.set(id, el.getBoundingClientRect()));
    return rects;
  }

  function pulse(id: string) {
    setFlash((f) => ({ id, n: (f?.n ?? 0) + 1 }));
  }

  function mover(id: string, para: Estagio) {
    const atual = leads.find((l) => l.id === id);
    if (!atual || atual.estagio === para) return;
    const col = colunas.find((c) => c.estagios.includes(para))!.id;
    pendingFlip.current = { rects: snapshot(), movedId: id, scrollToCol: col };
    setLeads((ls) => {
      const resto = ls.filter((l) => l.id !== id);
      const idx = resto.findIndex((l) => colunas.find((c) => c.id === col)!.estagios.includes(l.estagio));
      const movido = { ...atual, estagio: para };
      if (idx === -1) return [...resto, movido];
      return [...resto.slice(0, idx), movido, ...resto.slice(idx)];
    });
    setSelId(id);
    pulse(id);
  }

  function novoLead() {
    const proximo = leadsReserva[reserva];
    if (!proximo) return;
    pendingFlip.current = { rects: snapshot(), movedId: proximo.id, scrollToCol: "novo" };
    setLeads((ls) => [proximo, ...ls]);
    setReserva((r) => r + 1);
    setSelId(proximo.id);
    setFiltro("todos");
    setVista("pipeline");
    pulse(proximo.id);
  }

  function selecionar(id: string) {
    setSelId(id);
    if (!window.matchMedia("(min-width: 1024px)").matches) {
      detailRef.current?.scrollIntoView({ behavior: prefersReduced() ? "auto" : "smooth", block: "start" });
    }
  }

  function assumir(l: Lead) {
    setAssumidos((a) =>
      a[l.id]
        ? a
        : {
            ...a,
            [l.id]: {
              de: "equipe",
              texto: `Oi, ${l.nome.split(" ")[0]}! Aqui é o corretor da Calmeira, vou seguir com você por aqui.`,
              hora: "agora",
            },
          },
    );
  }

  useLayoutEffect(() => {
    const p = pendingFlip.current;
    if (!p) return;
    pendingFlip.current = null;
    const reduced = prefersReduced();
    const scrolls = boardScrolls();

    if (scrolls && p.scrollToCol) {
      const b = boardRef.current!;
      const col = colRefs.current.get(p.scrollToCol);
      if (col) b.scrollTo({ left: col.offsetLeft - 16, behavior: reduced ? "auto" : "smooth" });
    }
    if (reduced) return;

    cardRefs.current.forEach((el, id) => {
      const first = p.rects.get(id);
      if (!first) {
        el.animate([{ opacity: 0, transform: "translateY(-8px)" }, { opacity: 1, transform: "none" }], {
          duration: 320,
          easing: EASE,
        });
        return;
      }
      if (scrolls && id === p.movedId) return;
      const last = el.getBoundingClientRect();
      const dx = first.left - last.left;
      const dy = first.top - last.top;
      if (Math.abs(dx) < 1 && Math.abs(dy) < 1) return;
      el.animate([{ transform: `translate(${dx}px, ${dy}px)` }, { transform: "none" }], {
        duration: 320,
        easing: EASE,
      });
    });
  }, [leads]);

  const filtros: { id: Filtro; label: string }[] = [
    { id: "todos", label: "Todos" },
    ...origens.map((o) => ({ id: o, label: o })),
    { id: "hoje", label: "Hoje" },
  ];

  const navCls = (on: boolean) =>
    `flex min-h-[44px] w-full items-center gap-2.5 rounded-[8px] px-2.5 text-left text-[14px] transition-colors duration-200 ${
      on ? "bg-graphite-2 text-graphite-fg" : "text-graphite-muted hover:text-graphite-fg"
    }`;

  const irPara = (id: string) => {
    setVista("pipeline");
    requestAnimationFrame(() =>
      document.getElementById(id)?.scrollIntoView({ behavior: prefersReduced() ? "auto" : "smooth", block: "center" }),
    );
  };

  const conversa = [...sel.conversa, ...(assumidos[sel.id] ? [assumidos[sel.id]] : [])];
  const imovelSel = getImovel(sel.imovelId);

  return (
    <div className="grid min-h-screen bg-canvas lg:grid-cols-[232px_1fr]">
      <aside className="hidden flex-col bg-graphite px-4 py-[22px] text-graphite-fg lg:sticky lg:top-0 lg:flex lg:h-screen">
        <div className="px-2">
          <Wordmark href="/" size={22} onDark />
        </div>
        <p className="mt-7 px-2.5 text-[11px] uppercase tracking-[0.12em] text-graphite-muted">Comercial</p>
        <nav aria-label="Painel" className="mt-3 grid gap-0.5">
          <button type="button" className={navCls(vista === "pipeline")} aria-current={vista === "pipeline" ? "page" : undefined} onClick={() => setVista("pipeline")}>
            <Kanban aria-hidden strokeWidth={1.6} className="h-[18px] w-[18px]" />
            Pipeline
          </button>
          <button type="button" className={navCls(vista === "lista")} aria-current={vista === "lista" ? "page" : undefined} onClick={() => setVista("lista")}>
            <List aria-hidden strokeWidth={1.6} className="h-[18px] w-[18px]" />
            Leads
          </button>
          <button type="button" className={navCls(false)} onClick={() => irPara("conversa")}>
            <MessageSquare aria-hidden strokeWidth={1.6} className="h-[18px] w-[18px]" />
            Conversas
          </button>
          <button type="button" className={navCls(false)} onClick={() => irPara("proximo")}>
            <CalendarDays aria-hidden strokeWidth={1.6} className="h-[18px] w-[18px]" />
            Follow-ups
          </button>
          <Link href="/imoveis" className={navCls(false)}>
            <House aria-hidden strokeWidth={1.6} className="h-[18px] w-[18px]" />
            Imóveis
          </Link>
        </nav>
        <p className="mt-auto px-2.5 pb-2 text-[11px] uppercase leading-[1.6] tracking-[0.12em] text-graphite-muted">
          Ambiente de demonstração · dados fictícios
        </p>
      </aside>

      <main className="min-w-0 py-4 pl-4 pr-5 lg:px-7 lg:py-6">
        <div className="mb-3.5 flex items-center justify-between lg:hidden">
          <Wordmark href="/" size={22} />
          <span
            className="grid h-11 w-11 place-items-center rounded-full bg-sand text-[11px] font-bold text-ink-2"
            role="img"
            aria-label="Conta da demonstração"
          >
            EX
          </span>
        </div>

        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <h1 className="font-serif text-[30px] font-normal leading-none">{vista === "lista" ? "Leads" : "Pipeline"}</h1>
            <p className="mt-1 flex flex-wrap items-center gap-x-2 text-[13px] text-ink-muted">
              <span>Dados fictícios · semana atual</span>
              <span className="rounded-full border border-line-strong px-2 py-0.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-ink-2">
                Dados fictícios
              </span>
            </p>
          </div>
          <button
            type="button"
            onClick={novoLead}
            disabled={!leadsReserva[reserva]}
            aria-label={leadsReserva[reserva] ? "Adicionar lead fictício" : "Sem mais leads fictícios"}
            className="btn btn-pine min-h-[44px] flex-none gap-1.5 px-4 text-[14px] disabled:cursor-not-allowed disabled:bg-ink-muted"
          >
            <Plus aria-hidden strokeWidth={2} className="h-4 w-4" />
            Lead
          </button>
        </div>

        <div className="no-scrollbar -ml-4 my-4 flex gap-2 overflow-x-auto pl-4 lg:ml-0 lg:pl-0" role="group" aria-label="Filtrar por origem">
          {filtros.map((f) => (
            <button
              key={f.id}
              type="button"
              aria-pressed={filtro === f.id}
              onClick={() => setFiltro(f.id)}
              className={`min-h-[44px] flex-none rounded-full border px-3.5 text-[13px] font-semibold transition-colors duration-200 ${
                filtro === f.id
                  ? "border-ink bg-ink text-paper"
                  : "border-line-strong bg-surface text-ink-2 hover:border-ink-muted"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {vista === "pipeline" ? (
          <div
            ref={boardRef}
            className="no-scrollbar relative -ml-4 grid snap-x snap-mandatory scroll-pl-4 auto-cols-[82%] grid-flow-col gap-3 overflow-x-auto pb-2 pl-4 lg:ml-0 lg:auto-cols-[minmax(0,1fr)] lg:overflow-visible lg:pl-0"
          >
            {colunas.map((c) => {
              const daColuna = visiveis.filter((l) => c.estagios.includes(l.estagio));
              const fechado = c.id === "fechado";
              const ganhos = daColuna.filter((l) => l.estagio === "ganho").length;
              const contagem = fechado ? `${ganhos} · ${daColuna.length - ganhos}` : String(daColuna.length);
              const nomeCol = c.estagios.map(label).join(" / ");
              return (
                <section
                  key={c.id}
                  ref={(el) => {
                    if (el) colRefs.current.set(c.id, el);
                    else colRefs.current.delete(c.id);
                  }}
                  aria-label={`${nomeCol}: ${daColuna.length} ${daColuna.length === 1 ? "lead" : "leads"}`}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragOver(c.id);
                  }}
                  onDragLeave={() => setDragOver((d) => (d === c.id ? null : d))}
                  onDrop={(e) => {
                    e.preventDefault();
                    setDragOver(null);
                    const id = e.dataTransfer.getData("text/plain");
                    if (id) mover(id, c.estagios[0]);
                  }}
                  className={`min-w-0 snap-start rounded-lg bg-board p-2.5 transition-shadow duration-200 ${
                    dragOver === c.id ? "ring-2 ring-inset ring-pine" : ""
                  }`}
                >
                  <header className="flex items-center justify-between gap-1.5 px-1 pb-2.5 pt-1 text-[13px] font-bold">
                    {fechado ? (
                      <span className="flex items-center gap-1.5">
                        <span className="chip st-ganho">Ganho</span>
                        <span aria-hidden className="text-[12px] font-normal text-ink-muted">/</span>
                        <span className="chip st-perdido">Perdido</span>
                      </span>
                    ) : (
                      <span className={`chip st-${c.estagios[0]}`}>{label(c.estagios[0])}</span>
                    )}
                    <span className="font-semibold tabular-nums text-ink-muted">{contagem}</span>
                  </header>
                  <ul className="grid gap-2">
                    {daColuna.map((l) => {
                      const r = rodape(l);
                      const ativo = l.id === sel.id;
                      return (
                        <li
                          key={l.id}
                          ref={(el) => {
                            if (el) cardRefs.current.set(l.id, el);
                            else cardRefs.current.delete(l.id);
                          }}
                        >
                          <button
                            type="button"
                            draggable
                            onDragStart={(e) => {
                              e.dataTransfer.setData("text/plain", l.id);
                              e.dataTransfer.effectAllowed = "move";
                            }}
                            onDragEnd={() => setDragOver(null)}
                            onClick={() => selecionar(l.id)}
                            aria-pressed={ativo}
                            key={flash?.id === l.id ? `f${flash.n}` : "c"}
                            className={`block w-full cursor-pointer rounded-md border bg-surface p-3 text-left transition-[border-color,box-shadow] duration-200 hover:border-line-strong active:cursor-grabbing ${
                              ativo ? "border-pine shadow-halo" : "border-line"
                            } ${flash?.id === l.id ? "halo-pulse" : ""}`}
                          >
                            <span className="block text-[14px] font-bold">{l.nome}</span>
                            <span className="mt-0.5 block text-[12px] text-ink-muted">{imovelLabel(l.imovelId)}</span>
                            <span className="mt-2.5 flex items-center justify-between gap-2 text-[11px] text-ink-muted">
                              {l.estagio === "ganho" || l.estagio === "perdido" ? (
                                <span className={`chip st-${l.estagio} h-[22px]`}>{label(l.estagio)}</span>
                              ) : (
                                <span className="inline-flex items-center rounded-full border border-line px-2 py-[3px] text-[11px] font-semibold text-ink-2">
                                  {l.origem}
                                </span>
                              )}
                              <span className={r.destaque ? "font-bold text-pine" : ""}>{r.texto}</span>
                            </span>
                          </button>
                        </li>
                      );
                    })}
                    {daColuna.length === 0 && (
                      <li className="rounded-md border border-dashed border-line-strong px-3 py-4 text-center text-[12px] text-ink-muted">
                        Solte um lead aqui
                      </li>
                    )}
                  </ul>
                </section>
              );
            })}
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-line bg-surface">
            <table className="w-full min-w-[640px] text-left text-[13px]">
              <caption className="sr-only">Lista de leads fictícios</caption>
              <thead className="text-[11px] uppercase tracking-[0.12em] text-ink-muted">
                <tr className="border-b border-line">
                  <th scope="col" className="px-4 py-3 font-bold">Lead</th>
                  <th scope="col" className="px-4 py-3 font-bold">Imóvel</th>
                  <th scope="col" className="px-4 py-3 font-bold">Origem</th>
                  <th scope="col" className="px-4 py-3 font-bold">Estágio</th>
                  <th scope="col" className="px-4 py-3 font-bold">Entrou</th>
                </tr>
              </thead>
              <tbody>
                {visiveis.map((l) => (
                  <tr key={l.id} className={`border-b border-line last:border-0 ${l.id === sel.id ? "bg-paper" : ""}`}>
                    <td className="px-4 py-1">
                      <button
                        type="button"
                        onClick={() => selecionar(l.id)}
                        aria-pressed={l.id === sel.id}
                        className="flex min-h-[44px] items-center gap-2.5 text-[14px] font-bold"
                      >
                        <span aria-hidden className="grid h-7 w-7 place-items-center rounded-full bg-sand text-[11px] text-ink-2">
                          {iniciais(l.nome)}
                        </span>
                        {l.nome}
                      </button>
                    </td>
                    <td className="px-4 py-1 text-ink-2">{imovelLabel(l.imovelId)}</td>
                    <td className="px-4 py-1 text-ink-2">{l.origem}</td>
                    <td className="px-4 py-1">
                      <span className={`chip st-${l.estagio}`}>{label(l.estagio)}</span>
                    </td>
                    <td className="px-4 py-1 tabular-nums text-ink-muted">{l.entrou}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <section
          ref={detailRef}
          aria-label={`Detalhe do lead ${sel.nome}`}
          className="mt-4 grid scroll-mt-4 gap-[18px] rounded-lg border border-line bg-surface p-[18px] lg:grid-cols-[1.1fr_1fr_0.9fr] lg:gap-7 lg:p-6"
        >
          <div>
            <div className="flex items-center gap-3">
              <span aria-hidden className="grid h-11 w-11 flex-none place-items-center rounded-full bg-sand text-[14px] font-bold text-ink-2">
                {iniciais(sel.nome)}
              </span>
              <div>
                <h2 className="font-serif text-[26px] font-normal leading-none">{sel.nome}</h2>
                <p className="mt-1 text-[13px] text-ink-muted">+55 00 00000-0000 · fictício</p>
              </div>
            </div>
            <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-[13px]">
              <dt className="text-ink-muted">Origem</dt>
              <dd className="font-semibold">{sel.origemDetalhe}</dd>
              <dt className="text-ink-muted">Imóvel</dt>
              <dd className="font-semibold">
                {imovelSel ? (
                  <Link
                    href={`/imoveis/${imovelSel.id}`}
                    className="-my-[13px] inline-flex min-h-[44px] items-center underline decoration-line-strong underline-offset-4 hover:decoration-pine"
                  >
                    {imovelLabel(sel.imovelId)}
                  </Link>
                ) : (
                  sel.imovelId
                )}
              </dd>
              <dt className="text-ink-muted">Entrou</dt>
              <dd className="font-semibold">{sel.entrou}</dd>
              <dt className="text-ink-muted">Responsável</dt>
              <dd className="font-semibold">{assumidos[sel.id] ? "Corretor da Calmeira (você)" : "Corretor da Calmeira"}</dd>
            </dl>
            <div className="mt-2 flex flex-wrap gap-x-1.5" role="group" aria-label="Mudar estágio">
              {estagios.map((s) => {
                const cur = sel.estagio === s.id;
                return (
                  <button
                    key={s.id}
                    type="button"
                    aria-pressed={cur}
                    onClick={() => mover(sel.id, s.id)}
                    className="group/st inline-flex min-h-[44px] items-center"
                  >
                    <span
                      className={`chip st-${s.id} border border-transparent ${
                        cur ? "outline outline-2 outline-offset-1 outline-pine" : "group-hover/st:border-line-strong"
                      }`}
                    >
                      {s.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div id="conversa" className="scroll-mt-6">
            <p className="mb-2.5 text-[11px] font-bold uppercase tracking-[0.12em] text-ink-muted">Histórico WhatsApp</p>
            <ol className="grid gap-2 rounded-md bg-chat p-3" aria-label="Mensagens fictícias">
              {conversa.map((m, n) => (
                <li
                  key={`${sel.id}-${n}`}
                  className={`max-w-[86%] rounded-[12px] px-[11px] py-2 text-[13px] leading-[1.4] ${
                    m.de === "lead"
                      ? "rounded-tl-[4px] border border-line bg-surface"
                      : "ml-auto rounded-tr-[4px] bg-pine-50"
                  } ${n === sel.conversa.length ? "rise" : ""}`}
                >
                  <span className="sr-only">{m.de === "lead" ? `${sel.nome}: ` : "Equipe: "}</span>
                  {m.texto}
                  <small className="mt-[3px] block text-right text-[10px] text-ink-muted">
                    {m.hora}
                    {m.auto ? " · automático" : ""}
                  </small>
                </li>
              ))}
            </ol>
          </div>

          <div id="proximo" className="scroll-mt-6">
            <p className="mb-2.5 text-[11px] font-bold uppercase tracking-[0.12em] text-ink-muted">Próximo passo</p>
            <ol>
              {passosPorEstagio[sel.estagio].map((p) => (
                <li key={p.quando} className="grid grid-cols-[52px_1fr] gap-2.5 border-b border-line py-2.5 text-[13px]">
                  <b className="tabular-nums">{p.quando}</b>
                  <span className={p.feito ? "text-ink-muted line-through" : ""}>
                    {p.feito && <span className="sr-only">Feito: </span>}
                    {p.texto}
                  </span>
                </li>
              ))}
            </ol>
            {assumidos[sel.id] ? (
              <p className="btn btn-ghost mt-3.5 min-h-[44px] w-full cursor-default text-pine" role="status">
                <Check aria-hidden strokeWidth={1.8} className="h-4 w-4" />
                Conversa assumida
              </p>
            ) : (
              <button type="button" onClick={() => assumir(sel)} className="btn btn-pine mt-3.5 min-h-[44px] w-full">
                Assumir conversa
              </button>
            )}
          </div>
        </section>

        <footer className="mt-8 flex flex-wrap items-center justify-between gap-x-6 border-t border-line pb-14 pt-5 text-[13px] text-ink-muted">
          <span>Demo AstroG · marca e dados fictícios</span>
          <Link href="/" className="inline-flex min-h-[44px] items-center underline-offset-4 hover:text-ink hover:underline">
            Voltar ao site
          </Link>
        </footer>
      </main>
    </div>
  );
}
