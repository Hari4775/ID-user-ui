import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './Packages.css';

const PackageCards = React.memo(({ pkg }) => {
  const navigate = useNavigate();

  // useCallback ensures this function is only recreated when `navigate` or `pkg.package_id` changes
  const handleCardClick = useCallback(() => {
    navigate(`/packagedetails/${pkg.package_id}`);
  }, [navigate, pkg.package_id]);

  return (
    // <div className="cursor-pointer transform hover:scale-105 transition-transform duration-300 group border-gray-100/30 flex w-full max-w-xs flex-col self-center overflow-hidden rounded-lg border-2 package-container shadow-md">
       <div
    className={`cursor-pointer transform hover:scale-105 lg:h-56 h-36  transition-transform duration-300 group flex w-full self-center rounded-lg border-2 shadow-md relative bg-cover bg-center bg-no-repeat`}
    style={{
      backgroundImage: `url(${pkg?.coverImage|| "default-placeholder.png"})`,
    }}
  >
    
      <div className="lg:mt-10 mt-5 md:px-5 px-1 md:pb-5 pb-1 ">
      <div className="lg:mt-2  flex items-center px-2 rounded-lg  backdrop-blur-md  ">

      <h1 className="md:text-lg text-xs tracking-tight font-extrabold uppercase text-white   bg-blur ">
        {pkg?.package_name}</h1>
        </div>
        <div className="lg:mt-2  flex items-center px-2 rounded-lg  backdrop-blur-lg bg-slate-300  ">
          <p>
            {pkg?.regular_price && (
              <span className="md:text-lg text-sm font-bold line-through text-red-500">₹{pkg?.regular_price}</span>
            )}
            <span className="md:text-md text-xs font-extrabold text-green-600 ml-1">
              ₹{pkg?.discounted_price}
            </span>
          </p>
        </div>
        <div className="w-full h-full mt-10 bottom-0">
  <button
    className="bottom-2 left-2 border-blue-800 border-[1px] px-4 py-2 text-white text-xs lg:text-sm font-medium 
      rounded-lg bg-gradient-to-br from-white/10 to-white/5 
      backdrop-blur-sm shadow-md transition-all duration-300 
       hover:bg-blue-700 hover:border-white 
       hover:shadow-lg hover:font-bold hover:scale-105 
      focus:outline-none"
    onClick={handleCardClick}
  >
    View
  </button>
</div>

      </div>
    </div>
  );
});

export default PackageCards;
