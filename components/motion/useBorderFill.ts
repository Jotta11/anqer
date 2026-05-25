"use client";

import { useEffect, type RefObject } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "./useReducedMotion";

/**
 * ANIMAÇÃO 6 — Border fill loop (linha animada horizontal).
 *
 * `.border.fill` parte de `translate3d(-100%, 0, 0)` (inline CSS),
 * varre até `100%` em 10s linear, depois reseta — loop infinito.
 *
 * Fonte: docs/ANIMATION_SPECS.md §6.
 */
export function useBorderFill(scope: RefObject<HTMLElement>) {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !scope.current) return;

    const ctx = gsap.context(() => {
      gsap
        .timeline({ repeat: -1 })
        .set(".border.fill", { x: "-100%" })
        .to(".border.fill", { x: "100%", duration: 10, ease: "none" })
        .set(".border.fill", { x: "-100%" });
    }, scope);

    return () => ctx.revert();
  }, [reduced, scope]);
}
