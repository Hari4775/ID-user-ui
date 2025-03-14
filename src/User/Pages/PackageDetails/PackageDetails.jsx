import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { Carousel } from "flowbite-react";
import './PackageDetails.css'
import axios from 'axios';
import MainCard from './Cards/MainImageCards/MainCard';
import { star, ticIcon } from '../../../assets/icons/IconIndex';
import { flightimage } from '../../../assets/Index';


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


  const [activeSection, setActiveSection] = useState('trip_Plan');
  const [packageDetailsData, setPackageDetailsData] =useState([])

  const [categories,setCategories] = useState([]);
  const [selectedCategoryData, setSelectedCategoryData] = useState(null);

  const [planCategorySection,setplanCategorySection] =useState('features');
  const [dayPlan,setDayPlan] =useState([])
  const { _id } = useParams();

  console.log(packageDetailsData,"selected category data")
  const handleCategoryClick = (key) => {
    setSelectedCategoryData(categories[key]);
  };

  useEffect(() => {
    const firstCategoryKey = Object.keys(categories)[0];
    setSelectedCategoryData(categories[firstCategoryKey]);
  }, [categories]);


  const handleCardClick = (pkg) => {
    navigate('/contact-us');
  };

    // Function to determine button class based on category name
    const getCategoryButtonClass = (categoryName) => {
      switch (categoryName.toLowerCase()) {
        case 'silver':
          return '   border-gray-500  font-semibold hover:bg-gray-500 hover:text-white hover:border-blue-700 hover:border-2';
        case 'gold':
          return 'bg-gradient-to-r text-yellow-500 via-gray-200 to-gray-300 text-gray-900 shadow-lg font-semibold border-yellow-300 hover:bg-yellow-500 hover:text-white hover:border-blue-700 hover:border-2';
        case 'platinum':
        default:
          return 'bg-gradient-to-r f via-gray-200 to-gray-300 text-gray-900 border-gray-500 shadow-lg font-semibold hover:border-blue-700 hover:border-2';
      }
    };

  useEffect(()=>{
    if(_id){
      fetchPackageDetails()
    }
  },[])

  useEffect(()=>{
   if(selectedCategoryData?.trip_plan){
      setDayPlan(selectedCategoryData?.trip_plan)
   }
  },[selectedCategoryData])

 const  fetchPackageDetails =async ()=>{
  try{
    const response = await axios.get(`https://islandays.onrender.com/packages/${_id}`);  
    if (Array.isArray(response.data)&& response.data.length >0) {
      const data = response?.data[0]
      setPackageDetailsData(data);
      setCategories(data?.categories)
    }
    else{
      setPackageDetailsData(response.data)
    }
   
  }catch(err){
    
  }
 }

 const activeSectionUnderLines =(section) =>{
  return activeSection ===section
   ? 'border-b-4 border-[blue] font-bold text-[blue] opacity-100'  : 'border-b-2 border-transparent text-white text-opacity-50';
 }

 const planCategoryUnderLines =(section) =>{
  return planCategorySection === section
    ? 'border-b-4 border-[blue] font-bold text-[blue] opacity-100' // Dark cyan color with no opacity for selected
    : 'border-b-2 border-transparent text-white text-opacity-50'; // Dark cyan with reduced opacity for unselected
};

const calkulateTotals =()=>{
  let totalDays = dayPlan.length;
  let totalActivities = 0;
  let totalFlights = 0;
  let totalFood = 0;
  let totalAccommodations = 0;

  dayPlan.forEach(day => {
    // Count activities
    if (Array.isArray(day.activity)) {
      totalActivities += day.activity.length;
    } else if (day.activity) {
      totalActivities += 1;
    }

    // Count food
    if (day?.food) {
      totalFood += day.food.length;
    }

    // count activities
    if (day?.activities) {
      totalActivities += 1;
    }

    // Count accommodations
    if (day?.accommodation) {
      totalAccommodations += 1;
    }
  });

  return {
    totalDays,
    totalFlights,
    totalFood,
    totalActivities,
    totalAccommodations
  };
};

