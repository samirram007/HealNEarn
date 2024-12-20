import { useMutation } from "@tanstack/react-query";





import { useNavigate } from "react-router";
import { toast } from "sonner";
import { useAuth } from "../contexts/features/useAuth";
import { loginService } from "../services/apis";


export function useLogin() {
  const navigate = useNavigate()
  //console.log('login mutate called');

  const { setUser, setToken } = useAuth();
  return useMutation({
    mutationFn: loginService,
    onSuccess: (response) => {

      setUser(response.data)
      setToken(response.data.token, response.data.refreshToken)
      // queryClient.invalidateQueries({ queryKey: ['user'] })
      // console.log("login success", response);
      navigate("/")
      // toast.success("Login Successful");

    },
    onError: (error) => {
      // console.log("login error", error);

      toast.error(error.response.data.message)

    }
  })
}