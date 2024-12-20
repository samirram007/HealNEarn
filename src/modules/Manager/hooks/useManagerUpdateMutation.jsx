import { queryClient } from "@/lib/queryClient";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "react-router";
import { toast } from "sonner";
import { updateManagerService } from "../services/apis";

export function useManagerUpdateMutation() {
    const param = useParams()
    return useMutation({
        mutationFn: updateManagerService,
        onSuccess: (response) => {
            queryClient.invalidateQueries(['managers', param.id])
            toast.success("Data Updated Successfully");
        },
        onError: (error) => {
            toast.error(error.response.data.message)
        }
    })
}
