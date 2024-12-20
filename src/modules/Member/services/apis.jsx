import axiosClient from "@/lib/axios-client";


export function fetchMemberService(id) {

    return axiosClient.get(`/members/${id}`)
        .then(({ data }) => {
            return data;
        })
}
export function fetchMembersService(payload) {

    return axiosClient.get(`/members`)
        .then(response => {
            return response.data;
        })
        .catch(err => {
            throw err;
        });

}

export function storeMemberService(payload) {
    console.log('store: ', payload)
    return axiosClient.post("/members", payload)
        .then(response => {
            console.log(response)
            return response.data;
        })

}
export function updateMemberService(payload) {
    const { id, ...data } = payload
    return axiosClient.put(`/members/${id}`, data)
        .then(response => {
            return response.data;
        })

}
export function deleteMemberService(payload) {
    const { id, ...data } = payload
    return axiosClient.delete(`/members/${id}`)
        .then(response => {
            return response.data;
        })

}

