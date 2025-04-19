// src/components/ProfileCard.jsx
import React from 'react';

export default function ProfileCard({ name, batch, role }) {
  return (
    <div className="bg-white rounded shadow p-4 h-[300px]">
      <div className="font-bold text-lg">{name}</div>
      <div className="text-sm text-gray-600">Batch: {batch}</div>
      <div className="text-sm text-gray-600">Role: {role}</div>
    </div>
  );
}