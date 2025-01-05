import { ErrorResponse, registerRequest, commonResponse, verifyRequest, loginRequest, loginResponse } from "../interface/AuthInterface";
import { deletePostApi, loginApi, postListApi, signUpApi, uniqPostApi, verifyApi } from "../api/api";
import { AxiosError, AxiosResponse } from "axios";
import { Dispatch } from "@reduxjs/toolkit";
import { setUserLogin } from "../redux/slice/userSlice";
import store from "../redux/store/store";
const token = store.getState().auth.access;

const headers = {
    'Content-Type': 'application/json'
}


// Sign up action

export const signUpAsync = (registerRequest: registerRequest) =>
    async (): Promise<{ message: string; status: number }> => {
        try {
            console.log(registerRequest)
            const response: AxiosResponse<commonResponse> = await signUpApi(registerRequest, headers)
            return {
                "message": response.data.message,
                "status": response.status
            }
        } catch (error: unknown) {
            if (error instanceof AxiosError && error.response) {
                const errorResponse = error.response.data as ErrorResponse;
                const errorStatus = error.response.status || 500;
                return {
                    message: errorResponse.message || "An error occurred",
                    status: errorStatus,
                };
            }
            return {
                message: "An unexpected error occurred",
                status: 500,
            };
        }
    }



// Verification Action

export const verifyAsync = (verifyRequest: verifyRequest) =>
    async () => {
        try {
            const response: AxiosResponse<commonResponse> = await verifyApi(verifyRequest, headers)
            console.log("response", response)
            return {
                "message": response.data.message,
                "status": response.status
            }
        } catch (error: unknown) {
            if (error instanceof AxiosError && error.response) {
                const errorResponse = error.response.data as ErrorResponse;
                const errorStatus = error.response.status || 500;
                return {
                    message: errorResponse.message || "An error occurred",
                    status: errorStatus,
                };
            }
            return {
                message: "An unexpected error occurred",
                status: 500,
            };
        }
    }



// Login action

export const loginAsync = (loginRequest: loginRequest) =>
    async (dispatch: Dispatch) => {
        try {
            const response: AxiosResponse<loginResponse> = await loginApi(loginRequest, headers)
            dispatch(setUserLogin(response.data))
            console.log(response.data.message)
            return {
                "message": response.data.message,
                "status": response.status
            }
        }
        catch (error: unknown) {
            if (error instanceof AxiosError && error.response) {
                const errorResponse = error.response.data as ErrorResponse;
                const errorStatus = error.response.status || 500;
                return {
                    message: errorResponse.message || "An error occurred",
                    status: errorStatus,
                };
            }
            return {
                message: "An unexpected error occurred",
                status: 500,
            };
        }
    }




// Get all post


export const allPostAsync = (userId: string) =>
    async () => {
        try {
            const response: AxiosResponse<any> = await postListApi(userId, headers)
            return {
                "data": response.data.posts,
                "status": response.status
            }
        }
        catch (error: unknown) {
            if (error instanceof AxiosError && error.response) {
                const errorResponse = error.response.data as ErrorResponse;
                const errorStatus = error.response.status || 500;
                return {
                    message: errorResponse.message || "An error occurred",
                    status: errorStatus,
                };
            }
            return {
                message: "An unexpected error occurred",
                status: 500,
            };
        }
    }


// Take unique post


export const uniqPostAsync = (postId: string) =>
    async () => {
        try {
            const response: AxiosResponse<any> = await uniqPostApi(postId, headers)
            return {
                "data": response.data.posts,
                "status": response.status
            }
        }
        catch (error: unknown) {
            if (error instanceof AxiosError && error.response) {
                const errorResponse = error.response.data as ErrorResponse;
                const errorStatus = error.response.status || 500;
                return {
                    message: errorResponse.message || "An error occurred",
                    status: errorStatus,
                };
            }
            return {
                message: "An unexpected error occurred",
                status: 500,
            };
        }
    }


    // Delete post


    export const deletePostAsync = (postId: string) =>
        async () => {
            try {
                const response: AxiosResponse<commonResponse> = await deletePostApi(postId, headers)
                return {
                    "data": response.data.message,
                    "status": response.status
                }
            }
            catch (error: unknown) {
                if (error instanceof AxiosError && error.response) {
                    const errorResponse = error.response.data as ErrorResponse;
                    const errorStatus = error.response.status || 500;
                    return {
                        message: errorResponse.message || "An error occurred",
                        status: errorStatus,
                    };
                }
                return {
                    message: "An unexpected error occurred",
                    status: 500,
                };
            }
        }




