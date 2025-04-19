import React from 'react'
import { PiStudentBold } from "react-icons/pi";
export const TotalAlumni = () => {
  return (
    <div className='bg-black w-full h-[300px]'>
        <div className='w-[90%] lg:w-[70%] flex items-center justify-between mx-auto h-full text-lg lg:text-2xl'>
            <div className='text-white flex flex-col items-center justify-center self-center'>
                <PiStudentBold size={60}/>
                <p>100</p>
                <p>Alumni</p>
            </div>
            <div className='text-white flex flex-col items-center justify-center self-center'>
                <PiStudentBold size={60}/>
                <p>100</p>
                <p>Alumni</p>
            </div>
            <div className='text-white flex flex-col items-center justify-center self-center'>
                <PiStudentBold size={60}/>
                <p>100</p>
                <p>Alumni</p>
            </div>
        </div>
    </div>
  )
}
