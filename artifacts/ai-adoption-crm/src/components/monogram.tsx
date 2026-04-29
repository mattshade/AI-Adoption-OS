import { cn } from "@/lib/utils";

function initialsOf(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function Monogram({
  name,
  size = "md",
  className,
}: {
  name: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const dim =
    size === "sm" ? "h-6 w-6 text-[10px]" : size === "md" ? "h-8 w-8 text-[11px]" : "h-12 w-12 text-sm";
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center bg-secondary font-medium uppercase tracking-[0.04em] text-foreground/70",
        dim,
        className,
      )}
    >
      {initialsOf(name)}
    </span>
  );
}
