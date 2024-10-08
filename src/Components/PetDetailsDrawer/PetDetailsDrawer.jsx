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
  Flex,
  Avatar,
  Box,
  Text,
  Badge,
} from "@chakra-ui/react";
import axios from "axios";
import { IoShareSocialOutline } from "react-icons/io5";
import { MdSaveAlt } from "react-icons/md";

import { petsDemoDate } from "../../const/constant";
import useWindowWide from "../../CustomHooks/useWindowWide ";

const PetDetailsDrawer = ({
  isOpen,
  onClose,
  btnRef,
  petDetails,
  isLoading,
}) => {
  const wide = useWindowWide(600);
  console.log("with", wide);
  return (
    <>
      {!isLoading && petDetails ? (
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
                <div className="pet__Details__header--container">
                  <h1 className="pet__Details__header--title">
                    {petDetails.name}
                  </h1>
                  <div className="pet__Details__header__share-CTA__container">
                    <div className="pet__Details__header__share-CTA">
                      <IoShareSocialOutline size={15} />
                      <p className="pet__Details__header--text">Share</p>
                    </div>
                    <div className="pet__Details__header__share-CTA">
                      <MdSaveAlt size={15} />
                      <p className="pet__Details__header--text">Save</p>
                    </div>
                  </div>
                </div>
              </DrawerHeader>

              <DrawerBody>
                <section className="pet__Details--container">
                  <div className="pet__Details__image--container">
                    <Grid
                      h={wide ? "400px" : ""}
                      templateRows="repeat(2, 1fr)"
                      templateColumns="repeat(5, 1fr)"
                      gap={2}
                    >
                      <GridItem borderRadius={10} rowSpan={2} colSpan={3}>
                        <img
                          src={petDetails.image[0]}
                          alt={petDetails.name}
                          className="pet__Details--img"
                        />
                      </GridItem>
                      <GridItem
                        borderRadius={5}
                        colSpan={1}
                        h={wide ? "200px" : ""}
                      >
                        <img
                          src={petDetails.image[1]}
                          alt={petDetails.name}
                          className="pet__Details--img"
                        />
                      </GridItem>
                      <GridItem
                        borderRadius={5}
                        colSpan={1}
                        h={wide ? "200px" : ""}
                      >
                        <img
                          src={petDetails.image[2]}
                          alt={petDetails.name}
                          className="pet__Details--img"
                        />
                      </GridItem>
                      <GridItem
                        borderRadius={5}
                        colSpan={2}
                        h={wide ? "200px" : ""}
                      >
                        <img
                          src={petDetails.image[0]}
                          alt={petDetails.name}
                          className="pet__Details--img"
                        />
                      </GridItem>
                    </Grid>
                  </div>
                </section>
                <section className="pet__Details__container">
                  <div>
                    <Flex>
                      <Avatar src="https://cdn.pixabay.com/photo/2023/12/04/17/24/evening-8429871_1280.jpg" />
                      <Box ml="3">
                        <Text fontWeight="bold">
                         {petDetails.shelter.name}
                          <Badge ml="1" colorScheme={petDetails.shelter.status ? "green":"red"}>
                            {petDetails.shelter.status ? "active":"not active "}
                          </Badge>
                        </Text>
                        <Text fontSize="sm">{petDetails.shelter.address}</Text>
                      </Box>
                    </Flex>
                  </div>
                  <div>
                    <h3>Description</h3>
                    <p>{petDetails.description}</p>
                  </div>
                </section>
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
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p>loading...</p>
        </div>
      )}
    </>
  );
};

export default PetDetailsDrawer;
