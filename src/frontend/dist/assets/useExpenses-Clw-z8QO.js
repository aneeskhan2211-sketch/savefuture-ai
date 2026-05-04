import { b as useActor, k as useQuery, d as createActor } from "./index-B9bWIxQ1.js";
function useExpenses() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["expenses"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listExpenses();
    },
    enabled: !!actor && !isFetching
  });
}
export {
  useExpenses as u
};
