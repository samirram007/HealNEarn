import { useQuery } from "@tanstack/react-query"
import { fetchManagerService, fetchManagersService } from "../services/apis"

export function useManagers() {

  return useQuery({
    queryKey: ['managers'],
    queryFn: fetchManagersService,
    enabled: false,
    staleTime: Infinity,
  })
}
export function useManager(id) {
  return useQuery({
    queryKey: ['managers', id],
    queryFn: () => fetchManagerService(id),
  })
}

