import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function EditorialQuote({
  eyebrow,
  children,
  attribution,
  className,
}: {
  eyebrow?: string;
  children: ReactNode;
  attribution?: string;
  className?: string;
}) {
  return (
    <figure className={cn("border-y border-border py-12 md:py-16", className)}>
      {eyebrow && (
        <div className="mb-5 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
          {eyebrow}
        </div>
      )}
      <blockquote className="font-serif text-3xl font-light leading-tight tracking-tight text-foreground md:text-5xl md:leading-[1.05]">
        {children}
      </blockquote>
      {attribution && (
        <figcaption className="mt-5 text-[13px] uppercase tracking-[0.16em] text-muted-foreground">
          {attribution}
        </figcaption>
      )}
    </figure>
  );
}
