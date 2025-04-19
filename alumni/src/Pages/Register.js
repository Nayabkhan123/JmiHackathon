import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import loginIcon from '../assets/signin.gif'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
// import imageTobase64 from '../helpers/imageTobase64';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import backendUrl from '../common';
import registerBanner from '../assets/register.png'
export const Register = () => {
    const Navigate = useNavigate();
        const [showPassword,setshowPassword] =useState(true);
        const [showConfirmPassword,setShowConfirmPassword] =useState(true);
        const [data,setData] = useState({
            email:"",
            password:"",
            name:"",
            confirmPassword:"",
            profilePic:""
        })
        function changeHandler(e){
            const {name,value}=e.target;
            setData((prev)=>{
                return {
                    ...prev,[name]:value
                }
            })
        }
        // async function uploadHandler(e){
        //     const file=e.target.files[0];
        //     const profilepicurl =await imageTobase64(file)
        //     setData((prev)=>{
        //         return{
        //             ...prev,profilePic:profilepicurl
        //         }
        //     })
        //     console.log(file)
        // }
        async function submitHandler(e){
            e.preventDefault();
            if(data.password===data.confirmPassword){
                const dataResponse = await fetch(backendUrl.register.url,{
                    method : backendUrl.register.method,
                    headers:{
                        "content-type" : "application/json"
                    },
                    body : JSON.stringify(data)
                })
                const apidata= await dataResponse.json()
                console.log(apidata)
                if(apidata.success){
                    toast.success(apidata.message)
                    Navigate('/login')
                }
                if(apidata.error){
                    toast.error(apidata.message)
                }
                
                console.log("data :", apidata)
            }
            else{
                console.log("Please check password and confirm password")
            }
            
        }
        // console.log(data);
  return (
    <section id='signup' className='flex items-center h-[100%] justify-center'>
            <div className=' h-full hidden lg:flex'>
                <img src={registerBanner}
                    className='w-full'/>
            </div>
            <div className='bg-gray-100 w-full max-w-lg flex flex-col py-6 rounded-2xl'>
                <div className='h-20 w-24 my-9 mx-auto relative'>
                    <div>
                        <label>
                            <div className='bg-slate-100 shadow-lg text-center text-[13px] absolute -bottom-10 right-[6px] py-1 opacity-60 hover:opacity-90 cursor-pointer transition-all rounded-full'>
                                Upload Image
                            </div>
                            <input type='file' className='hidden'
                            //  onChange={(e)=>uploadHandler(e)}
                            />
                        </label>
                    <img className='rounded-full' src={data.profilePic || loginIcon}/>
                    </div>
                    
                </div>
                <form className='grid px-10 gap-2' onSubmit={(event)=>submitHandler(event)}>
                    <div>
                        <label htmlFor='name'>Name:</label>
                        <div className="flex">
                            <input className={`w-full h-full px-4 py-2 bg-transparent outline-none border-2 border-gray-500 ${data.name===""? (" focus:border-red-500"):("focus:border-green-500")}`} 
                            type='text' 
                            name='name' 
                            value={data.name}
                            required
                            placeholder='Enter Your Name'
                            onChange={(event)=>changeHandler(event)}
                            />

                        </div>
                    </div>

                    <div>
                        <label htmlFor='email'>Email:</label>
                        <div className='flex'>
                            <input className={`w-full h-full px-4 py-2 bg-transparent outline-none border-2 border-gray-500 ${data.email===""? (" focus:border-red-500"):("focus:border-green-500")}`}
                            type='email' 
                            name='email' 
                            value={data.email}
                            required
                            placeholder='Enter Your Email'
                            onChange={(event)=>changeHandler(event)}/>
                        </div>
                    </div>
                    
                    <div>
                        <label htmlFor='password'>Password:</label>
                        <div className='flex relative'>
                            <input className={`w-full h-full px-4 py-2 bg-transparent outline-none border-2 border-gray-500 ${data.password===""? (" focus:border-red-500"):("focus:border-green-500")}`}
                                type={showPassword?"text":"password"} 
                                name='password' 
                                value={data.password}
                                required
                                placeholder='Enter Your Password'
                                onChange={(event)=>changeHandler(event)}/>
                            <span className='text-xl cursor-pointer absolute right-2 top-3' onClick={()=>setshowPassword(!showPassword)}>
                                {
                                    showPassword?(<FaEyeSlash/>):(<FaEye/>)
                                }
                                </span>
                        </div>
                    </div>

                    <div>
                        <label htmlFor='confirmPassword'>Confirm Password:</label>
                        <div className='flex relative'>
                            <input className={`w-full h-full px-4 py-2 bg-transparent outline-none border-2 border-gray-500 ${data.confirmPassword===""? (" focus:border-red-500"):("focus:border-green-500")}`} 
                                type={showConfirmPassword?"text":"password"} 
                                name='confirmPassword' 
                                value={data.confirmPassword}
                                required
                                placeholder='Confirm Your Password'
                                onChange={(event)=>changeHandler(event)}/>
                            <span className='text-xl cursor-pointer absolute right-2 top-3' onClick={()=>setShowConfirmPassword(!showConfirmPassword)}>
                                {
                                    showConfirmPassword?(<FaEyeSlash/>):(<FaEye/>)
                                }
                                </span>
                        </div>
                    </div>
                    
                    <button className='px-4 py-2 rounded-xl bg-blue-500 hover:bg-blue-700 transition-all duration-100 text-lg text-bold'>Register</button>
                </form>
                <p className='text-sm px-10'>Already have account ? <Link to="/login" className='hover:underline text-blue-500 hover:text-blue-800'>Login</Link></p>
            </div>
    </section>
  )
}
