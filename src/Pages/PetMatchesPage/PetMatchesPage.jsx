import React from "react";
import { useLocation } from "react-router-dom";
import {
  //   Drawer,
  //   DrawerBody,
  //   DrawerFooter,
  //   DrawerHeader,
  //   DrawerOverlay,
  //   DrawerContent,
  //   DrawerCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import PetDetailsDrawer from "../../Components/PetDetailsDrawer/PetDetailsDrawer";

const PetMatchesPage = () => {
  const location = useLocation();

  const { isOpen, onOpen, onClose } = useDisclosure();
  //   pass ref to handleOpenPetDetailsDrawer BTN
  const btnRef = React.useRef();
  const queryParams = new URLSearchParams(location.search);
  const userInput = decodeURIComponent(queryParams.get("search"));
  
  

  //   get get selected pet and open drawer
  const handleOpenPetDetailsDrawer = () => {
    onOpen();
  };

  return (
    <section>
      {/* <p>{userInput}</p> */}

      {/* Display Selected Pet Details */}
      <PetDetailsDrawer isOpen={isOpen} onClose={onClose} btnRef={btnRef} />
    </section>
  );
};

export default PetMatchesPage;
