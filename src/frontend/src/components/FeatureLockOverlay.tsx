import { Button } from "@/components/ui/button";
import { useAppStore } from "@/store/appStore";
import { useNavigate } from "@tanstack/react-router";
import { Lock } from "lucide-react";

interface FeatureLockOverlayProps {
  children: React.ReactNode;
  locked?: boolean;
  title?: string;
  description?: string;
}

export function FeatureLockOverlay({
  children,
  locked = true,
  title = "Premium Feature",
  description = "Upgrade to unlock full access to this feature.",
}: FeatureLockOverlayProps) {
  const navigate = useNavigate();
  const openPremiumModal = useAppStore((s) => s.openPremiumModal);

  if (!locked) return <>{children}</>;

  return (
    <div
      className="relative overflow-hidden rounded-xl"
      data-ocid="feature_lock_overlay"
    >
      <div className="pointer-events-none select-none blur-sm opacity-60">
        {children}
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-card/80 backdrop-blur-sm rounded-xl gap-3 p-4">
        <div className="w-12 h-12 rounded-full bg-accent/15 flex items-center justify-center">
          <Lock className="w-6 h-6 text-accent" />
        </div>
        <div className="text-center">
          <p className="font-display font-bold text-foreground text-base">
            {title}
          </p>
          <p className="text-muted-foreground text-sm mt-1">{description}</p>
        </div>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => navigate({ to: "/premium" })}
            data-ocid="feature_lock.view_plans_button"
          >
            View Plans
          </Button>
          <Button
            size="sm"
            className="bg-accent hover:bg-accent/90 text-accent-foreground"
            onClick={openPremiumModal}
            data-ocid="feature_lock.upgrade_button"
          >
            Upgrade Now
          </Button>
        </div>
      </div>
    </div>
  );
}
