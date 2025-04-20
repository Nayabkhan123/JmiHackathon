import React, { useEffect, useState } from 'react';
import backendUrl from '../common';
import { Link } from 'react-router-dom';

export default function Directory() {
  const [totalAlumni, setTotalAlumni] = useState([]);

  async function fetchAllAlumni() {
    const apiresponse = await fetch(backendUrl.getAlumni.url, {
      method: backendUrl.getAlumni.method,
      headers: {
        "content-type": "application/json",
      },
    });
    const apidata = await apiresponse.json();
    if (apidata.success) {
      setTotalAlumni(apidata.data);
    } else if (apidata.error) {
      console.log("Error while calling total alumni API", apidata.error);
    }
  }

  useEffect(() => {
    fetchAllAlumni();
  }, []);

  return (
    <div className="bg-gray-900 text-white flex flex-col gap-6 overflow-x-scroll p-6 scrollbar-none scrollbar-custom">
      <Link to={'/alumni-directory'} className="text-3xl font-bold">Our Alumni</Link>

      <div className="flex gap-6 pb-4">
        {totalAlumni?.map((alum) => (
          <div
            key={alum._id}
            className="min-w-56  bg-gray-800 rounded-xl p-4 shadow-lg hover:scale-105 hover:shadow-[0_3px_10px_rgba(59,130,246,0.5)] transition-transform duration-300"
          >
            <div className="mb-3">
              <img
                src={alum.profilePic}
                alt="profile"
                className="w-52 h-52 object-cover rounded-xl border border-blue-400/30"
              />
            </div>
            <div className="space-y-1">
              <h3 className="font-semibold text-lg">{alum.name}</h3>
              <p className="text-sm text-gray-300">{alum.profession}</p>
              <div className="flex gap-2 text-sm text-gray-400">
                <span>{alum.department}</span>
                <span>|</span>
                <span>{alum.batch}</span>
              </div>
              <p className="text-sm text-gray-400">{alum.location}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}