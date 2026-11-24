# Dois padrões de scroll extraídos (portáveis)

Sem dependência dos elementos do Anqer. São só duas mecânicas:

1. **Linha descendo** — timeline pinada com `scrub`, linha cresce por `scaleY` com `transformOrigin: 50% 0%`.
2. **Tela subindo (cortina)** — o footer é `position: fixed` atrás; o painel escuro acima dele rola normalmente e "sobe", revelando-o. **Zero JS.**

---

## Padrão 1 — Linha vertical descendo no scroll

### A mecânica

Uma seção alta (`600vh`) contém um wrapper `sticky top:0; height:100vh`. Enquanto a página rola os 600vh, o wrapper fica travado na tela — isso é o "pin" (sem usar `ScrollTrigger.pin`, que causa layout shift). Uma timeline com `scrub` mapeia esse progresso de scroll para o progresso da timeline.

A linha em si não anima `height` (isso força layout). Anima `scaleY` de 0 → 1 com origem no topo, então ela parece "descer".

### HTML

```html
<section class="pin-track">
  <div class="pin-stage">
    <div class="scene">
      <!-- qualquer conteúdo -->
      <div class="drop-line"></div>
      <div class="scene-title">Título que entra depois</div>
    </div>
  </div>
</section>
```

### CSS

```css
.pin-track {
  position: relative;
  height: 600vh;        /* comprimento do scroll = duração da animação */
}
.pin-stage {
  position: sticky;
  top: 0;
  height: 100vh;
  overflow: hidden;
}
.scene {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.drop-line {
  position: absolute;
  top: calc(50% + 3.5vw);   /* ponto de partida: onde a linha nasce */
  left: 50%;
  transform: translateX(-50%);
  width: 1px;
  height: 16vw;             /* comprimento final */
  background: rgba(255, 255, 255, 0.55);
}
```

### JS (GSAP + ScrollTrigger)

```js
gsap.registerPlugin(ScrollTrigger);

const ctx = gsap.context(() => {
  // Estados iniciais — sempre setar antes da timeline,
  // senão o primeiro frame pisca com o estado final.
  gsap.set(".drop-line", { scaleY: 0, transformOrigin: "50% 0%" });
  gsap.set(".scene-title", { autoAlpha: 0, y: 24 });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".pin-track",
      start: "top top",        // começa quando o topo da track toca o topo da viewport
      end: "bottom bottom",    // termina quando o fundo da track toca o fundo
      scrub: 0.8,              // 0.8s de "lag" — dá peso, evita o movimento travado
      invalidateOnRefresh: true, // recalcula vw/% em resize
    },
  });

  // Posições absolutas (0 → 1) no 3º argumento: é o progresso do scroll.
  tl.to(".drop-line",   { scaleY: 1, duration: 0.2, ease: "none" }, 0.55);
  tl.to(".scene-title", { autoAlpha: 1, y: 0, duration: 0.18, ease: "power2.out" }, 0.72);
}, ".pin-track");

// cleanup: ctx.revert()
```

### Os detalhes que importam

- **`ease: "none"` na linha.** Com `scrub`, a curva de easing já é o scroll do usuário. Um `power2.out` aqui faz a linha parecer que "escapa" do dedo.
- **Posições absolutas, não `+=`.** Com `scrub`, `0.55` significa "55% do scroll da seção". É como você coreografa o que acontece onde.
- **`duration` também é fração de scroll.** `duration: 0.2` = a linha leva 20% da altura da track pra completar.
- **`scaleY`, nunca `height`.** Só compositing, roda na GPU.
- **`transformOrigin: "50% 0%"`** é o que faz descer em vez de crescer do centro.

### Fan-out em pares (bônus, se quiser o leque)

O mesmo timeline abre os cards com `.from()` — eles partem empilhados no centro e vão pro destino que **o CSS já define**:

```js
[1, 2, 3].forEach((d) => {
  tl.from(
    [`.tile.v${4 - d}`, `.tile.v${4 + d}`],   // pares simétricos, centro → fora
    { x: 0, y: 0, rotation: 0, scale: 0.92, duration: 0.16, ease: "power2.out" },
    0.04 + (d - 1) * 0.1                      // stagger manual: 0.04, 0.14, 0.24
  );
});
```

