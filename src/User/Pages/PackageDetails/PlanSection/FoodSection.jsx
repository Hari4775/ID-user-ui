 import React from 'react'
  
  const FoodSection = ({ food }) => {
    return (
      <div className="w-10/12 mx-auto  md:my-10 my-4">
        <h1 className=" resort-name font-bold text-sm lg:text-xl ">{food?.food_name}</h1>
          {food?.food_images?.length > 0 && (
              <div  className="lg:h-48 h-32 my-2 flex overflow-x-auto custom-scrollbar space-x-4">
               {food.food_images.map((img, imgIndex) => (
                 <div key={imgIndex} className="relative min-w-[200px] lg:min-w-[300px]">
                   <img key={imgIndex}className="h-full w-full object-cover rounded-lg border-2 border-white" src={img.image} alt={`Hotel Image ${imgIndex + 1}`}/>
                  </div>
                ))}
          </div>
        )}

       <p className="mb-2 text-[7px] lg:text-xs text-left">{food?.food_description}</p>

      </div>
    );
  };
  export default FoodSection