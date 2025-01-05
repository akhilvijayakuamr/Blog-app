import React, { useState } from 'react'
import './Login.css'
import { loginRequest, registerRequest } from '../../../interface/AuthInterface'
import { useDispatch } from 'react-redux'
import { loginAsync, signUpAsync } from '../../../action/Action'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom'

const Login: React.FC = () => {
    const [isSignup, setIsSignup] = useState<boolean>(false)
    const [signUpRequest, setSignUpRequest] = useState<registerRequest>({
        username: '',
        email: '',
        firstname: '',
        lastname: '',
        password: '',
        confirmpassword: '',
    });

    const [loginRequest, setLoginRequest] = useState<loginRequest>({
        email: '',
        password: ''
    })


    const dispatch = useDispatch()
    const navigate = useNavigate()
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    const validateSignUpRequest = (): boolean => {
        if (!signUpRequest.username || !signUpRequest.email || !signUpRequest.password) {
            toast.error("Please fill in all required fields", { position: "top-right" });
            return false;
        }
        if (signUpRequest.password !== signUpRequest.confirmpassword) {
            toast.error("Passwords do not match", { position: "top-right" });
            return false;
        }
        if (!emailRegex.test(signUpRequest.email)) {
            toast.error("Please enter a valid email address", { position: "top-right" });
            return false;
        }
        return true;
    };

    const validateLoginRequest = (): boolean => {
        if (!loginRequest.email || !loginRequest.password) {
            toast.error("Please fill in all required fields", { position: "top-right" });
            return false;
        }
        
        if (!emailRegex.test(loginRequest.email)) {
            toast.error("Please enter a valid email address", { position: "top-right" });
            return false;
        }
        return true;
    };


    // Sign up function

    const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!validateSignUpRequest()) return;
        try {
            const response = await dispatch(signUpAsync(signUpRequest) as any);
            if (response.status >= 200 && response.status < 300) {
                toast.success(response.message, {
                    position: "top-right"
                });
            } else {
                toast.error(response.message, {
                    position: "top-right"
                });
            }
        } catch {
            toast.error("After some time you will retry", {
                position: "top-right"
            });
        }
    }


    // Sign in function


    const handlelogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!validateLoginRequest()) return;
        try {
            const response = await dispatch(loginAsync(loginRequest) as any)

            if (response.status >= 200 && response.status < 300) {
                console.log(response.message)
                toast.success(response.message, {
                    position: "top-right"
                });
                navigate('/home')

            } else {
                toast.error(response.message, {
                    position: "top-right"
                });
            }
        } catch {
            toast.error("After some time you will retry", {
                position: "top-right"
            }); 3
        }
    }


    return (
        <>
            <ToastContainer />
            <div className='main'>
                <input
                    type='checkbox'
                    id='chk'
                    aria-hidden="true"
                    checked={!isSignup}
                    onChange={() => setIsSignup(!isSignup)}
                />
                {isSignup ?

                    <div className='signup'>
                        <form onSubmit={handleSignUp}>
                            <label >
                                Sign Up
                            </label>
                            <input
                                type='text'
                                name='username'
                                value={signUpRequest.username}
                                onChange={(e) => setSignUpRequest({ ...signUpRequest, username: e.target.value })}
                                placeholder='User Name' />
                            <input
                                type='email'
                                name='email'
                                value={signUpRequest.email}
                                onChange={(e) => setSignUpRequest({ ...signUpRequest, email: e.target.value })}
                                placeholder='Email' />
                            <input
                                type='firstName'
                                name='firstName'
                                value={signUpRequest.firstname}
                                onChange={(e) => setSignUpRequest({ ...signUpRequest, firstname: e.target.value })}
                                placeholder='First Name' />
                            <input
                                type='lastName'
                                name='lastName'
                                value={signUpRequest.lastname}
                                onChange={(e) => setSignUpRequest({ ...signUpRequest, lastname: e.target.value })}
                                placeholder='Last Name' />
                            <input
                                type='password'
                                name='password'
                                value={signUpRequest.password}
                                onChange={(e) => setSignUpRequest({ ...signUpRequest, password: e.target.value })}
                                placeholder='Password' />
                            <input
                                type='confirmPassword'
                                name='confirmPassword'
                                value={signUpRequest.confirmpassword}
                                onChange={(e) => setSignUpRequest({ ...signUpRequest, confirmpassword: e.target.value })}
                                placeholder='Confirm Password' />
                            <button type='submit'>Sign Up</button>
                            <label htmlFor='chk' aria-hidden="true" className='loginre'>
                                Sign In
                            </label>
                        </form>
                    </div>

                    :

                    <div className='signin'>
                        <form className='loginForm' onSubmit={handlelogin}>
                            <label className='loginLabel'>Login</label>
                            <input
                                type='email'
                                name='email'
                                placeholder='Email'
                                value={loginRequest.email}
                                onChange={(e) => setLoginRequest({ ...loginRequest, email: e.target.value })}
                            />
                            <input
                                type='password'
                                name='password'
                                value={loginRequest.password}
                                onChange={(e) => setLoginRequest({ ...loginRequest, password: e.target.value })}
                                placeholder='Password' />
                            <button type='submit'>Sign In</button>
                            <label htmlFor='chk' aria-hidden="true" className='loginre'>Sign Up</label>
                        </form>
                    </div>

                }
            </div>
        </>
    )
}

export default Login