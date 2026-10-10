import Link from "next/link";
import { Wordmark } from "./Wordmark";

export function SiteFooter({ className = "" }: { className?: string }) {
  return (
    <footer className={`mt-20 border-t border-line pb-[72px] pt-7 text-[13px] text-ink-muted ${className}`}>
      <div className="wrap flex flex-wrap items-center justify-between gap-x-6 gap-y-1">
        <Wordmark size={20} />
        <div className="flex flex-wrap items-center gap-x-6">
          <Link href="/painel" className="inline-flex min-h-[44px] items-center underline-offset-4 hover:text-ink hover:underline">
            Painel de leads
          </Link>
          <Link href="/creditos" className="inline-flex min-h-[44px] items-center underline-offset-4 hover:text-ink hover:underline">
            Créditos
          </Link>
          <span>Demo AstroG · marca e dados fictícios</span>
        </div>
      </div>
    </footer>
  );
}
