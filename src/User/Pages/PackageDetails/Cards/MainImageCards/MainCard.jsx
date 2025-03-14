import React from 'react'

const MainCard = ({ data }) => {
  return (
    <div className="h-48 md:w-10/12   relative cursor-pointer mb-5 ">
    
      <div className="absolute inset-0 transform   card transition duration-300 ">
        <div className="h-full w-full    flex  justify-center  ">
          <img src={data} alt="Package" className=" mb-2 h-full w-full rounded-lg" /> {/* Displaying image */}
        </div>
      </div>
    </div> 
  )
}

export default MainCard;
