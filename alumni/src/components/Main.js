import React from 'react'
// import image from '../assets/image.png'
import image from '../assets/logo.jpg'
export const Main = () => {
  return (
    <div className='h-[24rem] lg:h-[26rem] flex flex-col lg:flex-row w-full justify-evenly items-center'>
        
      <div >
          <p className='font-bold text-2xl lg:text-5xl text-black text-center'>One Family. Many Journeys.<br/> Forever Jamian</p>
      </div>
      <div>
        <img src={image}
              className='w-[20rem] lg:w-[30rem] mix-blend-darken'/>
      </div>
    </div>
  )
}
