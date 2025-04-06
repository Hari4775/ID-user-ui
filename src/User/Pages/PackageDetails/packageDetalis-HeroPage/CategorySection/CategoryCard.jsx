import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";



const CategoryCard = ({ category}) => {
  const navigate = useNavigate();

   const handleCardClick = useCallback(() => {
      navigate(`/plandetails/${category.category_id}`);
    }, [navigate, category.category_id]);
  
  return (
    <div
    className={`cursor-pointer transform hover:scale-105 transition-transform duration-300 group flex w-full self-center rounded-lg border-2 shadow-md relative bg-cover bg-center bg-no-repeat`}
    style={{
      backgroundImage: `url(${category.categoryImage || "default-placeholder.png"})`,
    }}
  >
  
          <div className="lg:mt-4 md:px-5 px-1 md:pb-5 pb-1">
            <h1 className="md:text-lg text-xs tracking-tight font-bold uppercase text-yellow-600">
              {category?.categoryName}
            </h1>
            {/* <p className="text-sm text-gray-700">{category?.categoryDescription}</p> */}
            <div className="lg:mt-2  flex items-center  rounded-lg px-2 bg-slate-300">
              {/* <p className="lg:text-sm text-xs text-blue-500">{category?.categoryOffer}% OFF</p> */}
              <div>
                <span className="line-through text-gray-500 lg:text-sm text-[10px] font-bold">₹{category?.categoryRegularPrice}</span>
                <span className="lg:text-sm text-[10px] font-bold text-green-500 mx-2">₹{category?.categoryDiscountedPrice}</span>
              </div>
            </div>
            <div className=" w-full h-full mt-5">
               <button className="bottom-2 left-2 view-button text-white px-3 py-1  lg:text-sm text-xs"
                 onClick={handleCardClick} > VIEW</button>
            </div>

          </div>
       
    </div>
  );
};

export default CategoryCard;
