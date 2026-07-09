# Anqer Technology — Site Institucional

Site institucional one-page da **Anqer Technology**, software house brasileira sob demanda baseada em Palmas/TO. Desenvolvimento de sites, aplicativos web/mobile, sistemas customizados, integrações e MVPs.

**Posicionamento**: tecnologia premium entregue com rigor, design e seriedade.

## Referência visual e de motion

O site replica a estética, a estrutura de seções e o motion design do template [Quantara](https://sign-quantara.webflow.io/) com fidelidade numérica, aplicados sobre a **identidade visual oficial da Anqer** (board em `ID Anqer.png`):

- **Acento**: laranja `#F97316`
- **Fundos**: escuros com matiz navy (`#0a0e16` / `#10141d` / `#131722`)
- **Tipografia**: Space Grotesk (única família, via `next/font`)
- **Logo**: símbolo "A" + wordmark ANQER TECHNOLOGY, recriados em SVG (`components/ui/Logo.tsx`)

Toda a copy é original, em PT-BR — nenhum conteúdo foi copiado da referência. As especificações técnicas de cada animação (durations, easings, keyframes, targets) estão em [`docs/ANIMATION_SPECS.md`](docs/ANIMATION_SPECS.md), a fonte da verdade para motion (a seção "Correções verificadas" vence conflitos).

## Stack

- **Next.js 14+** (App Router) + **TypeScript**
- **Tailwind CSS** com CSS variables (tokens em `app/globals.css`)
- **GSAP 3.15** + ScrollTrigger + SplitText + ScrambleTextPlugin
- **Lenis** smooth scroll (lerp 0.1)
- **lucide-react** (ícones funcionais)

Framer Motion **não é usado** — todo o motion é GSAP, espelhando o Quantara.

## Rodando o projeto

```bash
npm install
npm run dev        # http://localhost:3000
npm run typecheck  # validação rápida (tsc --noEmit)
npm run build      # NUNCA com o dev server rodando (sobrescreve o .next)
```

## Estrutura das seções

| # | Seção | Arquivo | Motion |
|---|-------|---------|--------|
| 1 | Navbar | `sections/Navbar.tsx` | Pills glass, hide on scroll, link slide (Anims 14/15) |
| 2 | Hero | `sections/Hero.tsx` | Grid curvo + parallax de mouse, scramble nos labels, reveal inicial (Anims 1/16/18) |
| 3 | Ecossistema | `sections/Ecosystem.tsx` | Marquee infinito, parallax de scroll, hover com blur nos vizinhos, linha tracejada (Anims 3–6) |
| 4 | Core Platform | `sections/CorePlatform.tsx` | Pinada 1200vh — ciclo de 4 estados, ícones 3D coloridos por scroll (Anims 7/9) |
| 5 | Features | `sections/Features.tsx` | In-flow — orbits girando (Anim 2), marquee de tags, counter 0→100 (Anim 17/C4) |
| 6 | Lab | `sections/Lab.tsx` | Pinada 800vh — cena "De Manual ⇄ Inteligente" com toggle e 4 cards de dashboard que se atualizam via scroll |
| 7 | Workflow | `sections/Workflow.tsx` | Pinada 1200vh — 4 etapas cyclando, blocos isométricos em cascata (Anim 8) |
| 8 | Pricing | `sections/Pricing.tsx` | Cards pontilhados grayscale com color reveal no hover (Anim 13) |
| 9 | Integração | `sections/Integration.tsx` | Pinada 600vh — "baralho": tiles com o símbolo Anqer em 7 cores abrem em leque no scroll (Anim 19) |
| 10 | CTA final | `sections/FinalCTA.tsx` | Painel cortina com botão magnético (Anims 10/11) |
| 11 | Footer | `sections/Footer.tsx` | Footer claro fixo, revelado pela cortina do CTA |

Os hooks de motion vivem em `components/motion/` (um por comportamento, todos com early-return para `prefers-reduced-motion`). O conteúdo inteiro do site está em `content/site.ts`.

## Decisões de implementação

- **`--color-blue` vale `#F97316`**: o nome da variável foi mantido por compatibilidade com as classes Tailwind (`text-blue`, `bg-blue` etc.) espalhadas pelo código.
- **Ícones 3D**: os PNGs originais são azuis; as cores por estado vêm de `hue-rotate` (laranja 175°, azul 0°, roxo 65°, verde 290°), seguindo o sistema de produtos da ID Anqer.
- **Footer reveal**: o footer é `position: fixed` atrás do conteúdo (`.site-main`, z-index acima) com um `.footer-spacer` em fluxo; por isso toda `.main-section` precisa de fundo opaco.
- **Assets locais**: tudo em `public/assets/` (`backgrounds/`, `isometric-blocks/`, `icons-3d/`, `orbits/`, `logos/`) — zero hotlinks.

## Pendências

- Preço do plano Crescimento (`content/site.ts`): placeholder "A partir de R$ X / mês".
- Telefone: "(+55) 63 ..." incompleto.
- Logos reais de clientes/parceiros no Ecossistema (hoje são lockups placeholder).
- Refinamentos visuais pontuais nas seções (comparação fina vs. referência).

---

Anqer Technology © 2026 · Palmas, TO · Brasil
