export type FotoKey =
  | "casa-madeira"
  | "cozinha"
  | "fachada-tijolo"
  | "pergola"
  | "quarto-claro"
  | "quarto"
  | "sala-madeira"
  | "sala-quente"
  | "sala-verde";

export type Foto = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

// Créditos e licenças em LICENCAS.md.
export const fotos: Record<FotoKey, Foto> = {
  "casa-madeira": {
    src: "/fotos/casa-madeira.jpg",
    width: 1800,
    height: 2700,
    alt: "Fachada de madeira escura com janelas de vidro do piso ao teto",
  },
  cozinha: {
    src: "/fotos/cozinha.jpg",
    width: 1800,
    height: 1200,
    alt: "Cozinha ampla com marcenaria em madeira e mesa de jantar",
  },
  "fachada-tijolo": {
    src: "/fotos/fachada-tijolo.jpg",
    width: 1800,
    height: 2700,
    alt: "Fachada de tijolo aparente com jardim na entrada",
  },
  pergola: {
    src: "/fotos/pergola.jpg",
    width: 1800,
    height: 1200,
    alt: "Deck de madeira com pérgola e mesa de jantar ao ar livre, cercado de verde",
  },
  "quarto-claro": {
    src: "/fotos/quarto-claro.jpg",
    width: 1800,
    height: 2700,
    alt: "Quarto claro e minimalista com luz natural",
  },
  quarto: {
    src: "/fotos/quarto.jpg",
    width: 1800,
    height: 1201,
    alt: "Quarto com roupa de cama branca e cabeceira estofada",
  },
  "sala-madeira": {
    src: "/fotos/sala-madeira.jpg",
    width: 1800,
    height: 2400,
    alt: "Sala com piso de madeira, sofá claro e janela ampla",
  },
  "sala-quente": {
    src: "/fotos/sala-quente.jpg",
    width: 1800,
    height: 1800,
    alt: "Canto de jantar com cadeira de madeira e luminária quente",
  },
  "sala-verde": {
    src: "/fotos/sala-verde.jpg",
    width: 1800,
    height: 1200,
    alt: "Sala integrada com cozinha, plantas e detalhes em madeira",
  },
};

export const interiores: FotoKey[] = [
  "sala-quente",
  "cozinha",
  "quarto",
  "sala-verde",
  "sala-madeira",
  "quarto-claro",
];
