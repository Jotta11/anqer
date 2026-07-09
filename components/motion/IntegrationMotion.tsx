"use client";

import { useEffect, type RefObject } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "./useReducedMotion";

type Props = {
  scope: RefObject<HTMLElement>;
};

/**
 * Integration:
 *  - Baralho: os 7 tiles começam empilhados atrás do central (v4) e se
 *    abrem em leque para as posições do arco (Anim 19) conforme o scroll,
 *    em pares do centro pra fora.
 *  - Depois: arco sobe, linha desce do tile central, título entra.
 */
export default function IntegrationMotion({ scope }: Props) {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !scope.current) return;

    const ctx = gsap.context(() => {
      // Estados iniciais do 2º estágio
      gsap.set(".integration-line", { scaleY: 0, transformOrigin: "50% 0%" });
      gsap.set(".wrapper-title-integration", { autoAlpha: 0, y: 24 });
      gsap.set(".integration-badge", { borderColor: "rgba(255,255,255,0)" });

      // Timeline pinada
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: scope.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });

      // Fan-out do baralho: pares saem de trás do central (x/y/rot = 0),
      // do mais próximo pro mais distante. O CSS já define o destino.
      [1, 2, 3].forEach((d) => {
        tl.from(
          [`.icon-integration.v${4 - d}`, `.icon-integration.v${4 + d}`],
          {
            x: 0,
            y: 0,
            rotation: 0,
            scale: 0.92,
            duration: 0.16,
            ease: "power2.out",
          },
          0.04 + (d - 1) * 0.1
        );
      });

      tl.to(".wrapper-icons-integration", { y: "-6vw", duration: 0.25, ease: "power1.inOut" }, 0.48);
      tl.to(".integration-badge", { borderColor: "rgba(255,255,255,0.18)", duration: 0.15 }, 0.5);
      tl.to(".integration-line", { scaleY: 1, duration: 0.2, ease: "none" }, 0.55);
      tl.to(".wrapper-title-integration", { autoAlpha: 1, y: 0, duration: 0.18, ease: "power2.out" }, 0.72);
    }, scope);

    return () => ctx.revert();
  }, [reduced, scope]);

  return null;
}
