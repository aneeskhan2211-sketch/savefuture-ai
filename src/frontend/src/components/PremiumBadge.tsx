import { Sparkles } from "lucide-react";

interface PremiumBadgeProps {
  size?: "sm" | "md";
  label?: string;
}

export function PremiumBadge({
  size = "sm",
  label = "Premium",
}: PremiumBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full font-semibold ${
        size === "sm" ? "text-xs px-2 py-0.5" : "text-sm px-3 py-1"
      } bg-accent/15 text-accent border border-accent/30`}
    >
      <Sparkles className={size === "sm" ? "w-3 h-3" : "w-4 h-4"} />
      {label}
    </span>
  );
}
