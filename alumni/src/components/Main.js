import React from 'react';
import image from '../assets/logobgr.png';

export const Main = () => {
  return (
    <div className="bg-gray-800 text-white h-[24rem] lg:h-[30rem] flex flex-col lg:flex-row w-full justify-evenly items-center px-4 md:px-12">
      
      <div className="text-center lg:text-left max-w-2xl">
        <p className="font-bold text-2xl lg:text-5xl leading-tight  text-white">
          One Family. Many Journeys. <br /> <span className="text-blue-400">Forever Jamian</span>
        </p>
      </div>

      <div>
        <img
          src={image}
          alt="Jamia Logo"
          className="w-[18rem] lg:w-[28rem] object-contain"
        />
      </div>
    </div>
  );
};
