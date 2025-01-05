import React, { useEffect, useState } from 'react'
import './PostView.css'
import Header from '../Header/Header'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../redux/store/store'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { deletePostAsync, uniqPostAsync } from '../../../action/Action'
import { postUpdateRequest, uniquePostResponse } from '../../../interface/PostInterface'
export const BASE_URL= import.meta.env.VITE_BASE_URL

const PostView: React.FC = () => {

    const location = useLocation()
    const userId = useSelector((state: RootState) => state.auth.userId)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [post, setPost] = useState<uniquePostResponse>({
        title: '',
        created_at: '',
        description: '',
        id: 0,
        image: null,
        postId: 0,
        username: ''
    });


    const [updateData, setUpdateData] = useState<postUpdateRequest>({
        id: 0,
        postId: 0,
        description: '',
        title: '',
        image: null,
    });

    useEffect(() => {
        const postId = location.state.postId
        const getPost = async () => {
            try {
                const response = await dispatch(uniqPostAsync(postId) as any)
                if (response.status >= 200 && response.status < 300) {
                    const newPost = response.data
                    setPost(newPost)
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

        getPost()

    }, [])



    useEffect(() => {
        if (post) {
            setUpdateData((prevData) => ({
                ...prevData,
                id: Number(userId),
                postId: Number(post.postId),
                description: post.description,
                title: post.title,
                image: post.image
            }));
        }


    }, [post]);


    const handleUpdate = ()=>{
        navigate('/updatePost', { state: updateData });
    }


     const handleDelete = async () => {
            try {
                const response = await dispatch(deletePostAsync(String(updateData.postId)) as any)
    
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
                });
            }
        }


    return (
        <div>
            <ToastContainer />
            <Header />
            <div className='container'>
                <div className='blog-container'>
                    <div className='profile'>
                        {/* <img src='https://cdn.prod.website-files.com/62d84e447b4f9e7263d31e94/6399a4d27711a5ad2c9bf5cd_ben-sweet-2LowviVHZ-E-unsplash-1.jpeg' alt='proifile' className='profile-image' /> */}
                        <div className='profile-info'>
                            <h2 className='username'>{post.username}</h2>
                            <span className='timestamp'>{post.created_at}</span>
                        </div>
                    </div>
                    <div className='content'>
                        <h1 className='blog-title'>{post.title}</h1>
                        <div className="post-image-container">
                            <img src={`${BASE_URL}${post.image}`} alt="Blog Post" className="post-image" />
                        </div>

                        <p className='description'>{post.description}</p>

                        <div className='actions'>
                            {
                                userId === post.id.toString() ? (
                                    <>
                                        <button className='edit-button' onClick={handleUpdate}>Edit</button>
                                        <button className='delete-button' onClick={handleDelete}>Delete</button>
                                    </>

                                ) : (
                                    <></>
                                )
                            }

                        </div>
                    </div>
                </div>
            </div>

        </div>


    )
}

export default PostView