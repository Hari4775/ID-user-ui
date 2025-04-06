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
  const basePrice = selectedCategory?.categoryDiscountedPrice || 0;
  const [adultCount, setAdultCount] = useState(1);
  const [childCount, setChildCount] = useState(0);
  const [discountedPrice, setDiscountedPrice] = useState(basePrice);
  const [totalAmount, setTotalAmount] = useState(basePrice);
  const [savingsPerPerson, setSavingsPerPerson] = useState(0);
  const [isPaymentVisible, setIsPaymentVisible] = useState(true);

  useEffect(() => {
    let pricePerAdult= basePrice;
    let savings = 0;

    const totalCount = adultCount;
    if (totalCount >= 4 && totalCount < 6) {
      savings = 1000;
      pricePerAdult = basePrice - savings;
    } else if (totalCount >= 6 && totalCount < 8) {
      savings = 2000;
      pricePerAdult = basePrice - savings;
    }
    else if (totalCount >= 8 && totalCount < 12) {
      savings = 3000;
      pricePerAdult = basePrice - savings;
    }
    else if (totalCount >= 12){
      savings =5000;
      pricePerAdult =basePrice - savings;
    }
    const pricePerChild = pricePerAdult / 2;

    setSavingsPerPerson(savings);
    setDiscountedPrice(pricePerAdult);
    const total =
    adultCount * pricePerAdult + childCount * pricePerChild;
    setTotalAmount(total);
  },  [adultCount, childCount, basePrice]); 


  const increase = (type) =>
    type === 'adult'
      ? setAdultCount((prev) => prev + 1)
      : setChildCount((prev) => prev + 1);

  const decrease = (type) =>
    type === 'adult'
      ? setAdultCount((prev) => (prev > 1 ? prev - 1 : 1))
      : setChildCount((prev) => (prev > 0 ? prev - 1 : 0));

  const handleCardClick = () => {
    // your payment logic here
    navigate("/contact-us")
  };
  
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
  <div className=" w-full mx-auto pt-32 h-screen  package-details-main-container  "style={{ 
    background: "linear-gradient(to bottom, #e0f7ff, #b3eaff, #66c2ff, #338fcc,)" 
  }}>
  <div className={`relative w-11/12 mx-auto transition-opacity duration-500 ${selectedCategoryId ? 'opacity-30' : 'opacity-100'}`}>
  <h1 className="font-bold lg:text-3xl  text-lg">CHOOSE YOUR PREMIUM</h1>
    
  <div className="w-full py-10 grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
 
 <div className="fixed inset-0 z-50 flex items-center justify-center   bg-black bg-opacity-50 animate-fade-in w-full h-screen"
                 onAnimationEnd={(e) => { if (!isOpen) e.target.classList.add("animate-fade-out");}}>
      
      <div className="rounded-lg w-full pt-24 lg:px-2 shadow-md shadow-blue-800 animate-slide-in  h-screen relative"
  style={{
    background: "linear-gradient(to bottom, #e0f7ff, #b3eaff, #66c2ff, #338fcc, #004080)",
  }}>


              <div className='flex  '>
                         <h2 className='lg:my-3   lg:text-lg text-md font-bold text-blue-950 lg:ml-0 ml-3'>Day Plan for {selectedCategory?.categoryName}</h2>
                       
              </div>
            <div className='flex b '> 
      <div className='left-inner-container lg:w-9/12 w-full lg:mr-2  '> 

        
                 {/* // <div className='left-inner-container w-9/12 bg-slate-100'>  */}
            <div className='left-inner-heading-container w-full  '>
                  {planData.length > 0 && (
                     <div className="w-full  mx-auto  ">
                      
                       {planData.map((plan) => (
                        <PlanCard key={plan.plan_id || plan._id} planData={plan.plans} />
                       ))}
                     </div>              
                  )}
          

                  <div className=" w-full mx-auto block lg:hidden rounded-lg  mt-2" > 
   

                  {/* {isPaymentVisible?( */}
