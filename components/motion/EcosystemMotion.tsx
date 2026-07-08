"use client";

import { type RefObject } from "react";
import { useMarquee } from "./useMarquee";
import { useEcosystemScrollParallax } from "./useEcosystemScrollParallax";
import { usePartnerHover } from "./usePartnerHover";
import { useBorderFill } from "./useBorderFill";
import { useScrambleLoop } from "./useScrambleLoop";

type Props = {
  scope: RefObject<HTMLElement>;
};

/**
 * Orquestra as animações do Ecosystem:
 *  - Anim 3:  marquee infinito (.block-partners)
 *  - Anim 4:  scroll parallax horizontal (.block-partner-move)
 *  - Anim 5:  hover nos logos parceiros
 *  - Anim 6:  border fill loop (linha animada)
 */
export default function EcosystemMotion({ scope }: Props) {
  useMarquee(scope);
  useEcosystemScrollParallax(scope);
  usePartnerHover(scope);
  useBorderFill(scope);
  useScrambleLoop(scope, ".small-text.secondary.animation-loop");
  return null;
}
