import { cn } from "@/lib/utils";
import type { AdoptionStage } from "@/data/seed";

const STYLES: Record<AdoptionStage, string> = {
  "Not started": "bg-secondary text-muted-foreground",
  "Discovery": "bg-secondary text-foreground/80",
  "Pilot": "bg-[hsl(38_45%_94%)] text-[hsl(38_60%_30%)] dark:bg-[hsl(38_30%_18%)] dark:text-[hsl(38_60%_75%)]",
  "Training scheduled": "bg-[hsl(218_30%_94%)] text-[hsl(218_40%_30%)] dark:bg-[hsl(218_25%_18%)] dark:text-[hsl(218_40%_75%)]",
  "Active adoption": "bg-[hsl(158_28%_92%)] text-[hsl(158_40%_22%)] dark:bg-[hsl(158_25%_16%)] dark:text-[hsl(158_40%_70%)]",
  "Scaled": "bg-[hsl(158_32%_28%)] text-white dark:bg-[hsl(158_32%_50%)] dark:text-[hsl(24_10%_10%)]",
  "Needs support": "bg-[hsl(8_60%_94%)] text-[hsl(8_62%_36%)] dark:bg-[hsl(8_40%_18%)] dark:text-[hsl(8_60%_72%)]",
};

export function StageBadge({ stage, className }: { stage: AdoptionStage; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium tracking-tight",
        STYLES[stage],
        className,
      )}
    >
      {stage}
    </span>
  );
}
