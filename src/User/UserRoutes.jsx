// src/User/routes/UserRoutes.js
import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Header from '../Common/Header/Header';
import Enquirey from './Components/Modal/Enquirey';
import ChatBot from './Components/ChatBot/ChatBot';
import Footer from '../Common/Footer/Footer';
import HomePage from './Pages/HomePage/HomePage';
import PackageDetails from './Pages/PackageDetails/PackageDetails';
import ConnectUs from './Pages/Contact-us/Contact-us';
import PlanPage from './Pages/PlanPage/PlanPage';


const UserLayout = ({ children }) => {
  const location = useLocation();
  const hideChatBot = location.pathname.startsWith('/plandetails');
  return (
    <div className="w-full">
      <Header />
      <Enquirey />
      {!hideChatBot && <ChatBot />}
      {/* <ChatBot /> */}
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
        <Route path="/packagedetails/:package_id" element={<PackageDetails />} />
        <Route path="/plandetails/:category_id" element={<PlanPage/>}/>
        <Route path="/contact-us" element={<ConnectUs />} />
      </Routes>
    </UserLayout>
  );
};

export default UserRoutes;
