import React, { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { Outlet } from 'react-router-dom';
import Context from './context';
import backendUrl from './common';
import { setuserDetails } from './redux/userSlice';
import { useDispatch } from 'react-redux';
import Navbar from './components/Navbar';

function App() {
  const dispatch = useDispatch()
  async function fetchUserDetails() {
    try{
        const apiresponse = await fetch(backendUrl.curruser?.url,{
        method:backendUrl.curruser?.method,
        credentials:'include',
        })
        const apidata = await apiresponse.json();
        if(apidata.success){
          dispatch(setuserDetails(apidata?.data))
        }
        console.log("data-user",apidata)
    }
    catch(err){
      console.log("fetchUserDetails gives error")
    }
  }
  useEffect(()=>{
    fetchUserDetails()
  },[])
  return (
    <div className="min-h-screen bg-gray-100">
      <Context.Provider value={{
        fetchUserDetails, 
        // countTotalCartProducts, 
        // fetchUserAddToCart 
      }}>

      
      <ToastContainer position='bottom-right'/>
      <Navbar/>
      <Outlet/>
      </Context.Provider>
    </div>
  );
}

export default App;