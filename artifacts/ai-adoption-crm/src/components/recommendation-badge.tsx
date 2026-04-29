import { cn } from "@/lib/utils";

type Rec = "Adopt" | "Pilot" | "Monitor" | "Retire";

const STYLES: Record<Rec, string> = {
  Adopt: "bg-[hsl(158_32%_28%)] text-white border-transparent",
  Pilot: "bg-secondary text-foreground border-border",
  Monitor: "bg-[hsl(38_45%_94%)] text-[hsl(38_60%_30%)] border-[hsl(38_50%_85%)] dark:bg-[hsl(38_30%_18%)] dark:text-[hsl(38_60%_75%)] dark:border-[hsl(38_30%_30%)]",
  Retire: "bg-[hsl(8_60%_94%)] text-[hsl(8_62%_36%)] border-[hsl(8_50%_85%)] dark:bg-[hsl(8_40%_18%)] dark:text-[hsl(8_60%_72%)] dark:border-[hsl(8_30%_30%)]",
};

export function RecommendationBadge({ value, className }: { value: Rec; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10.5px] font-medium uppercase tracking-[0.1em]",
        STYLES[value],
        className,
      )}
    >
      {value}
    </span>
  );
}
