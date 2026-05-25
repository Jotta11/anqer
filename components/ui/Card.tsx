"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
};

/**
 * Card genérico — fundo black-gray, borda sutil, padding em vw.
 * Usado em CorePlatform, Features e Pricing.
 */
export default function Card({ className, children, ...rest }: CardProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-white/[0.06] bg-black-gray",
        className
      )}
      style={{
        paddingTop: "var(--content-top-bottom-padding)",
        paddingBottom: "var(--content-top-bottom-padding)",
        paddingLeft: "var(--content-left-right-padding)",
        paddingRight: "var(--content-left-right-padding)",
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
