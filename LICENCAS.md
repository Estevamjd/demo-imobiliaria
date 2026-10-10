# LICENÇAS — demo-site-imobiliaria (Calmeira Imóveis, fictícia)
Conferido em 2026-10-10. Nada pago. Arquivos locais em `design/mockups/img/` (baixados do CDN oficial, w=1800).

## Fotos
| Arquivo | Uso | Página | URL direta | Fotógrafo | Licença |
|---|---|---|---|---|---|
| pergola.jpg | hero home | https://unsplash.com/photos/modern-patio-with-pergola-fireplace-and-outdoor-kitchen-93TYtgVkGOo | https://images.unsplash.com/photo-1755816764831-2803235f0099 | autor da conta pede crédito a rosewooddecks.com (nome do perfil não confirmado) | Unsplash License https://unsplash.com/license ("Free to use", lido na página via busca) |
| cozinha.jpg | galeria | https://unsplash.com/photos/bright-minimalist-kitchen-with-white-cabinets-and-wooden-countertops-avPVKD07Fcg | https://images.unsplash.com/photo-1769745241584-be9b8227e126 | **a confirmar** | Unsplash License (free) |
| sala-verde.jpg | galeria | https://unsplash.com/photos/cozy-living-room-with-natural-elements-and-warm-tones-8fF_tF2ZMSQ | https://images.unsplash.com/photo-1749472034620-8964f6f7463b | Simona Sergi (@i_am_simoesse) | Unsplash License (free) |
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

Unsplash (7 fotos, nesta demo e no reel v2): não verificadas. O site exige uma verificação anti-bot de prova de trabalho que não passou. Os arquivos vêm de `images.unsplash.com`, e não de `plus.unsplash.com` (onde fica o Unsplash+ pago), o que indica a licença gratuita, **sem confirmar**. Nome do fotógrafo: a confirmar. Antes do merge ou de publicar, alguém precisa abrir as páginas num navegador normal.

## Neste repositório
- Fotos: os mesmos 9 arquivos acima, sem edição, em `public/fotos/` (servidos via `next/image`).
- Fontes: carregadas por `next/font/google` (Instrument Serif e Manrope, SIL OFL 1.1).
- Ícones: pacote `lucide-react` (ISC).
- Créditos também visíveis no site em `/creditos`.
