import React, { useEffect, useState } from 'react';
import './HomePage.css';
import HeroPage from './HeroPage/HeroPage';

import AutoPlay from './Slider/Slider';
import axios from 'axios';
import InstagramData from './InstaData/InstagramData';
import Services from '../../Components/Services/Services';
import Packages from '../../Components/packages/Packages';
import { bgvideo } from '../../../assets/Index';


const HomePage = () => {

  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const url =process.env.REACT_APP_API_URL;
  
  useEffect(() => {
    fetchPackages();
  }, []);

  
  const fetchPackages = async () => {
    try {
      // const response = await axios.get(`${url}/test`);  
      const response = await axios.get(`${url}/test`);  

      console.log(response?.data, "USER URL TEST RESULT");
      if (!response) {
        throw new Error("Network response error");
      }
      setPackages(response?.data);
      setLoading(false);
    } catch (error) {
      console.log(error, "data fetching error");
    }
  };

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
