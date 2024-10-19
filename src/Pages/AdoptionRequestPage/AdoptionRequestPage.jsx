import { Flex, Avatar, Box, Text, Badge } from "@chakra-ui/react";
import React from "react";
import "./AdoptionRequestPage.scss";
import { useLocation } from "react-router-dom";
import AdoptionForms from "../../Components/AdoptionForms/AdoptionForms";
import { useSelector } from "react-redux";



const AdoptionRequestPage = () => {
  const { selectedPetForAdoption } = useSelector((state) => state.globalState);
  const location = useLocation();
  const [pet, setPet] = React.useState({});
  const { petId } = location.state;


  return (
    <section className="adoption-request-page">
      <h2 className="adoption-request-page__header-text">
        You're About to Change a Life And Gain a Friend for Life!
      </h2>
      <div className="adoption__container">
        <div>
          <section className="adoption__pet--container">
            <div className="">
              <img
                src={selectedPetForAdoption.image}
                className="adoption__pet--image"
                alt={`${selectedPetForAdoption.petName} name `}
              />
              <div className="adoption__pet__information--container">
                <div className="adoption__pet__information">
                  <div className="">
                    <Text fontSize="sm">Pet Name</Text>
                    <Text fontWeight="bold">{selectedPetForAdoption.petName}</Text>
                  </div>

                  <div className="">
                    <Text fontSize="sm">Breed</Text>
                    <Text fontWeight="bold">
                      {selectedPetForAdoption.breed}
                    </Text>
                  </div>
                </div>
              </div>
            </div>
            <div className="adoption__pet--container--shelter">
              <Flex>
                <Avatar src={selectedPetForAdoption.shelterAvatar} />
                <Box ml="3">
                  <Text fontWeight="bold">
                    {selectedPetForAdoption.shelterName}
                  </Text>
                  <Text fontSize="sm">
                    {selectedPetForAdoption.shelterAddress}
                  </Text>
                </Box>
              </Flex>
              <div className="">
                <Text fontSize=""> Price</Text>
                <Text fontWeight="bold">£ {selectedPetForAdoption.price}</Text>
              </div>
            </div>
          </section>
        </div>
        <section className="adoption__form--container">
          <AdoptionForms price={selectedPetForAdoption.price} petId={petId} />
        </section>
      </div>
    </section>
  );
};

export default AdoptionRequestPage;
