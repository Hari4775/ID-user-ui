import React from 'react';

const SkeletonPackageCard = () => {
  return (
    <div
      className={`animate-pulse lg:h-56 h-36 w-full self-center rounded-lg border-2 shadow-md relative bg-gray-200`}
    >
      <div className="lg:mt-10 mt-5 md:px-5 px-1 md:pb-5 pb-1">
        {/* Package name placeholder */}
        <div className="h-4 md:h-6 w-1/2 bg-gray-300 rounded mb-2"></div>

        {/* Price section */}
        <div className="lg:mt-2 flex items-center rounded-lg px-2 bg-slate-300 w-3/4 h-6">
          <div className="h-4 w-1/2 bg-gray-400 rounded"></div>
        </div>

        {/* Button placeholder */}
        <div className="w-full h-full mt-10 bottom-0">
          <div className="bottom-2 left-2 bg-gray-400 rounded-md px-3 py-2 w-28 lg:w-32 h-6 lg:h-8"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonPackageCard;
