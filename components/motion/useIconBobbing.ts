"use client";

import { useEffect, type RefObject } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "./useReducedMotion";

/**
 * Core Platform — flutuação Y contínua dos 4 ícones isométricos.
 *
 * Cada ícone faz um movimento Y senoidal infinito (sobe e desce). Durations
 * e delays escolhidos pra ficar fora de fase entre eles, dando sensação
 * orgânica.
 *
 * Compõe com o cycle: a flutuação altera apenas Y (transform), o cycle altera
 * apenas filter — não conflitam.
 */
export function useIconBobbing(scope: RefObject<HTMLElement>) {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !scope.current) return;

    const ctx = gsap.context(() => {
      const configs: Array<{
        selector: string;
        amplitude: string;
        duration: number;
        delay: number;
      }> = [
        { selector: ".icon-product.v1", amplitude: "-1.0vw", duration: 2.6, delay: 0 },
        { selector: ".icon-product.v2", amplitude: "-0.8vw", duration: 2.9, delay: 0.5 },
        { selector: ".icon-product.v3", amplitude: "-0.9vw", duration: 3.1, delay: 1.0 },
        { selector: ".icon-product.v4", amplitude: "-1.1vw", duration: 2.4, delay: 1.5 },
      ];

      configs.forEach((c) => {
        gsap.to(c.selector, {
          y: c.amplitude,
          duration: c.duration,
          delay: c.delay,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
        });
      });
    }, scope);

    return () => ctx.revert();
  }, [reduced, scope]);
}
