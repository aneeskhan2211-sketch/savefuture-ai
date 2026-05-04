import { createActor } from "@/backend";
import type { SavingsPlan } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";

export function useSavingsPlan() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<SavingsPlan | null>({
    queryKey: ["savingsPlan"],
    queryFn: async () => {
      if (!actor) return null;
      const result = await (
        actor as unknown as {
          getMySavingsPlan: () => Promise<[] | [SavingsPlan]>;
        }
      ).getMySavingsPlan();
      if (Array.isArray(result) && result.length > 0)
        return result[0] as SavingsPlan;
      return null;
    },
    enabled: !!actor && !isFetching,
  });
}
