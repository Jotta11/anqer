# Anqer Technology — Site Institucional

## Sobre o projeto

Site institucional one-page da Anqer Technology, uma software house brasileira sob demanda baseada em Palmas/TO. Desenvolvimento de sites, aplicativos web/mobile, sistemas customizados, integrações e MVPs.

**Posicionamento**: tecnologia premium entregue com rigor, design e seriedade. Profissionalismo + minimalismo + modernidade simultâneos.

## Referência visual e de motion

Site referência: https://sign-quantara.webflow.io/

Replicamos a estética, estrutura de seções e — principalmente — o motion design com fidelidade numérica. Não copiamos conteúdo. Toda copy é nova, em PT-BR, para a Anqer.

As especificações técnicas de cada animação (durations, easings, keyframes, targets) estão em `/docs/ANIMATION_SPECS.md`. Use esse arquivo como fonte da verdade. Não substitua valores por aproximações.

## Stack

- **Next.js 14+** (App Router) + **TypeScript**
- **Tailwind CSS** com CSS variables
- **GSAP 3.15** + ScrollTrigger + SplitText + ScrambleTextPlugin (motion principal)
- **Lenis** smooth scroll (lerp 0.1)
- **shadcn/ui** (apenas botão e form)
- **lucide-react** (ícones funcionais)
- **next/font** com Inter Tight

Framer Motion **não é usado** — todo motion é GSAP, espelhando o Quantara.

## Estrutura de pastas

```
/app
  layout.tsx          # fonte Inter Tight, metadata, Lenis provider
  page.tsx            # composição das seções
  globals.css         # CSS variables, tipografia fluid, base
/components
  /sections           # Navbar, Hero, Ecosystem, CorePlatform, Features, Workflow, Pricing, Integration, FinalCTA, Footer
  /ui                 # MainButton, SecondaryButton, ScrambleText, Card
  /motion             # LenisProvider, hooks (useMagneticButton, useOrbits, useMarquee, useScrollGrayscale, useScrambleLoop)
/content
  site.ts             # TODOS os textos em PT-BR
/lib
  gsap.ts             # registerPlugin, helpers
  lenis.ts            # config
  utils.ts            # cn helper
/public/assets
  isometric-blocks/   # PNGs/SVGs dos cubos isométricos pretos
  icons-3d/           # ícones azuis flutuantes (3D)
  logos/              # placeholders de logos ecosistema e integração
  orbits/             # imagens circulares do hero
/docs
  ANIMATION_SPECS.md  # FONTE DA VERDADE para motion
```

## Tokens de design

### Cores (CSS variables)

```css
--color-black: #000000;
--color-almost-black: #0e0e0e;     /* bg principal */
--color-almost-black-2: #161616;   /* bg seções alternadas */
--color-black-gray: #181818;       /* cards */
--color-dark-gray: #5d5d5d;
--color-gray: #9f9f9f;             /* texto secundário */
--color-light-gray: #d1d1d1;
--color-whitesmoke: #F5F5F5;
--color-white: #FFFFFF;            /* texto principal */
--color-blue: #229eff;             /* acento, CTAs, glow */
--color-dark-blue: #002b4d;        /* sombras coloridas */
--color-red: #FF0000;
--color-red-secondary: rgba(255, 3, 3, 0.25);
```

### Tipografia

- Família única: **Inter Tight** (Google Fonts), peso 400 Medium
- Escala fluid em VW:
  - H1: `font-size: 8vw; line-height: 8vw;`
  - H2: `6vw / 6vw`
  - H3: `4vw / 4.5vw`
  - H4: `2.5vw / 3vw`
  - H5: `2vw / 2.5vw`
  - H6: `1.7vw / 1.7vw`
- Tracking: `-0.02em` em headings
- Body: `1rem / 1.6`
- Eyebrow: `0.75rem, uppercase, letter-spacing 0.15em, peso 500`
- Mobile (<768px): aplicar `clamp()` para mínimos legíveis

### Variáveis de layout

