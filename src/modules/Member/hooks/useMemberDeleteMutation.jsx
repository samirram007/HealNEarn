import { queryClient } from "@/lib/queryClient";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteMemberService } from "../services/apis";

export function useMemberDeleteMutation() {

    return useMutation({
        mutationFn: deleteMemberService,
        onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: ['members'] })
            toast.success("Data Updated Successfully");
        },
        onError: (error) => {
            toast.error(error.response.data.message)
        }
    })
}