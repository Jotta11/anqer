# ANIMATION SPECS — Anqer Technology

**Fonte**: extração técnica do template Webflow Quantara (sign-quantara.webflow.io) via DevTools.

**Fonte da verdade**: este documento. Não substituir valores numéricos por aproximações. Cada `duration` em ms, cada `easing`, cada `keyframe` foi extraído do código de produção.

**Stack de motion**: GSAP 3.15 + ScrollTrigger + SplitText + ScrambleTextPlugin. Lenis para smooth scroll global.

---

## Configuração base

### Lenis (smooth scroll global)

```typescript
// /lib/lenis.ts
import Lenis from '@studio-freight/lenis';

export const lenisConfig = {
  duration: 1.2,
  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  lerp: 0.1,
};
```

### GSAP setup

```typescript
// /lib/gsap.ts
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, SplitText, ScrambleTextPlugin);
}

export { gsap, ScrollTrigger, SplitText, ScrambleTextPlugin };
```

### Respeitar prefers-reduced-motion

Wrapper global:
```typescript
const prefersReducedMotion = typeof window !== 'undefined'
  && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
  // Desativar todos os GSAP loops, marquees, parallax e orbits
  // Manter apenas fades simples de 0.3s
}
```

---

## ANIMAÇÃO 1 — Hero background parallax com mouse

**Target**: `.bg-animation-hero` (background grid do hero)
**Trigger**: MOUSE_MOVE dentro do hero
**Comportamento**: children do background se movem ±1.4vw em X e Y conforme posição do mouse, smoothing 500ms.

**CSS no elemento**:
```css
.bg-animation-hero {
  transform-style: preserve-3d;
  will-change: transform;
}
```

**Implementação**:
```typescript
// /components/motion/useHeroParallax.ts
useEffect(() => {
  const hero = heroRef.current;
  if (!hero || prefersReducedMotion) return;

  const handleMove = (e: MouseEvent) => {
    const rect = hero.getBoundingClientRect();
    const xRatio = (e.clientX - rect.left) / rect.width;    // 0 → 1
    const yRatio = (e.clientY - rect.top) / rect.height;    // 0 → 1
    const xVw = -1.4 + xRatio * 2.8;                        // -1.4 → +1.4
    const yVw = -1.4 + yRatio * 2.8;

    gsap.to('.bg-animation-hero', {
      x: `${xVw}vw`,
      y: `${yVw}vw`,
      duration: 0.5,
      ease: 'power2.out',
      overwrite: 'auto',
    });
  };

  hero.addEventListener('mousemove', handleMove);
  return () => hero.removeEventListener('mousemove', handleMove);
}, []);
```

---

## ANIMAÇÃO 2 — Orbits do hero (4 imagens circulares girando)

**Targets**: `.image-orbit.v1` `.v2` `.v3` `.v4`
**Trigger**: PAGE_START, loop infinito.

**Implementação**:
```typescript
gsap.to('.image-orbit.v1', { rotation: 360, duration: 5,  repeat: -1, ease: 'none' });
gsap.to('.image-orbit.v2', { rotation: 360, duration: 10, repeat: -1, ease: 'none' });
gsap.to('.image-orbit.v3', { rotation: 360, duration: 20, repeat: -1, ease: 'none' });
gsap.to('.image-orbit.v4', { rotation: 360, duration: 30, repeat: -1, ease: 'none' });
```

**CSS**:
```css
.image-orbit { transform-style: preserve-3d; will-change: transform; }
.image-orbit.v1 { filter: brightness(200%); }
.image-orbit.v3 { filter: brightness(300%); }
```

---

## ANIMAÇÃO 3 — Marquee de logos parceiros (Ecosystem)

**Target**: `.block-partners` (container interno duplicado para loop contínuo)
**Trigger**: PAGE_START, loop infinito.

**Estrutura HTML**: duplicar a lista de logos dentro de `.block-partners` para o loop ser visualmente contínuo (sem "salto").

**Implementação**:
```typescript
gsap.to('.block-partners', {
  x: '-50%',
  duration: 20,
  ease: 'none',
  repeat: -1,
});
```

---

## ANIMAÇÃO 4 — Parallax horizontal dos logos no scroll

**Target**: `.block-partner-move`
**Trigger**: SCROLLING_IN_VIEW na seção `#ecosystem`
**Keyframes**: scroll 10% → x: 0vw | scroll 90% → x: -15vw

