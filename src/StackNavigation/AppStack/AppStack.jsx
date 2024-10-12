import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "../../Pages/LandingPages/LandingPage";
import PetMatchesPage from "../../Pages/PetMatchesPage/PetMatchesPage";
import AdoptionRequestPage from "../../Pages/AdoptionRequestPage/AdoptionRequestPage";
import ProfilePage from "../../Pages/ProfilePage/ProfilePage";

const AppStack = () => {
  return (
   
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/pet-matches" element={<PetMatchesPage />} />
        <Route path="/adoption-request/:petName" element={<AdoptionRequestPage/>} />
        <Route path="/profile" element={<ProfilePage/>} />
      </Routes>
 
  );
};

export default AppStack;
