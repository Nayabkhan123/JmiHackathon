import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { uploadImage } from '../helper.js/UploadImage';
import { TiDelete } from 'react-icons/ti';
import { GrCloudUpload } from 'react-icons/gr';
import backendUrl from '../common';

const PostModal = ({ onClose, initialData }) => {
  const currUser = useSelector(state => state?.user?.user); // Get current user from Redux state
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    content: initialData?.content || '',
    authorName: currUser?.name || '',  // Auto-populate for new posts
    authorPic: currUser?.profilePic || '',  // Auto-populate for new posts
    profession: currUser?.profession || '',  // Auto-populate for new posts
    postImage: initialData?.postImage || '',
  });
  const [loading, setLoading] = useState(false);
  const [loadUpload, setLoadUpload] = useState(false);

  async function changeUploadHandler(e){
      const file = e.target.files;
      if(file.length){
          setLoadUpload(true)
          const uploadImageCloudinary = await uploadImage(file[0])
          setFormData((prev)=>{
              return{
                  ...prev,
                  postImage: uploadImageCloudinary?.url
              }
          })
          setLoadUpload(false)
          console.log("upload image " , uploadImageCloudinary)
      }
  }
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  async function handleDeleteProduct(index){
    setFormData((prev)=>{
        return {
            ...prev,
            postImage:""
        }
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (initialData?._id) {
        // If editing an existing post, send PUT request
        await axios.put(`${backendUrl.editPost.url}/${initialData._id}`, formData, { withCredentials: true });
      } else {
        // If creating a new post, send POST request
        await axios.post(backendUrl.createPost.url, formData, { withCredentials: true });
      }
      onClose(true);  // Close the modal after success
    } catch (err) {
      console.error('Post submission error', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-xl shadow-lg space-y-4 w-full max-w-lg relative">
        <h2 className="text-xl font-semibold text-white">{initialData ? 'Edit Post' : 'New Post'}</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Post Title */}
          <input
            type="text"
            name="title"
            placeholder="Post Title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full border border-gray-600 bg-gray-700 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Post Content */}
          <textarea
            name="content"
            placeholder="Write your post here..."
            value={formData.content}
            onChange={handleChange}
            required
            className="w-full border border-gray-600 bg-gray-700 text-white rounded-md px-3 py-2 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* ImageUplaod */}
        <label htmlFor='Image'>Upload Image</label>
            <div className='flex flex-col gap-4'>
                <div className='w-full flex justify-center items-center rounded border '>
                    <label htmlFor='uploadImageInput'>
                        <div className='text-slate-500 p-2 cursor-pointer gap-2 flex justify-center items-center flex-col'>
                            <span className='text-4xl'><GrCloudUpload/></span>
                            <p className='text-sm font-semibold'>{formData.postImage? "update" : "upload"} Image</p>
                            <input id='uploadImageInput'
                                    type='file'
                                    className='hidden'
                                    onChange={changeUploadHandler}/>
                        </div>
                    </label>
                </div>
                {
                  loadUpload && <div className='text-center font-bold'>Please wait...</div>
                }
                {
                    formData?.postImage && 
                    <div className='flex w-[100%] items-center justify-center gap-2 overflow-x-auto flex-wrap'>
                        {    
                               
                            <div className='relative group cursor-pointer'>
                                <img src={formData?.postImage} 
                                alt='userImage' 
                                className='bg-slate-100 border min-h-full min-w-48'
                                />
                                <div className='absolute top-0 right-0 w-fit text-red-600 bg-white rounded-full transition-all cursor-pointer hidden group-hover:block'
                                    onClick={(e)=>handleDeleteProduct(e)}>
                                    <TiDelete size={30}/>
                                </div>
                            </div>
                        }
                    </div>
                }
            </div>

          {/* Hidden Fields for Author Info - Automatically populated for new posts */}
          <input
            type="hidden"
            name="authorName"
            value={formData.authorName}
          />
          <input
            type="hidden"
            name="authorPic"
            value={formData.authorPic}
          />
          <input
            type="hidden"
            name="profession"
            value={formData.profession}
          />

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => onClose(false)}
              className="px-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-md hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Saving...' : initialData ? 'Update' : 'Post'}
            </button>
          </div>
        </form>

        {/* Close button in top-right corner */}
        <button
          onClick={() => onClose(false)}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-200 text-xl"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default PostModal;