`.from()` com `x:0, y:0, rotation:0` é o truque: o layout final vive no CSS (`transform: translate3d(-38vw, 22vw, 0) rotate(-20deg)`), e o GSAP só anima *a partir do zero*. Se o CSS mudar (responsivo), a animação acompanha sem tocar no JS.

---

## Padrão 2 — Cortina: painel escuro sobe revelando o footer claro

### A mecânica

Sem JS nenhum. Truque de camadas:

- O footer é `position: fixed; bottom: 0` com `z-index: 1` — ele está sempre lá, colado no fundo da viewport, atrás de tudo.
- Todo o conteúdo do site tem `z-index: 2` e **fundo opaco** — é a cortina que esconde o footer.
- Um `.footer-spacer` da mesma altura do footer ocupa espaço no fluxo, garantindo que exista scroll suficiente pro conteúdo terminar de subir.

Conforme você rola até o fim, o último painel opaco sai por cima e o footer fixo "aparece por baixo". A sensação de tela subindo é só o conteúdo rolando normal sobre um elemento parado.

### HTML

```html
<main class="site-main">
  <!-- ...seções... -->
  <section class="final-panel">
    <h2>Pronto pra começar?</h2>
    <a href="#" class="btn">Fale conosco</a>
  </section>
</main>

<div class="footer-spacer" aria-hidden="true"></div>
<footer class="curtain-footer">
  <!-- conteúdo do footer -->
</footer>
```

### CSS

```css
/* A cortina: conteúdo por cima, opaco */
.site-main {
  position: relative;
  z-index: 2;
}
/* CRÍTICO: toda seção precisa de fundo opaco,
   senão o footer claro vaza através antes da hora */
.site-main > section {
  background-color: #0e0e0e;
}

/* Último painel — cantos inferiores arredondados vendem o efeito
   de "placa" deslizando pra cima */
.final-panel {
  position: relative;
  min-height: 72vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 0 0 28px 28px;
  background-color: #000;
}

/* Reserva espaço no fluxo — mesma altura do footer */
.footer-spacer {
  height: 92vh;
}

/* O footer parado, atrás de tudo */
.curtain-footer {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 92vh;
  z-index: 1;
  background: #f5f5f5;
  color: #000;
}
```

### Os detalhes que importam

- **`.footer-spacer` e `.curtain-footer` precisam da mesma altura.** Se divergirem, ou sobra scroll vazio no fim, ou o footer nunca se revela por inteiro.
- **`92vh`, não `100vh`.** Deixar o footer um pouco menor que a viewport garante que a borda inferior arredondada do painel escuro fique visível enquanto ele sai — é o que dá a leitura de duas camadas.
- **Fundo opaco em toda seção é obrigatório.** Uma seção com `background: transparent` deixa o footer claro aparecer no meio do site.
- **`border-radius: 0 0 28px 28px`** no último painel é o detalhe que transforma "conteúdo rolando" em "cortina subindo". Sem isso o efeito não lê.
- **Mobile:** ajustar `.footer-spacer` e `.curtain-footer` juntos (ex. `96vh` nos dois) num único media query, pra não dessincronizar.

### Se o footer for mais alto que a viewport

`position: fixed` corta o excedente. Nesse caso troque por `position: sticky; top: calc(100vh - <altura>)` no footer e remova o spacer — mesma leitura visual, mas o footer pode ter altura livre.

---

## Combinando os dois

São independentes e compõem bem: a linha usa GSAP + ScrollTrigger, a cortina é CSS puro. A única interação é que a seção pinada (`.pin-track`) também precisa de fundo opaco pra não vazar o footer.

## `prefers-reduced-motion`

- **Linha:** pular a timeline inteira e deixar tudo no estado final (`gsap.set(".drop-line", { scaleY: 1 })`, título visível).
- **Cortina:** já é aceitável — não há animação, só scroll. Pode manter.

## Se não quiser GSAP

O padrão 1 dá pra fazer com `ScrollTimeline` nativo em Chrome/Edge:

```css
@supports (animation-timeline: view()) {
  .pin-track { view-timeline-name: --track; }
  .drop-line {
    transform-origin: 50% 0%;
    animation: drop linear both;
    animation-timeline: --track;
    animation-range: 55% 75%;
  }
  @keyframes drop {
    from { transform: translateX(-50%) scaleY(0); }
    to   { transform: translateX(-50%) scaleY(1); }
  }
}
```

Sem suporte no Safari até o momento — por isso o projeto usa GSAP.
