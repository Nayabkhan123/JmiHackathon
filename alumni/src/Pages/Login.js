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
    <section id='login' className='flex items-center h-[100%] justify-center mt-10 lg:m-0 lg:justify-between'>
            <div className='w-[70%] h-[88vh] hidden lg:flex'>
                <img src={banner}
                    className=''/>
            </div>
            <div className='bg-gray-100 lg:w-[30%] md:w-[70%] w-[90%] flex flex-col justify-center py-6 rounded-2xl'>
                <div className='w-52 mix-blend-darken my-6 mx-auto'>
                    <img className='rounded-full' src={loginIcon}/>
                </div>
                <form className='grid px-10 gap-2' onSubmit={(event)=>submitHandler(event)}>
                    <div>
                        <label htmlFor='email'>Email:</label>
                        <div className='flex border-2 outline-none'>
                            <input 
                            className={`w-full h-full px-4 py-2 bg-transparent outline-none border-2 border-gray-500 ${data.email === "" ? (" focus:border-red-500") : ("focus:border-green-500")}`}
                            type='email' 
                            name='email' 
                            value={data.email}
                            placeholder='Enter Your Email'
                            onChange={(event)=>changeHandler(event)}/>
                        </div>
                    </div>
                    
                    <div>
                        <label htmlFor='password'>Password:</label>
                        <div className='flex border-2 outline-none relative'>
                            <input 
                                className={`w-full h-full px-4 py-2 bg-transparent outline-none border-2 border-gray-500 ${data.password === "" ? (" focus:border-red-500") : ("focus:border-green-500")}`}
                                type={showpassword?"text":"password"} 
                                name='password' 
                                value={data.password}
                                placeholder='Enter Your Password'
                                onChange={(event)=>changeHandler(event)}/>
                            <span className='text-xl cursor-pointer absolute right-2 top-3' onClick={()=>setshowpassword(!showpassword)}>
                                {
                                    showpassword?(<FaEyeSlash/>):(<FaEye/>)
                                }
                                </span>
                        </div>
                        <Link className='flex flex-row-reverse hover:underline hover:text-blue-700 text-sm' to="/forgot-password">Forgot Password</Link>
                    </div>
                    
                    <button className='px-4 py-2 rounded-xl bg-accent text-white hover:bg-deccent transition-all duration-50 text-lg text-bold'>Login</button>
                </form>
                <p className='text-sm px-10'>Dont't have account ? <Link to="/register" className='hover:underline text-accent hover:text-blue-800'>Register</Link></p>
            </div>
            
    </section>
  )
}
