import React from 'react'
import { FaTrash } from "react-icons/fa";
const AccommodationSection = ({ accommodation}) => {
  
    return (
      <div className="accomodation-image-container my-4 lg:my-12 w-10/12 mx-auto ">
        <div className="flex">
            <h1 className=" resort-name font-bold text-sm lg:text-xl ">{accommodation?.hotel_name}</h1>
        </div>

        <div className="lg:h-48 h-32 my-2 flex overflow-x-auto custom-scrollbar space-x-4">
           {accommodation.hotel_images.map((img, index) => (
              <div key={index} className="relative min-w-[200px] lg:min-w-[300px]">
                <img className="h-full w-full object-cover rounded-lg border-2 border-white" src={img.image} alt={`Hotel Image ${index + 1}`} />
              </div>
            ))}
        </div>
        <div className=' flex space-x-5'>
          {/* <p className="sub-heading ">Rating: {accommodation?.rating}</p> */}
          <p className="sub-heading">{accommodation?.location}</p>
          <p className="sub-heading">{accommodation?.type}</p>
        </div>
        <div className="">
          <p className="mb-2  text-[7px] lg:text-xs text-left">{accommodation?.description}</p>
        </div>
      </div>
    );
  };

export default AccommodationSection