import React from 'react';

const PlanSkeletonCard = () => (
  <div className="cursor-pointer group w-full rounded-2xl shadow-xl pb-16 bg-gradient-to-br from-white via-gray-50 to-gray-100 animate-pulse mb-6 border border-gray-200">
    
    {/* Day Heading */}
    <div className="px-6 pt-6">
      <div className="h-6 w-28 bg-gray-300 rounded-full mb-2"></div>
      <div className="h-4 w-1/2 bg-gray-200 rounded-full mb-4"></div>
    </div>

    {/* Description */}
    <div className="w-11/12 mx-auto mb-6 space-y-2">
      <div className="h-3 w-full bg-gray-200 rounded-full"></div>
      <div className="h-3 w-5/6 bg-gray-200 rounded-full"></div>
      <div className="h-3 w-2/3 bg-gray-200 rounded-full"></div>
    </div>

    {/* Accommodations */}
    <div className="flex gap-4 px-6 mb-5">
      {[1, 2, 3].map((_, i) => (
        <div key={i} className="w-1/3 h-24 bg-gray-200 rounded-xl shadow-inner"></div>
      ))}
    </div>

    {/* Activities */}
    <div className="flex gap-4 px-6 mb-5">
      {[1, 2, 3].map((_, i) => (
        <div key={i} className="w-1/3 h-20 bg-gray-200 rounded-xl shadow-inner"></div>
      ))}
    </div>

    {/* Foods */}
    <div className="flex gap-4 px-6">
      {[1, 2, 3].map((_, i) => (
        <div key={i} className="w-1/3 h-16 bg-gray-200 rounded-xl shadow-inner"></div>
      ))}
    </div>
  </div>
);

export default PlanSkeletonCard;
