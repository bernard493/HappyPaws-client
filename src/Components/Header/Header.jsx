import React, { useState } from "react";
import "./Header.scss";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { MdCall } from "react-icons/md";
import { Avatar } from "@chakra-ui/react";
import { useAuth } from "../../CustomHooks/AuthProvider ";

const Header = () => {
  const navigate = useNavigate();
  const { logout, isAuthenticated } = useAuth();

  const handleSignOut = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      <nav className="Navbar">
        <div className="Navbar__logo-container">
          <Link to="/">
            <h1 className="Navbar__logo-container--text">HAPPY PAWS!</h1>
          </Link>
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
          {isAuthenticated ? (
            <Menu isLazy>
              <MenuButton>
                <Avatar
                  size="sm"
                  name="John Doe"
                  src="https://bit.ly/sage-adebayo"
                />
              </MenuButton>
              <MenuList>
                {/* MenuItems are not rendered unless Menu is open */}
                <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <Link to="/auth/login">
              <Text>Login or Sign Up</Text>
            </Link>
          )}
        </div>
      </nav>
      <div className="Navbar__bottom-border" />
    </>
  );
};

export default Header;
