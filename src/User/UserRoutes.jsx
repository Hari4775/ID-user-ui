// src/User/routes/UserRoutes.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from '../Common/Header/Header';
import Enquirey from './Components/Modal/Enquirey';
import ChatBot from './Components/ChatBot/ChatBot';
import Footer from '../Common/Footer/Footer';
import HomePage from './Pages/HomePage/HomePage';
import PackageDetails from './Pages/PackageDetails/PackageDetails';
import ConnectUs from './Pages/Contact-us/Contact-us';


const UserLayout = ({ children }) => {
  return (
    <div className="w-full">
      <Header />
      <Enquirey />
      <ChatBot />
      {children}
      <Footer />
    </div>
  );
};

const UserRoutes = () => {
  return (
    <UserLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/packagedetails/:_id" element={<PackageDetails />} />
        <Route path="/contact-us" element={<ConnectUs />} />
      </Routes>
    </UserLayout>
  );
};

export default UserRoutes;
