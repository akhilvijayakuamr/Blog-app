import React, { useState } from 'react'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation, useNavigate } from 'react-router-dom';
import { postUpdateRequest } from '../../../../interface/PostInterface';
import { useDispatch } from 'react-redux';
import { updatePostAsync } from '../../../../action/FileAction';

const UpdatePost: React.FC = () => {

    const location = useLocation();
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const updateDatas = location.state as postUpdateRequest;
    const [updateData, setUpdateData] = useState<postUpdateRequest>({
        id: updateDatas.id,
        postId: updateDatas.postId,
        description: updateDatas.description,
        title: updateDatas.title,
        image: null,
    });


    const validateUpdateData = (): boolean => {
       
      
        if (!updateData.title.trim()) {
          toast.error("Title is required", { position: "top-right" });
          return false;
        }
      
        if (!updateData.description.trim()) {
          toast.error("Description is required", { position: "top-right" });
          return false;
        }
      
        if (updateData.image && !(updateData.image instanceof File)) {
          toast.error("Invalid image file", { position: "top-right" });
          return false;
        }
      
        return true;
      };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!validateUpdateData()) return;
        try {
            const response = await dispatch(updatePostAsync(updateData) as any)

            if (response.status >= 200 && response.status < 300) {
                console.log(response.message)
                toast.success(response.message, {
                    position: "top-right"
                });
                navigate('/post', { state: { postId: response.postId } })

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
                    onChange={(e) => setUpdateData({ ...updateData, image: e.target.files?.[0] ?? null })}
                    className="input-field"
                />
                <input
                    type="text"
                    placeholder="Title"
                    value={updateData.title}
                    onChange={(e) => setUpdateData({ ...updateData, title: e.target.value })}
                    className="input-field"
                />
                <textarea
                    placeholder="Description"
                    value={updateData.description}
                    onChange={(e) => setUpdateData({ ...updateData, description: e.target.value })}
                    className="textarea-field"
                />
                <button type="submit" className="submit-button">
                    Create Post
                </button>
            </form>
        </div>
    )
}

export default UpdatePost