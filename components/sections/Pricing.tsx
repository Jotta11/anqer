"use client";

import { useRef } from "react";
import { site } from "@/content/site";
import { usePricingHover } from "@/components/motion/usePricingHover";
import { cn } from "@/lib/utils";

/**
 * Pricing — cards fiéis ao Quantara: fundo pontilhado, preço gigante,
 * botão full-width mono uppercase, "Principais recursos" com bullets
 * quadrados. Grayscale por padrão + color reveal no hover (Anim 13).
 */
export default function Pricing() {
  const { pricing } = site;
  const scopeRef = useRef<HTMLElement>(null);
  usePricingHover(scopeRef);

  return (
    <section
      id="pricing"
      ref={scopeRef}
      data-pricing
      className="main-section pricing relative w-full overflow-hidden py-20 md:py-28"
    >
      <div className="container-fluid px-[4vw]" data-reveal>
        <p className="eyebrow mb-6">{pricing.eyebrow}</p>
        <h2 className="max-w-5xl text-balance">{pricing.title}</h2>
      </div>

      <div className="container-fluid mt-14 grid grid-cols-1 gap-6 px-[4vw] md:mt-20 md:grid-cols-3 md:gap-[4vw]">
        {pricing.plans.map((plan) => (
          <article
            key={plan.name}
            data-pricing-card
            className={cn(
              "body-card-pricing pricing-card",
              plan.highlighted && "pricing-card-highlighted"
            )}
          >
            <div className="pricing-card-name">
              {plan.name}
              {plan.highlighted && (
                <span className="pricing-card-chip">Mais procurado</span>
              )}
            </div>

            <div className="pricing-card-price">
              <span className="pricing-price-main">{plan.price}</span>
            </div>
            <p className="pricing-card-desc">{plan.description}</p>

            <a href={plan.cta.href} className="pricing-card-cta">
              {plan.cta.label}
            </a>

            <div className="pricing-card-features">
              <h4 className="pricing-features-title">Principais recursos</h4>
              <ul>
                {plan.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
