import React, { useEffect, useState } from 'react';
import './Packages.css';
import PackageCards from './PackageCards';
import SkeletonPackageCard from '../Cards/SkeletonPackageCard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPackages } from '../../../Redux/Slices/PackageSlice';

const Packages = () => {
  const dispatch = useDispatch();
  const { packages, loading, error } = useSelector((state) => state.package);
  const [packageData,setPackageData] = useState([])
  console.log(packageData)

  useEffect(() => {
    dispatch(fetchPackages());
  }, [dispatch]);

  useEffect(() => {
    setPackageData(packages); 
  }, [packages]);

  const renderContent = () => {
    if (loading) {
      return Array.from({ length: 6 }).map((_, i) => <SkeletonPackageCard key={i} />);
    }

    if (error) {
      return (
        <div className="col-span-full text-center text-red-600 font-semibold">
          Error loading packages: {error}
        </div>
      );
    }

    if (packageData?.length > 0) {
      return packageData.map((pkg) => <PackageCards key={pkg.package_id} pkg={pkg} />);
    }

    return (
      <div className="col-span-full text-center text-gray-600">
        No packages found.
      </div>
    );
  };

  return (
    <div className="relative mb-20 h-full card-container" id="packages">
      <div className="w-11/12 md:w-1/2 mx-auto text-center pt-10">
        <h1 className="text-xl lg:text-3xl font-bold">CHOOSE YOUR TOUR PACKAGE</h1>
        <p className="text-sm md:text-lg text-black mb-5">
          Select the package & explore the{' '}
          <span className="text-blue-500 text-xs">Real</span>
          <span className="text-red-700 text-lg font-bold"> HEAVEN</span> with us
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 py-10 w-11/12 md:w-10/12 mx-auto">
        {renderContent()}
      </div>
    </div>
  );
};

export default Packages;
