import { FeatureLockOverlay } from "@/components/FeatureLockOverlay";
import { useSubscription } from "@/hooks/useSubscription";

interface PremiumGuardProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

export function PremiumGuard({
  children,
  title,
  description,
}: PremiumGuardProps) {
  const { data: subscription } = useSubscription();
  const isPremium = subscription?.status === "active";

  return (
    <FeatureLockOverlay
      locked={!isPremium}
      title={title}
      description={description}
    >
      {children}
    </FeatureLockOverlay>
  );
}
