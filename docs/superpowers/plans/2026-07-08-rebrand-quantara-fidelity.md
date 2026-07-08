# Rebrand Anqer + Fidelidade Quantara — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Aplicar a identidade visual oficial da Anqer (laranja #F97316, navy, Space Grotesk, logo SVG) e deixar todas as 10 seções fiéis ao Quantara (layout + motion), incluindo as 5 seções ainda sem motion.

**Architecture:** Fase 1 troca tokens centralizados (CSS variables em `app/globals.css`, fonte em `app/layout.tsx`) e adiciona logo SVG. Fase 2 audita seção por seção no Chrome (Quantara × localhost) e implementa o motion pendente com GSAP conforme `docs/ANIMATION_SPECS.md` (seção CORREÇÕES vence conflitos).

**Tech Stack:** Next.js 14 App Router, TypeScript, Tailwind, GSAP 3.15 (ScrollTrigger/SplitText/ScrambleText), Lenis.

## Global Constraints

- `docs/ANIMATION_SPECS.md` é fonte da verdade para valores de motion; a seção "CORREÇÕES VERIFICADAS" vence as Anim 1–19 em conflito.
- Nunca rodar `npm run build` com o dev server ativo — validar com `npm run typecheck`.
- Verificação visual: dev server + Chrome, comparando com https://sign-quantara.webflow.io/.
- Cores da marca: acento `#F97316`; sombra colorida `#431407`; BG principal `#0a0e16`; BG alternado `#10141d`; cards `#131722`; texto claro `#CBD5E1`.
- Fonte única: Space Grotesk (next/font, variable `--font-space-grotesk`).
- Copy permanece a de `/content/site.ts`; nada de conteúdo copiado do Quantara.
- Conventional commits; um commit por task.
- `prefers-reduced-motion` degrada para fades simples (bloco já existe no fim do globals.css — preservar).

---

### Task 1: Tokens da marca (cores + fonte)

**Files:**
- Modify: `app/globals.css` (bloco `:root` linhas 8–20; `rgba(34, 158, 255, 0.06)` linha ~190; `body` font-family linha 51)
- Modify: `app/layout.tsx` (Inter_Tight → Space_Grotesk)
- Modify: `components/motion/useCorePlatformCycle.ts:48` e `components/motion/useWorkflowCycle.ts:38` (glow azul → laranja)

**Steps:**

- [ ] Em `globals.css` trocar valores: `--color-blue: #F97316` (manter o nome da variável — usada em todo o código via Tailwind `text-blue` etc.), `--color-dark-blue: #431407`, `--color-almost-black: #0a0e16`, `--color-almost-black-2: #10141d`, `--color-black-gray: #131722`, `--color-light-gray: #cbd5e1`. Trocar o glow do hero `rgba(34, 158, 255, 0.06)` → `rgba(249, 115, 22, 0.06)`.
- [ ] Em `layout.tsx`: `import { Space_Grotesk } from "next/font/google"`, weights `["400","500","600","700"]`, `variable: "--font-space-grotesk"`; atualizar className do html. Em `globals.css` body: `font-family: var(--font-space-grotesk), ...`.
- [ ] Nos dois hooks de cycle: `rgba(34,158,255,0.95)` → `rgba(249,115,22,0.95)`.
- [ ] Verificar se `tailwind.config.ts` referencia `--font-inter-tight` e atualizar.
- [ ] Run: `npm run typecheck` → sem erros. Checar no browser que o site carrega com acento laranja.
- [ ] Commit: `feat(brand): tokens laranja/navy + Space Grotesk`

### Task 2: Logo SVG + navbar/footer/favicon

**Files:**
- Create: `components/ui/Logo.tsx` (SVG inline: símbolo "A" + wordmark ANQER TECHNOLOGY, props `variant: "symbol" | "lockup"`)
- Create: `app/icon.svg` (símbolo, favicon)
- Modify: `components/sections/Navbar.tsx` (substituir texto pelo `<Logo variant="lockup" />`)
- Modify: `components/sections/Footer.tsx` (logo no topo + mega-logo)

