import { useQuery } from "@tanstack/react-query"
import { fetchMemberService, fetchMembersService } from "../services/apis"

export function useMembers() {

  return useQuery({
    queryKey: ['members'],
    queryFn: fetchMembersService,
    enabled: false,
    staleTime: Infinity,
  })
}
export function useMember(id) {
  return useQuery({
    queryKey: ['members', id],
    queryFn: () => fetchMemberService(id),
  })
}

