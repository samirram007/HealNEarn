import { queryClient } from "@/lib/queryClient";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "react-router";
import { toast } from "sonner";
import { statusChangeService } from "../services/apis";

export function useUserStatusChangeMutation() {

    const param = useParams()
    return useMutation({
        mutationFn: statusChangeService,
        onSuccess: (response) => {
            // console.log('this is response', param.id);
            queryClient.invalidateQueries(['members'])

            // toast.success("Data Saved Successfully");
        },
        onError: (error) => {
            if (error.response.data.errors) {
                Object.keys(error.response.data.errors).forEach((key) => {
                    const errorMessages = error.response.data.errors[key];
                    errorMessages.forEach((err) => {
                        toast.error(err)
                        console.log(err); // Log individual error messages
                    });
                });
            }
            else {

                toast.error(error.response.data.message)
            }
        }
    })
}