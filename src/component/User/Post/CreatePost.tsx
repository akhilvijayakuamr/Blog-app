import React, { useState } from 'react'
import './CreatePost.css'
import { CreatePostRequest } from '../../../interface/PostInterface'
import { useDispatch, useSelector } from 'react-redux'
import { createPostAsync } from '../../../action/FileAction'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RootState } from '../../../redux/store/store'
import { useNavigate } from 'react-router-dom'


const CreatePost: React.FC = () => {
    const userId = useSelector((state:RootState)=> state.auth.userId)
    const [postData, setPostData] = useState<CreatePostRequest>({
        id: userId,
        title: '',
        description: '',
        image: null
    })

    const navigate = useNavigate()


    const validatePostData = (): boolean => {
        if (!postData.title.trim()) {
          toast.error("Title is required", { position: "top-right" });
          return false;
        }
      
        if (!postData.description.trim()) {
          toast.error("Description is required", { position: "top-right" });
          return false;
        }
      
        if (!postData.image) {
          toast.error("Please upload an image", { position: "top-right" });
          return false;
        }
    
      
        return true;
      };

    

    const dispatch = useDispatch()


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!validatePostData()) return;
        try {
            const response = await dispatch(createPostAsync(postData) as any)

            if (response.status >= 200 && response.status < 300) {
                console.log(response)
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
            <form className="post-form" onSubmit={handleSubmit}>
                <input
                    type="file"
                    placeholder="Image URL"
                    onChange={(e) => setPostData({ ...postData, image: e.target.files?.[0] ?? null })}
                    className="input-field"
                />
                <input
                    type="text"
                    placeholder="Title"
                    value={postData.title}
                    onChange={(e) => setPostData({ ...postData, title: e.target.value })}
                    className="input-field"
                />
                <textarea
                    placeholder="Description"
                    value={postData.description}
                    onChange={(e) => setPostData({ ...postData, description: e.target.value })}
                    className="textarea-field"
                />
                <button type="submit" className="submit-button">
                    Create Post
                </button>
            </form>
        </div>
    )
}

export default CreatePost