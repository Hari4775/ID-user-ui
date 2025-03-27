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
    <div className="cursor-pointer transform hover:scale-105 transition-transform duration-300 group border-gray-100/30 flex w-full max-w-xs flex-col self-center overflow-hidden rounded-lg border-2 package-container shadow-md">
      <a className="relative mx-3 mt-3 flex md:h-60 h-32 overflow-hidden rounded-xl">
        <img
          className="peer absolute top-0 right-0 h-full w-full object-cover"
          src={pkg?.coverImage}
          alt={pkg?.package_name || "Package Image"}
        />
      </a>
      <div className="mt-4 md:px-5 px-2 md:pb-5 pb-1">
        <h1 className="md:text-xl text-sm tracking-tight font-bold uppercase">{pkg?.package_name}</h1>
        <div className="mt-2 md:mb-5 mb-2 flex items-center justify-between">
          <p>
            <span className="md:text-sm text-xs">start from</span>
            {pkg?.regular_price && (
              <span className="md:text-sm text-xs line-through ml-2">₹{pkg?.regular_price}</span>
            )}
            <span className="md:text-3xl text-lg font-bold text-teal-700 ml-1">
              ₹{pkg?.discounted_price}
            </span>
          </p>
        </div>
        <button className="no-button w-full mx-auto" onClick={handleCardClick}>
          View Details
        </button>
      </div>
    </div>
  );
});

export default PackageCards;
