import React from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import "../App.css"
import UserRoutes from '../User/UserRoutes'

const MainRoute = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* User Routes */}
        <Route path="/*" element={<UserRoutes />} />

      </Routes>
    </BrowserRouter>
  );
};


export default MainRoute;
