"use client";

import { useEffect } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "./useReducedMotion";

const HIDDEN_TARGETS = [
  ".wrapper-navbar.logo",
  ".wrapper-navbar.menu",
  ".bg-animation-hero",
  ".wrapper-subcontent-hero.v1",
  ".wrapper-subcontent-hero.v2",
  ".wrapper-subcontent-hero.v3",
  ".wrapper-sub-title-hero",
  ".text-hero",
];

/**
 * ANIMAÇÃO 18 — Reveal inicial (page load) do hero + navbar.
 *
 * Estratégia (evita flash):
 *   1. Antes de remover `.js-loading`, fixamos `autoAlpha: 0` via GSAP nos
 *      elementos-alvo (transfere o estado "hidden" do CSS para inline style).
 *   2. Removemos `.js-loading` do <html> — a partir daqui, somente o GSAP
 *      controla a visibilidade.
 *   3. Timeline com overlaps negativos faz o reveal sequencial.
 *
 * Fonte: docs/ANIMATION_SPECS.md §18 (corrigida em §C2 + C8).
 */
export function useInitialReveal() {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (typeof document === "undefined") return;
    const html = document.documentElement;

    if (reduced) {
      html.classList.remove("js-loading");
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(HIDDEN_TARGETS, { autoAlpha: 0 });
      html.classList.remove("js-loading");

      const tl = gsap.timeline({ delay: 0.2 });

      tl.fromTo(
        ".wrapper-navbar.logo",
        { y: -10 },
        { autoAlpha: 1, y: 0, duration: 0.6, ease: "power3.out" }
      )
        .fromTo(
          ".wrapper-navbar.menu",
          { y: -10 },
          { autoAlpha: 1, y: 0, duration: 0.6, ease: "power3.out" },
          "-=0.4"
        )
        .to(
          ".bg-animation-hero",
          { autoAlpha: 1, duration: 0.8, ease: "power3.out" },
          "-=0.3"
        )
        .fromTo(
          ".wrapper-sub-title-hero",
          { y: 24 },
          { autoAlpha: 1, y: 0, duration: 0.7, ease: "power3.out" },
          "-=0.5"
        )
        .fromTo(
          ".text-hero",
          { y: 40 },
          { autoAlpha: 1, y: 0, duration: 0.9, ease: "power3.out" },
          "-=0.55"
        )
        .to(
          ".wrapper-subcontent-hero.v1",
          { autoAlpha: 1, duration: 0.6, ease: "power3.out" },
          "-=0.5"
        )
        .to(
          ".wrapper-subcontent-hero.v2",
          { autoAlpha: 1, duration: 0.6, ease: "power3.out" },
          "-=0.5"
        )
        .to(
          ".wrapper-subcontent-hero.v3",
          { autoAlpha: 1, duration: 0.6, ease: "power3.out" },
          "-=0.5"
        );
    });

    return () => {
      ctx.revert();
      html.classList.remove("js-loading");
    };
  }, [reduced]);
}
