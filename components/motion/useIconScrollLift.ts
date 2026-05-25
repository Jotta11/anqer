"use client";

import { useEffect, type RefObject } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "./useReducedMotion";

/**
 * Core Platform — Y-lift dos ícones tied ao scroll.
 *
 * Comportamento: cada ícone fica POUSADO no bloco (y:0). Quando o cycle
 * atinge seu estado, o ícone SOBE (y: -1.8vw). Quando o estado termina,
 * o ícone DESCE de volta. Sincronizado com useCorePlatformCycle.
 *
 *   t ∈ [0.00, 0.20]:  v1 up,    v2/v3/v4 down
 *   t ∈ [0.20, 0.30]:  transição (v1 desce, v2 sobe)
 *   t ∈ [0.30, 0.45]:  v2 up,    outros down
 *   t ∈ [0.45, 0.55]:  transição (v2 desce, v3 sobe)
 *   t ∈ [0.55, 0.70]:  v3 up,    outros down
 *   t ∈ [0.70, 0.80]:  transição (v3 desce, v4 sobe)
 *   t ∈ [0.80, 1.00]:  v4 up
 */
export function useIconScrollLift(scope: RefObject<HTMLElement>) {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !scope.current) return;

    const ctx = gsap.context(() => {
      // Estado inicial: TODAS as 4 ícones pousadas (y: 0)
      [1, 2, 3, 4].forEach((n) =>
        gsap.set(`.icon-product.v${n}`, { y: "0vw" })
      );

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: scope.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.8,
        },
      });

      // ENTRY: v1 sobe pela primeira vez no mesmo ponto que o cycle ativa-o.
      tl.to(
        ".icon-product.v1",
        { y: "-1.8vw", duration: 0.08, ease: "sine.out" },
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
          `.icon-product.v${from}`,
          { y: "0vw", duration: 0.08, ease: "sine.in" },
          fall
        );
        tl.to(
          `.icon-product.v${to}`,
          { y: "-1.8vw", duration: 0.08, ease: "sine.out" },
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
