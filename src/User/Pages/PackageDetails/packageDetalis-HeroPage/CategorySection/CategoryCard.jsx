import React, { useEffect, useState } from "react";
import axios from "axios";
// import PlanCard from "../PlanSection/PlanCard";
// import PlanForm from "../PlanSection/PlanForm";
// import { getPlan } from "../../../api/DayPlan/DayPlanApi";


const CategoryCard = ({ category, refresh, onViewPlan }) => {
  
  return (
    <div
      className={`cursor-pointer transform hover:scale-105 transition-transform duration-300 group flex w-full flex-col self-center overflow-hidden rounded-lg border-2 shadow-md }`}
    >
  
          {/* Display Mode */}
          <div className="relative mx-3 mt-3 flex md:h-5 h-10 overflow-hidden rounded-xl">
            <img
              className="peer absolute top-0 right-0 h-full w-full object-cover"
              src={category.categoryImage || "default-placeholder.png"}
              alt="Category"
            />
          </div>
          <div className="mt-4 md:px-5 px-2 md:pb-5 pb-1">
            <h1 className="md:text-lg text-sm tracking-tight font-bold uppercase text-black">
              {category?.categoryName}
            </h1>
            {/* <p className="text-sm text-gray-700">{category?.categoryDescription}</p> */}
            <div className="mt-2 flex items-center justify-between">
              <p className="text-sm text-blue-500">{category?.categoryOffer}% OFF</p>
              <div>
                <span className="line-through text-gray-500">₹{category?.categoryRegularPrice}</span>
                <span className="text-lg font-bold text-teal-700 mx-2">₹{category?.categoryDiscountedPrice}</span>
              </div>
            </div>
            <div className="flex space-x-2 mt-4">
             
              <button
                className="bg-blue-500 no-button w-full mx-auto text-white px-3 py-1 rounded-md"
                onClick={() => onViewPlan(category)}
              >
                View Details
              </button>
            </div>
          </div>
       
    </div>
  );
};

export default CategoryCard;
