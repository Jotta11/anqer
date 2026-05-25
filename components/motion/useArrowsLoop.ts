"use client";

import { useEffect, type RefObject } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "./useReducedMotion";

/**
 * Workflow badge — 3 setas ">" deslizam pra direita ciclicamente.
 *
 * Cada seta fade-in da esquerda (x: -100%) → fade-out na direita (x: 100%),
 * com offset entre elas pra criar o efeito de "flush" contínuo. Loop infinito.
 */
export function useArrowsLoop(scope: RefObject<HTMLElement>) {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !scope.current) return;

    const ctx = gsap.context(() => {
      const arrows = scope.current!.querySelectorAll<HTMLElement>(
        ".block-title-workflow-animation .text-secondary.animated"
      );
      if (arrows.length === 0) return;

      arrows.forEach((arrow, i) => {
        gsap.set(arrow, { x: 0, opacity: 0.2 });
        gsap
          .timeline({ repeat: -1, delay: i * 0.3 })
          .to(arrow, {
            opacity: 1,
            duration: 0.4,
            ease: "power2.out",
          })
          .to(arrow, {
            opacity: 0.2,
            duration: 0.4,
            ease: "power2.in",
          })
          .to(arrow, { duration: 0.4 }); // pause antes do próximo ciclo
      });
    }, scope);

    return () => ctx.revert();
  }, [reduced, scope]);
}
