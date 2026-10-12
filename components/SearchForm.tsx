"use client";

import { ChevronDown, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useId, useMemo, useState } from "react";
import { bairros, tipos, type Operacao } from "@/data/imoveis";
import { buscar, faixas, filtrosParaQuery, plural, type Filtros } from "@/lib/imoveis";

type FieldProps = {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  chevron?: boolean;
};

function Field({ label, value, onChange, options, chevron = true }: FieldProps) {
  const id = useId();
  return (
    <div className="relative min-h-[60px] bg-surface transition-colors duration-200 focus-within:bg-paper hover:bg-paper">
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-3.5 top-3 text-[11px] font-semibold uppercase leading-none tracking-[0.1em] text-ink-muted"
      >
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-full min-h-[60px] w-full cursor-pointer appearance-none truncate bg-transparent pb-2.5 pl-3.5 pr-9 pt-[28px] text-[15px] font-medium text-ink focus:outline-none focus-visible:outline-none"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      {chevron && (
        <ChevronDown
          aria-hidden
          strokeWidth={1.6}
          className="pointer-events-none absolute bottom-[13px] right-3.5 h-[18px] w-[18px] text-ink"
        />
      )}
    </div>
  );
}

export function SearchForm({
  initial,
  className = "",
}: {
  initial: Filtros;
  className?: string;
}) {
  const router = useRouter();
  const [f, setF] = useState<Filtros>({ ...initial, lancamento: false });
  const total = useMemo(() => buscar(f).length, [f]);

  const set = <K extends keyof Filtros>(k: K, v: Filtros[K]) => setF((prev) => ({ ...prev, [k]: v }));
  const setOp = (op: Operacao) => setF((prev) => ({ ...prev, op, preco: "" }));

  return (
    <form
      role="search"
      aria-label="Buscar imóveis"
      onSubmit={(e) => {
        e.preventDefault();
        router.push(`/imoveis?${filtrosParaQuery(f)}`);
      }}
      className={`relative z-[2] rounded-lg border border-line bg-surface p-2 shadow-soft lg:grid lg:grid-cols-[auto_1fr_auto] lg:items-center lg:gap-2 ${className}`}
    >
      <div className="flex gap-1 px-1.5 pb-2.5 pt-1.5 lg:p-0 lg:px-2" role="group" aria-label="Operação">
        {(["comprar", "alugar"] as const).map((op) => (
          <button
            key={op}
            type="button"
            aria-pressed={f.op === op}
            onClick={() => setOp(op)}
            className={`min-h-[44px] rounded-full px-3.5 text-[13px] font-semibold transition-colors duration-200 ${
              f.op === op ? "bg-ink text-paper" : "text-ink-muted hover:text-ink"
            }`}
          >
            {op === "comprar" ? "Comprar" : "Alugar"}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-md bg-line lg:grid-cols-4">
        <Field
          label="Tipo"
          value={f.tipo}
          onChange={(v) => set("tipo", v as Filtros["tipo"])}
          options={[{ value: "", label: "Todos" }, ...tipos.map((t) => ({ value: t, label: t }))]}
        />
        <Field
          label="Bairro"
          value={f.bairro}
          onChange={(v) => set("bairro", v)}
          options={[{ value: "", label: "Todos" }, ...bairros.map((b) => ({ value: b, label: b }))]}
        />
        <Field
          label="Faixa de preço"
          value={f.preco}
          chevron={false}
          onChange={(v) => set("preco", v)}
          options={[
            { value: "", label: "Qualquer valor" },
            ...faixas[f.op].map((x) => ({ value: x.id, label: x.label })),
          ]}
        />
        <Field
          label="Quartos"
          value={String(f.quartos)}
          onChange={(v) => set("quartos", Number(v))}
          options={[
            { value: "0", label: "Qualquer" },
            { value: "1", label: "1+" },
            { value: "2", label: "2+" },
            { value: "3", label: "3+" },
            { value: "4", label: "4+" },
          ]}
        />
      </div>

      <button
        type="submit"
        className="btn btn-pine mt-2 w-full lg:mt-0 lg:h-[60px] lg:w-auto lg:px-7"
        aria-describedby="search-count"
      >
        <Search aria-hidden strokeWidth={1.6} className="h-[18px] w-[18px]" />
        <span id="search-count" aria-live="polite" className="tabular-nums">
          {total === 0 ? "Nenhum imóvel" : `Buscar ${plural(total, "imóvel", "imóveis")}`}
        </span>
      </button>
    </form>
  );
}
