import React, { useEffect, useState } from 'react';
import './Packages.css';
import { useNavigate } from 'react-router-dom';
import PackageCards from './PackageCards';
import { getPackages } from '../../../api/package/packageAPI';
const Packages = () => {

  const [packages, setPackages] = useState([]);
  console.log(packages,"packages");
  
  
    const fetchPackages = async () => {
      try {
        // const response = await axios.get(`${url}/test`);  
        const response = await getPackages()
        if (!response) {
          throw new Error("Network response error");
        }
        setPackages(response?.data?.packages);
        setLoading(false);
      } catch (error) {
        console.log(error, "data fetching error");
      }
    };
  
    useEffect(() => {
      fetchPackages();
    }, []);
  


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
          <PackageCards key={pkg?.package_id} pkg={pkg} />
        ))
      ):(
        <div className="flex justify-center items-center h-full w-full">
          <p className="text-center">No packages found</p>
        </div>
      )}

      </div>
      </div>
    </>
  );
};

export default Packages;