const totals =calkulateTotals ()
  return (
  <div className=" w-full mx-auto    package-details-main-container "style={{ 
    background: "linear-gradient(to bottom, #e0f7ff, #b3eaff, #66c2ff, #338fcc,)" 
  }}>
  <div className=' w-11/12 mx-auto'>
  
   

    <div className='basic-data-container pt-32 lg:flex'>
      <div className=' lg:w-6/12 w-11/12 mx-auto lg:h-72 h-52 '>
      {packageDetailsData?.images?.length > 0 && (
        <Slider {...settings}>
          {packageDetailsData.images.map((img, index) => (
            <div key={index} className="w-full">
              <img className=" lg:h-72 h-52 w-full" src={img} alt={`Slide ${index + 1}`} />
            </div>
          ))}
        </Slider>
      )} 
      </div>
    <div className='main-Heading-container  lg:w-6/12 w-11/12 mx-auto lg:ml-5 ml-1 '>
            <h1 className=' lg:text-2xl text-lg uppercase mt-10 font-bold '>{packageDetailsData?.title}</h1>
            <div className='  mt-5  lg:h-44 h-28  overflow-y-auto'>
                <div className="flex items-center space-x-2 lg:mb-4 mb-1" >
                   <img src={star} className="w-7" />
                   <p className='sub-heading lg:text-lg mb-2 text-xs'>{packageDetailsData?.subtitle}</p>
                </div>

                <div className="flex items-center space-x-2 lg:mb-4 text-mb-1">
                    <img src={star} className="w-7" />
                    <p className='sub-heading md:text-sm text-xs'>{packageDetailsData?.description}</p>
                </div>
           </div>
      </div>
    

  </div>

  </div>
 
  


    <div className='heading-bar-container w-11/12 mx-auto flex mt-2 space-x-10'>
        <h1 className={`menu-heading ml-1 font-semibold  md:text-2xl text-lg ${activeSectionUnderLines('trip_Plan')} transition-all duration-300 ease-in-out`} onClick={() => setActiveSection('trip_Plan')}>Trip-Plan</h1>
        <h1 className={`menu-heading font-semibold md:text-2xl text-lg ${activeSectionUnderLines('policy')} transition-all duration-300 ease-in-out`} onClick={() => setActiveSection('policy')}>Policy</h1>
        {/* <h1 className={`menu-heading font-semibold text-blue-700 text-2xl ${activeSectionUnderLines('summary')} transition-all duration-300 ease-in-out`} onClick={() => setActiveSection('summary')}>Summary</h1> */}
    </div>


    <div className='iternerary-container second-parent-container '>
      <div className='second-inner-container lg:flex  w-11/12 mx-auto pt-5  '>
      <div className='left-inner-container lg:w-9/12 w-full mr-2'> 

         {activeSection === 'trip_Plan' && (
                 // <div className='left-inner-container w-9/12 bg-slate-100'> 
            <div className='left-inner-heading-container w-full lg:mb-16 mb-5'>
                  <p className='sub-heading mt-2 mb-2 md:text-lg text-xs'>Here’s a 
                    list of Activities & Inclusions in this package for you.<br></br>Please select the category and see the package details.</p>
                  <div className=' inner-dot-ponts  lg:mb-12 mb-4'>
                    {packageDetailsData?.trip_Plan?.points.map((items,index)=>(

                     <div key={index}  className='flex justify-items-center'>
                          <img className='mr-1 w-5 h-5 my-auto' src={ticIcon}/>
                          <p className='sub-heading text-sm '>{items}</p>
                      </div>
                       ))}
                  </div>
                
                  <div className="left-inner-container w-full mx-auto block lg:hidden pb-3"> 
  <div className="payment-section image-container shadow-blue-400">
    <div className="flex justify-between items-center w-11/12 mb-3 mx-auto pt-3">
      {/* Amount on the left */}
      <div className="flex items-center">
        <h1 className="text-xl font-extrabold text-left">₹ {selectedCategoryData?.price}</h1>
        <p className="text-md ml-2">/Adult</p>
      </div>
      
      {/* Button on the right */}
      <button 
        className="no-button ml-auto w-auto px-4 mb-3" 
        onClick={() => handleCardClick()}
      >
        BOOK NOW
      </button>
    </div>
  </div>
</div>

                
                <div className='w-full lg:flex  plan-detail-card  '>
                    <div className=' lg:w-3/12 w-full   '>
                       <h1 className="sub-heading  md:my-5 my-1 lg:text-lg text-sm font-semibold ">Choose Premium</h1>
                       <div className="category-buttons-container flex lg:flex-col  lg:space-y-4">
                        {Object.keys(categories).map((key) => (
                      <button key={categories[key]._id} className={`md:text-lg text-xs my-2 p-2 w-8/12 md:ml-0 ml-1  cursor-pointer category-buttons ${getCategoryButtonClass(categories[key].name)}`}
                         onClick={() => handleCategoryClick(key)}>
                          {categories[key].name}
                      </button>
                       ))}
                    </div>
                  </div>


               
                <div className='  image-container  lg:w-9/12 w-full ml-auto'>
                   
                   <div className='menu-bar  flex w-full  lg:space-x-12 space-x-2'>
                      <p  className={`sub-heading  lg:text-lg text-xs my-5 lg:ml-5  ${planCategoryUnderLines('features')} transition-all duration-300 ease-in-out `}onClick={() => setplanCategorySection('features')}>Features</p>
                      <p  className={`sub-heading  lg:text-lg text-xs my-5  ${planCategoryUnderLines('day')} transition-all duration-300 ease-in-out`}onClick={() => setplanCategorySection('day')}>{totals.totalDays} Days Plan</p>
                      {/* <p  className={`heading  text-lg my-5  ${planCategoryUnderLines('travel')} transition-all duration-300 ease-in-out`} onClick={() => setplanCategorySection('travel')}>{totals.totalFlights} Flights</p> */}
                      <p  className={`sub-heading lg:text-lg text-xs my-5  ${planCategoryUnderLines('accomadation')} transition-all duration-300 ease-in-out`} onClick={() => setplanCategorySection('accomadation')}> {totals.totalAccommodations} Hotels </p>
                      <p  className={`sub-heading lg:text-lg text-xs my-5  ${planCategoryUnderLines('activity')} transition-all duration-300 ease-in-out`}   onClick={() => setplanCategorySection('activity')}> {totals.totalActivities} Activitys</p>
                      <p  className={`sub-heading lg:text-lg text-xs my-5  ${planCategoryUnderLines('food')} transition-all duration-300 ease-in-out`}  onClick={() => setplanCategorySection('food')}>{totals.totalFood} Meals</p>
                   </div>
                       {/* plan-detail-container start */}
                  <div className='plan-details-container flex w-full '>
                   {/* <div className='time-line-container w-3/12 '>
                       <h1 className='day-plan-heading mt-5'>Day Plan</h1>
                    </div> */}
                     {planCategorySection==="features"&&(
                      <div className='features-continer w-11/12 mx-auto'>
                          <ul className=" ml-5">
                               {selectedCategoryData?.features.map((feature, index) => (
                                 <div className='flex'>
                                     <img className='mr-1 w-5 h-5 my-auto' src={ticIcon}/>
                                     <li className='resort-name  ' key={index}>{feature}</li>
                                 </div>
                                ))}
                          </ul>
                        <h1 className='ml-5 my-5 lg:text-xl text-lg text-black'> price: {selectedCategoryData?.price}</h1>
                         <p className='ml-5 text-xs'>{selectedCategoryData?.description}</p>
                      </div>
                     )}
                    
                     {planCategorySection==="day"&&(            
                    <div className='day-plan-data-container w-11/12 mx-auto  h-80 overflow-y-scroll mb-3 '>
                      {/* common-heading-section */}
                      {dayPlan.map((planItem,index)=>(

                      <div key={index}>
                     
                        <div className='each-day-headings flex'>
                            <button className='bg-slate-500 rounded-xl lg:w-1/12 w-3/12 lg:my-5 my-2 '>Day {planItem?.day}</button>
                            <p className='ml-5 my-5 sub-heading'>{planItem?.day_Heading} </p>
                            <p className='ml-4 my-5 sub-heading lg:text-lg text-xs'>included:</p>
                            {/* <p className='my-5 ml-3 sub-heading'>{planItem?.travel?.length} Flight</p> */}
                            {planItem?.accommodation?.length >0 &&(
                              <p className='my-5 ml-3 sub-heading  lg:text-lg text-xs'>{planItem?.accommodation?.length} Hotel</p>
                            )}
                            {planItem?.activity?.length > 0 && (
                              <p className='my-5 ml-3 sub-heading lg:text-lg text-xs'>{planItem.activity.length} Activities</p>
                            )}
                            {planItem?.food?.length > 0 && (
                            <p className='my-5 ml-3 sub-heading lg:text-lg text-xs'>{planItem?.food?.length} meals</p>
                            )}
                         </div>

                         {/* package description section */}
                        <div className='place-details-section w-10/12 mx-auto'>
                            <p className='mb-5 resort-name  lg:text-lg text-xs'>{planItem?.description}</p>
                        </div>

                            {/* travel section */}
                        <div className='travel-section  w-10/12 mx-auto'>
                        {planItem?.travel?.map((travelItem)=>(

                        <div key={travelItem?._id} className=''>
                          <div className='travel-heading flex '>
                              <div className=' space-x-2 flex resort-name lg:text-lg text-xs'>
                                   {/* <img className='mr-1 w-5 h-5 my-auto' src={car}/> */}
                                  <p className=''>{travelItem?.mode}</p>
                                  <p className=''>{travelItem?.from} to</p>
                                  <p className=''>{travelItem?.to}</p>
                                  <p className=''>{travelItem?.duration}</p>
                              </div>
                              {/* <div className='w-4/12 ml-auto flex'>
                                  <p className='text-button'>Remove</p>
                                  <p>|</p>
                                  <p className='text-button'>Change</p>
                              </div> */}
                          </div>
                          {/* {Array.isArray(travelItem?.flight) && travelItem.flight.map((flightItem, flightIndex) => (
                          <div key={flightIndex} className='travel-data-contaier mb-10  '>

                            <div className='flex '>
                                <div className='travel-image-section mt-5'>
                                    <img className='mb-2' src={flightimage}/>
                                    <p className='traveller-name'>{flightItem?.number}</p> 
                                </div>
                                <div className='travel-time-container mt-5 ml-5'>
                                    <h1 className='time mb-2'>{flightItem?.start_time}</h1>
                                    <p className='date'>{flightItem?.start_date}</p>
                                    <p className='date'>{flightItem?.from}</p>
                                </div>   
                                <div className='w-1/12 ml-5'></div> 
                                <div className='travel-time-container mt-5 ml-5'>
                                   <h1 className='time mb-2'>{flightItem?.reach_timee}</h1>
                                   <p className='date'>{flightItem?.reach_date}</p>
                                   <p className='date'>{flightItem?.to}</p>
                                </div>  
                                <div className='verticle-line'></div>  

                                <div className='ml-auto travel-cabin-container mt-5'>
                                    <p className='text-xs mb-3'>{flightItem?.weight}</p>   
                                </div>     
                            </div>

                          </div>
                          ))} */}
                          
                       
                        </div>
                        ))}

                        </div>


                          {/* accomadation section */}
                          {/* {Array.isArray(planItem.accommodation) && planItem.accommodation.map((accomadationItem,accomadationIndex) => (   */}
                        {planItem?.accommodation?.map((accomadationItem)=>(
                        <div key={accomadationItem?._id} className='accomodation-image-container my-4 lg:my-12 w-10/12 mx-auto'>
                               <div className='flex'>
                                <h1 className=' mb-2 resort-name font-bold'>{accomadationItem?.hotel_name}</h1> 
                                <p className='mb-2  sub-heading ml-auto'>Rating: {accomadationItem?.rating }</p>
                              </div>
                              {accomadationItem?.hotel_image?.length > 0 && (
                              <div className='h-48 flex'>
                                  {accomadationItem.hotel_image.map((img, index) => (
                                     <img key={index} className='h-full w-1/3 object-cover' src={img} alt={`Hotel Image ${index + 1}`} />
                                  ))}
                              </div>
                              )}
                              <div className=''>
                                   <p className='mb-2 text-xs mt-2'> {accomadationItem?.location}</p>
                                   <p className='mb-2 text-xs '> {accomadationItem?.type}</p>
                                   <div className='flex'>
                                       {/* <p className=' sub-heading ml-10'>available from: {accomadationItem?.booking_date}</p> */}
                                   </div> 
                               </div> 
                         </div>

                        ))}

                        {/* activity section */}
                        {planItem?.activities?.map((activityItem)=>(
                        <div key={activityItem?._id} className='w-10/12 mx-auto md:my-10 my-4' >
                                  <div className=''>
                                        <h1 className='resort-name font-bold mb-1'>{activityItem?.name}</h1> 
                                        <p className='mb-2 text-xs'>{activityItem?.description}</p>
                                    </div> 
                               {planItem?.activities?.length > 0 && (
                                   <div className='h-48 flex  overflow-x-auto custom-scrollbar'>
                                       {activityItem?.images.map((img, index) => (
                                            <img key={index} className='h-full   mx-2' src={img} alt={`Hotel Image ${index + 1}`} />
                                        ))}
                                    </div>
                                )}
                                   
                          </div>
                        
                        ))}

                        {planItem?.activities?.length > 0 && (
                        
                        <div className=''>
                        {planItem?.food?.map((foodItem)=>(
                          <div key={foodItem?._id} className='w-10/12 mx-auto mb-2 flex space-x-3' >
                            <h1>{foodItem}</h1>

                          </div>
                        ))}
                        </div>

                      )}




                      </div>
                      ))}
                    </div>         
                     )}

                     {planCategorySection === "travel" && (
                         <div className='day-plan-data-container w-11/12 mx-auto  h-80 overflow-y-auto mb-3 '>
                            {dayPlan.map((planItem, index) => (
                                 <div key={index}>
                                      <div className='each-day-headings flex'>
                                           <button className='bg-red-400 rounded-lg w-1/12 my-5 ml-5'> Day {planItem?.day}
                                           </button>
                                           <p className='ml-5 my-5'>{planItem?.day_Heading}</p>
                                           <p className='ml-4 my-5'>Included:</p>
                                           <p className='my-5 ml-2'>{planItem?.travel?.length} Flight</p>
                                           <p className='my-5 ml-2'>{planItem?.accommodation?.length} Hotel</p>
                                           <p className='my-5 ml-2'>{planItem?.food?.length} Meals</p>
                                       </div>

                                       {/* Travel section */}
                                        {planItem?.travel?.map((travelItem, travelIndex) => (
                                        <div key={travelIndex} className='travel-data-contaier my-10 w-full'>
                                           
                                        
                                        
                                        
                                          <div className='travel-heading flex'>
                                              <div className='w-8/12 space-x-2 flex ml-5'>
                                                   <h1 className='sub-heading'>{travelItem?.mode}</h1>
                                                   <p className='sub-heading'>{travelItem?.from}</p>
                                                   <p className='sub-heading'>{travelItem?.to}</p>
                                                   <h1 className='sub-heading'>{travelItem?.duration}</h1>
                                               </div>
                                               <div className='w-4/12 ml-auto flex'>
                                                    <p className='text-button'>Remove</p>
                                                    <p>|</p>
                                                    <p className='text-button'>Change</p>
                                               </div>
                                           </div>

                                              {travelItem.flight.map((flightItem, flightIndex) => (
                                               <div className='flex w-10/12 mx-auto'>
                                                    <div className='travel-image-section mt-5'>
                                                        <img className='mb-2' src={flightimage} />
                                                        <p className='traveller-name'>{flightItem?.number}</p>
                                                     </div>
                                                    <div className='time-container mt-5 ml-5'>
                                                         <h1 className='time mb-2'>{flightItem?.start_time}</h1>
                                                         <p className='date'>{flightItem?.start_date}</p>
                                                         <p className='date'>{flightItem?.from}</p>
                                                     </div>
                                                     <div className='w-1/12 ml-5'></div> 
                                                     <div className='time-container mt-5 ml-5'>
                                                           <h1 className='time mb-2'>{flightItem?.reach_time}</h1>
                                                           <p className='date'>{flightItem?.reach_date}</p>
                                                           <p className='date'>{flightItem?.to}</p>
                                                     </div>
                                                     <div className='verticle-line'></div>  
                                                     
                                                     <div className='ml-auto travel-cabin-container mt-5'>
                                                        <p className='text-xs mb-3'>{flightItem?.weight}</p>   
                                                     </div>   
                                               </div>
                                              ))}
                                         </div>
                                        ))}
                                   </div>
                               ))}
                         </div>
                         )}

                     {planCategorySection==="accomadation" && (
                      <div className='day-plan-data-container w-11/12 mx-auto  h-80 overflow-y-auto mb-3 '>
                      {dayPlan.map((planItem, index) => (
                      <div key={index}>
                            <div className='each-day-headings flex'>
                                 <button className='bg-red-400 rounded-lg w-1/12 my-5 ml-5'> Day {planItem?.day}</button>
                                    <p className='ml-5 my-5'>{planItem?.day_Heading}</p>
                                    <p className='ml-4 my-5'>Included:</p>
                                    <p className='my-5 ml-2'>{planItem?.travel?.length} Flight</p>
                                    <p className='my-5 ml-2'>{planItem?.accommodation?.length} Hotel</p>
                                    <p className='my-5 ml-2'>{planItem?.food?.length} Meals</p>
                              </div>
                             {planItem?.accommodation?.map((accommodationItem, accommodationIndex)=>(

                             
                             <div key={accommodationIndex} className='accomadation-container w-full  '>
                                  <div className='accomodation-data-container w-11/12 mx-auto'>
                                       <div className='accomodation-heading flex space-x-4 ml-5 py-5'>
                                            <h1>{accommodationItem?.hotel_name}</h1>
                                            <h1>{accommodationItem?.duration}</h1>
                                            <h1>{accommodationItem?.location}</h1>
                                       </div>
                                      <div className='accomodation-image-container flex mb-10'>
                                           <div className='w-5/12  h-48'>
                                             <img className='w-full h-48' src={accommodationItem?.hotel_image}/>
                                           </div>
                                           <div className='w-7/12  ml-auto'>
                                               <h1 className='resort-name font-bold mb-3'>{accommodationItem?.hotel_name}</h1> 
                                               <p className='mb-2'>{accommodationItem?.rating}</p>
                                               <p className='mb-2'>{accommodationItem?.location}</p>
                                               <div className='flex'>
                                                   <p>{accommodationItem?.booking_date}</p>
                                               </div> 
                                           </div> 
                                       </div>
                                   </div>
                               </div>

                            ))}
                        </div>
                      ))}
                       </div>
                     )}   

                     {planCategorySection==="activity" && (
                         <div className='day-plan-data-container w-11/12 mx-auto h-80 overflow-y-auto mb-3 '>
                          {dayPlan.map((planItem, index) => (
                            <div key={index}>
                               <div className='each-day-headings flex'>
                                 <button className='bg-red-400 rounded-lg w-1/12 my-5 ml-5'> Day {planItem?.day}</button>
                                    <p className='ml-5 my-5'>{planItem?.day_Heading}</p>
                                    <p className='ml-4 my-5'>Included:</p>
                                    <p className='my-5 ml-2'>{planItem?.travel?.length} Flight</p>
                                    <p className='my-5 ml-2'>{planItem?.accommodation?.length} Hotel</p>
                                    <p className='my-5 ml-2'>{planItem?.food?.length} Meals</p>
                                </div>

                                {planItem?.activities?.map((activityItem)=>(
                                  <div key={activityItem?._id} className='activity-container flex mb-10'>
                                    <div className='w-5/12  h-48'>

                                      <img src={activityItem?.imges}/>
                                    </div>
                                    <div className='w-7/12  ml-auto'>
                                         <h1 className='resort-name font-bold mb-3'>{activityItem?.name}</h1> 
                                         <p className='mb-2 text-xs'>{activityItem?.description}</p>
                                         <div className='flex'>
                                              <p>{activityItem?.duration}</p>
                                              <p>{activityItem?.time}</p>
                                          </div> 
                                     </div> 
                                </div>

                                ))}
                                
                          </div>
                          ))}
                           </div>
                      )}   

                      {planCategorySection==="food" && (
                         <div className='day-plan-data-container w-11/12 mx-auto h-80 overflow-y-auto mb-3 '>
                          {dayPlan.map((planItem, index) => (
                            <div key={index}>
                               <div className='each-day-headings flex'>
                                 <button className='bg-red-400 rounded-lg w-1/12 my-5 ml-5'> Day {planItem?.day}</button>
                                    <p className='ml-5 my-5'>{planItem?.day_Heading}</p>
                                    <p className='ml-4 my-5'>Included:</p>
                                    <p className='my-5 ml-2'>{planItem?.travel?.length} Flight</p>
                                    <p className='my-5 ml-2'>{planItem?.accommodation?.length} Hotel</p>
                                    <p className='my-5 ml-2'>{planItem?.food?.length} Meals</p>
                                </div>

                                {planItem?.food?.map((foodItem)=>(
                                  <div key={foodItem?._id} className='activity-container flex mb-10'>
                                    <div className='w-5/12  h-48'>

                                      <img src={foodItem?.imges}/>
                                    </div>
                                    <div className='w-7/12  ml-auto'>
                                         <h1 className='resort-name font-bold mb-3'>{foodItem?.name}</h1> 
                                         <p className='mb-2 text-xs'>{foodItem?.description}</p>
                                         
                                     </div> 
                                </div>

                                ))}
                                
                          </div>
                          ))}
                           </div>
                      )}   

                   
              
                    
                    </div> 
                    {/* plan detail container end */}
                  </div>
                  
                </div>
                
                </div>
              
             
        )}

             {activeSection === 'policy' && (
    
        <div className='w-full    overflow-y-auto mb-3'>
         <div className='terms-and-conditions '>
           <h1 className=' lg:text-2xl text-lg font-bold mb-5 mt-5 ml-10'>Terms and Conditions</h1>
           <div className='important-info-container'>
              <h3 className='terms-sub-heading text-md mb-3 mt-8 ml-10'>Important Information</h3>
              <div className='flex mb-5 w-11/12 mx-auto'>
                <p className='text-md ml-3 lg:text-lg text-xs '>We recommend booking your Lakshadweep trip at least 30 days in advance, as it involves necessary paperwork and documentation to obtain permits for your visit. Required documents include the original hard copy of the Police Verification Certificate (PCC) from your local police station, a color copy of your Aadhar card/Passport, and three passport-size photos or scanned copies. All these documents must be submitted at least 20 days prior to your departure date.</p>
              </div>
              <div className='flex mb-5 w-11/12 mx-auto'>
                <p className='text-md ml-3 lg:text-lg text-xs'>We recommend booking your Lakshadweep trip at least 30 days in advance, as it involves necessary paperwork and documentation to obtain permits for your visit. Required documents include the original hard copy of the Police Verification Certificate (PCC) from your local police station, a color copy of your Aadhar card/Passport, and three passport-size photos or scanned copies. All these documents must be submitted at least 20 days prior to your departure date.</p>
              </div>
            </div>
            <div className='inclusion-container'>
              <h3 className='terms-sub-heading text-md mb-3 mt-5 ml-10'>Exclusions</h3>
              <div className='flex mb-5 w-11/12 mx-auto'>
                <p className=' ml-3 lg:text-lg text-xs'>We recommend booking your Lakshadweep trip at least.</p>
              </div>
              <div className='flex mb-5 w-11/12 mx-auto'>
                <p className='lg:text-lg text-xs ml-3'>We recommend booking your Lakshadweep trip at least.</p>
              </div>
              <div className='flex mb-5 w-11/12 mx-auto'>
                <p className='lg:text-lg text-xs ml-3'>We recommend booking your Lakshadweep trip at least.</p>
              </div>
            </div>
            <div className='inclusion-container'>
              <h3 className='terms-sub-heading text-md mb-3 mt-8 ml-10'>Terms and Conditions</h3>
              <div className='flex mb-5 w-11/12 mx-auto'>
                <p className='lg:text-lg text-xs ml-3'>We recommend booking your Lakshadweep trip at least.</p>
              </div>
              <div className='flex mb-5 w-11/12 mx-auto'>
                <p className='lg:text-lg text-xs ml-3'>We recommend booking your Lakshadweep trip at least.</p>
              </div>
              <div className='flex mb-5 w-11/12 mx-auto'>
                <p className='lg:text-lg text-xs ml-3'>We recommend booking your Lakshadweep trip at least.</p>
              </div>
            </div>
          
          </div>
       
        </div>

             )}

             {activeSection === 'summary' && (    
        <div className='w-full bg-slate-500 '>
           <p className='text-sm'> Arrival in Lakshadweep by IndiGo Flight 6E-2069, 6E-7271 | Departing on 01 Oct, 05:45 AM | Arriving on 01 Oct, 01:00 PM | Includes Check In Baggage</p>
           <div className='w-11/12  flex bg-red-500'>
             <div className='w-2/12  '>
                <h1 className='font-bold mt-4 ml-10'>Day 1</h1>
                <p className='ml-10'>Oct 1, Tue</p>
             </div>
             <div className='w-10/12 bg-yellow-50'>
               
             </div>
           </div>
        </div>
             )}
      </div>
    
      <div className='left-inner-container w-3/12  mr-auto hidden lg:block'> 
            <div className='payment-section  image-container shadow-blue-400'>
                 <div className='flex w-11/12 mb-3 mx-auto pt-5'>
                   <h1 className='text-5xl font-extrabold '>₹ {selectedCategoryData?.price}</h1>
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
 



  );
};
export default PackageDetails;
