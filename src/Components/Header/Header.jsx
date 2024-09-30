import React, { useState } from "react";
import "./Header.scss";
import { Link } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import { MdCall } from "react-icons/md";
import { Avatar } from "@chakra-ui/react";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  return (
    <>
      <nav className="Navbar">
        <div className="Navbar__logo-container">
          <h1 className="Navbar__logo-container--text">HAPPY PAWS!</h1>
        </div>
        <div className="Navbar__links-container">
          <Link to="/about-us">
            <p>About Us</p>
          </Link>
          <Button
            size="md"
            height="40px"
            width="100px"
            border="2px"
            borderColor="#090B10"
            rightIcon={<MdCall />}
          >
            Contact
          </Button>
          {/* {isLoggedIn && (
            <Avatar size='sm' name="John Doe" src="https://bit.ly/sage-adebayo" />
          )} */}
        </div>
      </nav>
      <div className="Navbar__bottom-border" />
    </>
  );
};

export default Header;
