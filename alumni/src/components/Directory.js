import React from 'react';
import ProfileCard from './ProfileCard';

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
  return (
    <div className="flex flex-col gap-6 overflow-x-scroll p-6 scrollbar-non scrollbar-custom">
      <h1 className="text-2xl font-bold">Alumni Directory</h1>
      <div className='flex gap-4'>
        {mockAlumni.map((alum) => {
          return (
            <div className='min-w-[300px] hover:scale-105 transition-all duration-200 hover:shadow-lg hover:shadow-gray-700'>
              <ProfileCard
                key={alum.id}
                name={alum.name}
                batch={alum.batch}
                role={alum.role}
              />
            </div>
          )
        })}
      </div>
    </div>
  );
}