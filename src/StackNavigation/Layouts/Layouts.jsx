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
  const { user } = useSelector((state) => state.globalState);
  const dispatch = useDispatch();

  useEffect(() => {
    // Check if the user object is truly empty or undefined
    if (!user || Object.keys(user).length === 0) {
      const fetchUserData = async () => {
        const { status, data } = await GetUserProfile();
        if (status === 200) {
          dispatch(setUserGlobalState(data));
        }
      };

      fetchUserData();
    }
  }, [user, dispatch]);

  return (
    <Router>
      <Header />
      <AppStack />
      <Footer />
    </Router>
  );
};

export default Layouts;
