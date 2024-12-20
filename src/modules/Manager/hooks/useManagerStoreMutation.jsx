import { queryClient } from "@/lib/queryClient";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "react-router";
import { toast } from "sonner";
import { storeManagerService } from "../services/apis";

export function useManagerStoreMutation() {

    const param = useParams()
    return useMutation({
        mutationFn: storeManagerService,
        onSuccess: (response) => {
            // console.log('this is response', param.id);
            queryClient.invalidateQueries(['managers'])

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