**Implementação**:
```typescript
gsap.to('.block-partner-move', {
  x: '-15vw',
  ease: 'none',
  scrollTrigger: {
    trigger: '#ecosystem',
    start: 'top 90%',
    end: 'bottom 10%',
    scrub: 0.5,
  },
});
```

---

## ANIMAÇÃO 5 — Hover nos logos parceiros

**Target**: `.block-partner` (com siblings em `.block-partners`)
**Trigger**: MOUSE_OVER / MOUSE_OUT

**MOUSE_OVER (sequência)**:
1. `filter: brightness(100%) → 200%`, duration 500ms, easing `linear`
2. Scale do hover target: `1 → 1.5`, duration 800ms, easing `cubic-bezier(0.22, 1, 0.36, 1)` (`power4.out`)
3. Siblings ganham `filter: blur(2px)`, duration 500ms, easing `cubic-bezier(0.4, 0, 0.2, 1)`

**MOUSE_OUT (reverte com mesmos timings)**.

**Implementação**:
```typescript
partners.forEach((partner) => {
  partner.addEventListener('mouseenter', () => {
    gsap.to(partner, { filter: 'brightness(200%)', duration: 0.5, ease: 'linear' });
    gsap.to(partner, { scale: 1.5, duration: 0.8, ease: 'power4.out' });
    gsap.to(siblings(partner), { filter: 'blur(2px)', duration: 0.5, ease: 'cubic-bezier(0.4, 0, 0.2, 1)' });
  });
  partner.addEventListener('mouseleave', () => {
    gsap.to(partner, { filter: 'brightness(100%)', duration: 0.5, ease: 'linear' });
    gsap.to(partner, { scale: 1,   duration: 0.8, ease: 'power4.out' });
    gsap.to(siblings(partner), { filter: 'blur(0px)', duration: 0.5, ease: 'cubic-bezier(0.4, 0, 0.2, 1)' });
  });
});
```

---

## ANIMAÇÃO 6 — Linha tracejada animada (border fill loop)

**Target**: `.border.fill`
**Trigger**: PAGE_START, loop infinito.

```typescript
gsap.timeline({ repeat: -1 })
  .set('.border.fill', { x: '-100%' })
  .to('.border.fill', { x: '100%', duration: 10, ease: 'none' })
  .set('.border.fill', { x: '-100%' });
```

---

## ANIMAÇÃO 7 — Scroll grayscale dos ícones product (Core Platform) ⭐

**CRÍTICO — animação assinatura da seção.**

**Estado inicial CSS**:
```css
.icon-product {
  filter: grayscale(100%);
  will-change: filter;
}
```

