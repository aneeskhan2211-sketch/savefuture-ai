import { Skeleton } from "@/components/ui/skeleton";
import { useProfile } from "@/hooks/useProfile";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

interface AuthGuardProps {
  children: React.ReactNode;
  requireProfile?: boolean;
}

export function AuthGuard({ children, requireProfile = true }: AuthGuardProps) {
  const { isAuthenticated, isInitializing } = useInternetIdentity();
  const { data: profile, isLoading } = useProfile();
  const navigate = useNavigate();

  useEffect(() => {
    if (isInitializing || isLoading) return;
    if (!isAuthenticated) {
      navigate({ to: "/" });
      return;
    }
    if (requireProfile && !profile) {
      navigate({ to: "/onboarding" });
    }
  }, [
    isAuthenticated,
    isInitializing,
    isLoading,
    navigate,
    profile,
    requireProfile,
  ]);

  if (isInitializing || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="flex flex-col items-center gap-4">
          <Skeleton className="w-16 h-16 rounded-full" />
          <Skeleton className="w-32 h-4" />
        </div>
      </div>
    );
  }

  if (!isAuthenticated) return null;
  if (requireProfile && !profile) return null;

  return <>{children}</>;
}
