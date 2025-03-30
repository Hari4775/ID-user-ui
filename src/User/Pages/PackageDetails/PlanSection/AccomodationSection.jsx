import React from 'react'
import { FaTrash } from "react-icons/fa";
const AccommodationSection = ({ accommodation}) => {
  
    return (
      <div className="accomodation-image-container my-4 lg:my-12 w-10/12 mx-auto ">
        <div className="flex">
            <h1 className=" resort-name font-bold text-xl ">{accommodation?.hotel_name}</h1>
        </div>

         {/* Image Display with Delete Option */}
        <div className="h-48 flex my-2 ">
           {accommodation.hotel_images.map((img, index) => (
              <div key={index} className="relative ">
                <img className="h-full mx-1 object-cover rounded-xl border-2 border-blue-600" src={img.image} alt={`Hotel Image ${index + 1}`} />
              </div>
            ))}
        </div>
        <div className=' flex space-x-5'>
          <p className="sub-heading ">Rating: {accommodation?.rating}</p>
          <p className="sub-heading">{accommodation?.location}asdfddasddjfhd</p>
          <p className="sub-heading">{accommodation?.type}</p>
        </div>
        <div className="">
          <p>{accommodation?.description}</p>
        </div>
      </div>
    );
  };

export default AccommodationSection