import React, { useEffect, useState } from 'react'
import './UserHome.css'
import Header from '../Header/Header';
import { AllPost } from '../../../interface/PostInterface';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store/store';
import { allPostAsync } from '../../../action/Action';
import { useNavigate } from 'react-router-dom';
export const BASE_URL= import.meta.env.VITE_BASE_URL





const UserHome: React.FC = () => {
    const [postList, setPostList] = useState<AllPost[]>([]);
    const userId = useSelector((state:RootState)=>state.auth.userId)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(()=>{
        const getAllPost = async () => {
                try {
                    const response = await dispatch(allPostAsync(userId) as any)
        
                    if (response.status >= 200 && response.status < 300) {
                        const newPost = response.data
                        console.log(response.data)
                        setPostList(newPost)
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

            getAllPost()
        
    },[userId])


    const handleGetPost = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault()
        const postId = e.currentTarget.id;
        navigate('/post', { state: { postId: postId } })
      }


    

    return (
        <>
        <ToastContainer/>
        <Header/>
        <div className='wrap'>
            {postList.map((user, index) =>
                <div className='box' key={index}>
                    <div className='box-top'>
                        <img className="box-image" src={`${BASE_URL}${user.image}`}  alt={user.username} />
                        <div className="title-flex">
                            <h3 className="box-title">{user.username}</h3>
                            <p className="user-follow-info">{user.title}</p>
                        </div>
                        <p className="description">{user.description}</p>
                    </div>
                    <a id={String(user.postId)} className="button" onClick={handleGetPost}>
                        View Post
                    </a>
                </div>
            )}
        </div>
        </>
    )
}

export default UserHome