```css
--padding-top-wrap-block-product: 3.8vw;
--padding-overflow-block-product: -6vw;
--padding-icon-product: 0.8vw;
--overflow-orbit: -35vw;
--main-button-y: 1.5vw;
--main-button-x: 2vw;
--button-even-padding: 2vw;
--content-top-bottom-padding: 0.75vw;
--content-left-right-padding: 1.6vw;
--top-bottom-padding-button: 0.5vw;
--left-right-padding-contact-us: 1.2vw;
```

## Estrutura do site (ordem das seções)

1. **Navbar** — fixa, glassmorphism após scroll, hide on scroll down em mobile
2. **Hero** — H1 enorme + 4 orbits girando + bg parallax mouse + 3 labels com scramble
3. **Ecossistema** — eyebrow "ECOSSISTEMA", marquee de logos + parallax scroll + hover scale
4. **Core Platform** — 4 cards numerados 01-04 com blocos isométricos + ícones azuis (filter grayscale por scroll)
5. **Features (Lab)** — marquee de tags, 3 pilares com ícones geométricos, círculos girando com counter 0→100
6. **Workflow (Processo)** — 4 etapas conectadas por linha tracejada animada, blocos isométricos
7. **Pricing** — 3 cards (default grayscale, color reveal no hover com hue-rotate)
8. **Integração** — 7 ícones geométricos em arc fan-out
9. **CTA final** — H1 "Pronto para ver a Anqer em ação?" + botão magnético
10. **Footer** — 4 colunas, logo grande, copyright

## Conteúdo (em /content/site.ts)

