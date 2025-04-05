import React, { useEffect, useState } from 'react';
import FoodSection from './FoodSection';
import ActivitiesSection from './ActivitySection';
import CommonHeadingSection from './CommonHeadingSection';
import AccommodationSection from './AccomodationSection';
import "./../PackageDetails.css"
const PlanCard = ({ planData,categorydata }) => {
  const [planCategorySection, setPlanCategorySection] = useState('day');
  const [dayPlan, setDayPlan] = useState(planData || []);
  console.log(dayPlan,"day plan updated")

 
  useEffect(() => {
    if (planData) {
      setDayPlan(planData);
    }
  }, [planData]);

  const planCategoryUnderLines = (section) => {
    return planCategorySection === section
      ? 'border-b-4 border-[blue] font-bold text-blue-800 '
      : 'border-b-2 font-medium font-semibold border-transparent text-blue-700 ';
  };

  const calculateTotals = () => {
    let totalDays = dayPlan.length;
    let totalActivities = 0;
    let totalFood = 0;
    let totalAccommodations = 0;

    dayPlan.forEach((day) => {
      if (day?.activities) totalActivities += day.activities.length;
      if (day?.foods) totalFood += day.foods.length;
      if (day?.accommodations) totalAccommodations += day.accommodations.length;
    });

    return { totalDays, totalActivities, totalFood, totalAccommodations };
  };

  const totals = calculateTotals();

  const renderSelectedSection = () => {
    switch (planCategorySection) {
      case 'features':
        return (
          <div className='features-continer w-11/12 mx-auto'>
              {/* <ul className=" ml-5">
                {selectedCategoryData?.features?.map((feature, index) => (
                    <div className='flex'>
                       <img className='mr-1 w-5 h-5 my-auto' src={ticIcon}/>
                       <li className='resort-name  ' key={index}>{feature}</li>
                    </div>
                ))}
              </ul>
              <h1 className='ml-5 my-5 lg:text-xl text-lg text-black'> price: {selectedCategoryData?.price}</h1>
              <p className='ml-5 text-xs'>{selectedCategoryData?.description}</p> */}
          </div>
        );

      case 'day':
        return (
          <div className="day-plan-data-container lg:w-11/12 w-full mx-auto h-80  image-container 
           overflow-y-scroll pb-5 rounded-lg">
            {dayPlan.map((planItem, index) => (
              <div className='cursor-pointer  group  w-full  rounded-lg shadow-lg mb-5' key={index} >
                <CommonHeadingSection planItem={planItem} />
                <div className='w-10/12 mx-auto'>
                    <p className='text-black lg:text-sm  text-xs mt-2'>{planItem?.description}</p>
                </div>
                
                {planItem?.accommodations?.map((accommodationItem) => (
                  <AccommodationSection
                    key={accommodationItem?._id}
                    accommodation={accommodationItem}
                  />
                ))}
             
                
              
                {planItem?.activities?.map((activityItem) => (
                  <ActivitiesSection
                    key={activityItem?._id}
                    activities={activityItem}
                  />
                ))}
                {planItem?.foods?.map((foodItem, foodIndex) => (
                  <FoodSection
                    key={foodIndex}
                    food={foodItem}
                  />
                ))}
              </div>
            ))}
          </div>
        );

      case 'accomadation':
        return (
          <div className="day-plan-data-container lg:w-11/12 w-full mx-auto lg:h-96 h-64 image-container 
          overflow-y-scroll pb-5 rounded-lg">
            {dayPlan.map((planItem, index) => (
              <div key={index}>
                <CommonHeadingSection planItem={planItem} />
                {planItem?.accommodations?.map((accommodationItem) => (
                  <AccommodationSection
                    key={accommodationItem?._id}
                    accommodation={accommodationItem}
                  />
                ))}
              </div>
            ))}
          </div>
        );

      case 'activity':
        return (
          <div className="day-plan-data-container lg:w-11/12 w-full mx-auto lg:h-full h-64 image-container bg-red-500
          overflow-y-scroll pb-5 rounded-lg">
            {dayPlan.map((planItem, index) => (
              <div key={index}>
                <CommonHeadingSection planItem={planItem} />
                {planItem?.activities?.map((activityItem) => (
                  <ActivitiesSection
                    key={activityItem?._id}
                    activities={activityItem}
                  />
                ))}
              </div>
            ))}
          </div>
        );

      case 'food':
        return (
          <div className="day-plan-data-container lg:w-11/12 w-full mx-auto lg:h-96 h-64 image-container 
          overflow-y-scroll pb-5 rounded-lg">
            {dayPlan.map((planItem, index) => (
              <div key={index}>
                <CommonHeadingSection planItem={planItem} />
                {planItem?.foods?.map((foodItem, foodIndex) => (
                  <FoodSection key={foodIndex} food={foodItem} />
                ))}
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    // <div className="cursor-pointer transform hover:scale-105 transition-transform duration-300 group border-gray-100/30 flex w-full  self-center overflow-hidden rounded-lg border-2 package-container shadow-lg">
    <div className="h-full cursor-pointer  duration-300 group   flex w-full self-center overflow-hidden rounded-lg shadow-lg">

      <div className=" w-full ml-auto">
        <div className="menu-bar flex w-full lg:space-x-12 space-x-3 lg:items-start items-center">
        

          {/* <p
            className={`sub-heading lg:text-lg text-xs my-5 lg:ml-5 ${planCategoryUnderLines(
              'features'
            )} transition-all duration-300 ease-in-out`}
            onClick={() => setPlanCategorySection('features')}
          >
            Features
          </p> */}
          <p
            className={`sub-heading lg:text-lg text-xs ml-1 my-5 ${planCategoryUnderLines(
              'day'
            )} transition-all duration-300 ease-in-out`}
            onClick={() => setPlanCategorySection('day')}
          >
            {totals.totalDays} Days Plan
          </p>
          <p
            className={`sub-heading lg:text-lg text-xs my-5  ${planCategoryUnderLines(
              'accomadation'
            )} transition-all duration-300 ease-in-out`}
            onClick={() => setPlanCategorySection('accomadation')}
          >
            {totals.totalAccommodations} Hotels
          </p>
          <p
            className={`sub-heading lg:text-lg text-xs my-5 ${planCategoryUnderLines(
              'activity'
            )} transition-all duration-300 ease-in-out`}
            onClick={() => setPlanCategorySection('activity')}
          >
            {totals.totalActivities} Activities
          </p>
          <p
            className={`sub-heading lg:text-lg text-xs my-5 ${planCategoryUnderLines(
              'food'
            )} transition-all duration-300 ease-in-out`}
            onClick={() => setPlanCategorySection('food')}
          >
            {totals.totalFood} Meals
          </p>
        </div>

        <div className="plan-details-container flex w-full">
          {renderSelectedSection()}
        </div>
      </div>
    </div>
  );
};

export default PlanCard;