**Símbolo (fiel ao conceito 01 do board):** duas pernas chanfradas formando "A" — perna esquerda diagonal longa laranja, perna direita curta, sem travessão fechado. Wordmark: "ANQER" peso 700 branco + "TECHNOLOGY" tracking largo menor cinza.

- [ ] Criar Logo.tsx com SVG vetorial (paths do símbolo em `#F97316`, wordmark em `currentColor`), tamanho via props/className.
- [ ] Criar `app/icon.svg` com o símbolo em fundo transparente.
- [ ] Navbar: logo lockup (~altura 28px desktop / 24px mobile), mantendo classes `wrapper-navbar logo` (reveal Anim 18 depende delas).
- [ ] Footer: lockup no topo; mega-logo inferior vira o wordmark gigante (manter `text-white/[0.04]`).
- [ ] `npm run typecheck` + checagem visual. Commit: `feat(brand): logo SVG Anqer na navbar, footer e favicon`

### Task 3: Recalibrar hue dos ícones 3D (azul → laranja)

Os PNGs (CDN Quantara) são azuis. Hue do azul ≈ 210°, laranja ≈ 25° → offset base ≈ +175deg.

**Files:**
- Modify: `app/globals.css` (`.icon-product.v1–.v4`, `.icon-workflow.v1–.v4` — somar offset aos hue-rotate existentes: 0→175, 330→145, 270→85, 180→355)
- Modify: `components/motion/useCorePlatformCycle.ts`, `components/motion/useWorkflowCycle.ts` (se os hooks setam hue-rotate por estado, aplicar o mesmo offset)

- [ ] Aplicar offsets; validar no browser que os ícones ativos ficam na família do laranja (ajustar ±15deg a olho se preciso).
- [ ] Workflow: `.image-bg-workflow` usa webp "Abstract Blue Gradient" — adicionar `hue-rotate(175deg)` ao filter para o BG acompanhar a marca.
- [ ] Commit: `feat(brand): ícones 3D e BGs recalibrados para o laranja`

### Task 4: Auditoria — Navbar + Hero

- [ ] Chrome: abrir Quantara e localhost lado a lado; comparar navbar (glassmorphism pós-scroll, espaçamentos, botão) e hero (headline 1 linha pequena + 1 grande conforme C2, bandas de labels, parallax mouse ±1.4vw, scramble loop Anim 16, reveal Anim 18, scroll indicator).
- [ ] Listar divergências encontradas e corrigir uma a uma nos arquivos das seções/hooks.
- [ ] Verificar Anim 14 (nav link slide x:10px, power3.in duplo) e Anim 15 (hide on scroll mobile).
- [ ] `npm run typecheck` + visual. Commit: `fix(audit): navbar + hero fiéis ao Quantara`

### Task 5: Auditoria — Ecosystem + Core Platform

- [ ] Ecosystem: marquee x:-50% 20s linear (Anim 3), parallax -15vw scrub 0.5 (Anim 4), hover brightness 200% + scale 1.5 power4.out + siblings blur 2px (Anim 5), border fill 10s loop (Anim 6). Comparar feather gradients e espaçamentos.
- [ ] Core Platform: pinned 1200vh, ciclo de 4 estados, keyframes grayscale Anim 7 (25/30/45/50/63/65/68/85/86/90%), pulso Anim 9, grid de "+", subtitle cycling. Comparar com Quantara e corrigir.
- [ ] `npm run typecheck` + visual. Commit: `fix(audit): ecosystem + core platform fiéis ao Quantara`

### Task 6: Auditoria — Workflow

- [ ] Comparar layout (coluna texto 42% + blocos cascata), linha tracejada, badge bar, cycling de steps, keyframes Anim 8 (v4→v1 em 05/10/25/30/45/50/65/70%).
- [ ] Corrigir divergências. `npm run typecheck` + visual. Commit: `fix(audit): workflow fiel ao Quantara`

### Task 7: Features (Lab) — rebuild com motion completo

Conforme C1: **os orbits ficam aqui** (não no hero). Estrutura Quantara: `tracks lab` (800vh pinned) com `.content-feature` por pilar, orbits girando atrás, círculo com counter.

