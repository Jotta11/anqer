"use client";

import * as React from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type MainButtonProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  label: string;
  href?: string;
};

/**
 * Botão principal do Quantara — pílula branca, label + ícone seta,
 * paddings em vw conforme spec. Será magnético na Etapa 2 (motion).
 */
export default function MainButton({
  label,
  href = "#",
  className,
  ...rest
}: MainButtonProps) {
  return (
    <a
      href={href}
      data-main-button
      className={cn(
        "group relative inline-flex items-center justify-between gap-3 rounded-full bg-white text-almost-black font-medium",
        "transition-[transform,background-color,color] duration-300 ease-expo-out",
        "hover:bg-blue hover:text-white",
        className
      )}
      style={{
        paddingTop: "var(--main-button-y)",
        paddingBottom: "var(--main-button-y)",
        paddingLeft: "var(--main-button-x)",
        paddingRight: "var(--main-button-x)",
      }}
      {...rest}
    >
      <span className="text-base leading-none">{label}</span>
      <span
        aria-hidden
        className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-almost-black text-white transition-transform duration-300 group-hover:rotate-45"
      >
        <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
      </span>
    </a>
  );
}
