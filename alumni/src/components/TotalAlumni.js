import React from 'react';
import { PiStudentBold } from "react-icons/pi";
import {ImBooks} from 'react-icons/im'
import {MdEmojiEvents} from 'react-icons/md'
export const TotalAlumni = () => {
  return (
    <div className="bg-gray-900 w-full py-12 px-4 md:px-16">
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 text-center text-white">
        <StatCard icon={<PiStudentBold className="text-blue-400 text-5xl mb-3" />} label="Alumni" value="1000+" shadow="hover:shadow-[0_3px_10px_rgba(59,130,246,0.5)]" />
        <StatCard icon={<ImBooks  className="text-green-400 text-5xl mb-3" />} label="Departments" value="5+" shadow="hover:shadow-[0_3px_10px_rgba(52,211,153,0.5)]" />
        <StatCard icon={<MdEmojiEvents className="text-purple-400 text-5xl mb-3" />} label="Events" value="200+ " shadow="hover:shadow-[0_3px_10px_rgba(192,132,252,0.5)]"  />
      </div>
    </div>
  );
};

const StatCard = ({ icon, value, label,shadow }) => {
  return (
    <div className={`bg-gray-800 rounded-2xl p-6 shadow-lg  ${shadow}  transition duration-200}`}>
      <div className="flex flex-col items-center ">
        {icon}
        <p className="text-3xl font-bold">{value}</p>
        <p className="text-gray-300 text-lg mt-1">{label}</p>
      </div>
    </div>
  );
};
