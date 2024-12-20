import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { useFormModal } from "../../../contexts/FormModalProvider";
import { queryClient } from "../../../utils/queryClient";
import { deleteDesignationService, storeDesignationService, updateDesignationService } from "../services/apis";


export function useStoreDesignationMutation() {
  const navigate = useNavigate()
  const { setOpen } = useFormModal()
  return useMutation({
    mutationFn: storeDesignationService,
    onSuccess: (data) => {

      queryClient.invalidateQueries({ queryKey: ['designations'] })
      toast.success(data.message);
      navigate("/designations", { replace: true })
      setOpen(false)
    },
    onError: (error) => {
      toast.error(error.response.data.message)
      //  navigate("/school_types/create", { replace: true })


    }
  })
}
export function useUpdateDesignationMutation() {
  const navigate = useNavigate()
  const { setOpen } = useFormModal()
  return useMutation({
    mutationFn: updateDesignationService,
    onSuccess: (data) => {

      queryClient.invalidateQueries({ queryKey: ['designations'] })
      toast.success(data.message);
      navigate("/designations", { replace: true })
      setOpen(false)
    },
    onError: (error) => {
      toast.error(error.response.data.message)
      // navigate("/designations/create", { replace: true })


    }
  })
}
export function useDeleteDesignationMutation() {

  const navigate = useNavigate()
  const { setOpen } = useFormModal()
  return useMutation({
    mutationFn: deleteDesignationService,
    onSuccess: (data) => {

      queryClient.invalidateQueries({ queryKey: ['designations'] })
      toast.success(data.message);
      navigate("/designations", { replace: true })
      setOpen(false)
    },
    onError: (error) => {
      toast.error(error.response.data.message)
      // navigate("/designations/create", { replace: true })


    }
  })
}