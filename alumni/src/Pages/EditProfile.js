import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import backendUrl from '../common';
import { toast } from 'react-toastify';
import { uploadImage } from '../helper.js/UploadImage';
import { useNavigate } from 'react-router-dom';
import { setuserDetails } from '../redux/userSlice';

const EditProfile = () => {
    const currUser = useSelector(state=>state?.user?.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({
        name: currUser?.name,
        email: currUser?.email,
        profession: currUser?.profession,
        department: currUser?.department,
        batch: currUser?.batch,
        location: currUser?.location,
        profilePic: currUser?.profilePic,
    });
    async function changeUploadHandler(e){
        const file = e.target.files;
        if(file.length){
            const uploadImageCloudinary = await uploadImage(file[0])
            setFormData((prev)=>{
                return{
                    ...prev,
                    profilePic: uploadImageCloudinary?.url
                }
            })
            console.log("upload image " , uploadImageCloudinary)
        }
    }
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(backendUrl.updateProfile.url, {
        method: backendUrl.updateProfile.method,
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success) {
        toast.success(data.message);
        dispatch(setuserDetails(formData));
        navigate('/')
      } else {
        toast.error("Update failed: " + data.message);
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error("An error occurred.");
    }
  };
  useEffect(() => {
    if (currUser) {
      setFormData({ ...currUser });
    }
  }, [currUser]);
  return (
    <div className="max-w-2xl mx-auto p-6 mt-8 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Edit Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* ProfilePic */}
        <div>
          <div className='h-40 w-40 my-9 mx-auto relative'>
                <div className='relative'>
                    <label>
                        <div className='bg-transparent shadow-lg text-[12px] py-1 absolute -bottom-6 inset-x-0 grid place-items-center cursor-pointer transition-all rounded-full'>
                            Update Image
                        </div>
                        <input type='file' className='hidden'
                        onChange={(e)=>changeUploadHandler(e)}
                        />
                    </label>
                <img className='rounded-full' src={formData.profilePic}/>
                </div>
                
            </div>
        </div>

        {/* Name */}
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            disabled
            className="w-full border bg-gray-100 rounded-lg px-3 py-2 cursor-not-allowed"
          />
        </div>

        {/* Profession */}
        <div>
          <label className="block mb-1 font-medium">Profession</label>
          <input
            type="text"
            name="profession"
            value={formData.profession}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Department */}
        <div>
          <label className="block mb-1 font-medium">Department</label>
          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Batch */}
        <div>
          <label className="block mb-1 font-medium">Batch</label>
          <input
            type="text"
            name="batch"
            value={formData.batch}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Location */}
        <div>
          <label className="block mb-1 font-medium">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
