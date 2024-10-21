import React from "react";
import "./Header.scss";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { MdCall } from "react-icons/md";
import { useAuth } from "../../CustomHooks/AuthProvider ";
import { RiMenu5Line } from "react-icons/ri";
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
              <MenuButton
                as={IconButton}
                aria-label="Options"
                // variant="outline"
                icon={<RiMenu5Line color="black"/>}
              />

              <MenuList>
                {/* MenuItems are not rendered unless Menu is open */}
                <MenuItem onClick={() => navigate("/profile")}>
                  <Text color={"black"}>My Profile</Text>
                </MenuItem>
                <MenuItem onClick={handleSignOut}>
                  <Text color={"black"}>Sign Out</Text>
                </MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <Link to="/auth/login">
              <Text>Login</Text>
            </Link>
          )}
        </div>
      </nav>
      <div className="Navbar__bottom-border" />
    </>
  );
};

export default Header;
