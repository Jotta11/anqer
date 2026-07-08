"use client";

import { useRef } from "react";
import { site } from "@/content/site";
import FeaturesMotion from "@/components/motion/FeaturesMotion";

const ORBIT_SRC =
  "https://cdn.prod.website-files.com/694f372b123017b1e0a43316/69538ffea86737e86bae05ee_Orbit%201.png";

/**
 * Features — composição in-flow do Quantara (seção entre product e lab):
 *
 *  ┌───────────────────────────────────────────────────────┐
 *  │ CONFIÁVEL                    ESCALÁVEL                │
 *  │  (orbits girando,             [card: imagem + título  │
 *  │   overflow -35vw à esq.)       + descrição]           │
 *  │                                          AUTOMATIZADO │
 *  │              [counter circle 0→100]                   │
 *  └───────────────────────────────────────────────────────┘
 *
 *  + marquee de tags no topo.
 */
export default function Features() {
  const { features } = site;
  const scopeRef = useRef<HTMLElement>(null);
  const [p1, p2, p3] = features.pillars;

  return (
    <section
      id="features"
      ref={scopeRef}
      data-features
      className="main-section features-section"
    >
      {/* Tag marquee */}
      <div data-features-marquee className="features-marquee">
        <div className="features-marquee-track">
          {[...features.tags, ...features.tags].map((tag, i) => (
            <span key={`${tag}-${i}`} className="feature-tag">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Composição principal (um content-feature, como no Quantara) */}
      <div className="content-feature">
        {/* Labels scramble */}
        <div className="feature-label v1">
          <span className="scramble">{p1.label}</span>
        </div>
        <div className="feature-label v2">
          <span className="scramble">{p2.label}</span>
        </div>
        <div className="feature-label v3">
          <span className="scramble">{p3.label}</span>
        </div>

        {/* Orbits (Anim 2) — overflow pra fora da viewport à esquerda */}
        <div className="wrapper-orbits" aria-hidden>
          <img className="image-orbit v1" src={ORBIT_SRC} alt="" />
          <img className="image-orbit v2" src={ORBIT_SRC} alt="" />
          <img className="image-orbit v3" src={ORBIT_SRC} alt="" />
          <img className="image-orbit v4" src={ORBIT_SRC} alt="" />
        </div>

        {/* Texto do pilar 1 (junto aos orbits) */}
        <div className="feature-caption v1">
          <h4 className="feature-caption-title">{p1.title}</h4>
          <p className="feature-caption-desc">{p1.description}</p>
        </div>

        {/* Card do pilar 2 */}
        <div className="feature-card">
          <div className="feature-card-image" aria-hidden />
          <div className="feature-card-text">
            <h4 className="feature-card-title">{p2.title}</h4>
            <p className="feature-card-desc">{p2.description}</p>
          </div>
        </div>

        {/* Counter circle (Anim 17 / C4) — pilar 3 */}
        <div className="feature-counter">
          <svg
            className="radial-mask"
            viewBox="0 0 100 100"
            aria-hidden
          >
            <circle
              cx="50"
              cy="50"
              r="48"
              fill="none"
              stroke="rgba(255,255,255,0.55)"
              strokeWidth="1.4"
              strokeDasharray="0.6 2.6"
            />
          </svg>
          <div className="circle-empty" aria-hidden />
          <div className="wrapper-text-counting">
            <span className="big-text">0</span>
          </div>
        </div>
        <div className="feature-caption v3">
          <h4 className="feature-caption-title">{p3.title}</h4>
          <p className="feature-caption-desc">{p3.description}</p>
        </div>
      </div>

      <FeaturesMotion scope={scopeRef} />
    </section>
  );
}
