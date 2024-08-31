import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import AppStack from "../AppStack/AppStack";

const Layouts = () => {
  return (
    <Router>
      <main className="App">
        <Header />
        <AppStack />
        <Footer />
      </main>
    </Router>
  );
};

export default Layouts;
