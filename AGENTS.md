# Studio de Saúde — Memória do projeto

Site estático de página única para a academia **Studio de Saúde** (Natal/RN). Sem framework: HTML + CSS + JS puro.

## Estrutura

- `index.html` — página única (hero, proposta, para quem é, depoimentos, espaço, professor, como funciona, CTA, footer)
- `css/style.css` — único stylesheet, organizado em blocos por seção
- `js/main.js` — carga de fotos, reveal, parallax, menu mobile, links WhatsApp, ano
- `img/` — imagens reais; as fotos são carregadas via JS a partir de `data-src`

## Stack e convenções

- Fontes do Google Fonts: `Manrope` (corpo) e `Lora` (acentos em itálico, ex. `em` no h1)
- Variáveis de design em `:root` (navy/blue/sky/paleta e sombras)
- Botões: classe `.btn` centraliza texto (`text-align: center`) e não quebra linha (`white-space: nowrap`)
- Imagens de foto são `div.photo` com `background-image` (cover via JS), nunca `img` direto
- Animações: reveal com IntersectionObserver, parallax sutil, `prefers-reduced-motion` respeitado
- Breakpoints: `1180px` (ajuste do header), `1020px`, `860px` (menu hamburger), `720px`

## Assets (arquivos reais, não placeholders)

- `img/logo.png` — logo da marca (header + footer, classe `.brand-logo`; 40px no header, 48px no footer)
- `img/hero.png` — foto do hero (lazy `data-src`; atualizada pelo usuário como "imagem hero v2.png")
- `img/professor-breno.png` — foto da seção do professor

## Decisões de layout importantes

- **Header**: fixo, `min-height: 80px`, fundo translúcido com blur. Logo + nav (6 links) + CTA. `1180px` comprime espaçamento para caber em uma linha.
- **Hero**: grid `1.04fr / .96fr` com `align-items: stretch` — a imagem ocupa a mesma altura do bloco de texto (do título ao "Desde 2021" no hero-meta). No mobile (≤1020px) a foto volta a `aspect-ratio: 4/5` na coluna única.
- **Professor**: `aspect-ratio: 4/4.6` (16/10 no mobile).

## WhatsApp

- Links `[data-wa]` recebem href/target/rel via JS.
- Número e mensagem em `CONFIG` no topo de `js/main.js` (`whatsappNumber`, `whatsappMessage`) — editar ali.

## Imagens pendentes (usadas como fallback)

As seguintes tensões `data-src` ainda referenciam arquivos `jpg` que NÃO existem em `img/`: `aula-real.jpg`, `espaco-treinamento.jpg`, `aula-turma.jpg`, `professor-acompanhando.jpg`, `equipamentos.jpg`, `ambiente-studio.jpg`. Para que apareçam, colocar os arquivos em `img/` com esses nomes.

## Deploy

- Vercel (CLI `vercel --prod`), projeto `studiodesaude`
- URL de produção: https://studiodesaude.vercel.app
- `.vercelignore` exclui `.opencode` e `node_modules`