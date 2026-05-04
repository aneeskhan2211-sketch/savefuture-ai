import { createActor } from "@/backend";
import type { Expense } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";

export function useExpenses() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Expense[]>({
    queryKey: ["expenses"],
    queryFn: async () => {
      if (!actor) return [];
      return (
        actor as unknown as { listExpenses: () => Promise<Expense[]> }
      ).listExpenses();
    },
    enabled: !!actor && !isFetching,
  });
}
