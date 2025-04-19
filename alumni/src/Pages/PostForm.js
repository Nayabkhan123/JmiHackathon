// src/components/PostForm.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { uploadImage } from '../helper.js/UploadImage';
import {GrCloudUpload} from 'react-icons/gr'
import {TiDelete} from 'react-icons/ti'
import backendUrl from '../common';

const PostForm = ({ onPostCreated }) => {
    const [formData, setFormData] = useState({
        userName: '',
        userImage: "",
        profession: '',
        postTitle: '',
        postDescription: ''
    });
    const [openZoomProductImage,setOpenZoomProductImage] = useState(false)
    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
        const apiresponse = await fetch(backendUrl.createPost.url,{
            method:backendUrl.createPost.method,
            credentials:`include`,
            body: JSON.stringify(
                {
                    postData: formData
                }
            )
        });
        const apidata = await apiresponse.json()
        // onPostCreated(apiresponse.data);
        setFormData({
            userName: '',
            userImage: '',
            profession: '',
            postTitle: '',
            postDescription: ''
        });
        } catch (error) {
        console.error("Error submitting post:", error);
        }
    };
    async function changeUploadHandler(e){
        const file = e.target.files;
        if(file.length){
            const uploadImageCloudinary = await uploadImage(file[0])
            setFormData((prev)=>{
                return{
                    ...prev,
                    userImage: uploadImageCloudinary?.url
                }
            })
            console.log("upload image " , uploadImageCloudinary)
        }
    }
    async function handleDeleteProduct(index){
        setFormData((prev)=>{
            return {
                ...prev,
                userImage:""
            }
        })
        // const newUserImage = [...formData.userImage]
        // newUserImage.splice(index,1);
        // setFormData((prev)=>{
        //     return {
        //         ...prev,
        //         userImage:[]...newUserImage]
        //     }
        // })
    }
    console.log("formdata",formData.userImage)
  return (
    <div className="bg-white mt-4 shadow-lg rounded-2xl p-6 max-w-5xl mx-auto w-full">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Create a Post</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            name="userName"
            type="text"
            placeholder="John Doe"
            value={formData.userName}
            onChange={handleChange}
            required
            className="mt-1 w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
          />
        </div>

        {/* Image URL */}
        {/* <div>
          <label className="block text-sm font-medium text-gray-700">Upload Profile Image</label>
          <input
            name="userImage"
            type="url"
            placeholder="https://example.com/image.jpg"
            value={formData.userImage}
            onChange={handleChange}
            required
            className="mt-1 w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
          />
        </div> */}
        {/* ImageUplaod */}
        <label htmlFor='userImage'>User Image</label>
            <div className='flex'>
                <div className='w-full h-32 bg-slate-100 flex justify-center items-center rounded border '>
                    <label htmlFor='uploadImageInput'>
                        <div className='text-slate-500 cursor-pointer gap-2 flex justify-center items-center flex-col'>
                            <span className='text-4xl'><GrCloudUpload/></span>
                            <p className='text-sm font-semibold'>Upload Image</p>
                            <input id='uploadImageInput'
                                    type='file'
                                    className='hidden'
                                    onChange={changeUploadHandler}/>
                        </div>
                    </label>
                </div>
                {
                    formData?.userImage && 
                    <div className='flex h-32 w-[50%] items-center justify-center gap-2 overflow-x-auto flex-wrap'>
                        {    
                               
                            <div className='relative group cursor-pointer'>
                                <img src={formData?.userImage} 
                                alt='userImage' 
                                className='bg-slate-100 border max-h-32 max-w-32' 
                                onClick={()=>{
                                    setOpenZoomProductImage(false)
                                    // setFullScreenImage(el)
                                }}
                                />
                                <div className='absolute top-0 right-0 w-fit text-red-600 bg-white rounded-full hover:scale-105 transition-all cursor-pointer hidden group-hover:block'
                                    onClick={(e)=>handleDeleteProduct(e)}>
                                    <TiDelete size={20}/>
                                </div>
                            </div>
                        }
                    </div>
                }
            </div>
        {/* Profession */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Profession</label>
          <input
            name="profession"
            type="text"
            placeholder="Software Engineer"
            value={formData.profession}
            onChange={handleChange}
            required
            className="mt-1 w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
          />
        </div>

        {/* Post Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Post Title</label>
          <input
            name="postTitle"
            type="text"
            placeholder="Excited for the Alumni Meet!"
            value={formData.postTitle}
            onChange={handleChange}
            required
            className="mt-1 w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
          />
        </div>

        {/* Post Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Post Description</label>
          <textarea
            name="postDescription"
            rows="4"
            placeholder="Sharing a quick update with the community..."
            value={formData.postDescription}
            onChange={handleChange}
            required
            className="mt-1 w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
          ></textarea>
        </div>

        <div className="text-right">
          <button
            type="submit"
            className="bg-blue-600 text-white font-medium px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Post
          </button>
        </div>
      </form>
    {
        // setOpenZoomProductImage && 
        // <div className='w-screen h-full bg-[#ffffffa2] absolute top-0 bottom-0 right-0 left-0'>
        //     <div className='flex items-center justify-center '>
        //         <img src={formData.userImage} 
        //             className='w-80' />
        //     </div>
        // </div>
    }
    </div>


    
  );
};

export default PostForm;