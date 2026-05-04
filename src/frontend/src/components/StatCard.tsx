import { Card } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  subtitle?: string;
  accentColor?: "primary" | "accent" | "success" | "destructive";
  "data-ocid"?: string;
}

const bgMap = {
  primary: "bg-primary/10 text-primary",
  accent: "bg-accent/15 text-accent",
  success: "bg-green-100 text-green-700",
  destructive: "bg-destructive/10 text-destructive",
};

export function StatCard({
  icon: Icon,
  label,
  value,
  subtitle,
  accentColor = "primary",
  "data-ocid": dataOcid,
}: StatCardProps) {
  return (
    <Card
      className="p-4 card-elevated flex items-start gap-3"
      data-ocid={dataOcid}
    >
      <div
        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${bgMap[accentColor]}`}
      >
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex flex-col min-w-0">
        <span className="text-xs text-muted-foreground font-body truncate">
          {label}
        </span>
        <span className="font-display font-bold text-lg text-foreground leading-tight">
          {value}
        </span>
        {subtitle && (
          <span className="text-xs text-muted-foreground truncate">
            {subtitle}
          </span>
        )}
      </div>
    </Card>
  );
}
