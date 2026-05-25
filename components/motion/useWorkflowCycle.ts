"use client";

import { useEffect, type RefObject } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "./useReducedMotion";

/**
 * Workflow — scroll-driven 4-state cycle.
 *
 * Mesma estrutura do Core Platform (1200vh pinada):
 *   t=0.00 → 0.04:  intro (todos dim, nenhuma step visível)
 *   t=0.04 → 0.20:  state 1 (Descoberta)
 *   t=0.20 → 0.30:  transição 1 → 2
 *   t=0.30 → 0.45:  state 2 (Arquitetura)
 *   t=0.45 → 0.55:  transição 2 → 3
 *   t=0.55 → 0.70:  state 3 (Desenvolvimento)
 *   t=0.70 → 0.80:  transição 3 → 4
 *   t=0.80 → 1.00:  state 4 (Entrega)
 *
 * Cada state troca: o block-flow visível (números/título/descrição),
 * o icon-workflow ativo (color + glow), o "[0X]" no badge, e o lift do
 * block-image-workflow correspondente.
 */
export function useWorkflowCycle(scope: RefObject<HTMLElement>) {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !scope.current) return;

    // Hue fixo por ícone (mesma paleta do Core Platform pra consistência)
    const FILTER_INACTIVE: Record<number, string> = {
      1: "grayscale(0%) brightness(0.65) saturate(0.3) hue-rotate(0deg) drop-shadow(0 0 0px rgba(0,0,0,0))",
      2: "grayscale(0%) brightness(0.65) saturate(0.3) hue-rotate(330deg) drop-shadow(0 0 0px rgba(0,0,0,0))",
      3: "grayscale(0%) brightness(0.65) saturate(0.3) hue-rotate(270deg) drop-shadow(0 0 0px rgba(0,0,0,0))",
      4: "grayscale(0%) brightness(0.65) saturate(0.3) hue-rotate(180deg) drop-shadow(0 0 0px rgba(0,0,0,0))",
    };
    const FILTER_ACTIVE: Record<number, string> = {
      1: "grayscale(0%) brightness(1.4) saturate(1.7) hue-rotate(0deg) drop-shadow(0 0 22px rgba(34,158,255,0.95))",
      2: "grayscale(0%) brightness(1.4) saturate(1.7) hue-rotate(330deg) drop-shadow(0 0 22px rgba(120,220,220,0.95))",
      3: "grayscale(0%) brightness(1.4) saturate(1.7) hue-rotate(270deg) drop-shadow(0 0 22px rgba(120,220,150,0.95))",
      4: "grayscale(0%) brightness(1.35) saturate(1.5) hue-rotate(180deg) drop-shadow(0 0 24px rgba(255,180,80,0.98))",
    };

    const ctx = gsap.context(() => {
      // Estado inicial — todos block-flow ocultos, todos ícones inativos
      [1, 2, 3, 4].forEach((n) => {
        gsap.set(`.block-flow.v${n}`, { opacity: 0, y: 24 });
        gsap.set(`.icon-workflow.v${n}`, { filter: FILTER_INACTIVE[n] });
        gsap.set(`.block-image-workflow.v${n}`, { y: 0 });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: scope.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.8,
          invalidateOnRefresh: true,
          // Atualiza o "[0X]" no badge conforme o scroll progride
          onUpdate: (self) => {
            const p = self.progress;
            const stateIdx = p < 0.25 ? 1 : p < 0.5 ? 2 : p < 0.75 ? 3 : 4;
            const badge = document.querySelector(".badge-state");
            if (badge && badge.textContent !== `[0${stateIdx}]`) {
              badge.textContent = `[0${stateIdx}]`;
            }
          },
        },
      });

      // ENTRY (0.04): state 1 ativa
      tl.fromTo(
        ".block-flow.v1",
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.1, ease: "power2.out" },
        0.04
      );
      tl.to(
        ".icon-workflow.v1",
        { filter: FILTER_ACTIVE[1], duration: 0.1, ease: "power2.out" },
        0.04
      );
      tl.to(
        ".block-image-workflow.v1",
        { y: "-1.5vw", duration: 0.1, ease: "sine.out" },
        0.04
      );

      const TRANSITIONS: Array<{ out: number; in: number }> = [
        { out: 0.2, in: 0.3 },
        { out: 0.45, in: 0.55 },
        { out: 0.7, in: 0.8 },
      ];

      TRANSITIONS.forEach(({ out: tOut, in: tIn }, i) => {
        const from = i + 1;
        const to = i + 2;

        // OUTGOING
        tl.to(
          `.block-flow.v${from}`,
          { opacity: 0, y: -24, duration: 0.1, ease: "power2.out" },
          tOut
        );
        tl.to(
          `.icon-workflow.v${from}`,
          { filter: FILTER_INACTIVE[from], duration: 0.1, ease: "power2.out" },
          tOut
        );
        tl.to(
          `.block-image-workflow.v${from}`,
          { y: 0, duration: 0.1, ease: "sine.in" },
          tOut
        );

        // INCOMING
        tl.fromTo(
          `.block-flow.v${to}`,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.1, ease: "power2.out" },
          tIn
        );
        tl.to(
          `.icon-workflow.v${to}`,
          { filter: FILTER_ACTIVE[to], duration: 0.1, ease: "power2.out" },
          tIn
        );
        tl.to(
          `.block-image-workflow.v${to}`,
          { y: "-1.5vw", duration: 0.1, ease: "sine.out" },
          tIn
        );
      });
    }, scope);

    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, [reduced, scope]);
}
