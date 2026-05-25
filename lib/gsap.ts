"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, ScrambleTextPlugin);

  // Quantara baselines — sobrescrever caso necessário em uma animação específica
  gsap.defaults({
    ease: "power3.out",
    duration: 0.8,
  });

  ScrollTrigger.config({
    ignoreMobileResize: true,
  });
}

export { gsap, ScrollTrigger, SplitText, ScrambleTextPlugin };
