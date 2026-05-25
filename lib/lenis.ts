import Lenis from "@studio-freight/lenis";

export const lenisConfig: ConstructorParameters<typeof Lenis>[0] = {
  lerp: 0.1,
  smoothWheel: true,
  wheelMultiplier: 1,
  touchMultiplier: 1.5,
  syncTouch: false,
  duration: 1.2,
  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
};

export { Lenis };
