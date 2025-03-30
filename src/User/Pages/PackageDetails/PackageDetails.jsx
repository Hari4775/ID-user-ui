import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './PackageDetails.css'

import { star, ticIcon } from '../../../assets/icons/IconIndex';
import { flightimage } from '../../../assets/Index';
import { getCategories } from '../../../api/Category/Category';
import CategoryCard from './packageDetalis-HeroPage/CategorySection/CategoryCard';
import { getPlan } from '../../../api/DayPlan/DayPlanApi';
import PlanCard from './PlanSection/PlanCard';


const PackageDetails = () => {
  const navigate = useNavigate();

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1, 
    slidesToScroll: 1,
    autoplay: false,
    arrows: true,
    speed: 500, 
  }

  const { package_id } = useParams();
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [planData, setPlanData] = useState([]);
  const [isOpen, setIsOpen] = useState(false); // Modal state
  const [selectedCategory,setSelectedCategory] =useState([]);
  
  const closeModal = () => {
    setIsOpen(false); // Close the modal
    setSelectedCategory([])
    setSelectedCategoryId(null);
  };

  const handleViewPlan = (category) => {
    setSelectedCategory(category)
    setSelectedCategoryId(category?.category_id);
    setIsOpen(true)
  };

  const fetchCategories = async () => {
    try {
      const response = await getCategories(package_id);
      setCategories(response?.data?.categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);



  const fetchDayPlan = async () => {
    try {
      if (selectedCategoryId) {
        const response = await getPlan(selectedCategoryId);
        if (response?.data) {
          // Ensure planData is an array
          setPlanData(
            Array.isArray(response.data) ? response.data : [response.data]
          );
        }
      }

    } catch (err) {
      console.log(err, "error getting the planData");
    }
  };

  useEffect(() => {
    fetchDayPlan();
  }, [selectedCategoryId]);


  return (
  <div className=" w-full mx-auto pt-32 pb-10   package-details-main-container "style={{ 
    background: "linear-gradient(to bottom, #e0f7ff, #b3eaff, #66c2ff, #338fcc,)" 
  }}>
  <div className={`relative w-11/12 mx-auto transition-opacity duration-500 ${selectedCategoryId ? 'opacity-30' : 'opacity-100'}`}>
  <h1 className="font-bold text-3xl ">CHOOSE YOUR PREMIUM</h1>
    
  <div className="w-full py-10 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {categories?.length > 0 ? (
            categories.map((cat) => (
              <CategoryCard key={cat.category_id} category={cat} refresh={fetchCategories} onViewPlan={handleViewPlan}
              />
            ))
          ) : (
            <div className="flex justify-center items-center h-full w-full col-span-full">
              <p className="text-center">No Category found</p>
            </div>
          )}
    </div>
  </div>
 
  

{/* PLAN CONTAINER */}
  {isOpen &&
 
 <div className="fixed inset-0 z-50 flex items-center justify-center mt-0 md:mt-10 bg-black bg-opacity-50 animate-fade-in w-full"
                 onAnimationEnd={(e) => { if (!isOpen) e.target.classList.add("animate-fade-out");}}>
      
      <div className="rounded-lg w-11/12 px-5  shadow-md shadow-blue-800 animate-slide-in mt-10"
            style={{
              background:"linear-gradient(to bottom, #e0f7ff, #b3eaff, #66c2ff, #338fcc, #004080)", }}>
              {/* Close Button */}


              <div className='flex'>
                         <h2 className='mt-3 mb-4 text-lg font-bold'>Day Plan for {selectedCategory?.categoryName}</h2>
                           <div className=" md:py-3 py-0 w-1/12 ml-auto">
                              <button onClick={closeModal} className="text-gray-600 hover:text-black ml-auto  text-2xl font-extrabold  w-1/12" >
                                 ✖
                              </button>
                            </div>
              </div>
            <div className='flex'> 
      <div className='left-inner-container lg:w-9/12 w-full mr-2 '> 

        
                 {/* // <div className='left-inner-container w-9/12 bg-slate-100'>  */}
            <div className='left-inner-heading-container w-full '>
                  {planData.length > 0 && (
                     <div className="w-full  mx-auto ">
                      
                       {planData.map((plan) => (
                        <PlanCard key={plan.plan_id || plan._id} planData={plan.plans} />
                       ))}
                     </div>              
                  )}
          
                  <div className="left-inner-container w-full mx-auto block lg:hidden pb-3"> 
                     <div className="payment-section image-container shadow-blue-400">
                          <div className="flex justify-between items-center w-11/12 mb-3 mx-auto pt-3">
                            {/* Amount on the left */}
                              <div className="flex items-center">
                                 <h1 className="text-xl font-extrabold text-left">₹ {selectedCategory?.categoryDiscountedPrice}</h1>
                                 <p className="text-md ml-2">/Adult</p>
                              </div>
                               {/* Button on the right */}
                              <button  className="no-button ml-auto w-auto px-4 mb-3"  onClick={() => handleCardClick()}>BOOK NOW</button>
                          </div>
                      </div>
                   </div>
                </div>  
            </div>
    
      <div className='left-inner-container w-3/12  mr-auto hidden lg:block'> 
            <div className='payment-section  image-container shadow-blue-400'>
                 <div className='flex w-11/12 mb-3 mx-auto pt-5'>
                   <h1 className='text-3xl font-extrabold '>₹  {selectedCategory?.categoryDiscountedPrice}</h1>
                   <p className='text-md'>/Adult</p>
                 </div>
                  <p className='text-md mb-3 ml-3'>Excluding applicable taxes</p>
                 <div className='pb-5 '>
                    <button className="no-button mx-3 mt-10 w-11/12 " onClick={() => handleCardClick()}>PROCEED TO PAYMENT</button>
                 </div>
             </div>
      </div>
      </div>

    </div>
    
     </div>
   
  } 
</div>  
 



  );
};
export default PackageDetails;
