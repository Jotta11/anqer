"use client";

import { useEffect, type RefObject } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "./useReducedMotion";

/**
 * ANIMAÇÃO 16 — ScrambleText loop nos labels do hero
 * (VISÃO / PRECISÃO / RIGOR via `.scramble.v1/.v2/.v3` dentro de
 *  `.wrapper-subcontent-hero.v1/.v2/.v3`).
 *
 * Cada label embaralha sequencialmente com overlap negativo, e o
 * timeline reinicia em loop infinito com um pequeno descanso.
 *
 * Fonte: docs/ANIMATION_SPECS.md §16.
 */
export function useScrambleHero(scope: RefObject<HTMLElement>) {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !scope.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.5 });

      tl.to(".scramble.v1", {
        duration: 1.2,
        scrambleText: {
          text: "{original}",
          chars: "+?84564XERS",
          speed: 0.6,
        },
      })
        .to(
          ".scramble.v2",
          {
            duration: 1.6,
            scrambleText: {
              text: "{original}",
              chars: "+?84564XERS",
              speed: 0.7,
            },
          },
          "-=0.6"
        )
        .to(
          ".scramble.v3",
          {
            duration: 2.1,
            scrambleText: {
              text: "{original}",
              chars: "+?84564XERS",
              speed: 0.8,
            },
          },
          "-=0.8"
        );
    }, scope);

    return () => ctx.revert();
  }, [reduced, scope]);
}
