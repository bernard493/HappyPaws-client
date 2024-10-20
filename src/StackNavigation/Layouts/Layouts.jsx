import React, { useEffect } from "react";
import "./Layouts.scss";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import AppStack from "../AppStack/AppStack";
import { useDispatch, useSelector } from "react-redux";
import { GetUserProfile } from "../../API/User__Api";
import { setUserGlobalState } from "../../store/globalStateSlice";
import { Grid, GridItem } from "@chakra-ui/react";

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
      {/* <Grid
        templateAreas={`"header header"
                  "main main"
                  "footer footer"`}
        gridTemplateRows={"50px 1fr 30px"}
        gridTemplateColumns={"150px 1fr"}
        h="100%"
        // position={"absolute"}

      >
        <GridItem area={"header"}> */}
          <Header />
        {/* </GridItem>

        <GridItem pt={20} area={"main"}> */}
          <AppStack />
        {/* </GridItem>
        <GridItem pt={5} bottom={0} position={"relative"} area={"footer"}> */}
          <Footer />
        {/* </GridItem>
      </Grid> */}
    </Router>
  );
};

export default Layouts;
