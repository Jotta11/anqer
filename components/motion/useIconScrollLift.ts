"use client";

import { useEffect, type RefObject } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "./useReducedMotion";

/**
 * Core Platform — Y-lift dos BLOCOS isométricos (ícone + base juntos) tied
 * ao scroll. O ícone permanece fixo no quadrado (posição absolute relativa
 * ao bloco-pai), então transformando o pai sobe ambos.
 *
 * Estado inicial: todos os 4 blocos pousados (y:0), inativos.
 *
 *   t ∈ [0.00, 0.04]:  todos pousados (chegou na seção, nada ativo)
 *   t ∈ [0.04, 0.12]:  v1 sobe pela 1ª vez (ENTRY)
 *   t ∈ [0.12, 0.20]:  v1 fica em cima
 *   t ∈ [0.20, 0.30]:  transição (v1 desce, v2 sobe)
 *   t ∈ [0.30, 0.45]:  v2 em cima
 *   t ∈ [0.45, 0.55]:  transição (v2 desce, v3 sobe)
 *   t ∈ [0.55, 0.70]:  v3 em cima
 *   t ∈ [0.70, 0.80]:  transição (v3 desce, v4 sobe)
 *   t ∈ [0.80, 1.00]:  v4 em cima
 *
 * Targets: `.block-image-product.v1`-`.v4` (o pai). A classe `.img` e
 * `.icon-product.vN` ficam dentro do pai e sobem por consequência do
 * transform Y do parent.
 */
export function useIconScrollLift(scope: RefObject<HTMLElement>) {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !scope.current) return;

    const LIFT = "-2.2vw";

    const ctx = gsap.context(() => {
      // Estado inicial: TODOS os blocos pousados (y: 0)
      [1, 2, 3, 4].forEach((n) =>
        gsap.set(`.block-image-product.v${n}`, { y: "0vw" })
      );

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: scope.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.8,
        },
      });

      // ENTRY: v1 sobe pela primeira vez
      tl.to(
        ".block-image-product.v1",
        { y: LIFT, duration: 0.08, ease: "sine.out" },
        0.04
      );

      const TRANSITIONS: Array<{
        fall: number;
        rise: number;
        from: number;
        to: number;
      }> = [
        { fall: 0.2, rise: 0.3, from: 1, to: 2 },
        { fall: 0.45, rise: 0.55, from: 2, to: 3 },
        { fall: 0.7, rise: 0.8, from: 3, to: 4 },
      ];

      TRANSITIONS.forEach(({ fall, rise, from, to }) => {
        tl.to(
          `.block-image-product.v${from}`,
          { y: "0vw", duration: 0.08, ease: "sine.in" },
          fall
        );
        tl.to(
          `.block-image-product.v${to}`,
          { y: LIFT, duration: 0.08, ease: "sine.out" },
          rise
        );
      });
    }, scope);

    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, [reduced, scope]);
}
