// src/components/Navbar.jsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import backendUrl from '../common';
import { toast } from 'react-toastify';
import { setuserDetails } from '../redux/userSlice';

export default function Navbar() {
  const user = useSelector(state=>state?.user?.user)
  const dispatch=useDispatch();
  //logout
  async function handlelogout(){
    const apiresponse = await fetch(backendUrl.logout.url,{
      method:backendUrl.logout.method,
      credentials:'include'
    })
    const apidata = await apiresponse.json();
    if(apidata.success){
      toast.success(apidata.message)
      dispatch(setuserDetails(null))
    }
    if(apidata.error){
      toast.error(apidata.message)
    }
  }
  console.log("curruser",user)
  return (
    <nav className="bg-white shadow-lg p-4">
      <div className='w-[80%] mx-auto flex items-center justify-between'>
        <Link to={"/"} className="text-xl font-semibold">Alumni Connect</Link>
        <div className='font-medium text-base flex gap-4 '>
          {/* <div className=''>
            <a href={"#communityFeed"}>Community</a>
            <div className='h-[1px] bg-blue-800'></div>
          </div> */}
          <div>
            <a
              href="#communityFeed"
              className="relative group"
            >
              Community
              <div className="absolute -bottom-1 left-0 w-0 h-[2px] bg-blue-800 group-hover:w-full transition-all duration-300"></div>
            </a>
          </div>
          <div>
            <Link
              to="/alumni-directory"
              className="relative group"
            >
              Alumni Directory
              <div className="absolute -bottom-1 left-0 w-0 h-[2px] bg-blue-800 group-hover:w-full transition-all duration-300"></div>
            </Link>
          </div>
        </div>

        {
          user?._id ? (
            <div>
              <button className="ml-2 px-3 py-1 bg-blue-500 text-white rounded" onClick={handlelogout}>Logout</button>
            </div>
          ) : 
          (
            <div>
              <Link to={'/login'} className="px-3 py-1">Login</Link>
              <Link to={"/register"} className="ml-2 px-3 py-1 bg-blue-500 text-white rounded">Register</Link>
          </div>
          )
        }
      </div>
    </nav>
  );
}