<div className="payment-section image-container text-white rounded-xl p-3 bg-gradient-to-b from-blue-700 via-blue-800 to-blue-900 shadow-lg max-h-[90vh] flex flex-col">
 {/* X Button */}
 {/* <div className="flex justify-end mb-2">
      <button
        className="text-white text-xl font-bold px-3 hover:text-red-400"
        onClick={() => setIsPaymentVisible(false)}
      >
        ✖
      </button>
    </div> */}

  {/* Scrollable List */}
  <div className="flex-1 overflow-y-auto pr-1 pb-28"> {/* extra bottom padding for fixed total + button */}
    
    {/* Adults Section */}
    <div className="flex justify-between items-center mb-3">
      <div className="w-1/2">
        <p className="text-[11px] font-medium mb-1">Adults</p>
        <div className="flex items-center bg-white text-black rounded-md">
          <button className="px-2 text-sm font-bold hover:bg-gray-100" onClick={() => decrease('adult')}>−</button>
          <span className="px-3 text-[11px]">{adultCount} Adults</span>
          <button className="px-2 text-sm font-bold hover:bg-gray-100" onClick={() => increase('adult')}>+</button>
        </div>
        {savingsPerPerson > 0 && (
          <p className="text-[10px] mt-1 text-green-300">Save ₹{savingsPerPerson}/adult</p>
        )}
      </div>
      <div className="text-right w-1/2">
        {savingsPerPerson > 0 && (
          <p className="line-through text-red-400 text-[11px]">₹{basePrice}</p>
        )}
        <p className="text-green-300 font-semibold text-sm mt-1">
          ₹{discountedPrice} <span className="text-[10px]">/Adult</span>
        </p>
      </div>
    </div>

    {/* Children Section */}
    <div className="flex justify-between items-center mb-4">
      <div className="w-1/2">
        <p className="text-[11px] font-medium mb-1">Children</p>
        <div className="flex items-center bg-white text-black rounded-md">
          <button className="px-2 text-sm font-bold hover:bg-gray-100" onClick={() => decrease('child')}>−</button>
          <span className="px-3 text-[11px]">{childCount} Children</span>
          <button className="px-2 text-sm font-bold hover:bg-gray-100" onClick={() => increase('child')}>+</button>
        </div>
      </div>
      <p className="text-[11px] text-white mt-4 text-right w-1/2">
        ₹{discountedPrice / 2} / Child
      </p>
    </div>

    {/* Discount Scroll Info */}
    <div className="bg-slate-600 text-[9px] text-slate-200 px-2 py-1 rounded flex overflow-x-auto whitespace-nowrap space-x-4 mb-3">
      <p>4+ Adults: Save ₹1000</p>
      <p>6+ Adults: Save ₹2000</p>
      <p>8+ Adults: Save ₹3000</p>
    </div>
  </div>

  {/* Sticky Total + Pay Button */}
  <div className="sticky bottom-0 z-20 bg-blue-900 pt-2 pb-4 px-3 shadow-inner">
    {(savingsPerPerson > 0 && adultCount > 0) && (
      <p className="text-[10px] text-green-200 text-center mb-1">
        Total Savings: ₹{savingsPerPerson * adultCount}
      </p>
    )}
    <p className="text-white text-center text-sm font-semibold mb-2">
      Total: ₹{totalAmount}
    </p>
    <button
      className="w-full bg-yellow-400 hover:bg-yellow-300 text-black text-sm font-bold py-2 rounded-xl shadow-md"
      onClick={handleCardClick}
    >
      PAY NOW
    </button>
  </div>
</div>
  

{/* ):(
  <div className='w-10/12 mx-auto '>
     <button
      className="w-full  bg-yellow-400 hover:bg-yellow-300 text-black text-sm font-bold py-2 rounded-xl shadow-md"
      onClick={() => setIsPaymentVisible(true)}
    >
      View payment Details
    </button>
  </div>
) */}









