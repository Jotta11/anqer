"use client";

import { useRef } from "react";
import { site } from "@/content/site";
import { useMagneticButton } from "@/components/motion/useMagneticButton";

/**
 * CTA final — painel escuro com cantos inferiores arredondados que sobe
 * revelando o footer claro (efeito cortina do Quantara). Botão magnético
 * (Anims 10 + 11).
 */
export default function FinalCTA() {
  const { finalCta } = site;
  const scopeRef = useRef<HTMLElement>(null);
  useMagneticButton(scopeRef);

  return (
    <section
      id="contact"
      ref={scopeRef}
      data-final-cta
      className="main-section final-cta"
    >
      <div className="final-cta-bg" aria-hidden />
      <div className="final-cta-content">
        <p className="final-cta-eyebrow">{finalCta.eyebrow}</p>
        <h2 className="final-cta-title text-balance" data-final-cta-headline>
          {finalCta.title}
        </h2>
        <a
          href={`mailto:${site.hero.contact.value}`}
          className="main-button primary"
          data-magnetic-button
        >
          <span className="wrapper-button-primary-bg" aria-hidden />
          <span className="bg-button-primary" aria-hidden />
          <span className="text-menu">{finalCta.cta.label}</span>
        </a>
      </div>
    </section>
  );
}
