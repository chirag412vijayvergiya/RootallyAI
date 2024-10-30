import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProgram } from "../services/apiPrograms";
import toast from "react-hot-toast";

export function useDeleteProgram() {
  const queryClient = useQueryClient();
  const { isPending: isDeleting, mutate: deleteprogram } = useMutation({
    mutationFn: deleteProgram,
    onSuccess: () => {
      toast.success("Program successfully deleted");

      queryClient.invalidateQueries({
        queryKey: ["programs"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteprogram };
}
