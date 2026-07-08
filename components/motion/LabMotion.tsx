"use client";

import { useEffect, type RefObject } from "react";
import { gsap } from "@/lib/gsap";
import { site } from "@/content/site";
import { useReducedMotion } from "./useReducedMotion";

type Props = {
  scope: RefObject<HTMLElement>;
};

/**
 * Lab — timeline scrubada da cena "De Manual ⇄ Inteligente".
 * Progress 0→~0.35: estado manual. 0.35→0.65: transição. 0.65→1: inteligente.
 */
export default function LabMotion({ scope }: Props) {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !scope.current) return;

    const { efficiency } = site.features.lab;

    const ctx = gsap.context(() => {
      // Estados iniciais (manual)
      gsap.set(".lab-status.after", { autoAlpha: 0, y: 8 });
      gsap.set(".lab-chip.success.after", { autoAlpha: 0, y: 8 });
      gsap.set(".lab-scatter-after", { autoAlpha: 0 });
      gsap.set(".lab-scatter-title", { autoAlpha: 0 });
      gsap.set(".lab-pipeline-row.r2", { opacity: 0.35 });
      gsap.set(".lab-toggle-knob", { x: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: scope.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });

      const T = 0.42; // início da virada
      const D = 0.2; // duração da virada

      // Toggle + ênfase das palavras
      tl.to(".lab-toggle-knob", { x: "100%", duration: D, ease: "power2.inOut" }, T);
      tl.to(".lab-word.strong", { color: "#5d5d5d", duration: D }, T);
      tl.to(".lab-word.dim", { color: "#ffffff", duration: D }, T);

      // Donut colore
      tl.to(
        ".lab-donut-seg",
        {
          stroke: "#f97316",
          opacity: 1,
          duration: D,
          ease: "power2.inOut",
          stagger: 0.04,
        },
        T
      );

      // Eficiência 67 → 99
      tl.fromTo(
        ".lab-eff-number",
        { innerText: efficiency.from },
        {
          innerText: efficiency.to,
          snap: { innerText: 1 },
          duration: D,
          ease: "none",
        },
        T
      );

      // Status do gargalo troca
      tl.to(".lab-status.before", { autoAlpha: 0, y: -8, duration: D * 0.5 }, T);
      tl.to(".lab-status.after", { autoAlpha: 1, y: 0, duration: D * 0.5 }, T + D * 0.5);

      // Chip "Falhou" → "Sucesso" + linha apagada acende
      tl.to(".lab-chip.failed", { autoAlpha: 0, y: -8, duration: D * 0.5 }, T);
      tl.to(".lab-chip.success.after", { autoAlpha: 1, y: 0, duration: D * 0.5 }, T + D * 0.5);
      tl.to(".lab-pipeline-row.r2", { opacity: 1, duration: D }, T);

      // Scatter organiza + título aparece
      tl.to(".lab-scatter-before", { autoAlpha: 0, duration: D }, T);
      tl.to(".lab-scatter-after", { autoAlpha: 1, duration: D }, T);
      tl.to(".lab-scatter-title", { autoAlpha: 1, duration: D }, T);
    }, scope);

    return () => ctx.revert();
  }, [reduced, scope]);

  return null;
}
