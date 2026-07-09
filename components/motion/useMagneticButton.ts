"use client";

import { useEffect, type RefObject } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "./useReducedMotion";

/**
 * Anims 10 + 11 — botão primário:
 *  - glow (.wrapper-button-primary-bg) segue o cursor de -50% a +50% (0.5s power2.out)
 *  - hover: .bg-button-primary escala 0 → 2.2 e o texto inverte pra branco
 */
export function useMagneticButton(scope: RefObject<HTMLElement>) {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !scope.current) return;

    const buttons = Array.from(
      scope.current.querySelectorAll<HTMLElement>(".main-button.primary")
    );
    const cleanups: Array<() => void> = [];

    buttons.forEach((button) => {
      const glow = button.querySelector(".wrapper-button-primary-bg");
      const bg = button.querySelector(".bg-button-primary");
      const text = button.querySelector(".text-menu");

      const onMove = (e: MouseEvent) => {
        if (!glow) return;
        const rect = button.getBoundingClientRect();
        const x = -50 + ((e.clientX - rect.left) / rect.width) * 100;
        const y = -50 + ((e.clientY - rect.top) / rect.height) * 100;
        gsap.to(glow, {
          x: `${x}%`,
          y: `${y}%`,
          duration: 0.5,
          ease: "power2.out",
          overwrite: "auto",
        });
      };
      const onEnter = () => {
        if (glow) gsap.to(glow, { opacity: 1, duration: 0.4, ease: "power2.out" });
        if (bg) gsap.to(bg, { scale: 2.2, duration: 0.5, ease: "power2.out" });
        if (text) gsap.to(text, { color: "#ffffff", duration: 0.5, ease: "power2.out" });
      };
      const onLeave = () => {
        if (glow) gsap.to(glow, { opacity: 0, duration: 0.4, ease: "power2.out" });
        if (bg) gsap.to(bg, { scale: 0, duration: 0.5, ease: "power2.out" });
        if (text) gsap.to(text, { color: "#000000", duration: 0.5, ease: "power2.out" });
      };

      button.addEventListener("mousemove", onMove);
      button.addEventListener("mouseenter", onEnter);
      button.addEventListener("mouseleave", onLeave);
      cleanups.push(() => {
        button.removeEventListener("mousemove", onMove);
        button.removeEventListener("mouseenter", onEnter);
        button.removeEventListener("mouseleave", onLeave);
      });
    });

    return () => cleanups.forEach((fn) => fn());
  }, [reduced, scope]);
}
