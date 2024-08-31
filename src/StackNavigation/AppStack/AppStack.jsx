import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "../../Pages/LandingPages/LandingPage";
import HomePage from "../../Pages/HomePage/HomePage";

const AppStack = () => {
  return (
   
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
 
  );
};

export default AppStack;
