import React, { useEffect, useState } from "react";
import "./PetDetailsDrawer.scss";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import axios from "axios";
import { IoShareSocialOutline } from "react-icons/io5";
import { MdSaveAlt } from "react-icons/md";

import { petsDemoDate } from "../../const/constant";

const PetDetailsDrawer = ({ isOpen, onClose, btnRef, selectedPetID }) => {
  const [petDetail, setPetDetail] = useState({});
  // API Call to get pet details
  useEffect(() => {
    const fetchPetDetails = async () => {
      try {
        // const { status, data } = await axios.get("");
        const pet = petsDemoDate.find((eachPet) => {
          const { id } = eachPet;
          return id === selectedPetID;
        });
        setPetDetail(pet);
        console.log("petsDemoDate", petsDemoDate);
      } catch {
        console.log("Error fetching pet details");
      }
    };
    fetchPetDetails();
  }, [selectedPetID]);

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
          <DrawerHeader>
            <div className="petdeails__header--container">
              <h1 className="petdeails__header--title">Pet NAME </h1>
              <div className="petdeails__header__share-CTA__container">
                <div className="petdeails__header__share-CTA">
                  <IoShareSocialOutline size={15} />
                  <p className="petdeails__header--text">Share</p>
                </div>
                <div className="petdeails__header__share-CTA">
                  <MdSaveAlt size={15} />
                  <p className="petdeails__header--text">Save</p>
                </div>
              </div>
            </div>
          </DrawerHeader>

          <DrawerBody>
            <div className="petdeails__details--container">
              <div className="petdeails__details__image--container">
                <Grid
                  h="300px"
                  templateRows="repeat(2, 1fr)"
                  templateColumns="repeat(5, 1fr)"
                  gap={2}
                >
                  <GridItem
                    borderRadius={5}
                    rowSpan={2}
                    colSpan={3}
                    bg="tomato"
                  >
                    <img
                      src={petsDemoDate.image[0]}
                      alt=""
                      className="petdeails__details---img"
                    />
                  </GridItem>
                  <GridItem borderRadius={5} colSpan={1} bg="papayawhip">
                    <img
                      src={petDetail.image[0]}
                      alt=""
                      className="petdeails__details---img"
                    />
                  </GridItem>
                  <GridItem borderRadius={5} colSpan={1} bg="papayawhip">
                    <img
                      src={petDetail.image[0]}
                      alt=""
                      className="petdeails__details---img"
                    />
                  </GridItem>
                  <GridItem borderRadius={5} colSpan={2}>
                    <img
                      src={petDetail.image[0]}
                      alt=""
                      className="petdeails__details---img"
                    />
                  </GridItem>
                </Grid>
              </div>
            </div>
          </DrawerBody>

          <DrawerFooter>
            <button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </button>
            <button>Save</button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default PetDetailsDrawer;
