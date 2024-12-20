import axiosClient from "@/lib/axios-client.js";
import { removeEmptyStrings } from "@/lib/removeEmptyStrings";







export async function fetchUserProfileService() {
    // console.log('loginService called', payload);

    return (await axiosClient.get("/auth/profile")).data
}
export async function loginService(payload) {
    //  console.log('loginService called', payload);

    return (await axiosClient.post("/auth/login", payload)).data
}
export async function registrationService(payload) {
    // console.log('registrationService called', payload);

    return await axiosClient.post("/auth/register", removeEmptyStrings(payload))
        .then(response => {
            // console.log(response.data)
            return response.data
        })
        .catch(error => {
            if (error.response) {
                // console.log(error.response.data);
                // console.log(error.response.status);
                // console.log(error.response.headers);
            } else if (error.request) {
                //console.log(error.request);
            } else {
                //console.log('Error', error.message);
            }
            // console.log(error.config);
            return error;
        });
}
export async function logoutService() {
    // console.log('logoutService called');

    return true;
    //return  (await axiosClient.post("/logout", []))
}

export async function refreshTokenService(payload) {
    console.log('refreshTokenService called');

    const response = await axios.post("/auth/refresh", {
        'Authorization': `Bearer ${payload.refreshToken}`
    }).data;
    // console.log(response);

    return response;
}




