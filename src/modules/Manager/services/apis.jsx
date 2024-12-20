import axiosClient from "@/lib/axios-client";


export function fetchManagerService(id) {

    return axiosClient.get(`/managers/${id}`)
        .then(({ data }) => {
            return data;
        })
}
export function fetchManagersService(payload) {
    console.log('managers service called')
    return axiosClient.get(`/managers`)
        .then(response => {
            console.log(response)
            return response.data;
        })
        .catch(err => {
            throw err;
        });

}

export function storeManagerService(payload) {

    return axiosClient.post("/managers", payload)
        .then(response => {
            return response.data;
        })

}
export function updateManagerService(payload) {
    const { id, ...data } = payload
    return axiosClient.put(`/managers/${id}`, data)
        .then(response => {
            return response.data;
        })

}
export function deleteManagerService(payload) {
    const { id, ...data } = payload
    return axiosClient.delete(`/managers/${id}`)
        .then(response => {
            return response.data;
        })

}

