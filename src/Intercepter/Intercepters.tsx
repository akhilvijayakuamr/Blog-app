import axios, { AxiosResponse } from "axios";
import store from "../redux/store/store";
import { getAccessApi } from "../api/api";
import { setAccessToken } from "../redux/slice/userSlice";

const apiClient = axios.create({
    baseURL: 'http://localhost:8000',
});


apiClient.interceptors.request.use(function (config) {
    const token = store.getState().auth.access;
    console.log("token",token)
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    } else {
        console.log('No token found in Redux store.');
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});


apiClient.interceptors.response.use(
    function (response) {
        return response;
    },
    async function (error) {
        console.log("error", error)
        if (axios.isAxiosError(error) && error.response?.status === 401) {
            console.log("is working")
            const refresh = store.getState().auth.refresh;
            console.log("refresh token",refresh)
            if (refresh) {
                console.log("intercepters is called or not")
                try {
                    console.log("call refresh token")
                    const response: AxiosResponse<any> = await getAccessApi(refresh)
                    const newToken = response.data.access
                    store.dispatch(setAccessToken({ access: newToken }))
                    const token = store.getState().auth.access;

                    if (newToken && error.config) {
                        error.config.headers['Authorization'] = `Bearer ${token}`;
                        return apiClient.request(error.config);
                    }
                } catch (tokenError) {
                    console.error("Token refresh failed", tokenError);
                }
            }
        }

        console.log("Error occurred", error);

        return Promise.reject(error);
    }
);


export  {apiClient}