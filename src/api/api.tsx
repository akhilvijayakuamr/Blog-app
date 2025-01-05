
import axios, { AxiosResponse } from "axios";
import { registerRequest, commonResponse, verifyRequest, loginRequest, loginResponse } from "../interface/AuthInterface";
import { AllPost, CreatePostRequest, postUpdateRequest, postUpdateResponse } from "../interface/PostInterface";
import { apiClient } from "../Intercepter/Intercepters";
export const BASE_URL= import.meta.env.VITE_BASE_URL




// Sign up api

export const signUpApi = (registerRequest:registerRequest,  headers: { [key: string]: string }): Promise<AxiosResponse<commonResponse>> =>
    axios.post(`${BASE_URL}/register/`, registerRequest,  {headers})


// Register verifiacation api

export const verifyApi = (verifyRequest:verifyRequest,  headers: { [key: string]: string }): Promise<AxiosResponse<commonResponse>> =>
    axios.post(`${BASE_URL}/verify/`, verifyRequest,  {headers})


// Login api

export const loginApi = (loginRequest:loginRequest, headers: {[key: string]: string}): Promise<AxiosResponse<loginResponse>> =>
    axios.post(`${BASE_URL}/login/`, loginRequest,  {headers})


// Create post api


export const createPostApi = (createPostRequest:CreatePostRequest, headers: {[key: string]: string}): Promise<AxiosResponse<commonResponse>> =>
    apiClient.post(`${BASE_URL}/create_post/`, createPostRequest,  {headers})


// Get all post


export const postListApi = (userId:string, headers:{[key:string]:string}): Promise<AxiosResponse<AllPost[]>> =>
    apiClient.post(`${BASE_URL}/post_list/`,{userId}, {headers});



// Get unique post


export const uniqPostApi = (postId:string, headers:{[key:string]:string}): Promise<AxiosResponse<AllPost[]>> =>
    apiClient.post(`${BASE_URL}/post/`,{postId}, {headers});


// Update post

export const updatePostApi = (postUpdateRequest: postUpdateRequest, headers: { [key: string]: string }): Promise<AxiosResponse<postUpdateResponse>> =>
    apiClient.post(`${BASE_URL}/update/`, postUpdateRequest, { headers });


// Delete post


export const deletePostApi = (postId: string, headers: { [key: string]: string }): Promise<AxiosResponse<commonResponse>> =>
    apiClient.post(`${BASE_URL}/delete/`, {postId}, { headers });



export const getAccessApi = (refresh: string): Promise<AxiosResponse<any>> =>
    axios.post(`${BASE_URL}/refresh/`,{refresh});

