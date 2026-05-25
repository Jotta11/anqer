"use client";

import { useEffect, type RefObject } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "./useReducedMotion";

/**
 * Core Platform — scroll-driven 4-state cycle.
 *
 * A seção tem 1200vh de altura com inner sticky 100vh. Conforme o user rola
 * pelos 12 viewports, o conteúdo cicla entre 4 estados:
 *
 *   t=0.00 → 0.20  : state 1 visível
 *   t=0.20 → 0.30  : transição 1 → 2
 *   t=0.30 → 0.45  : state 2 visível
 *   t=0.45 → 0.55  : transição 2 → 3
 *   t=0.55 → 0.70  : state 3 visível
 *   t=0.70 → 0.80  : transição 3 → 4
 *   t=0.80 → 1.00  : state 4 visível
 *
 * Cada estado controla simultaneamente: subtitle (top right), big category
 * text (mid right), 2 label pairs (bottom right), círculo ativo (left), e a
 * cor do ícone (center).
 */
export function useCorePlatformCycle(scope: RefObject<HTMLElement>) {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !scope.current) return;

    /**
     * Cada ícone tem hue-rotate FIXO em qualquer estado (active ou inactive).
     * Durante as transições, apenas brightness/saturate/drop-shadow variam —
     * impossível "flashear" cores intermediárias.
     *
     *  v1 → azul    (Web)        hue-rotate(0deg)
     *  v2 → cyan    (Mobile)     hue-rotate(330deg)
     *  v3 → verde   (Auto)       hue-rotate(270deg)
     *  v4 → laranja (Cloud)      hue-rotate(180deg)
     */
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
      // Estado inicial — TODAS as 4 states inativas. v1 entra durante a primeira
      // janela de scroll (~2-6% do progress) como o user pediu: chegando na
      // seção, Web está apagado e pra baixo; ele "sobe" conforme rola.
      [1, 2, 3, 4].forEach((n) => {
        gsap.set(
          [
            `.subtitle-cycling.animation-v${n}`,
            `.medium-big-text.animated-v${n}`,
            `.scramble.animated-v${n}`,
          ],
          { opacity: 0, y: 24 }
        );
        gsap.set(`.logo-circle-product.v${n}`, {
          borderColor: "rgba(255,255,255,0.18)",
          color: "rgba(255,255,255,0.5)",
          boxShadow: "0 0 0 0px rgba(255,255,255,0)",
        });
        gsap.set(`.icon-product.v${n}`, { filter: FILTER_INACTIVE[n] });
      });

      // Timeline com scrub — segue exatamente o scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: scope.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });

      // ENTRY (0.02 → 0.06): v1 ativa pela primeira vez (estava inativa em 0.00)
      tl.fromTo(
        [
          ".subtitle-cycling.animation-v1",
          ".medium-big-text.animated-v1",
          ".scramble.animated-v1",
        ],
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.1, ease: "power2.out" },
        0.04
      );
      tl.to(
        ".logo-circle-product.v1",
        {
          borderColor: "#ffffff",
          color: "#ffffff",
          boxShadow: "0 0 0 4px rgba(255,255,255,0.04)",
          duration: 0.1,
          ease: "power2.out",
        },
        0.04
      );
      tl.to(
        ".icon-product.v1",
        { filter: FILTER_ACTIVE[1], duration: 0.1, ease: "power2.out" },
        0.04
      );

      const TRANSITIONS: Array<{ out: number; in: number }> = [
        { out: 0.2, in: 0.3 }, // 1 → 2
        { out: 0.45, in: 0.55 }, // 2 → 3
        { out: 0.7, in: 0.8 }, // 3 → 4
      ];

      TRANSITIONS.forEach(({ out: tOut, in: tIn }, i) => {
        const from = i + 1;
        const to = i + 2;

        // OUTGOING — fade up e some
        tl.to(
          [
            `.subtitle-cycling.animation-v${from}`,
            `.medium-big-text.animated-v${from}`,
            `.scramble.animated-v${from}`,
          ],
          {
            opacity: 0,
            y: -24,
            duration: 0.1,
            ease: "power2.out",
          },
          tOut
        );
        tl.to(
          `.logo-circle-product.v${from}`,
          {
            borderColor: "rgba(255,255,255,0.18)",
            color: "rgba(255,255,255,0.5)",
            boxShadow: "0 0 0 0px rgba(255,255,255,0)",
            duration: 0.1,
            ease: "power2.out",
          },
          tOut
        );
        tl.to(
          `.icon-product.v${from}`,
          { filter: FILTER_INACTIVE[from], duration: 0.1, ease: "power2.out" },
          tOut
        );

        // INCOMING — entra de baixo, fade in
        tl.fromTo(
          [
            `.subtitle-cycling.animation-v${to}`,
            `.medium-big-text.animated-v${to}`,
            `.scramble.animated-v${to}`,
          ],
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.1, ease: "power2.out" },
          tIn
        );
        tl.to(
          `.logo-circle-product.v${to}`,
          {
            borderColor: "#ffffff",
            color: "#ffffff",
            boxShadow: "0 0 0 4px rgba(255,255,255,0.04)",
            duration: 0.1,
            ease: "power2.out",
          },
          tIn
        );
        tl.to(
          `.icon-product.v${to}`,
          { filter: FILTER_ACTIVE[to], duration: 0.1, ease: "power2.out" },
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
