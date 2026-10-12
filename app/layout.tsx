import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Manrope } from "next/font/google";
import { Seal } from "@/components/Seal";
import "./globals.css";

const serif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-instrument",
});

const sans = Manrope({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: {
    default: "Calmeira Imóveis — demonstração",
    template: "%s · Calmeira Imóveis (demo)",
  },
  description:
    "Site de demonstração de uma imobiliária fictícia. Marca, imóveis, valores e leads são dados fictícios.",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#F7F4EE",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${serif.variable} ${sans.variable}`}>
      <body>
        <noscript>
          <style>{`.reveal{opacity:1;transform:none}`}</style>
        </noscript>
        {children}
        <Seal />
      </body>
    </html>
  );
}
