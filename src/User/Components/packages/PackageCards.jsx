import React from 'react';
import './Packages.css';
import { useNavigate } from 'react-router-dom';



const PackageCards = ({pkg}) => {
  const navigate = useNavigate();


  const handleCardClick = (pkg) => {
    navigate(`/packagedetails/${pkg._id}`);
  };

  console.log(pkg)
  return (
   
      <div className="cursor-pointer transform hover:scale-105 transition-transform duration-300 group border-gray-100/30 flex w-full max-w-xs flex-col self-center overflow-hidden rounded-lg border-2 package-container shadow-md" key={pkg?.id}>
        <a className="relative mx-3 mt-3 flex md:h-60 h-32 overflow-hidden rounded-xl" >
          <img
            className="peer absolute top-0 right-0 h-full w-full object-cover"
            src={pkg?.profileImage} 
            alt="product image"
          />
        </a>
        <div className="mt-4 md:px-5 px-2 md:pb-5 pb-1">
         
            <h1 className="md:text-xl text-sm tracking-tight font-bold uppercase">{pkg?.title}</h1>
          
          <div className="mt-2 md:mb-5 mb-2 flex items-center justify-between">
            <p>
              <span className="md:text-sm text-xs " >start from</span>
              <span className="md:text-sm text-xs  line-through ml-2">₹{pkg?.price?.regular}</span>
              <span className="md:text-3xl text-lg font-bold text-teal-700 ml-1">{pkg?.price?.discounted}</span>
            </p>
          </div>
          <button className="no-button w-full mx-auto " onClick={() => handleCardClick(pkg)}>
            View Details
          </button>
        </div>
      </div>

  );
};

export default PackageCards;
