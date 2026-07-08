"use client";

import { useEffect, type RefObject } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "./useReducedMotion";
import { useScrambleLoop } from "./useScrambleLoop";

type Props = {
  scope: RefObject<HTMLElement>;
};

/**
 * Features (in-flow):
 *  - Anim 2:  orbits girando (5/10/20/30s, linear, infinito)
 *  - Anim 3 (variante): marquee das tags
 *  - Anim 17 (C4): círculo + counter 0→100 (scrub 0.6)
 *  - Scramble loop nos labels dos pilares
 */
export default function FeaturesMotion({ scope }: Props) {
  const reduced = useReducedMotion();
  useScrambleLoop(scope, ".feature-label.v3 .scramble", { repeatDelay: 4 });

  useEffect(() => {
    if (reduced || !scope.current) return;

    const ctx = gsap.context(() => {
      // Anim 2 — orbits
      gsap.to(".image-orbit.v1", { rotation: 360, duration: 5, repeat: -1, ease: "none" });
      gsap.to(".image-orbit.v2", { rotation: 360, duration: 10, repeat: -1, ease: "none" });
      gsap.to(".image-orbit.v3", { rotation: 360, duration: 20, repeat: -1, ease: "none" });
      gsap.to(".image-orbit.v4", { rotation: 360, duration: 30, repeat: -1, ease: "none" });

      // Marquee das tags (mesma mecânica da Anim 3)
      gsap.to(".features-marquee-track", {
        x: "-50%",
        duration: 20,
        ease: "none",
        repeat: -1,
      });

      // Anim 17 — círculo + counter, valores C4 (adaptado ao acento da marca)
      const section = scope.current!.querySelector(".content-feature");
      if (section) {
        const mask = section.querySelector(".radial-mask");
        const thinBorder = section.querySelector(".wrapper-text-counting");
        const empty = section.querySelector(".circle-empty");
        const number = section.querySelector(".big-text");

        gsap.set(mask, {
          rotate: 0,
          scale: 0.95,
          filter: "blur(6px)",
          opacity: 0.8,
          transformOrigin: "50% 50%",
        });
        gsap.set(thinBorder, { borderColor: "rgba(156,163,175,0.35)" });
        gsap.set(empty, { scale: 1, filter: "blur(10px)", opacity: 0.35 });
        gsap.set(number, { innerText: 0 });

        gsap
          .timeline({
            scrollTrigger: {
              trigger: section,
              start: "top 75%",
              end: "bottom 75%",
              scrub: 0.6,
            },
          })
          .to(mask, { rotate: 360, ease: "none" }, 0)
          .to(mask, { scale: 1.05, filter: "blur(0px)", opacity: 1, ease: "none" }, 0)
          .to(thinBorder, { borderColor: "rgba(249,115,22,0.7)", ease: "none" }, 0)
          .to(empty, { scale: 1.15, filter: "blur(4px)", opacity: 0.55, ease: "none" }, 0)
          .to(number, { innerText: 100, snap: { innerText: 1 }, ease: "none" }, 0);
      }
    }, scope);

    return () => ctx.revert();
  }, [reduced, scope]);

  return null;
}
