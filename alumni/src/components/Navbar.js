import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import backendUrl from '../common';
import { toast } from 'react-toastify';
import { setuserDetails } from '../redux/userSlice';
import jamiaLogo from "../assets/jamialogo.png";

export default function Navbar() {
  const user = useSelector(state => state?.user?.user);
  const [menu, setmenu] = useState(false);
  const dispatch = useDispatch();

  async function handlelogout() {
    const apiresponse = await fetch(backendUrl.logout.url, {
      method: backendUrl.logout.method,
      credentials: 'include'
    });
    const apidata = await apiresponse.json();
    if (apidata.success) {
      toast.success(apidata.message);
      dispatch(setuserDetails(null));
    }
    if (apidata.error) {
      toast.error(apidata.message);
    }
  }

  return (
    <nav className="bg-white dark:bg-gray-900 text-black dark:text-white shadow-md border-b border-accent p-4 sticky top-0 z-50">
      <div className="w-[80%] mx-auto flex items-center justify-between">
        <Link to={"/"} className="flex items-center gap-2">
          <img src={jamiaLogo} className="sm:w-16 w-10 focus:outline-none" />
          <p className="text-2xl font-bold tracking-wide">Alumni Connect</p>
        </Link>

        <div className="font-medium text-base  gap-6 hidden md:flex">
          <Link to={'/community'} className="relative group">
            Community
            <div className="absolute -bottom-1 left-0 w-0 h-[2px] bg-accent group-hover:w-full transition-all duration-300"></div>
          </Link>
          <Link to="/alumni-directory" className="relative group">
            Alumni Directory
            <div className="absolute -bottom-1 left-0 w-0 h-[2px] bg-accent group-hover:w-full transition-all duration-300"></div>
          </Link>
        </div>

        {user?._id ? (
          <div className="flex items-center gap-4">
            <div className="relative cursor-pointer">
              <img
                src={user?.profilePic}
                onClick={() => setmenu(!menu)}
                className="h-10 w-10 rounded-full border border-white"
              />
              {menu && (
                <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-gray-800 border dark:border-gray-700 shadow-lg rounded-lg text-sm z-50">
                  <nav>
                    <Link
                      to={'/edit-profile'}
                      className="block px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setmenu(false)}
                    >
                      Edit Profile
                    </Link>
                  </nav>
                </div>
              )}
            </div>
            <button
              className=" hidden md:block px-4 py-2 bg-accent hover:bg-deccent text-white rounded"
              onClick={handlelogout}
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link to={'/login'} className="border-2 px-4 py-2 rounded hover:bg-accent border-accent">
              Login
            </Link>
            <Link
              to={"/register"}
              className="hidden md:block px-4 py-2 bg-accent hover:bg-deccent text-white rounded"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
