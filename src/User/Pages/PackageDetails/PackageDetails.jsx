import React, { useEffect} from "react";
import { useParams } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./PackageDetails.css";
import { ArrowLeft } from 'lucide-react';
import { star, ticIcon } from "../../../assets/icons/IconIndex";
import { flightimage } from "../../../assets/Index";
import CategoryCard from "./packageDetalis-HeroPage/CategorySection/CategoryCard";
import SkeletonCategoryCard from "../../Components/Cards/SkeltonCards/CategorySkeltonCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCategories, setAllCategoryData } from "../../../Redux/Slices/CategorySlice";
import BackButton from "../../Components/BackButton";

const PackageDetails = () => {
  const dispatch = useDispatch();
  const { package_id } = useParams();
  const { Allcategories, loading, error } = useSelector((state) => state.category);

  useEffect(() => {
    if (package_id) {
    dispatch(setAllCategoryData([]));
    dispatch(fetchAllCategories(package_id));
    }
  }, [dispatch, package_id]);

  return (
    <div
      className=" w-full mx-auto pt-28 h-screen  package-details-main-container  "
      style={{
        background:
          "linear-gradient(to bottom, #e0f7ff, #b3eaff, #66c2ff, #338fcc,)",
      }}
    >
      <div
        className={`relative w-11/12 mx-auto transition-opacity duration-500 
        }`}
      >

{/* <div className="w-fit mb-10">
  <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg backdrop-blur-sm bg-white/10 text-blue-950 font-bold text-sm shadow-md hover:bg-white/20 transition-colors duration-200">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className="w-4 h-4"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
    Back
  </button>
</div> */}


<BackButton />


        
        <h1 className="font-bold lg:text-3xl  text-lg">CHOOSE YOUR PREMIUM</h1>

        <div className="w-full py-10 grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {loading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <SkeletonCategoryCard key={index} />
            ))
          ) : Allcategories?.length > 0 ? (
            Allcategories.map((cat) => (
              <CategoryCard key={cat.category_id} category={cat} />
            ))
          ) : (
            <div className="flex flex-col justify-center items-center py-20 min-h-[40vh] w-full bg-white/40 rounded-xl shadow-inner col-span-full">
              <h2 className="text-xl text-center lg:text-4xl font-bold text-blue-800 mb-3 animate-pulse">
                We're preparing something special...
              </h2>
              <p className="text-gray-700 text-sm  text-center max-w-lg lg:font-semibold">
                We're preparing awesome package plans for you. Please check back
                soon to explore them!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default PackageDetails;
