import React, { useState } from "react";
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
import { IoShareSocialOutline } from "react-icons/io5";
import { MdSaveAlt } from "react-icons/md";
import { IoMdMale, IoMdFemale } from "react-icons/io";
import useWindowWide from "../../CustomHooks/useWindowWide ";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSelectedPetForAdoptionState } from "../../store/globalStateSlice";

const PetDetailsDrawer = ({ isOpen, onClose, btnRef, petDetails }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const wide = useWindowWide(600);
  const [isDisabled, setIsDisabled] = useState(false);

  const handlePetAdoptionNavigationRequest = () => {
    setIsDisabled(true);
    dispatch(
      setSelectedPetForAdoptionState({
        petName: petDetails.name,
        image: petDetails.images[0],
        breed: petDetails.breed,
        price: petDetails.price,
        shelterName: petDetails.shelter.name,
        shelterAddress: petDetails.shelter.address,
        shelterAvatar: petDetails.shelter.image,
      })
    );
    navigate(`/adoption-request/${petDetails.name}`, {
      state: {
        petId: petDetails.id,
      },
    });
    setIsDisabled(false);
  };

  return (
    <>
      {petDetails && (
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
                        src={petDetails.images[0]}
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
                        src={petDetails.images[1]}
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
                        src={petDetails.images[2]}
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
                        src={petDetails.images[0]}
                        alt={petDetails.name}
                        className="pet__Details--img"
                      />
                    </GridItem>
                  </Grid>
                </div>
              </section>
              <section className="pet__Details__container">
                <div className="pet__Details__container--shelter">
                  <Flex>
                    <Avatar src={petDetails.shelter.image} />
                    <Box ml="3">
                      <Text fontWeight="bold">
                        {petDetails.shelter.name}
                        <Badge
                          ml="1"
                          colorScheme={
                            petDetails.shelter.status === 1 ? "green" : "red"
                          }
                        >
                          {petDetails.shelter.status === 1
                            ? "active"
                            : "not active "}
                        </Badge>
                      </Text>
                      <Text fontSize="sm">{petDetails.shelter.address}</Text>
                    </Box>
                  </Flex>
                  <div className="">
                    <Text fontSize="">Adoption Price</Text>
                    <Text fontWeight="bold">£ {petDetails.price}</Text>
                  </div>
                </div>
                <div className="pet__Details__information--container">
                  <div className="pet__Details__information">
                    <div className="">
                      <Text fontSize="sm">Sex</Text>
                      {petDetails.gender === "female" ? (
                        <IoMdFemale size={20} />
                      ) : (
                        <IoMdMale size={20} />
                      )}
                    </div>
                    <div className="">
                      <Text fontSize="sm">Size</Text> 
                      {petDetails.size === "small" ? (
                        <Text fontWeight="bold">S</Text>
                      ) : (
                        <Text fontWeight="bold">L</Text>
                      )}
                    </div>
                    <div className="">
                      <Text fontSize="sm">Age</Text>
                      <Text fontWeight="bold">{petDetails.age}</Text>
                    </div>
                  </div>
                  <div className="pet__Details__information">
                    <div className="">
                      <Text fontSize="sm">Breed</Text>
                      <Text fontWeight="bold">{petDetails.breed}</Text>
                    </div>
                    <div>
                      <Text fontSize="sm">Vaccine Status</Text>
                      <Badge
                        ml="1"
                        colorScheme={
                          petDetails.vaccineStatus === 1 ? "green" : "red"
                        }
                      >
                        {petDetails.vaccineStatus === 1
                          ? "active"
                          : "not active "}
                      </Badge>
                    </div>
                  </div>

                  <h3>Description</h3>
                  <p>{petDetails.description}</p>
                </div>
              </section>
            </DrawerBody>

            <DrawerFooter pb={10}>
              <Button
                handleButtonClick={handlePetAdoptionNavigationRequest}
                isDisabledState={isDisabled}
                notDisabledText={"Make offer"}
                isDisabledText={" "}
              />
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
};

export default PetDetailsDrawer;
