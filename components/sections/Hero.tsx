"use client";

import { useRef } from "react";
import { Circle, Square, Triangle } from "lucide-react";
import { site } from "@/content/site";
import HeroMotion from "@/components/motion/HeroMotion";

const iconMap = {
  circle: Circle,
  square: Square,
  triangle: Triangle,
} as const;

/**
 * Hero — estrutura espelhada do Quantara (sign-quantara.webflow.io):
 *
 *   section#hero (main-section overflow)
 *   ├── wrapper-overflow         ← container central, z=10
 *   │   └── wrapper-hero
 *   │       ├── wrapper-text-hero
 *   │       │   └── block-text-hero
 *   │       │       ├── wrapper-sub-title-hero  ← linha pequena
 *   │       │       └── text-hero               ← headline grande
 *   │       └── wrapper-content-hero
 *   │           └── scroll-indicator           ← Lottie no Quantara, CSS aqui
 *   └── bg-animation-hero        ← absolute inset-0, z=0
 *       ├── block-content-hero.v1  (top, bottom-left aligned)
 *       │   └── wrapper-subcontent-hero.v1  → ícone + label scramble VISÃO
 *       ├── block-content-hero.v2  (middle, right aligned)
 *       │   └── wrapper-subcontent-hero.v2  → ícone + label scramble PRECISÃO
 *       └── block-content-hero.v3  (bottom, top-center aligned)
 *           └── wrapper-subcontent-hero.v3  → ícone + label scramble RIGOR
 */
export default function Hero() {
  const { hero } = site;
  const scopeRef = useRef<HTMLElement>(null);

  return (
    <section
      id="hero"
      ref={scopeRef}
      className="main-section overflow"
    >
      {/* Background (Anim 1 parallax target) + 3 corner subcontent blocks */}
      <div className="bg-animation-hero">
        {hero.principles.map((p, i) => {
          const Icon = iconMap[p.icon as keyof typeof iconMap];
          const v = (i + 1) as 1 | 2 | 3;
          return (
            <div key={p.label} className={`block-content-hero v${v}`}>
              <div className={`wrapper-subcontent-hero v${v}`}>
                <div className="image-icon-hero">
                  <Icon className="h-full w-full" strokeWidth={1} />
                </div>
                <div className="text-subcontent-hero">
                  <div className={`scramble v${v}`}>{p.label}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Central content (text + scroll indicator) */}
      <div className="wrapper-overflow">
        <div className="wrapper-hero">
          <div className="wrapper-text-hero">
            <div className="block-text-hero">
              <div className="wrapper-sub-title-hero">
                {hero.headline_line1}
              </div>
              <h1 className="text-hero">{hero.headline_line2}</h1>
            </div>
          </div>
          <div className="wrapper-content-hero" aria-hidden>
            <div className="scroll-indicator" />
          </div>
        </div>
      </div>

      <HeroMotion scope={scopeRef} />
    </section>
  );
}
