# LICENÇAS — demo-site-imobiliaria (Calmeira Imóveis, fictícia)
Conferido em 2026-10-10. Nada pago. Arquivos locais em `design/mockups/img/` (baixados do CDN oficial, w=1800).

## Fotos
| Arquivo | Uso | Página | URL direta | Fotógrafo | Licença |
|---|---|---|---|---|---|
| pergola.jpg | hero home | https://www.pexels.com/photo/terrace-in-house-7587879/ | https://images.pexels.com/photos/7587879/pexels-photo-7587879.jpeg | Max Vakhtbovych | Pexels License https://www.pexels.com/license/ (página mostra "License: Free", conferida em 12/10/2026) |
| cozinha.jpg | galeria | https://www.pexels.com/photo/modern-wooden-furniture-and-appliances-in-spacious-kitchen-6933769/ | https://images.pexels.com/photos/6933769/pexels-photo-6933769.jpeg | Max Vakhtbovych | Pexels License https://www.pexels.com/license/ (página mostra "License: Free", conferida em 12/10/2026) |
| sala-verde.jpg | galeria | https://www.pexels.com/photo/modern-minimalist-open-plan-living-room-interior-32956273/ | https://images.pexels.com/photos/32956273/pexels-photo-32956273.jpeg | Allen Boguslavsky | Pexels License https://www.pexels.com/license/ (página mostra "License: Free", conferida em 12/10/2026) |
| casa-madeira.jpg | card + galeria desktop | https://www.pexels.com/photo/modern-house-with-glass-and-wood-exterior-29887340/ | https://images.pexels.com/photos/29887340/pexels-photo-29887340.jpeg | Alexander Mass (conferido pelo Chief, 2026-10-10) | Pexels License https://www.pexels.com/license/ |
| sala-quente.jpg | galeria + faixa CTA | https://www.pexels.com/photo/square-39-14781780/ | https://images.pexels.com/photos/14781780/pexels-photo-14781780.jpeg | Yusuf P (conferido pelo Chief, 2026-10-10) | Pexels License |
| quarto.jpg | galeria | https://www.pexels.com/photo/cozy-modern-bedroom-with-neutral-decor-33197278/ | https://images.pexels.com/photos/33197278/pexels-photo-33197278.jpeg | Louie Alma (conferido pelo Chief, 2026-10-10) | Pexels License |
| quarto-claro.jpg | reserva | https://www.pexels.com/photo/interior-of-a-modern-minimalist-bedroom-19836802/ | https://images.pexels.com/photos/19836802/pexels-photo-19836802.jpeg | Lisa Anna (conferido pelo Chief, 2026-10-10) | Pexels License |
| sala-madeira.jpg | card + galeria mobile | https://www.pexels.com/photo/cozy-minimalist-living-room-with-natural-light-35776702/ | https://images.pexels.com/photos/35776702/pexels-photo-35776702.jpeg | Lydia Griva (conferido pelo Chief, 2026-10-10) | Pexels License |
| fachada-tijolo.jpg | card | https://www.pexels.com/photo/modern-brick-house-facade-with-garden-decor-37108693/ | https://images.pexels.com/photos/37108693/pexels-photo-37108693.jpeg | "Sergej *****" (sobrenome censurado pelo site) (conferido pelo Chief, 2026-10-10) | Pexels License |

Todas: interiores/fachadas, sem pessoa. Unsplash e Pexels: uso comercial livre, crédito opcional, sem revenda da foto pura.
**Gap:** unsplash.com e pexels.com bloqueiam acesso automatizado (anti-bot Anubis/Cloudflare); nome do fotógrafo "a confirmar" deve ser lido abrindo a página no navegador antes do merge (Frontend/QA). Licença e "free" (não Unsplash+) foram confirmados nos trechos indexados das páginas Unsplash; Pexels não tem conteúdo pago.

## Fontes
- Instrument Serif — SIL OFL 1.1 — https://fonts.google.com/specimen/Instrument+Serif · https://openfontlicense.org
- Manrope — SIL OFL 1.1 — https://fonts.google.com/specimen/Manrope

## Ícones
- Lucide (search, chevron-down, message-circle, calendar, home, list, kanban) — ISC — https://lucide.dev/license. Nos mockups, desenhados como SVG inline no estilo Lucide; no código usar `lucide-react`.
- Usados no código (`lucide-react`, ISC): search, chevron-down, chevron-left, chevron-right, message-circle, message-square, calendar-days, house, list, kanban, plus, check, x.

## Marca
"Calmeira Imóveis" é fictícia (checagem em `design/DESIGN-SYSTEM.md` §1). Nenhuma marca real usada.

## Conferência no navegador (Chief, 2026-10-10 15:21 BRT)

Pexels: todas abriram com licença "Free" (Pexels License).
- 29887340 · Alexander Mass
- 14781780 · Yusuf P
- 33197278 · Louie Alma
- 19836802 · Lisa Anna
- 35776702 · Lydia Griva
- 37108693 · "Sergej *****" (o próprio site censura o sobrenome)
- 1571460 (reel v2) · Viaceslav Kat

**12/10/2026: as 3 fotos Unsplash desta demo (pergola, cozinha, sala-verde) foram trocadas por Pexels verificadas: 7587879 e 6933769 (Max Vakhtbovych) e 32956273 (Allen Boguslavsky), todas com "License: Free". Esta demo não usa mais Unsplash.** Histórico: Unsplash (7 fotos, nesta demo e no reel v2): não verificadas. O site exige uma verificação anti-bot de prova de trabalho que não passou. Os arquivos vêm de `images.unsplash.com`, e não de `plus.unsplash.com` (onde fica o Unsplash+ pago), o que indica a licença gratuita, **sem confirmar**. Nome do fotógrafo: a confirmar. Antes do merge ou de publicar, alguém precisa abrir as páginas num navegador normal.

## Neste repositório
- Fotos: os mesmos 9 arquivos acima, sem edição, em `public/fotos/` (servidos via `next/image`).
- Fontes: carregadas por `next/font/google` (Instrument Serif e Manrope, SIL OFL 1.1).
- Ícones: pacote `lucide-react` (ISC).
- Créditos também visíveis no site em `/creditos`.
