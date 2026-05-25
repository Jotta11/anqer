"use client";

import { useEffect, type RefObject } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "./useReducedMotion";

/**
 * ANIMAÇÃO 1 — Parallax do .bg-animation-hero ao mover o mouse.
 *
 * Range: -1.4vw → +1.4vw em X e Y.
 * Smoothing: duration 0.5s, ease power2.out, overwrite auto.
 *
 * Fonte: docs/ANIMATION_SPECS.md §1.
 */
export function useHeroParallax(scope: RefObject<HTMLElement>) {
  const reduced = useReducedMotion();

  useEffect(() => {
    const hero = scope.current;
    if (!hero || reduced) return;

    const targets = hero.querySelectorAll(".bg-animation-hero");
    if (targets.length === 0) return;

    const handleMove = (e: MouseEvent) => {
      const rect = hero.getBoundingClientRect();
      const xRatio = (e.clientX - rect.left) / rect.width;
      const yRatio = (e.clientY - rect.top) / rect.height;
      const xVw = -1.4 + xRatio * 2.8;
      const yVw = -1.4 + yRatio * 2.8;

      gsap.to(targets, {
        x: `${xVw}vw`,
        y: `${yVw}vw`,
        duration: 0.5,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    hero.addEventListener("mousemove", handleMove);
    return () => hero.removeEventListener("mousemove", handleMove);
  }, [reduced, scope]);
}
