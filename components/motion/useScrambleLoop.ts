"use client";

import { useEffect, type RefObject } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "./useReducedMotion";

/**
 * Scramble loop periódico num label (ex.: "ECOSSISTEMA" do Quantara).
 * Os caracteres em transição ganham a classe .scramble-old (cor de acento).
 */
export function useScrambleLoop(
  scope: RefObject<HTMLElement>,
  selector: string,
  { duration = 1.8, repeatDelay = 3 }: { duration?: number; repeatDelay?: number } = {}
) {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !scope.current) return;

    const ctx = gsap.context(() => {
      const el = scope.current?.querySelector(selector);
      if (!el) return;
      gsap.to(el, {
        duration,
        repeat: -1,
        repeatDelay,
        scrambleText: {
          text: "{original}",
          chars: "+?84564XERS",
          speed: 0.6,
          oldClass: "scramble-old",
        },
      });
    }, scope);

    return () => ctx.revert();
  }, [reduced, scope, selector, duration, repeatDelay]);
}
