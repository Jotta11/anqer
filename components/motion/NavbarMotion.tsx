"use client";

import { useEffect, type RefObject } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "./useReducedMotion";

type Props = {
  scope: RefObject<HTMLElement>;
};

/**
 * Navbar motion:
 *  - Anim 14: nav link hover — slide 10px pra direita e volta (power3.in duplo)
 *  - Anim 15: mobile — esconde no scroll down, mostra no scroll up
 */
export default function NavbarMotion({ scope }: Props) {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !scope.current) return;

    const ctx = gsap.context(() => {
      // Anim 14 — nav link slide right + back
      const links = gsap.utils.toArray<HTMLElement>(".nav-link");
      const enterHandlers = new Map<HTMLElement, () => void>();
      const leaveHandlers = new Map<HTMLElement, () => void>();

      links.forEach((link) => {
        const onEnter = () => {
          gsap
            .timeline({ overwrite: "auto" })
            .to(link, { x: 10, duration: 0.5, ease: "power3.in" })
            .to(link, { x: 0, duration: 0.5, ease: "power3.in" });
        };
        const onLeave = () => {
          gsap.to(link, { x: 0, duration: 0.5, ease: "power3.out", overwrite: "auto" });
        };
        link.addEventListener("mouseenter", onEnter);
        link.addEventListener("mouseleave", onLeave);
        enterHandlers.set(link, onEnter);
        leaveHandlers.set(link, onLeave);
      });

      // Anim 15 — hide on scroll down / show on scroll up (só mobile)
      const mm = gsap.matchMedia();
      mm.add("(max-width: 767px)", () => {
        const st = ScrollTrigger.create({
          start: "top top",
          end: "max",
          onUpdate: (self) => {
            if (self.direction === 1) {
              gsap.to(scope.current, { autoAlpha: 0, duration: 0.3, ease: "power2.out" });
            } else {
              gsap.to(scope.current, { autoAlpha: 1, duration: 0.3, ease: "power2.in" });
            }
          },
        });
        return () => st.kill();
      });

      return () => {
        links.forEach((link) => {
          const onEnter = enterHandlers.get(link);
          const onLeave = leaveHandlers.get(link);
          if (onEnter) link.removeEventListener("mouseenter", onEnter);
          if (onLeave) link.removeEventListener("mouseleave", onLeave);
        });
      };
    }, scope);

    return () => ctx.revert();
  }, [reduced, scope]);

  return null;
}
