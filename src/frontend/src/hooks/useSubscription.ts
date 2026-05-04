import { createActor } from "@/backend";
import type { PremiumSubscription } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";

export function useSubscription() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<PremiumSubscription | null>({
    queryKey: ["subscription"],
    queryFn: async () => {
      if (!actor) return null;
      const result = await actor.getMySubscription();
      if (result === null || result === undefined) return null;
      return result as PremiumSubscription;
    },
    enabled: !!actor && !isFetching,
  });
}