**Files:**
- Modify: `components/sections/Features.tsx` (estrutura: tags marquee + 3 `.content-feature` com `.radial-mask`, `.circle-empty`, `.wrapper-text-counting`, `.big-text` counter, `.image-orbit.v1–.v4`)
- Create: `components/motion/FeaturesMotion.tsx` + `components/motion/useFeatureCircles.ts`
- Modify: `app/globals.css` (estilos `.image-orbit` v1–v4 com tamanhos C1: 30/30/50/70vw; brightness v1 200%)
- Create/verificar assets orbit em `public/assets/orbits/` (gerar SVG radial próprio se não houver PNG)

- [ ] Implementar orbits girando: v1 5s, v2 10s, v3 20s, v4 30s, linear infinito (Anim 2).
- [ ] Tag marquee com GSAP x:-50% loop (mesmo padrão do ecosystem).
- [ ] Círculo + counter (Anim 17 com valores C4): mask rotate 360 + scale 0.95→1.05 + blur 6→0, thinBorder → `rgba(59,130,246,0.7)` **adaptado à marca: `rgba(249,115,22,0.7)`**, empty scale 1.15/blur 4px/op 0.55, number 0→100 snap; scrollTrigger `top 75% / bottom 75% / scrub 0.6`.
- [ ] Comparar com Quantara no browser e ajustar layout.
- [ ] `npm run typecheck` + visual. Commit: `feat(lab): seção features com orbits, marquee e counters`

### Task 8: Pricing — color reveal (Anim 13)

**Files:**
- Modify: `components/sections/Pricing.tsx` (adicionar classe `body-card-pricing` nos cards; remover hover CSS estático)
- Create: `components/motion/usePricingHover.ts`

- [ ] Hook: mouseenter → timeline `hue-rotate(276deg)` 0.5s → `grayscale(0)+saturate(220%)` 0.5s → set `hue-rotate(0)`; mouseleave → `grayscale(100%)+saturate(100%)` 0.5s. Estado base `filter: grayscale(100%)` (classe já existe no globals.css).
- [ ] Comparar layout dos cards com Quantara (paddings, borda, destaque do plano do meio) e ajustar.
- [ ] `npm run typecheck` + visual. Commit: `feat(pricing): color reveal no hover conforme spec`

### Task 9: Integration — arc fan-out (Anim 19)

**Files:**
- Modify: `components/sections/Integration.tsx` (estrutura com `.icon-integration.v1–.v7` e transforms exatos do spec)
- Create: `components/motion/useIntegrationReveal.ts`
- Modify: `app/globals.css` (posições: v1 `-42vw,10vw,-20deg`; v2 `-28vw,5vw,-16deg`; v3 `-14vw,1.5vw,-8deg`; v4 centro z2; v5 `42vw,10vw,20deg`; v6 `28vw,5vw,16deg`; v7 `14vw,1.5vw,8deg`; ícone 6vw)

- [ ] Reestruturar a seção com os transforms exatos (substituir o cálculo por ângulo atual).
- [ ] Reveal: `gsap.from('.icon-integration', { scale: 0, opacity: 0, duration: 0.8, ease: 'power3.out', stagger: 0.08 })`, trigger `#integration top 70%`.
- [ ] Comparar com Quantara e ajustar. `npm run typecheck` + visual. Commit: `feat(integration): arc fan-out com transforms exatos`

### Task 10: Final CTA + Footer

- [ ] Verificar MainButton: glow magnético (Anim 10, -50%→+50%, 0.5s power2.out) e hover scale 2.2 + text invert (Anim 11); SecondaryButton: font-weight 300↔600 (C3 — sem scramble). Corrigir se divergirem.
- [ ] Footer: comparar com Quantara (4 colunas, mega-logo, copyright) e aplicar reveals `data-reveal`.
- [ ] `npm run typecheck` + visual. Commit: `fix(cta+footer): botões e footer fiéis ao spec`

### Task 11: Polish global

- [ ] Anim 18: reveals `data-reveal` nas seções restantes; conferir sequência de page-load.
- [ ] `prefers-reduced-motion`: percorrer os hooks novos garantindo early-return.
- [ ] Passada mobile (390px) em todas as seções no Chrome device mode.
- [ ] `npm run typecheck` final; passada visual completa nas 10 seções.
- [ ] Commit: `polish: reveals globais, reduced-motion e mobile`
