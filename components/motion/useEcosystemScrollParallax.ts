"use client";

import { useEffect, type RefObject } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "./useReducedMotion";

/**
 * ANIMAÇÃO 4 — Parallax horizontal dos logos parceiros tied ao scroll.
 *
 * `.block-partner-move` (wrapper externo do marquee) recebe x:0 → -15vw
 * durante o scroll através da seção #ecosystem. Compõe-se com o marquee
 * infinito (Anim 3, que está num child), aumentando levemente o
 * deslocamento conforme se rola a página.
 *
 * Fonte: docs/ANIMATION_SPECS.md §4.
 */
export function useEcosystemScrollParallax(scope: RefObject<HTMLElement>) {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !scope.current) return;

    const ctx = gsap.context(() => {
      gsap.to(".block-partner-move", {
        x: "-15vw",
        ease: "none",
        scrollTrigger: {
          trigger: scope.current,
          start: "top 90%",
          end: "bottom 10%",
          scrub: 0.5,
        },
      });
    }, scope);

    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, [reduced, scope]);
}
