interface ProgressRingProps {
  value: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  sublabel?: string;
  color?: "primary" | "accent" | "success";
}

const colorMap = {
  primary: "oklch(var(--primary))",
  accent: "oklch(var(--accent))",
  success: "oklch(0.72 0.15 150)",
};

export function ProgressRing({
  value,
  max = 100,
  size = 80,
  strokeWidth = 7,
  label,
  sublabel,
  color = "primary",
}: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const pct = Math.min(1, Math.max(0, value / max));
  const offset = circumference * (1 - pct);
  const stroke = colorMap[color];

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          className="-rotate-90"
          role="img"
          aria-label={sublabel ?? "Progress indicator"}
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="oklch(var(--muted))"
            strokeWidth={strokeWidth}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={stroke}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{
              transition: "stroke-dashoffset 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          />
        </svg>
        {label && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-display font-bold text-sm text-foreground">
              {label}
            </span>
          </div>
        )}
      </div>
      {sublabel && (
        <span className="text-xs text-muted-foreground text-center">
          {sublabel}
        </span>
      )}
    </div>
  );
}
