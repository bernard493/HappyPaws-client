import React, { useEffect, useRef, useState } from "react";
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
import { GetAllAdoptionRequest } from "../../API/Adoption-Request__Apis";

const ProfilePage = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [adoptionRequests, setAdoptionRequests] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  useEffect(() => {
    const getAllUserAdoptionRequest = async () => {
      const { status, data } = await GetAllAdoptionRequest();
      console.log("data", data);
      if (status === 200) {
        setAdoptionRequests(data);
      }
    };
    getAllUserAdoptionRequest();
  }, []);

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
          <Accordion defaultIndex={[0]} allowMultiple>
            <AccordionItem>
              <h2>
                <AccordionButton _expanded={{ bg: "black", color: "white" }}>
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
                <AccordionButton _expanded={{ bg: "black", color: "white" }}>
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
