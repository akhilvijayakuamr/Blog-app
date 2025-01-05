export interface CreatePostRequest {
    id: string,
    title: string,
    description: string,
    image: any
}



export interface AllPost {
    created_at: string,
    description: string,
    id: number,
    image: any,
    postId: number,
    title: string,
    username: string
}



export interface uniquePostResponse {
    title: string;
    created_at: string;
    description: string;
    id: number;
    image: string | null;
    postId: number;
    username: string
}


export interface postUpdateRequest {
    title: string;
    description: string;
    id: number;
    image: any;
    postId: number;
}


export interface postUpdateResponse {
    message: string;
    postId:string;
    status: number;
}


