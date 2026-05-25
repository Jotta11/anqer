"use client";

import { useEffect, type RefObject } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "./useReducedMotion";

/**
 * ANIMAÇÃO 5 — Hover nos logos parceiros.
 *
 * MOUSE_OVER (sequência paralela):
 *  - target: brightness 40% → 200% (500ms linear) + scale 1 → 1.5 (800ms power4.out)
 *  - siblings: filter blur(2px) (500ms cubic-bezier(0.4, 0, 0.2, 1))
 * MOUSE_OUT: reverte tudo com os mesmos timings.
 *
 * Fonte: docs/ANIMATION_SPECS.md §5.
 *
 * Nota: o brightness base de `.logo-partner` é 40% (CSS .logo-partner),
 * e o hover sobe pra 200% via GSAP.
 */
export function usePartnerHover(scope: RefObject<HTMLElement>) {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !scope.current) return;

    const partners = Array.from(
      scope.current.querySelectorAll<HTMLAnchorElement>(".block-partner")
    );
    if (partners.length === 0) return;

    const cleanups: Array<() => void> = [];

    partners.forEach((partner) => {
      const logo = partner.querySelector<HTMLElement>(".logo-partner");
      const siblings = partners.filter((p) => p !== partner);

      const onEnter = () => {
        if (logo) {
          gsap.to(logo, {
            filter: "brightness(200%)",
            duration: 0.5,
            ease: "linear",
            overwrite: "auto",
          });
        }
        gsap.to(partner, {
          scale: 1.5,
          duration: 0.8,
          ease: "power4.out",
          overwrite: "auto",
        });
        gsap.to(siblings, {
          filter: "blur(2px)",
          duration: 0.5,
          ease: "cubic-bezier(0.4, 0, 0.2, 1)",
          overwrite: "auto",
        });
      };

      const onLeave = () => {
        if (logo) {
          gsap.to(logo, {
            filter: "brightness(40%)",
            duration: 0.5,
            ease: "linear",
            overwrite: "auto",
          });
        }
        gsap.to(partner, {
          scale: 1,
          duration: 0.8,
          ease: "power4.out",
          overwrite: "auto",
        });
        gsap.to(siblings, {
          filter: "blur(0px)",
          duration: 0.5,
          ease: "cubic-bezier(0.4, 0, 0.2, 1)",
          overwrite: "auto",
        });
      };

      partner.addEventListener("mouseenter", onEnter);
      partner.addEventListener("mouseleave", onLeave);
      cleanups.push(() => {
        partner.removeEventListener("mouseenter", onEnter);
        partner.removeEventListener("mouseleave", onLeave);
      });
    });

    return () => cleanups.forEach((fn) => fn());
  }, [reduced, scope]);
}
