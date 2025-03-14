import React from "react";
import Slider from "react-slick";
import './Sllider.css'

// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import Card from "../../../../../Common/Cards/Card";
import Card from "../../../../Common/Cards/Card";
import { star } from "../../../../assets/icons/IconIndex";
import { featers } from "../../../constants";

function AutoPlay() {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024, // Large screens and above
        settings: {
          slidesToShow: 4, // Show 3 slides on large screens
        }
      },
      {
        breakpoint: 768, // Medium screens
        settings: {
          slidesToShow: 3, // Show 2 slides on medium screens
        }
      },
      {
        breakpoint: 480, // Small screens (mobile)
        settings: {
          slidesToShow: 2, // Show 1 slide on mobile screens
        }
      }
    ]
  };

  return (
    <div className="slider-container w-11/12 mx-auto mb-10 ">
      <h1 className="text-left  pt-10 lg:text-2xl text-lg font-bold mb-5">All-Inclusive Luxury Awaits —No Extra Fees!</h1>
    
      <div className="flex items-center space-x-2 mb-4">
         <img src={star} className="w-7" />
           <p className="slider-text text-left md:text-sm text-xs">
           Enjoy a wide range of complimentary services included in all our packages.
        </p>
     </div>


      <div className="flex items-center space-x-2 lg:mb-10 mb-6">
        <img src={star} className="w-7"/>
        <p className=" text-left md:text-sm text-xs">packages—no extra charges, just pure relaxation and convenience with every booking.</p>      
      </div>

     
      <Slider {...settings}>
        {featers.map((feature, index) => (
          <Card key={index} data={feature}/>
        ))}
      </Slider>
    </div>
  );
}

export default AutoPlay;
