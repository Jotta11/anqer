# Rebrand Anqer + Fidelidade Quantara — Design

**Data:** 2026-07-08
**Status:** Aprovado pelo usuário (aprovação única; execução autônoma autorizada)

## Objetivo

1. Aplicar a identidade visual oficial da Anqer (board `ID Anqer.png`) em todo o site.
2. Deixar seções e animações fiéis à referência https://sign-quantara.webflow.io/ — tanto as seções já implementadas quanto as pendentes.

## Identidade visual (fonte: ID Anqer.png)

- **Laranja (acento):** `#F97316`
- **Navy (escuro):** `#0F172A`
- **Cinza claro:** `#CBD5E1`
- **Branco:** `#FFFFFF`
- **Tipografia:** Space Grotesk
- **Símbolo:** "A" laranja, conceito 01 ("direção e evolução") — perna esquerda diagonal longa + perna direita curta, formas chanfradas.
- **Wordmark:** ANQER (bold, branco) + TECHNOLOGY (letter-spacing largo, menor).

## Fase 1 — Rebrand (tokens + logo)

### Cores (centralizado em `app/globals.css`)

| Token | Antes | Depois | Papel |
|---|---|---|---|
| `--color-blue` | `#229eff` | `#F97316` | Acento: CTAs, glows, eyebrows, contornos, counters |
| `--color-dark-blue` | `#002b4d` | `#431407` (aprox.) | Sombras coloridas |
| `--color-almost-black` | `#0e0e0e` | `#0a0e16` (aprox.) | BG principal, com matiz navy |
| `--color-almost-black-2` | `#161616` | `#10141d` (aprox.) | BG seções alternadas |
| `--color-black-gray` | `#181818` | matiz navy equivalente | Cards |
| `--color-light-gray` | `#d1d1d1` | `#CBD5E1` | Texto secundário claro |

- Efeitos `hue-rotate` (pricing, ícones 3D azuis) recalibrados para aterrissar no laranja.
- Ícones 3D azuis existentes (`/public/assets/icons-3d/`) recoloridos via CSS filter (hue-rotate/saturate) para a família do laranja.
- Nomes das variáveis podem ser mantidos ou renomeados para semânticos (`--color-accent`); manter consistência em todo o código.

### Tipografia

- Inter Tight → **Space Grotesk** via `next/font` (Google Fonts).
- Escala fluid em VW, line-heights e tracking `-0.02em` do spec permanecem intactos.

### Logo

- Recriar em **SVG vetorial** fiel ao board: símbolo "A" + wordmark ANQER TECHNOLOGY.
- Arquivos em `/public/assets/logos/` (símbolo isolado, lockup horizontal, versão footer grande).
- Usos: navbar (símbolo + wordmark), footer (logo grande), favicon (símbolo).
- Atualizar metadata/OG theme-color para a nova paleta.

## Fase 2 — Auditoria completa contra o Quantara

Método: Quantara e localhost lado a lado no Chrome, seção por seção. `docs/ANIMATION_SPECS.md` continua sendo a fonte da verdade para valores de motion — não substituir por aproximações.

### Seções já implementadas (revisar e corrigir divergências)

1. Navbar — glassmorphism, hide-on-scroll mobile
2. Hero — H1, orbits, parallax mouse, scramble labels
3. Ecossistema — marquee, parallax scroll, hover
4. Core Platform — ciclo pinado, blocos isométricos, ícones
5. Workflow — linha tracejada, blocos, etapas

### Seções pendentes (implementar motion conforme spec)

6. Features (Lab) — marquee de tags, 3 pilares, círculos girando com counter 0→100
7. Pricing — default grayscale, color reveal no hover com hue-rotate
8. Integração — 7 ícones em arc fan-out
9. CTA final — botão magnético
10. Footer — 4 colunas, logo grande

### Validação

- `npm run typecheck` (NUNCA `npm run build` com dev server rodando)
- Checagem visual no navegador (Chrome, lado a lado com referência)
- `prefers-reduced-motion` degradando para fades
- Mobile (320px+)
- Commit por milestone, conventional commits

## Fora de escopo

- Conteúdo/copy não muda (permanece o de `/content/site.ts`).
- Nenhum conteúdo copiado do Quantara (só estética/motion).
- Sistema de produtos da ID (Anqer Flow/AI/Data/Cloud) não entra no site.
