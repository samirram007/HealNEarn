import { queryClient } from "@/lib/queryClient";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteManagerService } from "../services/apis";

export function useManagerDeleteMutation() {

    return useMutation({
        mutationFn: deleteManagerService,
        onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: ['managers'] })
            toast.success("Data Updated Successfully");
        },
        onError: (error) => {
            toast.error(error.response.data.message)
        }
    })
}