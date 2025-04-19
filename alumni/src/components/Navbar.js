// src/components/Navbar.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import backendUrl from '../common';
import { toast } from 'react-toastify';
import { setuserDetails } from '../redux/userSlice';
import jamiaLogo from "../assets/jamiaLogo.webp"
export default function Navbar() {
  const user = useSelector(state=>state?.user?.user)
  const [menu,setmenu] = useState(false);

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
  useEffect(() => {
      // if (user) {
      //   setFormData({ ...user });
      // }
    }, [user]);
  console.log("curruser",user)
  return (
    <nav className="bg-white shadow-lg p-4">
      <div className='w-[80%] mx-auto flex items-center justify-between'>
        <Link to={"/"} className='flex items-center '>
          <img
            src={jamiaLogo}
            className='w-16 '
          />
          <p className="text-xl font-semibold">Alumni Connect</p>
        </Link>
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
            <div className='flex gap-3'>
              <div className='relative cursor-pointer'>
                <img src={user?.profilePic}
                  onClick={()=>setmenu(!menu)}
                  className='h-11 w-11 rounded-full  z-0'/>

              {
                menu && (<div className="absolute flex justify-center flex-col w-60 z-10 bg-white top-16 p-3 shadow-lg rounded-lg text-sm ">
                <nav>
                  <Link to={'/edit-profile'} className='hidden md:flex whitespace-nowrap px-2 py-4 hover:bg-slate-100 bg-slate-50' onClick={()=>setmenu(prev=>!prev)}>Edit Profile</Link>
                </nav>
                </div>)
              }
              </div>
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