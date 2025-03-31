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
      <h1 className="md:text-lg text-xs tracking-tight font-bold uppercase text-red-600">
        {pkg?.package_name}</h1>
        <div className="lg:mt-2  flex items-center  rounded-lg px-2 bg-slate-300">
          <p>
            {pkg?.regular_price && (
              <span className="md:text-sm text-xs line-through ">₹{pkg?.regular_price}</span>
            )}
            <span className="md:text-3xl text-lg font-bold text-teal-700 ml-1">
              ₹{pkg?.discounted_price}
            </span>
          </p>
        </div>
        <div className=" w-full h-full mt-10  bottom-0">
        <button className="bottom-2 left-2 view-button text-white px-3 py-1  lg:text-sm text-xs" onClick={handleCardClick}>
          View Details
        </button>
        </div>
      </div>
    </div>
  );
});

export default PackageCards;
