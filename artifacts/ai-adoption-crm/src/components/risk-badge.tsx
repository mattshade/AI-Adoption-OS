import { cn } from "@/lib/utils";
import type { RiskLevel } from "@/data/seed";

const STYLES: Record<RiskLevel, string> = {
  Low: "bg-secondary text-foreground/80 border border-border",
  Medium: "bg-[hsl(38_60%_94%)] text-[hsl(38_60%_28%)] border border-[hsl(38_60%_85%)] dark:bg-[hsl(38_40%_18%)] dark:text-[hsl(38_60%_75%)] dark:border-[hsl(38_30%_28%)]",
  High: "bg-[hsl(8_60%_94%)] text-[hsl(8_62%_36%)] border border-[hsl(8_60%_85%)] dark:bg-[hsl(8_40%_18%)] dark:text-[hsl(8_60%_72%)] dark:border-[hsl(8_30%_28%)]",
  Critical: "bg-[hsl(8_62%_38%)] text-white border border-[hsl(8_62%_30%)]",
};

export function RiskBadge({ level, className }: { level: RiskLevel; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10.5px] font-medium uppercase tracking-[0.08em]",
        STYLES[level],
        className,
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full",
        level === "Low" && "bg-foreground/35",
        level === "Medium" && "bg-[hsl(38_60%_45%)]",
        level === "High" && "bg-[hsl(8_62%_48%)]",
        level === "Critical" && "bg-white",
      )} />
      {level}
    </span>
  );
}
