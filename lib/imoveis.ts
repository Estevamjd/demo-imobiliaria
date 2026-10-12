import { fotos, type FotoKey } from "@/data/fotos";
import { imoveis, type Imovel, type Operacao, type Tipo } from "@/data/imoveis";

const brl = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  maximumFractionDigits: 0,
});

export function formatPreco(i: Pick<Imovel, "preco" | "operacao">) {
  const v = brl.format(i.preco).replace(/\u00a0/g, " ");
  return i.operacao === "alugar" ? `${v}/mês` : v;
}

export type FaixaPreco = { id: string; label: string; min: number; max: number };

export const faixas: Record<Operacao, FaixaPreco[]> = {
  comprar: [
    { id: "ate-900", label: "Até R$ 900 mil", min: 0, max: 900_000 },
    { id: "900-1600", label: "R$ 900 mil – 1,6 mi", min: 900_000, max: 1_600_000 },
    { id: "acima-1600", label: "Acima de R$ 1,6 mi", min: 1_600_000, max: Infinity },
  ],
  alugar: [
    { id: "ate-4", label: "Até R$ 4 mil/mês", min: 0, max: 4_000 },
    { id: "4-8", label: "R$ 4 mil – 8 mil/mês", min: 4_000, max: 8_000 },
    { id: "acima-8", label: "Acima de R$ 8 mil/mês", min: 8_000, max: Infinity },
  ],
};

export type Filtros = {
  op: Operacao;
  tipo: Tipo | "";
  bairro: string;
  preco: string;
  quartos: number;
  lancamento?: boolean;
};

export const filtrosVazios: Filtros = { op: "comprar", tipo: "", bairro: "", preco: "", quartos: 0 };

type Params = Record<string, string | string[] | undefined>;

export function filtrosDeParams(p: Params): Filtros {
  const get = (k: string) => {
    const v = p[k];
    return Array.isArray(v) ? v[0] ?? "" : v ?? "";
  };
  const op: Operacao = get("op") === "alugar" ? "alugar" : "comprar";
  const tipo = (["Casa", "Apartamento", "Sobrado"] as const).find((t) => t === get("tipo")) ?? "";
  const preco = faixas[op].some((f) => f.id === get("preco")) ? get("preco") : "";
  const quartos = Math.max(0, Math.min(4, Number.parseInt(get("quartos"), 10) || 0));
  return { op, tipo, bairro: get("bairro"), preco, quartos, lancamento: get("lancamento") === "1" };
}

export function filtrosParaQuery(f: Filtros) {
  const q = new URLSearchParams();
  q.set("op", f.op);
  if (f.tipo) q.set("tipo", f.tipo);
  if (f.bairro) q.set("bairro", f.bairro);
  if (f.preco) q.set("preco", f.preco);
  if (f.quartos) q.set("quartos", String(f.quartos));
  if (f.lancamento) q.set("lancamento", "1");
  return q.toString();
}

export function buscar(f: Filtros): Imovel[] {
  const faixa = faixas[f.op].find((x) => x.id === f.preco);
  return imoveis.filter(
    (i) =>
      i.operacao === f.op &&
      (!f.tipo || i.tipo === f.tipo) &&
      (!f.bairro || i.bairro === f.bairro) &&
      (!faixa || (i.preco >= faixa.min && i.preco < faixa.max)) &&
      (!f.quartos || i.quartos >= f.quartos) &&
      (!f.lancamento || i.lancamento),
  );
}

export function plural(n: number, um: string, varios: string) {
  return `${n} ${n === 1 ? um : varios}`;
}

/** Todas as fotos da galeria, sem repetir: capa, destaque mobile, grade e o restante. */
export function fotosDaGaleria(i: Imovel): FotoKey[] {
  const ordem: FotoKey[] = [i.capa, ...(i.destaqueMobile ? [i.destaqueMobile] : []), ...i.galeria];
  const todas = Object.keys(fotos) as FotoKey[];
  return Array.from(new Set([...ordem, ...todas]));
}

const WA_BASE = "https://wa.me/5500000000000";

export function linkWhatsApp(texto: string) {
  return `${WA_BASE}?text=${encodeURIComponent(texto)}`;
}
