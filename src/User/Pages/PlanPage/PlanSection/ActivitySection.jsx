import React, { useEffect, useState } from "react";
import { FaMountain, FaQuoteLeft } from "react-icons/fa"; // Premium-looking icons

const ActivitiesSection = ({ activities }) => {
  const [activity_images, setActivityImages] = useState([]);

  useEffect(() => {
    if (activities?.activity_images) {
      setActivityImages(activities.activity_images);
    }
  }, [activities]);

  if (
    !activities ||
    (!activities.activity_name &&
      !activities.activity_description &&
      (!activities.activity_images || activities.activity_images.length === 0))
  ) {
    return null;
  }
  return (
    <div className="my-6 w-11/12 md:w-10/12 mx-auto p-4 shadow-xl rounded-2xl border border-blue-400">
      {/* Title */}
      <div className="flex items-center space-x-3 mb-4">
        <FaMountain className="text-blue-800 text-lg md:text-xl" />
        <h1 className="font-semibold text-blue-950 text-sm md:text-lg lg:text-xl tracking-wide">
          {activities?.activity_name}
        </h1>
      </div>

      {/* Image slider */}
      <div className="flex overflow-x-auto custom-scrollbar space-x-4">
        {activity_images.map((img, index) => (
          <div
            key={index}
            className="relative min-w-[160px] sm:min-w-[200px] md:min-w-[240px] lg:min-w-[280px] rounded-xl shadow-md border border-blue-400"
          >
            <img
              className="h-32 sm:h-40 md:h-44 lg:h-48 w-full object-cover rounded-xl"
              src={img.image}
              alt={`Activity Image ${index + 1}`}
            />
          </div>
        ))}
      </div>

      {/* Description */}
      {activities?.activity_description && (
        <div className="mt-4 flex items-start text-[10px] sm:text-xs md:text-sm text-gray-700 leading-snug">
          <FaQuoteLeft className="text-blue-800 mt-[3px] mr-2 text-xs md:text-sm" />
          <p className="text-justify">{activities.activity_description}</p>
        </div>
      )}
    </div>
  );
};

export default ActivitiesSection;
