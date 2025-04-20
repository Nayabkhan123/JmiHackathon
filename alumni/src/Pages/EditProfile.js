import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import backendUrl from '../common';
import { toast } from 'react-toastify';
import { uploadImage } from '../helper.js/UploadImage';
import { useNavigate } from 'react-router-dom';
import { setuserDetails } from '../redux/userSlice';

const EditProfile = () => {
  const currUser = useSelector(state => state?.user?.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: currUser?.name,
    email: currUser?.email,
    profession: currUser?.profession,
    department: currUser?.department,
    batch: currUser?.batch,
    location: currUser?.location,
    profilePic: currUser?.profilePic,
  });

  async function changeUploadHandler(e) {
    const file = e.target.files;
    if (file.length) {
      const uploadImageCloudinary = await uploadImage(file[0]);
      setFormData((prev) => ({
        ...prev,
        profilePic: uploadImageCloudinary?.url,
      }));
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
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success) {
        toast.success(data.message);
        dispatch(setuserDetails(formData));
        navigate('/');
      } else {
        toast.error('Update failed: ' + data.message);
      }
    } catch (error) {
      console.error('Update error:', error);
      toast.error('An error occurred.');
    }
  };

  useEffect(() => {
    if (currUser) {
      setFormData({ ...currUser });
    }
  }, [currUser]);

  return (
    <div className='min-h-screen max-h-fit  place-content-center w-full bg-gray-800 md:py-8'>
      <div className="max-w-2xl mx-auto p-6  bg-gray-900 text-white rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">Edit Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* ProfilePic */}
          <div>
            <div className="h-40 w-40 my-9 mx-auto relative">
              <div className="relative">
                <label>
                  <div className="bg-gray-700 text-white text-[12px] py-1 absolute -bottom-6 inset-x-0 grid place-items-center cursor-pointer transition-all rounded-full hover:bg-gray-600">
                    Update Image
                  </div>
                  <input type="file" className="hidden" onChange={changeUploadHandler} />
                </label>
                <img className="rounded-full border border-gray-700" src={formData.profilePic} alt="Profile" />
              </div>
            </div>
          </div>

          {/* Fields */}
          {[
            { name: 'name', label: 'Name' },
            { name: 'profession', label: 'Profession' },
            { name: 'department', label: 'Department' },
            { name: 'batch', label: 'Batch' },
            { name: 'location', label: 'Location' },
          ].map(({ name, label }) => (
            <div key={name}>
              <label className="block mb-1 font-medium text-gray-300">{label}</label>
              <input
                type="text"
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className="w-full border border-gray-700 bg-gray-800 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              />
            </div>
          ))}

          {/* Email (disabled) */}
          <div>
            <label className="block mb-1 font-medium text-gray-300">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              disabled
              className="w-full border border-gray-700 bg-gray-700 rounded-lg px-3 py-2 cursor-not-allowed text-gray-400"
            />
          </div>

          {/* Submit */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-500 transition"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
