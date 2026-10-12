// Lives in the right gutter (≥20px free on every screen) so scrolling content never passes under it.
export function Seal() {
  return (
    <div
      role="note"
      aria-label="Demonstração: marca e dados fictícios"
      className="pointer-events-none fixed right-[2px] top-1/2 z-50 flex -translate-y-1/2 rotate-180 items-center gap-[5px] rounded-full border border-line-strong bg-paper/[0.86] px-[3px] py-2 text-[8.5px] font-semibold uppercase leading-none tracking-[0.16em] text-ink-2 backdrop-blur-[8px] [writing-mode:vertical-rl] lg:right-1.5"
    >
      <i aria-hidden className="h-[5px] w-[5px] rounded-full bg-pine" />
      Demonstração
    </div>
  );
}
