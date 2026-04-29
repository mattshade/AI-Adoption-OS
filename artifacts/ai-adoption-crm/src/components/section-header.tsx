import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function SectionHeader({
  eyebrow,
  title,
  description,
  action,
  align = "left",
  className,
  size = "md",
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  align?: "left" | "center";
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}) {
  const titleSize =
    size === "sm"
      ? "text-2xl"
      : size === "md"
        ? "text-3xl"
        : size === "lg"
          ? "text-5xl"
          : "text-6xl md:text-7xl";
  return (
    <div
      className={cn(
        "flex w-full",
        align === "center" ? "flex-col items-center text-center" : "items-end justify-between gap-6",
        className,
      )}
    >
      <div className={cn("max-w-3xl", align === "center" && "mx-auto")}>
        {eyebrow && (
          <div className="mb-3 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
            {eyebrow}
          </div>
        )}
        <h2 className={cn("font-serif tracking-tight text-foreground", titleSize)}>
          {title}
        </h2>
        {description && (
          <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
            {description}
          </p>
        )}
      </div>
      {action && align !== "center" && <div className="shrink-0">{action}</div>}
    </div>
  );
}
