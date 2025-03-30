import React from 'react'

const CommonHeadingSection = ({ planItem }) => {
    return (
      <div>
        <div className="each-day-headings flex  rounded-t-lg text-white ">
          <button className="bg-blue-950  rounded-xl lg:w-1/12 w-3/12 my-1 mx-2 p-1 ">
            Day {planItem?.day}
          </button>
          <p className="ml-5 my-2 sub-heading">{planItem?.day_Heading}</p>
          <p className="ml-4 my-2 sub-heading lg:text-lg text-xs">Included:</p>
          {planItem?.accommodations?.length > 0 && (
            <p className="my-2 ml-3 sub-heading lg:text-lg text-xs">
              {planItem?.accommodations?.length} Hotel
            </p>
          )}
          {planItem?.activities?.length > 0 && (
            <p className="my-2 ml-3 sub-heading lg:text-lg text-xs">
              {planItem?.activities?.length} Activities
            </p>
          )}
          {planItem?.foods?.length > 0 && (
            <p className="my-2 ml-3 sub-heading lg:text-lg text-xs">
              {planItem?.foods?.length} Meals
            </p>
          )}
        </div>
  
        <div className="place-details-section w-10/12 mx-auto">
          <p className="mb-5 resort-name lg:text-lg text-xs">
            {/* {planItem?.description} */}
          </p>
        </div>
      </div>
    );
  };
  

export default CommonHeadingSection