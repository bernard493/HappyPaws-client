import React, { useRef, useState } from "react";
import "./ProfilePage.scss";
import Button from "../../Components/Button/Button";
import {
  Avatar,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  useDisclosure,
} from "@chakra-ui/react";
import { CiLocationOn } from "react-icons/ci";
import EditProfileDrawer from "../../Components/EditProfileDrawer/EditProfileDrawer";
import RequestCard from "../../Components/RequestCard/RequestCard";

const adoptionRequests = [
  {
    id: "13fwsqwfwf",
    name: "Pet1",
    orderNumber: 223,
    price: 202,
    offerPrice: 299,
    shelter: {
      id: "6f5r65r6776t67",
      name: "Loves shelter",
    },
    orderStatus: "Pending", // Canceled , Approved , Completed
  },
  {
    id: "13fwsqwfwf",
    name: "Pet1",
    orderNumber: 223,
    price: 202,
    offerPrice: 299,
    shelter: {
      id: "6f5r65r6776t67",
      name: "Loves shelter",
    },
    orderStatus: "Approved",
  },
  {
    id: "13fwsqwfwf",
    name: "Pet1",
    orderNumber: 223,
    price: 202,
    offerPrice: 299,
    shelter: {
      id: "6f5r65r6776t67",
      name: "Loves shelter",
    },
    orderStatus: "Canceled",
  },
  {
    id: "13fwsqwfwf",
    name: "Scooby",
    orderNumber: 223,
    price: 202,
    offerPrice: 299,
    shelter: {
      id: "6f5r65r6776t67",
      name: "Loves shelter",
    },
    orderStatus: "Completed",
  },
];

const ProfilePage = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  const handleEditProfile = () => {
    // setIsDisabled(!isDisabled);
    onOpen();
  };

  return (
    <>
      <section className="profile-page">
        <div className="profile-page__details">
          <div className="profile-page__details-information">
            <Avatar
              size="lg"
              name="Kent Dodds"
              src="https://bit.ly/kent-c-dodds"
            />
            <div className="profile-page__details-name">
              <h2 className="profile-page__details-name-title">Kent Dodds</h2>
              <div className="profile-page__details-location__container">
                <CiLocationOn />
                <p>location</p>
              </div>
            </div>
          </div>
          <Button
            handleButtonClick={handleEditProfile}
            isDisabledState={isDisabled}
            notDisabledText={"Edit Profile"}
            isDisabledText={"Edit Profile"}
          />
        </div>

        <div className="adoption-request__container">
          <h2 className="adoption-request__container--title">
            Adoption Requests
          </h2>
          <Accordion  allowMultiples>
            <AccordionItem>
              <h2>
                <AccordionButton _expanded={{ bg: 'black', color: 'white' }}>
                  <Box as="span" flex="1" textAlign="left">
                    Active Requests
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                {adoptionRequests
                  .filter((eachRequest) => {
                    return (
                      eachRequest.orderStatus === "Pending" ||
                      eachRequest.orderStatus === "Approved"
                    );
                  })
                  .map((request) => {
                    return <RequestCard key={request.id} request={request} />;
                  })}
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <h2>
                <AccordionButton _expanded={{ bg: 'black', color: 'white' }}>
                  <Box as="span" flex="1" textAlign="left">
                    Inactive Requests
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                {adoptionRequests
                  .filter((eachRequest) => {
                    return (
                      eachRequest.orderStatus === "Canceled" ||
                      eachRequest.orderStatus === "Completed"
                    );
                  })
                  .map((request) => {
                    return <RequestCard key={request.id} request={request} />;
                  })}
              </AccordionPanel>
            </AccordionItem> 
          </Accordion>
        </div>
      </section>
      <EditProfileDrawer isOpen={isOpen} btnRef={btnRef} onClose={onClose} />
    </>
  );
};

export default ProfilePage;
