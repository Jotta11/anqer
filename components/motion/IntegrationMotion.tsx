"use client";

import { useEffect, type RefObject } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "./useReducedMotion";

type Props = {
  scope: RefObject<HTMLElement>;
};

/**
 * Integration:
 *  - Anim 19: reveal dos ícones (scale 0 → 1, stagger 0.08, power3.out)
 *  - Pin scrubado: arco sobe, linha desce do tile central, título entra
 */
export default function IntegrationMotion({ scope }: Props) {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !scope.current) return;

    const ctx = gsap.context(() => {
      // Anim 19 — entrada
      gsap.from(".icon-integration", {
        scale: 0,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: scope.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });

      // Estados iniciais do 2º estágio
      gsap.set(".integration-line", { scaleY: 0, transformOrigin: "50% 0%" });
      gsap.set(".wrapper-title-integration", { autoAlpha: 0, y: 24 });
      gsap.set(".integration-badge", { borderColor: "rgba(255,255,255,0)" });

      // Timeline pinada
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: scope.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });

      tl.to(".wrapper-icons-integration", { y: "-6vw", duration: 0.3, ease: "power1.inOut" }, 0.3);
      tl.to(".integration-badge", { borderColor: "rgba(255,255,255,0.18)", duration: 0.2 }, 0.35);
      tl.to(".integration-line", { scaleY: 1, duration: 0.25, ease: "none" }, 0.4);
      tl.to(".wrapper-title-integration", { autoAlpha: 1, y: 0, duration: 0.2, ease: "power2.out" }, 0.6);
    }, scope);

    return () => ctx.revert();
  }, [reduced, scope]);

  return null;
}
