import React from 'react'

const CommonHeadingSection = ({ planItem }) => {
    return (
      <div>
        <div className="each-day-headings flex  rounded-t-lg text-white space-x-1 lg:space-x-3">
          <button className="bg-blue-950 lg:text-lg text-xs rounded-xl lg:w-1/12  W-3/12 my-2 lg:mx-2 mx-0 lg:ml-5 ml-1 p-1 ">
            Day {planItem?.day}
          </button>
          <p className=" my-2 lg:text-lg text-sm font-bold">{planItem?.day_Heading}</p>
          <p className=" my-2  lg:text-lg text-xs text-blue-900 font-bold">Included:</p>
          {planItem?.accommodations?.length > 0 && (
            <p className="my-2  lg:text-lg text-xs text-blue-900 font-bold">
              {planItem?.accommodations?.length} Hotel
            </p>
          )}
          {planItem?.activities?.length > 0 && (
            <p className="my-2  lg:text-lg text-xs text-blue-900 font-bold">
              {planItem?.activities?.length} Activities
            </p>
          )}
          {planItem?.foods?.length > 0 && (
            <p className="my-2 lg:text-lg text-xs text-blue-900 font-bold">
              {planItem?.foods?.length} Food
            </p>
          )}
        </div>
  
       
      </div>
    );
  };
  

export default CommonHeadingSection