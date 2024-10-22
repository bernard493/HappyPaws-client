import React, { useEffect } from "react";
import "./Layouts.scss";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import AppStack from "../AppStack/AppStack";
import { useDispatch, useSelector } from "react-redux";
import { GetUserProfile } from "../../API/User__Api";
import { setUserGlobalState } from "../../store/globalStateSlice";

const Layouts = () => {

  return (
    <Router>
      <Header />
      <AppStack />
      <Footer />
    </Router>
  );
};

export default Layouts;
