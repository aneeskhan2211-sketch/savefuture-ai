import { Card } from "@/components/ui/card";
import { type LucideIcon, TrendingDown, TrendingUp } from "lucide-react";

interface SavingsCardProps {
  icon: LucideIcon;
  title: string;
  amount: string;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  subtitle?: string;
  variant?: "default" | "premium";
  "data-ocid"?: string;
}

export function SavingsCard({
  icon: Icon,
  title,
  amount,
  trend,
  trendValue,
  subtitle,
  variant = "default",
  "data-ocid": dataOcid,
}: SavingsCardProps) {
  return (
    <Card
      className={`p-4 flex flex-col gap-2 transition-smooth hover:shadow-premium ${
        variant === "premium"
          ? "card-premium border-accent/30 bg-accent/5"
          : "card-elevated"
      }`}
      data-ocid={dataOcid}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className={`w-9 h-9 rounded-lg flex items-center justify-center ${
              variant === "premium" ? "bg-accent/20" : "bg-primary/10"
            }`}
          >
            <Icon
              className={`w-4 h-4 ${variant === "premium" ? "text-accent" : "text-primary"}`}
            />
          </div>
          <span className="text-sm font-body text-muted-foreground">
            {title}
          </span>
        </div>
        {trend && trendValue && (
          <div
            className={`flex items-center gap-1 text-xs font-medium ${
              trend === "up"
                ? "text-green-600"
                : trend === "down"
                  ? "text-destructive"
                  : "text-muted-foreground"
            }`}
          >
            {trend === "up" ? (
              <TrendingUp className="w-3 h-3" />
            ) : trend === "down" ? (
              <TrendingDown className="w-3 h-3" />
            ) : null}
            {trendValue}
          </div>
        )}
      </div>
      <div className="flex flex-col">
        <span className="font-display font-bold text-xl text-foreground">
          {amount}
        </span>
        {subtitle && (
          <span className="text-xs text-muted-foreground">{subtitle}</span>
        )}
      </div>
    </Card>
  );
}
