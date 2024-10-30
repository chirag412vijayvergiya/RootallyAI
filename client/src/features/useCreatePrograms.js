import { useMutation, useQueryClient } from "@tanstack/react-query";
import { saveProgram } from "../services/apiPrograms";
import toast from "react-hot-toast";

export function useCreatePrograms() {
  const queryClient = useQueryClient();
  const { mutate: createProgram, isPending: isCreating } = useMutation({
    mutationFn: saveProgram,
    onSuccess: (data) => {
      toast.success("Program successfully created!");
      queryClient.invalidateQueries({
        queryKey: ["programs"],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { createProgram, isCreating };
}
