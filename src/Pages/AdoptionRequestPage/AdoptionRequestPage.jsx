import { Flex, Avatar, Box, Text, Badge } from "@chakra-ui/react";
import React from "react";
import "./AdoptionRequestPage.scss";
import { useLocation } from "react-router-dom";
import AdoptionForms from "../../Components/AdoptionForms/AdoptionForms";

const petDetails = {
  id: "13fwsqwfwf",
  name: "Pet1",
  age: 2,
  breed: "Breed1",
  gender: "Male",
  // image: [pet2img, img4, pet1img, pet2img],
  favorite: true,
  size: "Small",
  vaccineStatus: true,
  price: 202,
  shelter: {
    name: "Loves shelter",
    address: "Greater London, UK",
    image:
      "https://cdn.pixabay.com/photo/2023/12/04/17/24/evening-8429871_1280.jpg",
    status: true,
  },
  description:
    "The longest word in any of the major English language dictionaries is pneumonoultramicroscopicsilicovolcanoconiosis, a word that refers to a lung disease",
};

const AdoptionRequestPage = () => {
  const location = useLocation();
  const [pet, setPet] = React.useState({})
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
                src="https://cdn.pixabay.com/photo/2023/12/04/17/24/evening-8429871_1280.jpg"
                className="adoption__pet--image"
                alt={`${petDetails.name} name `}
              />
              <div className="adoption__pet__information--container">
                <div className="adoption__pet__information">
                  <div className="">
                    <Text fontSize="sm">Sex</Text>
                    <Text fontWeight="bold">{petDetails.name}</Text>
                  </div>

                  <div className="">
                    <Text fontSize="sm">Breed</Text>
                    <Text fontWeight="bold">{petDetails.breed}</Text>
                  </div>
                </div>
              </div>
            </div>
            <div className="adoption__pet--container--shelter">
              <Flex>
                <Avatar src="https://cdn.pixabay.com/photo/2023/12/04/17/24/evening-8429871_1280.jpg" />
                <Box ml="3">
                  <Text fontWeight="bold">{petDetails.shelter.name}</Text>
                  <Text fontSize="sm">{petDetails.shelter.address}</Text>
                </Box>
              </Flex>
              <div className="">
                <Text fontSize=""> Price</Text>
                <Text fontWeight="bold">£ {petDetails.price}</Text>
              </div>
            </div>
          </section>
        </div>
        <section className="adoption__form--container">
          <AdoptionForms price={petDetails.price} petId={petId} />
        </section>
      </div>
    </section>
  );
};

export default AdoptionRequestPage;
