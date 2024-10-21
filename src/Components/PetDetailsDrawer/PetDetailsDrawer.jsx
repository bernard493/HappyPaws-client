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
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Stack,
} from "@chakra-ui/react";
import { IoShareSocialOutline } from "react-icons/io5";
import { MdSaveAlt } from "react-icons/md";
import { IoMdMale, IoMdFemale } from "react-icons/io";
import useWindowWide from "../../CustomHooks/useWindowWide ";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSelectedPetForAdoptionState } from "../../store/globalStateSlice";
import { getPetDetailsById } from "../../API/Pets__Api";

const PetDetailsDrawer = ({ isOpen, onClose, btnRef, petID }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const wide = useWindowWide(600);
  const [isDisabled, setIsDisabled] = useState(false);
  const [selectedPetDetails, setSelectedPetDetails] = useState(null);
  const [isLoadingPetDetails, setIsLoadingPetDetails] = useState(false);

  useEffect(() => {
    const fetchPetDetails = async () => {
      try {
        setIsLoadingPetDetails(true);
        const { status, data } = await getPetDetailsById(petID);
        if (status === 200) {
          setSelectedPetDetails(data);
        }
      } catch {
        console.log("Error fetching pet details");
      } finally {
        setIsLoadingPetDetails(false);
      }
    };
    fetchPetDetails();
  }, [petID]);

  const handlePetAdoptionNavigationRequest = () => {
    setIsDisabled(true);
    dispatch(
      setSelectedPetForAdoptionState({
        petName: selectedPetDetails.name,
        image: selectedPetDetails.images[0],
        breed: selectedPetDetails.breed,
        price: selectedPetDetails.price,
        shelterName: selectedPetDetails.shelter.name,
        shelterAddress: selectedPetDetails.shelter.address,
        shelterAvatar: selectedPetDetails.shelter.image,
      })
    );
    navigate(`/adoption-request/${selectedPetDetails.name}`, {
      state: { petId: petID },
    });
  };

  return (
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
        {!isLoadingPetDetails && selectedPetDetails ? (
          <>
            <DrawerHeader>
              <div className="pet__Details__header--container">
                <h1 className="pet__Details__header--title">
                  {selectedPetDetails.name}
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
                        src={selectedPetDetails.images[0]}
                        alt={selectedPetDetails.name}
                        className="pet__Details--img"
                      />
                    </GridItem>
                    <GridItem
                      borderRadius={5}
                      colSpan={1}
                      h={wide ? "200px" : ""}
                    >
                      <img
                        src={selectedPetDetails.images[1]}
                        alt={selectedPetDetails.name}
                        className="pet__Details--img"
                      />
                    </GridItem>
                    <GridItem
                      borderRadius={5}
                      colSpan={1}
                      h={wide ? "200px" : ""}
                    >
                      <img
                        src={selectedPetDetails.images[2]}
                        alt={selectedPetDetails.name}
                        className="pet__Details--img"
                      />
                    </GridItem>
                    <GridItem
                      borderRadius={5}
                      colSpan={2}
                      h={wide ? "200px" : ""}
                    >
                      <img
                        src={selectedPetDetails.images[0]}
                        alt={selectedPetDetails.name}
                        className="pet__Details--img"
                      />
                    </GridItem>
                  </Grid>
                </div>
              </section>
              <section className="pet__Details__container">
                <div className="pet__Details__container--shelter">
                  <Flex>
                    <Avatar src={selectedPetDetails?.shelter?.image} />
                    <Box ml="3">
                      <Text fontWeight="bold">
                        {selectedPetDetails?.shelter?.name}
                        <Badge
                          ml="1"
                          colorScheme={
                            selectedPetDetails?.shelter?.status === 1
                              ? "green"
                              : "red"
                          }
                        >
                          {selectedPetDetails?.shelter?.status === 1
                            ? "active"
                            : "not active "}
                        </Badge>
                      </Text>
                      <Text fontSize="sm">
                        {selectedPetDetails?.shelter?.address}
                      </Text>
                    </Box>
                  </Flex>
                  <div className="">
                    <Text fontSize="small">Adoption Price</Text>
                    <Text fontWeight="bold">£ {selectedPetDetails.price}</Text>
                  </div>
                </div>
                <div className="pet__Details__information--container">
                  <div className="pet__Details__information">
                    <div className="">
                      <Text fontSize="sm">Sex</Text>
                      {selectedPetDetails.gender === "female" ? (
                        <IoMdFemale size={20} />
                      ) : (
                        <IoMdMale size={20} />
                      )}
                    </div>
                    <div className="">
                      <Text fontSize="sm">Size</Text>
                      <Text fontWeight="bold">{selectedPetDetails.size}</Text>
                    </div>
                    <div className="">
                      <Text fontSize="sm">Age</Text>
                      <Text fontWeight="bold">{selectedPetDetails.age}</Text>
                    </div>
                  </div>
                  <div className="pet__Details__information">
                    <div className="">
                      <Text fontSize="sm">Breed</Text>
                      <Text fontWeight="bold">{selectedPetDetails.breed}</Text>
                    </div>
                    <div>
                      <Text fontSize="sm">Vaccine Status</Text>
                      <Badge
                        ml="1"
                        colorScheme={
                          selectedPetDetails.vaccineStatus === 1
                            ? "green"
                            : "red"
                        }
                      >
                        {selectedPetDetails.vaccineStatus === 1
                          ? "active"
                          : "not active "}
                      </Badge>
                    </div>
                  </div>

                  <h3>Description</h3>
                  <p>{selectedPetDetails.description}</p>
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
          </>
        ) : (
          <Stack p={50}>
            <Box padding="6" boxShadow="lg" bg="white">
              <SkeletonCircle size="10" />
              <SkeletonText
                mt="4"
                noOfLines={4}
                spacing="4"
                skeletonHeight="2"
              />
            </Box>
            <Box padding="6" boxShadow="lg" bg="white">
              <SkeletonCircle size="10" />
              <SkeletonText
                mt="4"
                noOfLines={4}
                spacing="4"
                skeletonHeight="2"
              />
            </Box>
            <Box padding="6" boxShadow="lg" bg="white">
              <SkeletonCircle size="10" />
              <SkeletonText
                mt="4"
                noOfLines={4}
                spacing="4"
                skeletonHeight="2"
              />
            </Box>
          </Stack>
        )}
      </DrawerContent>
    </Drawer>
  );
};

export default PetDetailsDrawer;
