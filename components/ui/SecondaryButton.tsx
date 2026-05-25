"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type SecondaryButtonProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  label: string;
  href?: string;
};

/**
 * Botão secundário — outline sobre fundo escuro, paddings em vw.
 */
export default function SecondaryButton({
  label,
  href = "#",
  className,
  ...rest
}: SecondaryButtonProps) {
  return (
    <a
      href={href}
      data-secondary-button
      className={cn(
        "inline-flex items-center justify-center rounded-full border border-white/20 text-white font-medium",
        "transition-colors duration-300 ease-expo-out hover:bg-white/5 hover:border-white/40",
        className
      )}
      style={{
        paddingTop: "var(--top-bottom-padding-button)",
        paddingBottom: "var(--top-bottom-padding-button)",
        paddingLeft: "var(--left-right-padding-contact-us)",
        paddingRight: "var(--left-right-padding-contact-us)",
      }}
      {...rest}
    >
      <span className="text-sm leading-none">{label}</span>
    </a>
  );
}
