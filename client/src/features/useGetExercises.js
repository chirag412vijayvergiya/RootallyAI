import { useQuery } from "@tanstack/react-query";
import { getExercises } from "../services/apiExercise";

export function useGetExercises() {
  const {
    isPending,
    data: exercises,
    error,
  } = useQuery({
    queryKey: ["exercies"],
    queryFn: getExercises,
    retry: 0,
  });
  return { exercises, isPending, error };
}
