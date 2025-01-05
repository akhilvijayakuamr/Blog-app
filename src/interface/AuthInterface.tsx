export interface registerRequest{
    username: string,
    email: string, 
    firstname: string,
    lastname: string,
    password: string,
    confirmpassword: string,
}


export interface loginRequest{
    email:string,
    password:string
}


export interface loginResponse{
    email:string,
    userId:string,
    access:string ,
    refresh:string ,
    // userProfile:string,
    message:string,
    status:string
}


export interface commonResponse {
    message: string;
    status: number;
}


export interface verifyRequest{
    email:string,
    otp:string
}

export interface ErrorResponse {
    message: string;  
}