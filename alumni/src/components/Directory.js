import React, { useEffect, useState } from 'react';
import ProfileCard from './ProfileCard';
import backendUrl from '../common';

const mockAlumni = [
  { id: 1, name: 'Alice Kumar', batch: '2018', role: 'Software Engineer' },
  { id: 2, name: 'Rahul Singh', batch: '2019', role: 'Data Analyst' },
  { id: 3, name: 'Alice Kumar', batch: '2018', role: 'Software Engineer' },
  { id: 4, name: 'Rahul Singh', batch: '2019', role: 'Data Analyst' },
  { id: 5, name: 'Alice Kumar', batch: '2018', role: 'Software Engineer' },
  { id: 6, name: 'Rahul Singh', batch: '2019', role: 'Data Analyst' },
  { id: 7, name: 'Alice Kumar', batch: '2018', role: 'Software Engineer' },
  { id: 8, name: 'Rahul Singh', batch: '2019', role: 'Data Analyst' },
  { id: 9, name: 'Alice Kumar', batch: '2018', role: 'Software Engineer' },
  { id: 10, name: 'Rahul Singh', batch: '2019', role: 'Data Analyst' },
];

export default function Directory() {
  const [totalAlumni,setTotalAlumni] = useState([])
  async function fetchAllAlumni(){
    const apiresponse = await fetch(backendUrl.getAlumni.url,{
      method:backendUrl.getAlumni.method,
      headers:{
        "content-type" : "application/json",
    },
    })
    const apidata = await apiresponse.json();
    if(apidata.success){
      setTotalAlumni(apidata.data)
      console.log("totalalumni",totalAlumni)
    }
    if(apidata.error){
      console.log("Error while calling total alumini api",apidata.error)
    }
  }
  useEffect(()=>{
    fetchAllAlumni()
  },[])
  return (
    <div className="flex flex-col gap-6 overflow-x-scroll p-6 scrollbar-non scrollbar-custom">
      <h1 className="text-2xl font-bold">Our Alumni</h1>
      <div className='flex gap-4'>
        {totalAlumni.map((alum) => {
          return (
            <div className='min-w-56 hover:scale-105 transition-all duration-200 hover:shadow-lg hover:shadow-gray-700'>
              <div className="bg-white rounded shadow p-4 h-fit">
                <div>
                    <img 
                        src={alum.profilePic} alt='image'
                        className='w-52 rounded-xl'/>
                  </div>
                  <div className='flex gap-1 flex-col'>
                      <div>
                          <h3 className='font-semibold text-xl'>{alum.name}</h3>
                          <p className='text-xs'>{alum.profession}</p>
                      </div>
                      <div className='flex flex-col'>
                        <p className='text-base'>{alum.department}</p>
                        {/* <div>|</div> */}
                        <p className='text-base'>{alum.batch}</p>
                      </div>
                      <p className='text-base line-clamp-1'>{alum.location}</p>
                  </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}