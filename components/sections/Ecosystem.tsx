"use client";

import { useRef } from "react";
import {
  Aperture,
  Box,
  Command,
  Cpu,
  Globe,
  Hexagon,
  Layers,
  Plus,
  Zap,
} from "lucide-react";
import { site } from "@/content/site";
import EcosystemMotion from "@/components/motion/EcosystemMotion";

// Ícones dos lockups placeholder (ícone + wordmark, como os logoipsum do Quantara)
const partnerIcons = [Aperture, Layers, Hexagon, Command, Globe, Zap, Box, Cpu];

/**
 * Ecosystem — estrutura espelhada do Quantara:
 *
 *   section.main-section (data-w-id=...)
 *   └── main-container
 *       └── wrapper-partner
 *           ├── title-partner
 *           │   ├── block-title-partner.v1  → small-text "Onde tecnologia..."
 *           │   └── block-title-partner.v2  → small-text secondary "ECOSSISTEMA" + lottie-plus
 *           ├── wrapper-partners
 *           │   ├── bg-partner.v1           ← gradient feather (left)
 *           │   ├── bg-partner.v2           ← gradient feather (right)
 *           │   └── block-partner-move     ← Anim 4 scroll parallax
 *           │       └── block-partners      ← Anim 3 infinite marquee
 *           │           └── partner
 *           │               └── 2× block-partner.* (10 logos = 5 duplicados)
 *           └── wrapper-border.vertical.v1  ← horizontal line at bottom
 *               ├── border.fill             ← Anim 6 sweep -100% → +100%
 *               └── border.empty
 */
export default function Ecosystem() {
  const { ecosystem } = site;
  const scopeRef = useRef<HTMLElement>(null);
  // Duplicar para marquee infinito
  const logos = [...ecosystem.logos, ...ecosystem.logos];

  return (
    <section
      ref={scopeRef}
      id="ecosystem"
      className="main-section"
    >
      <div className="main-container container-fluid">
        <div className="wrapper-partner">
          {/* Título row */}
          <div className="title-partner">
            <div className="block-title-partner v1">
              <div className="small-text animation">{ecosystem.title}</div>
            </div>
            <div className="block-title-partner v2">
              <div className="small-text secondary animation-loop">
                {ecosystem.eyebrow}
              </div>
              <div className="wrapper-lottie">
                <div className="lottie-plus" aria-hidden>
                  <Plus className="h-full w-full" strokeWidth={1.5} />
                </div>
              </div>
            </div>
          </div>

          {/* Marquee */}
          <div className="wrapper-partners">
            <div className="bg-partner v1" aria-hidden />
            <div className="bg-partner v2" aria-hidden />
            <div className="block-partner-move">
              <div className="block-partners">
                <div className="partner">
                  {logos.map((logo, i) => {
                    const Icon =
                      partnerIcons[i % partnerIcons.length];
                    return (
                      <a
                        key={`${logo.name}-${i}`}
                        href="#"
                        className="block-partner"
                        aria-label={logo.name}
                      >
                        {/* Placeholder enquanto não temos SVGs reais */}
                        <span className="logo-partner">
                          <Icon
                            className="logo-partner-icon"
                            strokeWidth={1.8}
                            aria-hidden
                          />
                          <span>{logo.name}</span>
                        </span>
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Border animada (Anim 6) */}
          <div className="wrapper-border vertical v1">
            <div className="border fill" aria-hidden />
            <div className="border empty" aria-hidden />
          </div>
        </div>
      </div>

      <EcosystemMotion scope={scopeRef} />
    </section>
  );
}
