import axiosClient from "@/lib/axios-client";

export async function fetchUserProfileService() {

    return (await axiosClient.get("/profile"))
}
export async function passwordChangeService(payload) {
    // console.log(payload)
    return (await axiosClient.post("/password_change", payload))
}
export async function statusChangeService(payload) {
    // console.log(payload)
    return (await axiosClient.post("/status_change", payload))
}