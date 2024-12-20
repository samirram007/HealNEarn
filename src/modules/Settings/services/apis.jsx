import axiosClient from "@/lib/axios-client.js";

export async function fetchSettingsService() {

    return (await axiosClient.get("/settings"))
}