{/* ui tet */}
                   </div>
                </div>  
            </div>
    
        
          <div className='left-inner-container w-3/12 mr-auto hidden lg:block mb-20'>
      <div className='payment-section  shadow-inner image-container p-5 rounded-2xl text-white'>

        {/* Adult Section */}
        <div className='text-center mb-1'>
          <p className='text-xl font-bold text-green-700'>
            ₹{' '}
            {savingsPerPerson > 0 && (
              <span className='line-through text-red-800 mr-2'>
                {basePrice}
              </span>
            )}
            {discountedPrice}
            <span className='text-lg font-light ml-1'>/Adult</span>
          </p>
          {savingsPerPerson > 0 && (
            <p className='text-sm text-green-200 '>
              You save ₹{savingsPerPerson} per adult!
            </p>
          )}
        </div>

        {/* Adult Count Control */}
        <div className='mb-3'>
          {/* <h2 className='text-lg font-semibold mb-1'>Adults</h2> */}
          <div className='flex items-center justify-center gap-2'>
            <button
              className='bg-white text-black font-bold px-3 py-1 rounded-l hover:bg-gray-200'
              onClick={() => decrease('adult')}
            >
              –
            </button>
            <span className='px-5 py-1 bg-white text-black font-semibold rounded'>
              {adultCount} Adults
            </span>
            <button
              className='bg-white text-black font-bold px-3 py-1 rounded-r hover:bg-gray-200'
              onClick={() => increase('adult')}
            >
              +
            </button>
          </div>
        </div>

        {/* Child Section */}
        <div className='mb-3 mt-5'>
          {/* <h2 className='text-lg font-semibold mb-1'>Children</h2> */}
          <p className='text-sm text-gray-100 mb-1'>
            ₹ {discountedPrice / 2} / Child (50% of adult fare)
          </p>
          <div className='flex items-center justify-center gap-2'>
            <button
              className='bg-white text-black font-bold px-3 py-1 rounded-l hover:bg-gray-200'
              onClick={() => decrease('child')}
            >
              –
            </button>
            <span className='px-5 py-1 bg-white text-black font-semibold rounded'>
              {childCount} Children
            </span>
            <button
              className='bg-white text-black font-bold px-3 py-1 rounded-r hover:bg-gray-200'
              onClick={() => increase('child')}
            >
              +
            </button>
          </div>
        </div>

            {/* Discount Info */}
            <div className='text-xs  text-black rounded px-3 py-2 mt-4 mx-3 text-center'>
          <p className='mb-1 font-medium'>Discount Info:</p>

               

          {/* <div className='flex'>

           <img className='w-5 h-5 border-green-800 ' src={ticIcon}/>
           <p>4–6 adults: Save ₹1000 per adult</p>
          </div> */}
          <ul className='list-disc list-inside text-left text-xs'>
            <li>4–6 adults: Save ₹1000 per adult</li>
            <li>6–8 adults: Save ₹2000 per adult</li>
            <li>8–12 adults: Save ₹3000 per adult</li>
            <li>12+ adults: Save ₹5000 per adult</li>
            {/* <li>Children: Always 50% of adult fare</li> */}
          </ul>
        </div>

        {/* Total Calculation */}
        <div className='text-center mb-2 mt-4'>
          {/* <p className='text-md'>Excluding applicable taxes</p> */}
          <p className='text-lg font-semibold mt-1'>
            Total: ₹ {totalAmount}
          </p>
          {(savingsPerPerson > 0 && adultCount > 0) && (
            <p className='text-sm text-green-100'>
              Total Adult Savings: ₹ {savingsPerPerson * adultCount}
            </p>
          )}
        </div>

    

        {/* Proceed Button */}
        <div className=' '>
          <button
            className='no-button mx-3 mt-3 w-11/12 bg-yellow-300 text-black font-bold py-2 rounded-xl'
            onClick={handleCardClick}
          >
            PROCEED TO PAYMENT
          </button>
        </div>
      </div>
    </div>
 

 {/* test */}
      </div>

    </div>
    
     </div>
   
  } 
</div>  
 



  );
};
export default PackageDetails;
