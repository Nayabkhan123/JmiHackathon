import React, { useContext, useState } from 'react'
// import loginIcon from '../assets/signin.gif'
import loginIcon from '../assets/logo.jpg'

import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Context from '../context';
import backendUrl from '../common';
import banner from "../assets/login.png"
export const Login = () => {
    const Navigate=useNavigate()
    const {fetchUserDetails,fetchUserAddToCart} = useContext(Context)
    const [showpassword,setshowpassword] =useState(true);
    const [data,setData] = useState({
        email:"",
        password:"",
    })
    function changeHandler(e){
        const {name,value}=e.target;
        setData((prev)=>{
            return {
                ...prev,[name]:value
            }
        })
    }
    async function submitHandler(e){
        e.preventDefault();
        try{
            const apiresponse = await fetch(backendUrl.login.url,{
                method:backendUrl.login.method,
                headers:{
                    "content-type" : "application/json",
                },
                credentials:'include',
                body:JSON.stringify(data),
            })
            console.log("apidatafetchchcchchc2")

            const apidata = await apiresponse.json();
            console.log("apidatafetchchcchchc3")
            console.log(apidata)
            if(apidata.success){
                if(fetchUserDetails) fetchUserDetails()
                toast.success(apidata.message)
                Navigate("/")
                fetchUserAddToCart()
            }
            if(apidata.error){
                toast.error(apidata.message);
            }
        }
        catch(err){
            console.log("login API not working" , err)
        }
    }
    console.log(data);
  return (
    <section id='login' className='flex items-center h-[100%] justify-center'>
            <div className='w-[80%] h-full hidden lg:flex'>
                <img src={banner}
                    className=''/>
            </div>
            <div className='bg-gray-100 w-fit max-wlg flex flex-col py-6 rounded-2xl'>
                <div className='w-32 my-6 mx-auto'>
                    <img className='rounded-full' src={loginIcon}/>
                </div>
                <form className='grid px-10 gap-2' onSubmit={(event)=>submitHandler(event)}>
                    <div>
                        <label htmlFor='email'>Email:</label>
                        <div className='flex border-2 px-4 py-2 border-gray-500'>
                            <input className='w-full h-full bg-transparent outline-none ' 
                            type='email' 
                            name='email' 
                            value={data.email}
                            placeholder='Enter Your Email'
                            onChange={(event)=>changeHandler(event)}/>
                        </div>
                    </div>
                    
                    <div>
                        <label htmlFor='password'>Password:</label>
                        <div className='flex border-2 px-4 py-2 border-gray-500'>
                            <input className='w-full h-full bg-transparent outline-none' 
                                type={showpassword?"text":"password"} 
                                name='password' 
                                value={data.password}
                                placeholder='Enter Your Password'
                                onChange={(event)=>changeHandler(event)}/>
                            <span className='text-xl cursor-pointer' onClick={()=>setshowpassword(!showpassword)}>
                                {
                                    showpassword?(<FaEyeSlash/>):(<FaEye/>)
                                }
                                </span>
                        </div>
                        <Link className='flex flex-row-reverse hover:underline hover:text-blue-700 text-sm' to="/forgot-password">Forgot Password</Link>
                    </div>
                    
                    <button className='px-4 py-2 rounded-xl bg-blue-500 hover:bg-blue-700 transition-all duration-100 text-lg text-bold'>Login</button>
                </form>
                <p className='text-sm px-10'>Dont't have account ? <Link to="/register" className='hover:underline text-blue-500 hover:text-blue-800'>Register</Link></p>
            </div>
            
    </section>
  )
}
