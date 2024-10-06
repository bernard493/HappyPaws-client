import React from "react";
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
  } from "@chakra-ui/react";
const PetDetailsDrawer = ({isOpen,onClose,btnRef}) => {
  return (
    <div>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        size={"xl"}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Create your account</DrawerHeader>

          <DrawerBody>
            <input placeholder="Type here..." />
          </DrawerBody>

          <DrawerFooter>
            <button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </button>
            <button colorScheme="blue">Save</button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default PetDetailsDrawer;
