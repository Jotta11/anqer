"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type ScrambleTextProps = React.HTMLAttributes<HTMLSpanElement> & {
  text: string;
  /** quando true, a animação roda continuamente (loop) — implementação na Etapa 2 */
  loop?: boolean;
  as?: "span" | "div" | "p";
};

/**
 * Placeholder estático. A animação de scramble com GSAP ScrambleTextPlugin
 * será conectada na Etapa 2 (ver ANIMATION_SPECS.md, animação dos labels do hero).
 * Por enquanto renderiza o texto final.
 */
export default function ScrambleText({
  text,
  loop = false,
  as: Tag = "span",
  className,
  ...rest
}: ScrambleTextProps) {
  return (
    <Tag
      data-scramble-text
      data-scramble-loop={loop ? "true" : undefined}
      className={cn("inline-block", className)}
      {...rest}
    >
      {text}
    </Tag>
  );
}