```typescript
export const site = {
  meta: {
    title: "Anqer Technology — Software sob demanda",
    description: "Software house brasileira especializada em desenvolvimento web, mobile e sistemas customizados. Construído com rigor.",
  },
  navbar: {
    links: [
      { label: "Produto", href: "#product" },
      { label: "Lab", href: "#lab" },
      { label: "Processo", href: "#workflow" },
      { label: "Integrações", href: "#integration" },
    ],
    cta: { label: "Fale Conosco", href: "#contact" },
  },
  hero: {
    location: { label: "LOCALIZAÇÃO", value: "Palmas, TO" },
    contact: { label: "CONTATO", value: "contato@anqer.tech" },
    phone: "(+55) 63 ...",
    headline_line1: "Tecnologia que entrega.",
    headline_line2: "Construída com rigor.",
    subline: "Software sob medida para empresas que não se contentam com o genérico.",
    principles: [
      { icon: "circle", label: "VISÃO" },
      { icon: "square", label: "PRECISÃO" },
      { icon: "triangle", label: "RIGOR" },
    ],
  },
  ecosystem: {
    eyebrow: "ECOSSISTEMA",
    title: "Onde tecnologia encontra parceria.",
  },
  corePlatform: {
    eyebrow: "SOBRE",
    title_line1: "A plataforma central.",
    title_line2: "Ferramentas que entregam.",
    items: [
      { number: "01", label: "Web",    title: "Desenvolvimento Web Avançado",    description: "Sites institucionais, landing pages e SaaS construídos com Next.js, TypeScript e infraestrutura moderna." },
      { number: "02", label: "Mobile", title: "Aplicativos Mobile",              description: "Apps nativos e cross-platform para iOS e Android, com foco em performance e experiência." },
      { number: "03", label: "Auto",   title: "Sistemas e Automação",            description: "ERPs, dashboards, integrações e automações sob demanda para fluxos específicos do seu negócio." },
      { number: "04", label: "Cloud",  title: "Infraestrutura Escalável",        description: "Cloud, DevOps, monitoramento e segurança. Tudo o que sustenta operações sérias." },
    ],
  },
  features: {
    eyebrow: "OS RECURSOS",
    tags: ["SISTEMA", "TEMPO REAL", "CONECTADO", "INTELIGENTE", "ENTERPRISE", "PERFORMANCE", "PREDITIVO", "INTEGRADO", "EFICIÊNCIA", "CONFIÁVEL"],
    pillars: [
      { icon: "circle",   label: "CONFIÁVEL" },
      { icon: "square",   label: "ESCALÁVEL" },
      { icon: "triangle", label: "AUTOMATIZADO" },
    ],
  },
  workflow: {
    eyebrow: "PROCESSO",
    title: "Como construímos.",
    steps: [
      { number: "01", title: "Descoberta",      description: "Entendemos o problema, mapeamos escopo e definimos objetivos." },
      { number: "02", title: "Arquitetura",     description: "Desenhamos a solução técnica, escolhemos stack e prototipamos." },
      { number: "03", title: "Desenvolvimento", description: "Sprints com entregas incrementais e código limpo." },
      { number: "04", title: "Entrega",         description: "Deploy, monitoramento, ajustes e evolução contínua." },
    ],
  },
  pricing: {
    eyebrow: "ACESSE INTELIGÊNCIA · NOS SEUS TERMOS",
    title: "Modelos de parceria flexíveis.",
    plans: [
      {
        name: "Sob Demanda",
        price: "Projeto fechado",
        description: "Para escopos definidos e entregas pontuais",
        features: ["Escopo fechado", "Entrega única", "Suporte pós-lançamento 30 dias", "Documentação completa"],
        highlighted: false,
      },
      {
        name: "Crescimento",
        price: "A partir de R$ X / mês",
        description: "Para empresas em evolução contínua",
        features: ["Sprints quinzenais", "Evolução de produto", "Analytics & insights", "Suporte prioritário"],
        highlighted: true,
      },
      {
        name: "Parceria Estratégica",
        price: "Sob consulta",
        description: "Para operações que exigem dedicação contínua",
        features: ["Time dedicado", "SLA personalizado", "Roadmap conjunto", "Suporte 24/7"],
        highlighted: false,
      },
    ],
  },
  integration: {
    eyebrow: "INTEGRAÇÃO",
    status: "● MÓDULOS ATIVOS",
    title: "Sistemas conectados. Inteligência unificada.",
  },
  finalCta: {
    eyebrow: "DEMO PERSONALIZADA",
    title: "Pronto para ver a Anqer em ação?",
    cta: { label: "Fale Conosco", href: "#contact" },
  },
  footer: {
    columns: {
      explore: { title: "Explorar", links: ["Produto", "Soluções", "Cases", "Blog"] },
      utilities: { title: "Utilitários", links: ["Style Guide", "Licença", "Changelog", "Instruções"] },
      sayHello: { title: "Diga Olá", value: "contato@anqer.tech" },
      contact: { title: "Contato", value: "(+55) 63 ..." },
    },
    copyright: "Anqer Technology © 2026 · Palmas, TO · Brasil",
  },
};
```

## Princípios de implementação

1. **Mobile-first**: tudo responsivo, de 320px a 4K.
2. **Acessibilidade AA**: contraste, foco visível, ARIA labels, `prefers-reduced-motion` degradando para fades simples.
3. **SEO**: metadata completo, Open Graph, JSON-LD Organization, sitemap.xml.
4. **Performance**: Lighthouse 95+ em todas as métricas.
5. **Modularidade**: cada seção em arquivo próprio, hooks de motion reutilizáveis.
6. **Fidelidade**: ANIMATION_SPECS.md é fonte da verdade — não substituir valores.

## Fluxo de trabalho

**Etapa 1 — Setup**: estrutura, design tokens, conteúdo, esqueleto estático.
**Etapa 2 — Motion**: implementar as 19 animações UMA A UMA, em ordem, validando cada uma.
**Etapa 3 — Polish**: performance, a11y, mobile fine-tuning, edge cases.

A cada milestone, commit. Não acumular mudanças grandes sem commit.

## Commit messages

Usar conventional commits: `feat:`, `fix:`, `style:`, `refactor:`, `docs:`, `perf:`.

## Token efficiency

Este projeto é grande. Use `/clear` quando trocar de etapa, e `/compact` ao final de cada etapa. Mantenha o CLAUDE.md e o ANIMATION_SPECS.md como referência sempre carregada via @ menção.