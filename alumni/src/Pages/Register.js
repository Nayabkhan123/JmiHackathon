

import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { toast } from 'react-toastify';
import backendUrl from '../common';
import userDefault from '../assets/signin.gif'
import { uploadImage } from '../helper.js/UploadImage';
import registerBanner from '../assets/register.png'
export const Register = () => {
    const Navigate = useNavigate();
    const [showPassword, setshowPassword] = useState(true);
    const [showConfirmPassword, setShowConfirmPassword] = useState(true);
    const [data, setData] = useState({
        email: "",
        password: "",
        name: "",
        confirmPassword: "",
        profilePic: "",
        profession: "",
        department: "",
        batch: "",
        location: "",
    });
    const [hashedPassword,setHashedPassword] = useState("")
    const [showOtp,setShowOtp] = useState(false)
    const [originalOTP,setOriginalOTP] = useState("")
    function changeHandler(e) {
        const { name, value } = e.target;
        setData((prev) => {
            return {
                ...prev, [name]: value
            }
        });
    }

    async function changeUploadHandler(e) {
        const file = e.target.files;
        if (file?.length) {
            const uploadImageCloudinary = await uploadImage(file[0]);
            setData((prev) => {
                return {
                    ...prev,
                    profilePic: uploadImageCloudinary?.url
                }
            });
            console.log("upload image", uploadImageCloudinary);
        }
    }

    async function submitHandler(e) {
        e.preventDefault();

        if (data.password === data.confirmPassword) {
            const dataResponse = await fetch(backendUrl.register.url, {
                method: backendUrl.register.method,
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(data)
            });
            const apidata = await dataResponse.json();
            console.log(apidata);

            if (apidata.success) {
                setOriginalOTP(apidata.otp)
                // setData({ ...apidata.tempUser, profilePic: data.profilePic });
                setHashedPassword(apidata.tempUser.password)
                toast.success(apidata.message);
                // Navigate('/otp-verification'); // Redirect to OTP verification page
                setShowOtp(true)
            }
            if (apidata.error) {
                toast.error(apidata.message);
            }
        }
        else {
            console.log("Please check password and confirm password");
            toast.error("Password and Confirm Password do not match.");
        }
    }
    useEffect(()=>{

    },[showOtp])

    const [otp, setOtp] = useState('');

    const handleChange = (e) => {
        const value = e.target.value;
        // if (/^\d{0,6}$/.test(value)) {
        setOtp(value);
        // }
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        const dataResponse = await fetch(backendUrl.otpVerify.url, {
            method: backendUrl.otpVerify.method,
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({...data,password:hashedPassword,otp})
        });
        const apidata = await dataResponse.json();
        console.log(apidata);

        if (apidata.success) {
            if(otp===originalOTP){
                toast.success("OTP verified")
                Navigate('/login')
            };
        }
        if (apidata.error) {
            toast.error(apidata.message);
        }
    };
    return (
        <section id='signup' className='flex items-center justify-center lg:justify-between mx-auto'>
            <div className="backgroundImage hidden lg:flex w-full overflow-hidden h-[88vh]">
                <img
                    src={registerBanner}
                    className="w-full h-full object-cover"
                    alt="Register Banner"
                />
                </div>

            <div className='bg-gray-100 min-w-[30%] flex flex-col rounded-2xl mt-10 lg:mt-2'>
                <div className='h-20 w-24 mb-9 mt-2 mx-auto relative'>
                    <div className='relative'>
                        <label>
                            <div className='text-white px-1 shadow-lg text-center text-[13px] absolute -bottom-6 right-[6px] py-1 opacity-60 bg-gray-500 hover:opacity-90 cursor-pointer transition-all rounded-full'>
                                Upload Image
                            </div>
                            <input type='file' className='hidden' onChange={(e) => changeUploadHandler(e)} />
                        </label>
                        <img className='rounded-full h-24 w-32' src={data.profilePic || userDefault} />
                    </div>
                </div>
                <form className='grid px-10 gap-2' onSubmit={(event) => submitHandler(event)}>
                    <div>
                        <label htmlFor='name'>Name:</label>
                        <div className="flex">
                            <input
                                className={`w-full h-full px-4 py-2 bg-transparent outline-none border-2 border-gray-500 ${data.name === "" ? (" focus:border-red-500") : ("focus:border-green-500")}`}
                                type='text'
                                name='name'
                                value={data.name}
                                required
                                placeholder='Enter Your Name'
                                onChange={(event) => changeHandler(event)}
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor='email'>Email:</label>
                        <div className='flex'>
                            <input
                                className={`w-full h-full px-4 py-2 bg-transparent outline-none border-2 border-gray-500 ${data.email === "" ? (" focus:border-red-500") : ("focus:border-green-500")}`}
                                type='email'
                                name='email'
                                value={data.email}
                                required
                                placeholder='Enter Your Email'
                                onChange={(event) => changeHandler(event)}
                            />
                        </div>
                    </div>

                    <div className='flex gap-4'>
                        <div>
                            <label htmlFor='profession'>Profession:</label>
                            <div className="flex">
                                <input
                                    className={`w-full h-full px-4 py-2 bg-transparent outline-none border-2 border-gray-500 ${data.profession === "" ? (" focus:border-red-500") : ("focus:border-green-500")}`}
                                    type='text'
                                    name='profession'
                                    value={data.profession}
                                    required
                                    placeholder='Enter Your profession'
                                    onChange={(event) => changeHandler(event)}
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor='department'>Department:</label>
                            <div className="flex">
                                <input
                                    className={`w-full h-full px-4 py-2 bg-transparent outline-none border-2 border-gray-500 ${data.department === "" ? (" focus:border-red-500") : ("focus:border-green-500")}`}
                                    type='text'
                                    name='department'
                                    value={data.department}
                                    required
                                    placeholder='Enter Your department'
                                    onChange={(event) => changeHandler(event)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className='flex gap-4'>
                        <div>
                            <label htmlFor='batch'>Batch:</label>
                            <div className="flex">
                                <input
                                    className={`w-full h-full px-4 py-2 bg-transparent outline-none border-2 border-gray-500 ${data.batch === "" ? (" focus:border-red-500") : ("focus:border-green-500")}`}
                                    type='text'
                                    name='batch'
                                    value={data.batch}
                                    required
                                    placeholder='Enter Your batch'
                                    onChange={(event) => changeHandler(event)}
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor='location'>Location:</label>
                            <div className="flex">
                                <input
                                    className={`w-full h-full px-4 py-2 bg-transparent outline-none border-2 border-gray-500 ${data.location === "" ? (" focus:border-red-500") : ("focus:border-green-500")}`}
                                    type='text'
                                    name='location'
                                    value={data.location}
                                    required
                                    placeholder='Enter Your location'
                                    onChange={(event) => changeHandler(event)}
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label htmlFor='password'>Password:</label>
                        <div className='flex relative'>
                            <input
                                className={`w-full h-full px-4 py-2 bg-transparent outline-none border-2 border-gray-500 ${data.password === "" ? (" focus:border-red-500") : ("focus:border-green-500")}`}
                                type={showPassword ? "text" : "password"}
                                name='password'
                                value={data.password}
                                required
                                placeholder='Enter Your Password'
                                onChange={(event) => changeHandler(event)}
                            />
                            <span className='text-xl cursor-pointer absolute right-2 top-3' onClick={() => setshowPassword(!showPassword)}>
                                {showPassword ? (<FaEyeSlash />) : (<FaEye />)}
                            </span>
                        </div>
                    </div>

                    <div>
                        <label htmlFor='confirmPassword'>Confirm Password:</label>
                        <div className='flex relative'>
                            <input
                                className={`w-full h-full px-4 py-2 bg-transparent outline-none border-2 border-gray-500 ${data.confirmPassword === "" ? (" focus:border-red-500") : ("focus:border-green-500")}`}
                                type={showConfirmPassword ? "text" : "password"}
                                name='confirmPassword'
                                value={data.confirmPassword}
                                required
                                placeholder='Confirm Your Password'
                                onChange={(event) => changeHandler(event)}
                            />
                            <span className='text-xl cursor-pointer absolute right-2 top-3' onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                {showConfirmPassword ? (<FaEyeSlash />) : (<FaEye />)}
                            </span>
                        </div>
                    </div>

                    <button className='px-4 py-2 rounded-xl bg-accent hover:bg-deccent text-white transition-all duration-100 text-lg text-bold'>Register</button>
                </form>
                <p className='text-sm px-10'>Already have account? <Link to="/login" className='hover:underline text-accent hover:text-deccent'>Login</Link></p>
            </div>
            {
                showOtp && (
                    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 " onClick={() => setShowOtp(false)}>
                      <div className="bg-white rounded-2xl shadow-lg p-8 w-[90%] max-w-md" onClick={(e) => e.stopPropagation()}>
                        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Verify Your Email</h2>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                          <input
                            type="text"
                            value={otp}
                            onChange={handleChange}
                            maxLength="6"
                            placeholder="Enter OTP"
                            className="p-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-center tracking-widest font-mono"
                          />
                          <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-150"
                          >
                            Verify OTP
                          </button>
                        </form>
                      </div>
                    </div>
                  )
            }
        </section>
    )
}









// import React, { useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom';
// import loginIcon from '../assets/signin.gif'
// import { FaEye, FaEyeSlash } from 'react-icons/fa'
// // import imageTobase64 from '../helpers/imageTobase64';
// import SummaryApi from '../common';
// import { toast } from 'react-toastify';
// import backendUrl from '../common';
// import registerBanner from '../assets/register.png'
// import { uploadImage } from '../helper.js/UploadImage';
// export const Register = () => {
//     const Navigate = useNavigate();
//         const [showPassword,setshowPassword] =useState(true);
//         const [showConfirmPassword,setShowConfirmPassword] =useState(true);
//         const [data,setData] = useState({
//             email:"",
//             password:"",
//             name:"",
//             confirmPassword:"",
//             profilePic:"",
//             profession:"",
//             department:"",
//             batch:"",
//             location:"",
//         })
//         function changeHandler(e){
//             const {name,value}=e.target;
//             setData((prev)=>{
//                 return {
//                     ...prev,[name]:value
//                 }
//             })
//         }
//         async function changeUploadHandler(e){
//             const file = e.target.files;
//             if(file.length){
//                 const uploadImageCloudinary = await uploadImage(file[0])
//                 setData((prev)=>{
//                     return{
//                         ...prev,
//                         profilePic: uploadImageCloudinary?.url
//                     }
//                 })
//                 console.log("upload image " , uploadImageCloudinary)
//             }
//         }
//         async function submitHandler(e){
//             e.preventDefault();
//             if(data.password===data.confirmPassword){
//                 const dataResponse = await fetch(backendUrl.register.url,{
//                     method : backendUrl.register.method,
//                     headers:{
//                         "content-type" : "application/json"
//                     },
//                     body : JSON.stringify(data)
//                 })
//                 const apidata= await dataResponse.json()
//                 console.log(apidata)
//                 if(apidata.success){
//                     toast.success(apidata.message)
//                     Navigate('/login')
//                 }
//                 if(apidata.error){
//                     toast.error(apidata.message)
//                 }
                
//                 console.log("data :", apidata)
//             }
//             else{
//                 console.log("Please check password and confirm password")
//             }
            
//         }
//         // console.log(data);
//   return (
//     <section id='signup' className='flex items-center justify-between'>
//             <div className={`backgroundImage w-full object-cover h-full hidden lg:flex overflow-hidden`}>
//                 {/* <img src={registerBanner}
//                     className=''/> */}
//             </div>
//             <div className='bg-gray-100 min-w-[30%] flex flex-col py-6 rounded-2xl'>
//                 <div className='h-20 w-24 my-9 mx-auto relative'>
//                     <div className='relative'>
//                         <label>
//                             <div className='bg-slate-100 shadow-lg text-center text-[13px] absolute -bottom-10 right-[6px] py-1 opacity-60 hover:opacity-90 cursor-pointer transition-all rounded-full'>
//                                 Upload Image
//                             </div>
//                             <input type='file' className='hidden'
//                              onChange={(e)=>changeUploadHandler(e)}
//                             />
//                         </label>
//                     <img className='rounded-full h-24 w-32' src={data.profilePic || loginIcon}/>
//                     </div>
                    
//                 </div>
//                 <form className='grid px-10 gap-2' onSubmit={(event)=>submitHandler(event)}>
//                     <div>
//                         <label htmlFor='name'>Name:</label>
//                         <div className="flex">
//                             <input className={`w-full h-full px-4 py-2 bg-transparent outline-none border-2 border-gray-500 ${data.name===""? (" focus:border-red-500"):("focus:border-green-500")}`} 
//                             type='text' 
//                             name='name' 
//                             value={data.name}
//                             required
//                             placeholder='Enter Your Name'
//                             onChange={(event)=>changeHandler(event)}
//                             />

//                         </div>
//                     </div>

//                     <div>
//                         <label htmlFor='email'>Email:</label>
//                         <div className='flex'>
//                             <input className={`w-full h-full px-4 py-2 bg-transparent outline-none border-2 border-gray-500 ${data.email===""? (" focus:border-red-500"):("focus:border-green-500")}`}
//                             type='email' 
//                             name='email' 
//                             value={data.email}
//                             required
//                             placeholder='Enter Your Email'
//                             onChange={(event)=>changeHandler(event)}/>
//                         </div>
//                     </div>
                    
//                     <div className='flex gap-4'>
//                         <div>
//                             <label htmlFor='profession'>Profession:</label>
//                             <div className="flex">
//                                 <input className={`w-full h-full px-4 py-2 bg-transparent outline-none border-2 border-gray-500 ${data.profession===""? (" focus:border-red-500"):("focus:border-green-500")}`} 
//                                 type='text' 
//                                 name='profession' 
//                                 value={data.profession}
//                                 required
//                                 placeholder='Enter Your profession'
//                                 onChange={(event)=>changeHandler(event)}
//                                 />

//                             </div>
//                         </div>

//                         <div>
//                             <label htmlFor='department'>Department:</label>
//                             <div className="flex">
//                                 <input className={`w-full h-full px-4 py-2 bg-transparent outline-none border-2 border-gray-500 ${data.department===""? (" focus:border-red-500"):("focus:border-green-500")}`} 
//                                 type='text' 
//                                 name='department' 
//                                 value={data.department}
//                                 required
//                                 placeholder='Enter Your department'
//                                 onChange={(event)=>changeHandler(event)}
//                                 />

//                             </div>
//                         </div>
//                     </div>

//                     <div className='flex gap-4'>
//                         <div>
//                             <label htmlFor='batch'>Batch:</label>
//                             <div className="flex">
//                                 <input className={`w-full h-full px-4 py-2 bg-transparent outline-none border-2 border-gray-500 ${data.batch===""? (" focus:border-red-500"):("focus:border-green-500")}`} 
//                                 type='text' 
//                                 name='batch' 
//                                 value={data.batch}
//                                 required
//                                 placeholder='Enter Your batch'
//                                 onChange={(event)=>changeHandler(event)}
//                                 />

//                             </div>
//                         </div>

//                         <div>
//                             <label htmlFor='location'>Location:</label>
//                             <div className="flex">
//                                 <input className={`w-full h-full px-4 py-2 bg-transparent outline-none border-2 border-gray-500 ${data.location===""? (" focus:border-red-500"):("focus:border-green-500")}`} 
//                                 type='text' 
//                                 name='location' 
//                                 value={data.location}
//                                 required
//                                 placeholder='Enter Your location'
//                                 onChange={(event)=>changeHandler(event)}
//                                 />

//                             </div>
//                         </div>
//                     </div>

//                     <div>
//                         <label htmlFor='password'>Password:</label>
//                         <div className='flex relative'>
//                             <input className={`w-full h-full px-4 py-2 bg-transparent outline-none border-2 border-gray-500 ${data.password===""? (" focus:border-red-500"):("focus:border-green-500")}`}
//                                 type={showPassword?"text":"password"} 
//                                 name='password' 
//                                 value={data.password}
//                                 required
//                                 placeholder='Enter Your Password'
//                                 onChange={(event)=>changeHandler(event)}/>
//                             <span className='text-xl cursor-pointer absolute right-2 top-3' onClick={()=>setshowPassword(!showPassword)}>
//                                 {
//                                     showPassword?(<FaEyeSlash/>):(<FaEye/>)
//                                 }
//                                 </span>
//                         </div>
//                     </div>

//                     <div>
//                         <label htmlFor='confirmPassword'>Confirm Password:</label>
//                         <div className='flex relative'>
//                             <input className={`w-full h-full px-4 py-2 bg-transparent outline-none border-2 border-gray-500 ${data.confirmPassword===""? (" focus:border-red-500"):("focus:border-green-500")}`} 
//                                 type={showConfirmPassword?"text":"password"} 
//                                 name='confirmPassword' 
//                                 value={data.confirmPassword}
//                                 required
//                                 placeholder='Confirm Your Password'
//                                 onChange={(event)=>changeHandler(event)}/>
//                             <span className='text-xl cursor-pointer absolute right-2 top-3' onClick={()=>setShowConfirmPassword(!showConfirmPassword)}>
//                                 {
//                                     showConfirmPassword?(<FaEyeSlash/>):(<FaEye/>)
//                                 }
//                                 </span>
//                         </div>
//                     </div>
                    
//                     <button className='px-4 py-2 rounded-xl bg-blue-500 hover:bg-blue-700 transition-all duration-100 text-lg text-bold'>Register</button>
//                 </form>
//                 <p className='text-sm px-10'>Already have account ? <Link to="/login" className='hover:underline text-blue-500 hover:text-blue-800'>Login</Link></p>
//             </div>
//     </section>
//   )
// }




