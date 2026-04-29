import { cn } from "@/lib/utils";

export function ScoreBar({
  value,
  className,
  tone = "default",
  width = "w-24",
  showValue = false,
}: {
  value: number;
  className?: string;
  tone?: "default" | "accent" | "muted";
  width?: string;
  showValue?: boolean;
}) {
  const clamped = Math.min(100, Math.max(0, value));
  const fill =
    tone === "accent"
      ? "bg-[hsl(var(--accent))]"
      : tone === "muted"
        ? "bg-foreground/40"
        : "bg-foreground";
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className={cn("h-1 rounded-full bg-secondary", width)}>
        <div className={cn("h-1 rounded-full", fill)} style={{ width: `${clamped}%` }} />
      </div>
      {showValue && (
        <span className="text-[11px] tabular-nums text-muted-foreground">{clamped}</span>
      )}
    </div>
  );
}
