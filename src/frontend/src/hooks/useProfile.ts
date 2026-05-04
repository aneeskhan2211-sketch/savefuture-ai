import { createActor } from "@/backend";
import type { UserProfile } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";

export function useProfile() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<UserProfile | null>({
    queryKey: ["profile"],
    queryFn: async () => {
      if (!actor) return null;
      const result = await (
        actor as unknown as {
          getCallerUserProfile: () => Promise<[] | [UserProfile]>;
        }
      ).getCallerUserProfile();
      if (Array.isArray(result) && result.length > 0)
        return result[0] as UserProfile;
      return null;
    },
    enabled: !!actor && !isFetching,
  });
}
