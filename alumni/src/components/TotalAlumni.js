import React from 'react'
import { PiStudentBold } from "react-icons/pi";
export const TotalAlumni = () => {
  return (
    <div className='bg-gray-900 w-full h-fit p-8 md:p-16'>
        <div className='w-[90%] lg:w-[70%] flex items-center justify-between mx-auto h-full text-md md:text-2xl'>
            <div className='text-white flex flex-col items-center justify-center self-center'>
                <PiStudentBold className='text-[3rem] md:text-[4rem]'/>
                <p>1000+</p>
                <p>Alumni</p>
            </div>
            <div className='text-white flex flex-col items-center justify-center self-center'>
                <PiStudentBold className='text-[3rem] md:text-[4rem]'/>
                <p>5+</p>
                <p>Departments</p>
            </div>
            <div className='text-white flex flex-col items-center justify-center self-center'>
                <PiStudentBold className='text-[3rem] md:text-[4rem]'/>
                <p>200+</p>
                <p>Events</p>
            </div>
        </div>
    </div>
  )
}
