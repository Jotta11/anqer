import { cn } from "@/lib/utils";

/**
 * Logo oficial Anqer Technology (ID visual 2026).
 * Símbolo "A" — conceito 01 "direção e evolução": perna esquerda diagonal
 * longa + perna direita curta destacada, ambas chanfradas, em laranja.
 */
export function AnqerSymbol({
  className,
  color = "#F97316",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg
      viewBox="0 0 116 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path d="M55 6 L88 1 L30 96 L0 96 Z" fill={color} />
      <path d="M64 54 L84 46 L115 98 L86 98 Z" fill={color} />
    </svg>
  );
}

type LogoProps = {
  variant?: "symbol" | "lockup";
  className?: string;
};

export default function Logo({ variant = "lockup", className }: LogoProps) {
  if (variant === "symbol") {
    return <AnqerSymbol className={className} />;
  }

  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <AnqerSymbol className="h-[1.7em] w-auto flex-shrink-0" />
      <span className="flex flex-col justify-center leading-none">
        <span className="text-[1em] font-bold uppercase leading-none tracking-[0.08em] text-white">
          Anqer
        </span>
        <span className="mt-[0.28em] text-[0.34em] font-medium uppercase leading-none tracking-[0.42em] text-light-gray">
          Technology
        </span>
      </span>
    </span>
  );
}
