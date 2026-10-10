export function Seal() {
  return (
    <div
      role="note"
      aria-label="Demonstração: marca e dados fictícios"
      className="pointer-events-none fixed bottom-3 right-3 z-50 flex items-center gap-1.5 rounded-full border border-line-strong bg-paper/[0.86] px-2.5 py-[7px] text-[10px] font-semibold uppercase leading-none tracking-[0.16em] text-ink-2 backdrop-blur-[8px]"
    >
      <i aria-hidden className="h-1.5 w-1.5 rounded-full bg-pine" />
      Demonstração
    </div>
  );
}
