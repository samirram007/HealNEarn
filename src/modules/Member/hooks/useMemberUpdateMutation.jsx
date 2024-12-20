import { queryClient } from "@/lib/queryClient";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "react-router";
import { toast } from "sonner";
import { updateMemberService } from "../services/apis";

export function useMemberUpdateMutation() {
    const param = useParams()
    return useMutation({
        mutationFn: updateMemberService,
        onSuccess: (response) => {
            queryClient.invalidateQueries(['members', param.id])
            toast.success("Data Updated Successfully");
        },
        onError: (error) => {
            toast.error(error.response.data.message)
        }
    })
}
