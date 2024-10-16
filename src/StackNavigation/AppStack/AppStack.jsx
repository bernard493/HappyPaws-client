import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "../../Pages/LandingPages/LandingPage";
import PetMatchesPage from "../../Pages/PetMatchesPage/PetMatchesPage";
import AdoptionRequestPage from "../../Pages/AdoptionRequestPage/AdoptionRequestPage";
import ProfilePage from "../../Pages/ProfilePage/ProfilePage";
import { useAuth } from "../../CustomHooks/AuthProvider ";
import LoginPage from "../../Pages/LoginPage/LoginPage";
import PrivateRoutes from "./PrivateRoutes ";
import SignupPage from "../../Pages/SignupPage/SignupPage";

const AppStack = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth/login" element={<LoginPage />} />
      <Route path="/auth/create-account" element={<SignupPage />} />
      <Route element={<PrivateRoutes />}>
        <Route path="/pet-matches" element={<PetMatchesPage />} />
        <Route
          path="/adoption-request/:petName"
          element={<AdoptionRequestPage />}
        />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>
    </Routes>
  );
};

export default AppStack;
