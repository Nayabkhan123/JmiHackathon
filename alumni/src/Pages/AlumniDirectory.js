import React, { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import backendUrl from '../common'
import { useDebounce } from '../hooks/deBounce'

export const AlumniDirectory = () => {
    const [inputData,setInputdata] = useState("")
    const [filterOption, setFilterOption] = useState(""); 
    const [sortOption, setSortOption] = useState(""); 
    const [sortOrder, setSortOrder] = useState(""); 
    const debounceValue = useDebounce(inputData,1000)

    const [alumniData,setAluminiData] = useState([])
    async function searchAlumni(){
        const apiresponse = await fetch(backendUrl.searchAlumni.url,{
          method:backendUrl.searchAlumni.method,
          headers:{
            "content-type" : "application/json",
        },
        credentials:'include',
        body:JSON.stringify({inputData,filterOption,sortOption,sortOrder}),
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
      },[debounceValue,filterOption,sortOption,sortOrder])
      useEffect(()=>{
        if(sortOption){
            setSortOrder("asc")
        }
      },[sortOption])
  return (
    <div>
        <div className='flex flex-col gap-6'>
            <div className='flex w-[70%] flex-col xl:flex-row mx-auto items-center justify-center xl:justify-evenly gap-4 mt-4 relative'>
                <div className='flex gap-5 flex-col md:flex-row'>
                    {/* SortBy */}
                    <div className='flex gap-4 items-center'>
                        <label htmlFor="searchBy">Sort By:</label>
                        <select 
                            id="sortBy"
                            value={sortOption}
                            onChange={(e) => setSortOption(e.target.value)}
                            className='w-32 px-1 py-1 rounded-lg font-medium focus:outline-none focus:ring-1 focus:ring-blue-400 '
                            >
                            <option value="" disabled className='bg-blue-100 hover:bg-black'>Select Filter</option>
                            <option value="name" className='bg-blue-100 hover:bg-black'>Name</option>
                            <option value="graduationYear" className='bg-blue-100 hover:bg-black'>Graduation Year</option>
                            <option value="profession" className='bg-blue-100'>Profession</option>
                            <option value="location" className='bg-blue-100'>Location</option>
                        </select>
                    </div>
                    {/* sortOrder */}
                    <div className='flex gap-4 items-center'>
                        <label htmlFor="searchBy">Sort Order:</label>
                        <select 
                            id="sortBy"
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                            className='w-32 px-2 py-1 rounded-lg font-medium focus:outline-none focus:ring-1 focus:ring-blue-400 '
                            >
                            <option value="" disabled className='bg-blue-100 hover:bg-black'>Select Filter</option>
                            <option value="asc">Ascending</option>
                            <option value="desc">Descending</option>
                        </select>
                    </div>
                </div>
                {/* filterBy */}
                <div className='flex gap-4 items-center'>
                    <label htmlFor="searchBy">Filter By:</label>
                    <select 
                        id="searchBy"
                        value={filterOption}
                        onChange={(e) => setFilterOption(e.target.value)}
                        className='w-32 px-1 py-1 rounded-lg font-medium focus:outline-none focus:ring-1 focus:ring-blue-400 '
                        >
                        <option value="" disabled className='bg-blue-100 hover:bg-black'>Select Filter</option>
                        <option value="name" className='bg-blue-100 hover:bg-black'>Name</option>
                        <option value="batch" className='bg-blue-100'>Batch</option>
                        <option value="branch" className='bg-blue-100'>Branch</option>
                        <option value="job-title" className='bg-blue-100'>JobTitle</option>
                        <option value="location" className='bg-blue-100'>Location</option>
                    </select>
                </div>
                {/* searchField */}
                <div className='relative w-full xl:w-1/3 '>
                    <input 
                        type='text'
                        placeholder={`Search By ${filterOption ? (filterOption) : "name"}`}
                        value={inputData}
                        onChange={(e)=>setInputdata(e.target.value)}
                        className='w-full placeholder:capitalize rounded-xl px-4 py-2 bg-gray-200 placeholder:text-black focus:outline-blue-200'
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
                                <div className='w-[80%] hover:scale-105 mx-auto border-2 rounded-lg hover:shadow-lg hover:bg-gray-200 transition-all duration-100 p-8 flex flex-col lg:flex-row items-center gap-5 lg:gap-10'>
                                    <div>
                                        <img 
                                            src={alum.profilePic} alt='image'
                                            className='w-52 rounded-xl'/>
                                    </div>
                                    <div className='flex gap-2 lg:gap-4 flex-col'>
                                        <div>
                                            <h3 className='font-semibold text-2xl'>{alum.name}</h3>
                                            <p className='text-sm'>{alum.profession}</p>
                                        </div>
                                        <p className='text-base'>{alum.email}</p>
                                        <p className='text-base'>Branch: <span>{alum.department}</span></p>
                                        <p className='text-base'>Batch: <span>{alum.batch}</span></p>
                                        {/* <p className='text-base'>connect at https://linkedin</p> */}
                                        <p className='text-base'>{alum.location}</p>
                                        
                                    </div>
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
