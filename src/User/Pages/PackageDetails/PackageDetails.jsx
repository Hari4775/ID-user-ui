import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './PackageDetails.css'

import { star, ticIcon } from '../../../assets/icons/IconIndex';
import { flightimage } from '../../../assets/Index';
import { getCategories } from '../../../api/Category/Category';
import CategoryCard from './packageDetalis-HeroPage/CategorySection/CategoryCard';
import SkeletonCategoryCard from '../../Components/Cards/SkeltonCards/CategorySkeltonCard';


const PackageDetails = () => {
  const navigate = useNavigate();
  const { package_id } = useParams();

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1, 
    slidesToScroll: 1,
    autoplay: false,
    arrows: true,
    speed: 500, 
  }

6
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [isOpen, setIsOpen] = useState(false); // Modal state
  const [loading, setLoading] = useState(true); // NEW: Loading state

  const handleViewPlan = (category) => {
    setSelectedCategory(category)
    setSelectedCategoryId(category?.category_id);
    setIsOpen(true)
  };

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await getCategories(package_id);
      setCategories(response?.data?.categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
  <div className=" w-full mx-auto pt-32 h-screen  package-details-main-container  "style={{ 
    background: "linear-gradient(to bottom, #e0f7ff, #b3eaff, #66c2ff, #338fcc,)" 
  }}>
  <div className={`relative w-11/12 mx-auto transition-opacity duration-500 ${selectedCategoryId ? 'opacity-30' : 'opacity-100'}`}>
  <h1 className="font-bold lg:text-3xl  text-lg">CHOOSE YOUR PREMIUM</h1>
    
  <div className="w-full py-10 grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
  {loading ? (
    Array.from({ length: 6 }).map((_, index) => (
      <SkeletonCategoryCard key={index} />
    ))
  ) :categories?.length > 0 ? (
            categories.map((cat) => (
              <CategoryCard key={cat.category_id} category={cat} />
            ))
          ) : (
            <div className="flex flex-col justify-center items-center py-20 min-h-[40vh] w-full bg-white/40 rounded-xl shadow-inner col-span-full">
            <h2 className="text-xl text-center lg:text-4xl font-bold text-blue-800 mb-3 animate-pulse">
              We're preparing something special...
            </h2>
            <p className="text-gray-700 text-sm  text-center max-w-lg lg:font-semibold">
            We're preparing awesome package plans for you.
            Please check back soon to explore them!
            </p>
          </div>
          )}
    </div>
  </div>
 
</div>  
 
  );
};
export default PackageDetails;
