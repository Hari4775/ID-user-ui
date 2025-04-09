import React from "react";

const SkeletonCategoryCard = () => {
  return (
    <div
      className={`cursor-pointer transform transition-transform duration-300 group flex w-full self-center rounded-lg border-2 shadow-md relative bg-cover bg-center bg-no-repeat bg-gray-200 animate-pulse`}
    >
      <div className="lg:mt-4 md:px-5 px-1 md:pb-5 pb-1 w-full">
        <div className="h-4 md:h-5 w-2/3 bg-gray-300 rounded mb-3"></div>

        <div className="lg:mt-2 flex items-center rounded-lg px-2 bg-slate-300 py-1 space-x-2">
          <div className="h-4 lg:h-5 w-10 bg-gray-400 rounded"></div>
          <div className="h-4 lg:h-5 w-12 bg-gray-500 rounded"></div>
        </div>

        <div className="w-full h-full mt-5">
          <div className="h-6 w-20 bg-gray-400 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCategoryCard;
