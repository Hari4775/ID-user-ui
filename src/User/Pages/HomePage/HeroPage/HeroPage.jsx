import React from 'react';
import './HeroPage.css';
import { heroImage } from '../../../../assets/Index';

const HeroPage = () => {
  return (
    <div className="hero-page w-10/12 mx-auto flex flex-col lg:flex-row lg:items-start items-center text-center lg:text-left">
      {/* Image Container */}
      <div className="lg:mr-auto mt-32 flex flex-col items-center lg:items-start">
        <img className="w-72" src={heroImage} alt="Hero" />

        {/* Text Container */}
        <div className="flex items-center mt-4">
          <h1 className="ml-7 text-sm lg:text-xl font-semibold text-white">
          "Island Days – Your Gateway to the Restricted Paradise."
          </h1>
        </div>
      </div>
    </div>
  );
}

export default HeroPage;
