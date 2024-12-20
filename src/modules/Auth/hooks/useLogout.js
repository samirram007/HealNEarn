
import { useNavigate } from 'react-router';
import { toast } from "sonner";


import { queryClient } from '@/lib/queryClient';
import { useMutation } from '@tanstack/react-query';
import { useAuth } from "../contexts/features/useAuth";
import { logoutService } from "../services/apis";

export function useLogout() {

  const navigate = useNavigate()
  const { setUser, setToken } = useAuth();

  return useMutation({
    mutationFn: logoutService,
    onSuccess: () => {
      console.log("logout success.....");

      setUser({});
      setToken(null, null);
      queryClient.clear();
      navigate("/login")
    },
    onError: (err) => {
      toast(err.response.data.message)
    }
  })
}