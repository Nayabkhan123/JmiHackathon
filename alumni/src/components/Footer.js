import React from 'react'
import { Link } from 'react-router-dom'

export const Footer = () => {
  return (
    <div className='bg-black text-white h-fit p-4 flex items-center justify-evenly'>
      {/* <div className='flex flex-col gap-4'>
        <Link to={"/community"}>Community Feed</Link>
        <Link to={"/alumni-directory"}>Alumni Directory</Link>
      </div> */}
      <p className=''>
        Jamia Millia Islamia Relations © 2025. All rights reserved.
      </p>
    </div>
  )
}
