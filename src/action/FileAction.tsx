
import { CreatePostRequest, postUpdateRequest, postUpdateResponse } from "../interface/PostInterface";
import { AxiosError, AxiosResponse } from "axios";
import { commonResponse, ErrorResponse } from "../interface/AuthInterface";
import { createPostApi, updatePostApi } from "../api/api";





const headers = {
    'Content-Type': 'multipart/form-data',
};




// Create post action


export const createPostAsync = (createPostRequest: CreatePostRequest) =>
    async () => {
        try {
            const response: AxiosResponse<commonResponse> = await createPostApi(createPostRequest, headers)
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




// Update post action



export const updatePostAsync = (postUpdate: postUpdateRequest) =>
    async () => {
        console.log(postUpdate)
        try {
            const response: AxiosResponse<postUpdateResponse> = await updatePostApi(postUpdate, headers);
            console.log(response.data.message);
            return {
                "postId":response.data.postId,
                "message": response.data.message,
                "status": response.status
            };
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
    };