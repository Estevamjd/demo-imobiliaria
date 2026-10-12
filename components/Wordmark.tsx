import Link from "next/link";

export function Wordmark({
  href,
  size = 26,
  onDark = false,
}: {
  href?: string;
  size?: number;
  onDark?: boolean;
}) {
  const inner = (
    <>
      Calmeira
      <em className={onDark ? "text-pine-onDark" : "text-pine"}>.</em>
    </>
  );
  const cls = "wordmark inline-flex min-h-[44px] items-center";
  if (!href) {
    return (
      <span className={cls} style={{ fontSize: size }}>
        {inner}
      </span>
    );
  }
  return (
    <Link href={href} className={cls} style={{ fontSize: size }} aria-label="Calmeira Imóveis, início">
      {inner}
    </Link>
  );
}