**Keyframes (% do scroll progress da seção #product)**:

| Scroll % | Target              | Filter              |
|----------|---------------------|---------------------|
| 25       | `.icon-product.v1`  | grayscale(100%)     |
| 30       | `.icon-product.v1`  | grayscale(0%)       |
| 45       | `.icon-product.v3`  | grayscale(100%)     |
| 45       | `.icon-product.v1`  | grayscale(100%)     |
| 50       | `.icon-product.v3`  | grayscale(0%)       |
| 63       | `.icon-product.v2`  | grayscale(100%)     |
| 65       | `.icon-product.v3`  | grayscale(100%)     |
| 68       | `.icon-product.v2`  | grayscale(0%)       |
| 85       | `.icon-product.v4`  | grayscale(100%)     |
| 86       | `.icon-product.v2`  | grayscale(100%)     |
| 90       | `.icon-product.v4`  | grayscale(0%)       |

**Implementação**:
```typescript
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: '#product',
    start: 'top bottom',
    end: 'bottom top',
    scrub: true,
  }
});
tl.to('.icon-product.v1', { filter: 'grayscale(100%)', ease: 'none' }, 0.25)
  .to('.icon-product.v1', { filter: 'grayscale(0%)',   ease: 'none' }, 0.30)
  .to('.icon-product.v3', { filter: 'grayscale(100%)', ease: 'none' }, 0.45)
  .to('.icon-product.v1', { filter: 'grayscale(100%)', ease: 'none' }, 0.45)
  .to('.icon-product.v3', { filter: 'grayscale(0%)',   ease: 'none' }, 0.50)
  .to('.icon-product.v2', { filter: 'grayscale(100%)', ease: 'none' }, 0.63)
  .to('.icon-product.v3', { filter: 'grayscale(100%)', ease: 'none' }, 0.65)
  .to('.icon-product.v2', { filter: 'grayscale(0%)',   ease: 'none' }, 0.68)
  .to('.icon-product.v4', { filter: 'grayscale(100%)', ease: 'none' }, 0.85)
  .to('.icon-product.v2', { filter: 'grayscale(100%)', ease: 'none' }, 0.86)
  .to('.icon-product.v4', { filter: 'grayscale(0%)',   ease: 'none' }, 0.90);
```

---

## ANIMAÇÃO 8 — Scroll grayscale dos ícones workflow (espelhada e mais limpa)

```typescript
const tl = gsap.timeline({
  scrollTrigger: { trigger: '#workflow', start: 'top bottom', end: 'bottom top', scrub: true }
});
tl.to('.icon-workflow.v4', { filter: 'grayscale(100%)', ease: 'none' }, 0.05)
  .to('.icon-workflow.v4', { filter: 'grayscale(0%)',   ease: 'none' }, 0.10)
  .to('.icon-workflow.v3', { filter: 'grayscale(100%)', ease: 'none' }, 0.25)
  .to('.icon-workflow.v3', { filter: 'grayscale(0%)',   ease: 'none' }, 0.30)
  .to('.icon-workflow.v2', { filter: 'grayscale(100%)', ease: 'none' }, 0.45)
  .to('.icon-workflow.v2', { filter: 'grayscale(0%)',   ease: 'none' }, 0.50)
  .to('.icon-workflow.v1', { filter: 'grayscale(100%)', ease: 'none' }, 0.65)
  .to('.icon-workflow.v1', { filter: 'grayscale(0%)',   ease: 'none' }, 0.70);
```

---

## ANIMAÇÃO 9 — Pulso de brilho dos ícones ao entrar no viewport

**Trigger**: SCROLL_INTO_VIEW em cada `.icon-product.vX` e `.icon-workflow.vX`

**Sequência (3 fases)**:
1. Fase 0 (0ms): brightness 100%, contrast 100%
2. Fase 1 (700ms, ease `power2.out`): brightness 200%, contrast 120%
3. Fase 2 (700ms, ease `power2.in`): brightness 100%, contrast 100%

**SCROLL_OUT (200ms)**: brightness 100%, contrast 100%.

**Importante**: combinar com a Animação 7/8. O filter total fica tipo `brightness(X%) contrast(Y%) grayscale(Z%)`.

**Implementação**:
```typescript
['.icon-product.v1', '.icon-product.v2', '.icon-product.v3', '.icon-product.v4'].forEach((sel) => {
  gsap.timeline({
    scrollTrigger: { trigger: sel, start: 'top 80%', toggleActions: 'play none none reverse' }
  })
  .to(sel, { filter: 'brightness(200%) contrast(120%) grayscale(100%)', duration: 0.7, ease: 'power2.out' })
  .to(sel, { filter: 'brightness(100%) contrast(100%) grayscale(100%)', duration: 0.7, ease: 'power2.in' });
});
// Repetir para .icon-workflow.vX
```

---

## ANIMAÇÃO 10 — Botão primário: glow magnético (mouse follow)

**Targets**: `.wrapper-button-primary-bg` (camada de glow dentro do botão)
**Trigger**: MOUSE_MOVE dentro do `.main-button.primary`
**Comportamento**: o glow segue o cursor de -50% a +50% em X e Y, smoothing 500ms.

```typescript
button.addEventListener('mousemove', (e) => {
  const rect = button.getBoundingClientRect();
  const xRatio = (e.clientX - rect.left) / rect.width;
  const yRatio = (e.clientY - rect.top) / rect.height;
  const x = -50 + xRatio * 100;     // -50 → +50
  const y = -50 + yRatio * 100;
  gsap.to(button.querySelector('.wrapper-button-primary-bg'), {
    x: `${x}%`, y: `${y}%`,
    duration: 0.5, ease: 'power2.out', overwrite: 'auto',
  });
});
```

---

## ANIMAÇÃO 11 — Botão primário: hover scale + text color invert

**Estado base**: `.bg-button-primary { transform: scale(0); }` + `.text-menu { color: #000; }`

**MOUSE_OVER**:
- Fase 0 (500ms): scale 0 (estado base)
- Fase 1 (500ms, ease `power2.out`): scale 2.2, texto branco

**MOUSE_OUT**:
- 500ms ease `power2.out`: scale 0, texto preto

```typescript
button.addEventListener('mouseenter', () => {
  gsap.to(button.querySelector('.bg-button-primary'), { scale: 2.2, duration: 0.5, ease: 'power2.out' });
  gsap.to(button.querySelector('.text-menu'), { color: '#ffffff', duration: 0.5, ease: 'power2.out' });
});
button.addEventListener('mouseleave', () => {
  gsap.to(button.querySelector('.bg-button-primary'), { scale: 0, duration: 0.5, ease: 'power2.out' });
  gsap.to(button.querySelector('.text-menu'), { color: '#000000', duration: 0.5, ease: 'power2.out' });
});
```

---

## ANIMAÇÃO 12 — Botão secundário: brightness flash + text scramble

**Targets**: `.button-secondary` com `.scramble.secondary` dentro

**MOUSE_OVER (sequência)**:
1. Texto → preto + dispara ScrambleText (500ms, chars `+?84564XERS`, speed 0.6)
2. Self brightness 100% → 300%, duration 700ms, ease `power2.out`
3. Brightness 300% → 100%, duration 700ms, ease `power2.in`

**MOUSE_OUT**: 700ms brightness para 100%, 500ms texto volta a branco.

```typescript
button.addEventListener('mouseenter', () => {
  const scrambleEl = button.querySelector('.scramble.secondary');
  gsap.timeline()
    .to(scrambleEl, {
      duration: 0.5, color: '#000000',
      scrambleText: { text: '{original}', chars: '+?84564XERS', speed: 0.6 },
    })
    .to(button, { filter: 'brightness(300%)', duration: 0.7, ease: 'power2.out' })
    .to(button, { filter: 'brightness(100%)', duration: 0.7, ease: 'power2.in' });
});
button.addEventListener('mouseleave', () => {
  gsap.to(button, { filter: 'brightness(100%)', duration: 0.7 });
  gsap.to(button.querySelector('.scramble.secondary'), { color: '#ffffff', duration: 0.5 });
});
```

---

## ANIMAÇÃO 13 — Hover nos cards de pricing (color reveal) ⭐

**Estado base**: `.body-card-pricing { filter: grayscale(100%); }`

**MOUSE_OVER (sequência)**:
1. Fase 0 (500ms): filter `hue-rotate(0deg) → hue-rotate(276deg)`
2. Fase 1 (500ms): filter `grayscale(100%) → 0%` + `saturate(100%) → 220%`
3. Fase 2 (snap 0ms): `hue-rotate(0deg)` (volta o hue mas mantém color/saturate)

**MOUSE_OUT (500ms)**: `grayscale(0% → 100%)` + `saturate(220% → 100%)`.

```typescript
card.addEventListener('mouseenter', () => {
  gsap.timeline()
    .to(card, { filter: 'hue-rotate(276deg) grayscale(100%) saturate(100%)', duration: 0.5 })
    .to(card, { filter: 'hue-rotate(276deg) grayscale(0%) saturate(220%)',   duration: 0.5 })
    .set(card,{ filter: 'hue-rotate(0deg) grayscale(0%) saturate(220%)' });
});
card.addEventListener('mouseleave', () => {
  gsap.to(card, { filter: 'hue-rotate(0deg) grayscale(100%) saturate(100%)', duration: 0.5 });
});
```

---

## ANIMAÇÃO 14 — Nav link hover (slide right + back)

**Trigger**: MOUSE_OVER em cada nav link

**Sequência**:
1. Fase 0 (0ms): x = 0
2. Fase 1 (500ms, ease `power3.in`): x = 10px
3. Fase 2 (500ms, ease `power3.in`): x = 0

**MOUSE_OUT**: 500ms ease `power3.out` para x = 0.

```typescript
navLinks.forEach((link) => {
  link.addEventListener('mouseenter', () => {
    gsap.timeline()
      .to(link, { x: 10, duration: 0.5, ease: 'power3.in' })
      .to(link, { x: 0,  duration: 0.5, ease: 'power3.in' });
  });
});
```

---

## ANIMAÇÃO 15 — Mobile nav: hide on scroll down, show on scroll up

```typescript
ScrollTrigger.create({
  start: 'top top',
  end: 'max',
  onUpdate: (self) => {
    if (self.direction === 1) {
      gsap.to('.navbar-mobile', { opacity: 0, duration: 0.3, ease: 'power2.out' });
    } else {
      gsap.to('.navbar-mobile', { opacity: 1, duration: 0.3, ease: 'power2.in' });
    }
  }
});
```

---

## ANIMAÇÃO 16 — ScrambleText loop nos labels do hero (VISÃO / PRECISÃO / RIGOR)

```typescript
const tl = gsap.timeline({ repeat: -1 });

tl.to('.scramble.v1', {
    duration: 1.2,
    scrambleText: { text: '{original}', chars: '+?84564XERS', speed: 0.6 }
  })
  .to('.scramble.v2', {
    duration: 1.6,
    scrambleText: { text: '{original}', chars: '+?84564XERS', speed: 0.7 }
  }, '-=0.6')
  .to('.scramble.v3', {
    duration: 2.1,
    scrambleText: { text: '{original}', chars: '+?84564XERS', speed: 0.8 }
  }, '-=0.8');
```

`{original}` = manter o texto original do elemento.

Labels do site Anqer: **VISÃO**, **PRECISÃO**, **RIGOR**.

---

## ANIMAÇÃO 17 — Features section: círculo girando + número subindo

**Targets internos** em cada `.content-feature`:
- `.mask` (máscara circular)
- `.thin-border` (borda fina)
- `.empty` (círculo vazio de fundo)
- `.number` (counter numérico)

**Estado inicial via `gsap.set`**:
- mask: `rotate: 0, scale: 0.95, filter: blur(6px), opacity: 0.8, transformOrigin: 50% 50%`
- thinBorder: `borderColor: rgba(156,163,175,0.35)` (gray-400 com 35% alpha)
- empty: `scale: 1, filter: blur(10px), opacity: 0.35`
- number: `innerText: 0`

**Timeline com ScrollTrigger (scrub 0.6)**:
- mask → `rotate: 360, scale: 1.05, filter: blur(0), opacity: 1`
- thinBorder → `borderColor: rgba(59,130,246,1)` (azul #229eff aproximado)
- empty → `scale: 1.2, filter: blur(0), opacity: 1`
- number → `innerText: 100` com `snap: { innerText: 1 }`

```typescript
document.querySelectorAll('.content-feature').forEach((section) => {
  const mask       = section.querySelector('.mask');
  const thinBorder = section.querySelector('.thin-border');
  const empty      = section.querySelector('.empty');
  const number     = section.querySelector('.number');

  gsap.set(mask,       { rotate: 0, scale: 0.95, filter: 'blur(6px)', opacity: 0.8, transformOrigin: '50% 50%' });
  gsap.set(thinBorder, { borderColor: 'rgba(156,163,175,0.35)' });
  gsap.set(empty,      { scale: 1,  filter: 'blur(10px)', opacity: 0.35 });
  gsap.set(number,     { innerText: 0 });

  gsap.timeline({
    scrollTrigger: { trigger: section, start: 'top 75%', end: 'bottom 75%', scrub: 0.6 }
  })
  .to(mask,       { rotate: 360, ease: 'none' }, 0)
  .to(mask,       { scale: 1.05, filter: 'blur(0px)', opacity: 1, ease: 'none' }, 0)
  .to(thinBorder, { borderColor: 'rgba(34,158,255,1)', ease: 'none' }, 0)   // #229eff
  .to(empty,      { scale: 1.2, filter: 'blur(0px)', opacity: 1, ease: 'none' }, 0)
  .to(number,     { innerText: 100, snap: { innerText: 1 }, ease: 'none' }, 0);
});
```

---

## ANIMAÇÃO 18 — Reveal inicial (page load + scroll into view)

**Elementos que começam `visibility: hidden`** (definidos no CSS, revelados via GSAP):

```css
html.js-loading :is(
  .wrapper-navbar.logo,
  .wrapper-navbar.menu,
  .bg-animation-hero,
  .wrapper-subcontent-hero.v1,
  .wrapper-subcontent-hero.v2,
  .wrapper-subcontent-hero.v3,
  .medium-big-text.v1,
  .medium-big-text.v2,
  .wrapper-block-product,
  .block-image-product.v1, .block-image-product.v2, .block-image-product.v3, .block-image-product.v4,
  .icon-integration.v1, .icon-integration.v2, .icon-integration.v4, .icon-integration.v5, .icon-integration.v6,
  .wrapper-title-integration,
  .line-horizontal,
  .text-looping-animation
) {
  visibility: hidden;
}
```

**Hero reveal sequencial** (PAGE_START):
```typescript
gsap.timeline({ delay: 0.2 })
  .to('.wrapper-navbar.logo', { visibility: 'visible', autoAlpha: 1, y: 0, duration: 0.6, ease: 'power3.out' })
  .to('.wrapper-navbar.menu', { visibility: 'visible', autoAlpha: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4')
  .to('.bg-animation-hero',   { visibility: 'visible', autoAlpha: 1, duration: 0.8, ease: 'power3.out' }, '-=0.3')
  .to('.medium-big-text.v1',  { visibility: 'visible', autoAlpha: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.5')
  .to('.medium-big-text.v2',  { visibility: 'visible', autoAlpha: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6')
  .to('.wrapper-subcontent-hero.v1', { visibility: 'visible', autoAlpha: 1, duration: 0.6 }, '-=0.4')
  .to('.wrapper-subcontent-hero.v2', { visibility: 'visible', autoAlpha: 1, duration: 0.6 }, '-=0.5')
  .to('.wrapper-subcontent-hero.v3', { visibility: 'visible', autoAlpha: 1, duration: 0.6 }, '-=0.5');
```

**Demais seções** (data-attribute pattern):
```typescript
gsap.utils.toArray('[data-reveal]').forEach((el: any) => {
  gsap.from(el, {
    visibility: 'hidden', autoAlpha: 0, y: 40,
    duration: 0.8, ease: 'power3.out',
    scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none reverse' }
  });
});
```

---

## ANIMAÇÃO 19 — Ícones de integração (arc fan-out)

**Posições inline iniciais (replicar exato)**:
```css
.icon-integration.v1 { transform: translate3d(-42vw, 10vw, 0) rotate(-20deg); }
.icon-integration.v2 { transform: translate3d(-28vw, 5vw, 0)  rotate(-16deg); }
.icon-integration.v3 { transform: translate3d(-14vw, 1.5vw, 0) rotate(-8deg); }
.icon-integration.v4 { transform: translate3d(0, 0, 0); z-index: 2; }
.icon-integration.v5 { transform: translate3d(42vw, 10vw, 0)  rotate(20deg); }
.icon-integration.v6 { transform: translate3d(28vw, 5vw, 0)   rotate(16deg); }
.icon-integration.v7 { transform: translate3d(14vw, 1.5vw, 0) rotate(8deg); }
.icon-integration.v1, .v2, .v3, .v5, .v6, .v7 { z-index: 1; }
.image-icon-integration { width: 6vw; height: 6vw; }
```

**Reveal via ScrollTrigger** (entrada com stagger):
```typescript
gsap.from('.icon-integration', {
  scale: 0,
  opacity: 0,
  duration: 0.8,
  ease: 'power3.out',
  stagger: 0.08,
  scrollTrigger: { trigger: '#integration', start: 'top 70%', toggleActions: 'play none none reverse' }
});
```

---

## Checklist final de fidelidade

Antes de considerar uma animação "pronta", validar todos os campos:

- [ ] **Duration** está em ms idêntico ao spec
- [ ] **Easing** é o correspondente GSAP correto (power2.out, power3.in, power4.out, linear, cubic-bezier exato)
- [ ] **Target** é o seletor exato (incluindo modifiers `.v1`-`.v4`)
- [ ] **Trigger** está no elemento certo (página inteira, seção, elemento individual)
- [ ] **Direction** (X, Y, rotation) está correto
- [ ] **Loop / repeat** se aplica
- [ ] **Overwrite** está configurado em hovers que dependem de mouse move
- [ ] **prefers-reduced-motion** é respeitado (degrada para fade simples)
- [ ] **Cleanup** no useEffect remove listeners

---

## Easings — Mapeamento Webflow IX2 → GSAP

| Webflow IX2          | GSAP                              |
|----------------------|-----------------------------------|
| inCubic              | `power3.in`                       |
| outCubic             | `power3.out`                      |
| easeOut              | `power2.out`                      |
| easeIn               | `power2.in`                       |
| linear / none        | `none` (ou `linear`)              |
| [0.22, 1, 0.36, 1]   | `power4.out` (aproximado) ou `"cubic-bezier(0.22, 1, 0.36, 1)"` |
| [0.4, 0, 0.2, 1]     | `"cubic-bezier(0.4, 0, 0.2, 1)"` |