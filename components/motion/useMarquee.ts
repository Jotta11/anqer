"use client";

import { useEffect, type RefObject } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "./useReducedMotion";

/**
 * ANIMAÇÃO 3 — Marquee infinito dos logos parceiros.
 *
 * O `.block-partners` (que tem 200vw com conteúdo duplicado) anima
 * de x:0 → x:-50%, linear, infinito (20s). O loop é visualmente contínuo
 * porque a segunda metade do conteúdo é idêntica à primeira.
 *
 * Fonte: docs/ANIMATION_SPECS.md §3.
 */
export function useMarquee(scope: RefObject<HTMLElement>) {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !scope.current) return;

    const ctx = gsap.context(() => {
      gsap.to(".block-partners", {
        x: "-50%",
        duration: 20,
        ease: "none",
        repeat: -1,
      });
    }, scope);

    return () => ctx.revert();
  }, [reduced, scope]);
}
