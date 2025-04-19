import React, { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import backendUrl from '../common'

export const AlumniDirectory = () => {
    const [inputData,setInputdata] = useState("")
    const [filterOption, setFilterOption] = useState(""); 

    const [alumniData,setAluminiData] = useState([])
    async function searchAlumni(){
        const apiresponse = await fetch(backendUrl.searchAlumni.url,{
          method:backendUrl.searchAlumni.method,
          headers:{
            "content-type" : "application/json",
        },
        credentials:'include',
        body:JSON.stringify({inputData,filterOption}),
        })
        const apidata = await apiresponse.json();
        if(apidata.success){
          setAluminiData(apidata.data)
        }
        if(apidata.error){
          console.log("Error while calling search alumini api",apidata.error)
        }
      }
      useEffect(()=>{
        searchAlumni()
      },[inputData])
  return (
    <div>
        <div className='flex flex-col gap-6'>
            <div className='flex items-center justify-evenly gap-4 mt-4 relative'>
                <div className='flex gap-4'>
                    <label htmlFor="searchBy">Search & Filter:</label>
                    <select 
                        id="searchBy"
                        value={filterOption}
                        onChange={(e) => setFilterOption(e.target.value)}
                        className='w-32 px-2 py-1 rounded-lg font-medium focus:outline-none focus:ring-1 focus:ring-blue-400 '
                        >
                        <option value="name" className='bg-blue-100 hover:bg-black'>Name</option>
                        <option value="batch" className='bg-blue-100'>Batch</option>
                        <option value="branch" className='bg-blue-100'>Branch</option>
                        <option value="job-title" className='bg-blue-100'>JobTitle</option>
                        <option value="location" className='bg-blue-100'>Location</option>
                    </select>
                </div>
                <div className='relative w-2/3 md:w-1/3'>
                    <input 
                        type='text'
                        placeholder='Search Our Alumni'
                        value={inputData}
                        onChange={(e)=>setInputdata(e.target.value)}
                        className='w-full rounded-xl px-4 py-2 bg-gray-200 placeholder:text-black focus:outline-blue-200'
                    />
                    <div onClick={searchAlumni} className='cursor-pointer absolute right-3 bottom-[0.50rem]'>
                        <FaSearch size={20}/>
                    </div>
                </div>
                
            </div>
            <div>
                <div className='w-full flex flex-col gap-4'>
                    {
                        alumniData?.map((alum)=>{
                            return (
                                <div className='w-[80%] mx-auto border-2 p-8'>
                                    <h3>{alum.name}</h3>
                                    <p>{alum.email}</p>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    </div>
  )
}
