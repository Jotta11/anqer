"use client";

import { Check } from "lucide-react";
import { site } from "@/content/site";
import MainButton from "@/components/ui/MainButton";
import SecondaryButton from "@/components/ui/SecondaryButton";
import { cn } from "@/lib/utils";

export default function Pricing() {
  const { pricing } = site;
  return (
    <section
      id="pricing"
      data-pricing
      className="relative w-full overflow-hidden bg-almost-black-2 py-20 md:py-32"
    >
      <div className="container-fluid">
        <p className="eyebrow mb-6">{pricing.eyebrow}</p>
        <h2 className="max-w-5xl text-balance">{pricing.title}</h2>
      </div>

      <div className="container-fluid mt-16 grid grid-cols-1 gap-6 md:mt-24 md:grid-cols-3">
        {pricing.plans.map((plan) => (
          <article
            key={plan.name}
            data-pricing-card
            data-highlighted={plan.highlighted ? "true" : undefined}
            className={cn(
              "group relative flex flex-col gap-8 rounded-2xl border p-8 transition-[filter,border-color] duration-500 ease-expo-out",
              plan.highlighted
                ? "border-blue/40 bg-black-gray"
                : "border-white/[0.06] bg-black-gray grayscale hover:grayscale-0 hover:border-white/20"
            )}
          >
            <div className="flex flex-col gap-2">
              <h3 className="text-2xl md:text-3xl">{plan.name}</h3>
              <p className="text-sm text-light-gray">{plan.description}</p>
            </div>

            <div className="text-lg font-medium text-white">{plan.price}</div>

            <ul className="flex flex-col gap-3">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-sm">
                  <Check
                    className={cn(
                      "mt-0.5 h-4 w-4 flex-shrink-0",
                      plan.highlighted ? "text-blue" : "text-light-gray"
                    )}
                    strokeWidth={2}
                  />
                  <span className="text-light-gray">{feature}</span>
                </li>
              ))}
            </ul>

            <div className="mt-auto pt-4">
              {plan.highlighted ? (
                <MainButton
                  label={plan.cta.label}
                  href={plan.cta.href}
                  className="w-full justify-between"
                />
              ) : (
                <SecondaryButton
                  label={plan.cta.label}
                  href={plan.cta.href}
                  className="w-full justify-center"
                />
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
