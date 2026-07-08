"use client";

import { useEffect, type RefObject } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "./useReducedMotion";

/**
 * Anim 13 — hover nos cards de pricing (color reveal).
 * Base: grayscale(100%). Hover: hue-rotate(276deg) → grayscale(0) +
 * saturate(220%) → snap hue-rotate(0). Out: volta a grayscale.
 */
export function usePricingHover(scope: RefObject<HTMLElement>) {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !scope.current) return;

    const cards = Array.from(
      scope.current.querySelectorAll<HTMLElement>(".body-card-pricing")
    );
    const enter = new Map<HTMLElement, () => void>();
    const leave = new Map<HTMLElement, () => void>();

    cards.forEach((card) => {
      const onEnter = () => {
        gsap
          .timeline({ overwrite: "auto" })
          .to(card, {
            filter: "hue-rotate(276deg) grayscale(100%) saturate(100%)",
            duration: 0.5,
          })
          .to(card, {
            filter: "hue-rotate(276deg) grayscale(0%) saturate(220%)",
            duration: 0.5,
          })
          .set(card, { filter: "hue-rotate(0deg) grayscale(0%) saturate(220%)" });
      };
      const onLeave = () => {
        gsap.to(card, {
          filter: "hue-rotate(0deg) grayscale(100%) saturate(100%)",
          duration: 0.5,
          overwrite: "auto",
        });
      };
      card.addEventListener("mouseenter", onEnter);
      card.addEventListener("mouseleave", onLeave);
      enter.set(card, onEnter);
      leave.set(card, onLeave);
    });

    return () => {
      cards.forEach((card) => {
        const onEnter = enter.get(card);
        const onLeave = leave.get(card);
        if (onEnter) card.removeEventListener("mouseenter", onEnter);
        if (onLeave) card.removeEventListener("mouseleave", onLeave);
      });
    };
  }, [reduced, scope]);
}
