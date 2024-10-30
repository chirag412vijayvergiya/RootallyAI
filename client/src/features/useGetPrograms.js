import { useQuery } from "@tanstack/react-query";
import { getPrograms } from "../services/apiPrograms";

export function useGetPrograms() {
  const {
    isPending,
    data: Programs,
    error,
  } = useQuery({
    queryKey: ["programs"],
    queryFn: getPrograms,
    retry: 0,
  });
  return { Programs, isPending, error };
}
