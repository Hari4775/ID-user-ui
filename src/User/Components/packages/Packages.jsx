import React, { useEffect, useState } from 'react';
import Header from '../../../Common/Header/Header';
import './Packages.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import PackageCards from './PackageCards';

const Packages = () => {

  const navigate = useNavigate();
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log(packages,"packages")
  useEffect(() => {
    fetchPackages();
  }, []);

  console.log(packages,"packages")
  const fetchPackages = async () => {
    try {
      const response = await axios.get("https://islandays.onrender.com/packages");
      // console.log(response?.data, "responseSSSS");
      if (!response) {
        throw new Error("Network response error");
      }
      setPackages(response?.data);
      setLoading(false);
    } catch (error) {
      console.log(error, "data fetching error");
    }
  };

  const handleCardClick = (pkg) => {
    navigate(`/packagedetails/${pkg._id}`);
  };

  return (
    <>
    <div className="f mb-20 h-full relative card-container" id="packages" >
        <div className='md:w-1/2 w-11/12 mx-auto'>
          <h1 className=' lg:text-3xl text-xl font-bold pt-10 text-center'>CHOOSE YOUR TOUR PACKAGE</h1>
          <p className='text-black mb-5 md:text-lg text-sm lg:text-center text-left'>
            Select the package & explore the <span className='text-blue-500 text-xs'>Real</span><span className='text-red-700 text-lg font-bold'>HEAVEN</span> with us
          </p>
        </div>
      <div className=' flex md:w-10/12 w-11/12 mx-auto  grid grid-cols-2  lg:grid-cols-3 gap-4 py-10'>
      {packages?.length > 0 ? (
        packages.map((pkg) => (
          <PackageCards key={pkg._id} pkg={pkg} />
        ))
      ):(
        <div className="flex justify-center items-center h-full w-full">
          <p className="text-center">No packages found</p>
        </div>
      )}
        {/* Use a grid layout for the packages */}
        {/* <div className="card-data grid grid-cols-2  lg:grid-cols-4 gap-4 py-10 w-11/12 mx-auto ">
       
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className=" bg- h-48 lg:h-96 cursor-pointer transform hover:scale-105 transition-transform duration-300 group card"
              onClick={() => handleCardClick(pkg)}
            > */}
              {/* <div className="absolute right-0 top-0">
                <div className="absolute transform rotate-45 bg-green-600 text-center text-white font-semibold py-1 right-[-35px] top-[32px] w-[170px]">
                  {pkg?.offer} off
                </div>
              </div> */}
               {/* <div className="absolute transform  bg-green-600 text-center text-white font-semibold mt-4 ml-5 w-[170px]">
                  {pkg?.offer} off
              </div> */}
              {/* <img src={pkg?.profileImage} alt={pkg?.title} className="w-11/12 mx-auto mt-4 lg:h-64 h-48 object-cover rounded-xl card-image" />
             
            
              
              <div className="card-data  left-0 text-white  w-full mx-auto p-2">
                <h2 className="text-2xl text-center card-data" onClick={() => handleCardClick(pkg)}>{pkg?.title}</h2>
                <h3 className="text-lg">
                    From <span className="line-through text-red-400">₹{pkg?.price?.regular}</span> 
                    <span className="text-green-200 ml-2">₹{pkg?.price?.discounted}</span>
               </h3>
              </div>
              <button className='bg-blue-500 text-center w-full mx-auto card-button h-10 '>
                <p className=''>View Details</p>
               </button>
           
            </div> */}
          {/* ))} */}
        {/* </div> */}
      </div>
      </div>
    </>
  );
};

export default Packages;
