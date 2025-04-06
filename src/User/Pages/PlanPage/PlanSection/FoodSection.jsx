import React from "react";
import { FaUtensils, FaQuoteLeft } from "react-icons/fa";

const FoodSection = ({ food }) => {
  if (
    !food ||
    (!food.food_name &&
      !food.food_description &&
      (!food.food_images || food.food_images.length === 0))
  ) {
    return null;
  }

  return (
    <div className="my-6 w-11/12 md:w-10/12 mx-auto p-4 shadow-xl rounded-2xl border border-blue-400">
      {/* Title */}
      {food?.food_name && (
        <div className="flex items-center space-x-3 mb-4">
          <FaUtensils className="text-blue-800 text-lg md:text-xl" />
          <h1 className="font-semibold text-blue-950 text-sm md:text-lg lg:text-xl tracking-wide">
            {food.food_name}
          </h1>
        </div>
      )}

      {/* Image Slider */}
      {food?.food_images?.length > 0 && (
        <div className="flex overflow-x-auto custom-scrollbar space-x-4">
          {food.food_images.map((img, index) => (
            <div
              key={index}
              className="relative min-w-[160px] sm:min-w-[200px] md:min-w-[240px] lg:min-w-[280px] rounded-xl shadow-md border border-blue-400"
            >
              <img
                className="h-32 sm:h-40 md:h-44 lg:h-48 w-full object-cover rounded-xl"
                src={img.image}
                alt={`Food Image ${index + 1}`}
              />
            </div>
          ))}
        </div>
      )}

      {/* Description */}
      {food?.food_description && (
        <div className="mt-4 flex items-start text-[10px] sm:text-xs md:text-sm text-gray-700 leading-snug">
          <FaQuoteLeft className="text-blue-800 mt-[3px] mr-2 text-xs md:text-sm" />
          <p className="text-justify">{food.food_description}</p>
        </div>
      )}
    </div>
  );
};

export default FoodSection;
