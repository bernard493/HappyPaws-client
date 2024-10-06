import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "../../Pages/LandingPages/LandingPage";
import HomePage from "../../Pages/HomePage/HomePage";
import PetMatchesPage from "../../Pages/PetMatchesPage/PetMatchesPage";

const AppStack = () => {
  return (
   
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/pet-matches" element={<PetMatchesPage />} />
      </Routes>
 
  );
};

export default AppStack;
