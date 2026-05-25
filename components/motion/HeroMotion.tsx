"use client";

import { type RefObject } from "react";
import { useHeroParallax } from "./useHeroParallax";
import { useScrambleHero } from "./useScrambleHero";
import { useInitialReveal } from "./useInitialReveal";

type Props = {
  scope: RefObject<HTMLElement>;
};

/**
 * Orquestra as animações do hero (sem orbits — orbits ficam em Features):
 *  - Anim 18: reveal inicial (page load)
 *  - Anim 1:  parallax do bg com mouse
 *  - Anim 16: scramble loop nos 3 labels corner
 */
export default function HeroMotion({ scope }: Props) {
  useInitialReveal();
  useHeroParallax(scope);
  useScrambleHero(scope);
  return null;
}
