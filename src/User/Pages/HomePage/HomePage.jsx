import React, { useEffect, useState } from 'react';
import './HomePage.css';
import HeroPage from './HeroPage/HeroPage';
import AutoPlay from './Slider/Slider';
import InstagramData from './InstaData/InstagramData';
import Services from '../../Components/Services/Services';
import Packages from '../../Components/packages/Packages';
import { bgvideo } from '../../../assets/Index';

const HomePage = () => {
  return (
    <>
      <div className="home-page h-screen w-full ">
        <video className="video-background" autoPlay loop muted>
          <source src={bgvideo} type="video/mp4" />Your browser does not support the video tag.
        </video>
        <HeroPage />
      </div>

      <div className='mid-container '>
       <AutoPlay/>
       <Services/>
       </div>

       <div className='footer-container' style={{ background: "linear-gradient(to bottom, #e0f7ff, #00c3ff, #006994, #002b4d)" }}>
         <Packages/>
         <InstagramData/>          
       </div>
    </>
  );
};

export default HomePage;
