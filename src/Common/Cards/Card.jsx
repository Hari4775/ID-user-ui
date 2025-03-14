import React from 'react'
import './Card.css'

const Card = ({ data }) => {
  console.log(data, "card data")
  return (
    <div className="h-28 md:w-10/12 mx-2 border-opacity-100 shadow-2xl border-gray-100/50 relative cursor-pointer my-5 border-1">     
      <div className="absolute inset-0 transform transition duration-300 flex flex-col justify-center items-center">
        <img src={data?.image} alt="Package" className="w-10 h-10 mb-2" /> 
        <h2 className="md:text-xl text-xs font-bold text-blue-400">{data?.title}</h2>
      </div>
    </div>
  )
}

export default Card;
