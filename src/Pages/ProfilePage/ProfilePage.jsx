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
  useToast,
} from "@chakra-ui/react";
import { CiLocationOn } from "react-icons/ci";
import EditProfileDrawer from "../../Components/EditProfileDrawer/EditProfileDrawer";
import RequestCard from "../../Components/RequestCard/RequestCard";
import { GetAllAdoptionRequest } from "../../API/Adoption-Request__Apis";
import { useSelector, useDispatch } from "react-redux";
import { GetUserProfile, UpdateUserProfile } from "../../API/User__Api";
import { setUserGlobalState } from "../../store/globalStateSlice";
import DeleteProfileModel from "../../Components/DeleteProfileModel/DeleteProfileModel";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const toast = useToast();
  const { user } = useSelector((state) => state.globalState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isDisabled] = useState(false);
  const [adoptionRequests, setAdoptionRequests] = useState([]);
  const [isUpdatingUser, setIsUpdatingUser] = useState(false);

  // Handle Drawer
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  useEffect(() => {
    if (Object.keys(user || {}).length === 0) {
      const fetchUserData = async () => {
        try {
          const { status, data } = await GetUserProfile();
          console.log("data", data);

          if (status === 200) {
            dispatch(setUserGlobalState(data));
          }
        } catch (error) {
          console.error("Failed to fetch user profile:", error); // Log errors for debugging
        }
      };
      fetchUserData();
    }
  }, [user, dispatch]);

  useEffect(() => {
    const getAllUserAdoptionRequest = async () => {
      try {
        const { status, data } = await GetAllAdoptionRequest();
        if (status === 200) {
          setAdoptionRequests(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getAllUserAdoptionRequest();
  }, []);

  const updateUserProfile = async (values) => {
    try {
      setIsUpdatingUser(true);
      const { status, data } = await UpdateUserProfile(values);
      const { message, data: newUserDate } = data;

      if (status === 200) {
        dispatch(setUserGlobalState(newUserDate));
        toast({
          position: "top-right",
          title: message,
          status: "success",
          isClosable: true,
        });
        onClose();
      } else if (status === 401) {
        navigate("/auth/login");
      } else if (status === 400) {
        toast({
          position: "top-right",
          title: message,
          status: "info",
          isClosable: true,
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsUpdatingUser(false);
    }
  };

  const handleEditProfile = () => {
    onOpen();
  };

  return (
    <>
      <section className="profile-page">
        <div className="profile-page__details">
          <div className="profile-page__details-information">
            <Avatar size="lg" name={user.username} src={user.avatar} />
            <div className="profile-page__details-name">
              <h2 className="profile-page__details-name-title">
                {user.username}
              </h2>
              <p className="profile-page__details-name-title">{user.email}</p>
              <div className="profile-page__details-location__container">
                <CiLocationOn />
                <p>location</p>
              </div>
            </div>
          </div>
          <div className="profile-page__CTA--container">
            <Button
              handleButtonClick={handleEditProfile}
              isDisabledState={isDisabled}
              notDisabledText={"Edit"}
              width={100}
            />
            <DeleteProfileModel />
          </div>
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
                {adoptionRequests.filter((eachRequest) => {
                  return (
                    eachRequest.orderStatus === "Pending" ||
                    eachRequest.orderStatus === "Approved"
                  );
                }).length > 0 ? (
                  adoptionRequests
                    .filter((eachRequest) => {
                      return (
                        eachRequest.orderStatus === "Pending" ||
                        eachRequest.orderStatus === "Approved"
                      );
                    })
                    .map((request) => (
                      <RequestCard key={request.id} request={request} />
                    ))
                ) : (
                  <Box textAlign="center" color="gray.500">
                    No active requests yet.
                  </Box>
                )}
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
                {adoptionRequests.filter((eachRequest) => {
                  return (
                    eachRequest.orderStatus === "Canceled" ||
                    eachRequest.orderStatus === "Completed"
                  );
                }).length > 0 ? (
                  adoptionRequests
                    .filter((eachRequest) => {
                      return (
                        eachRequest.orderStatus === "Canceled" ||
                        eachRequest.orderStatus === "Completed"
                      );
                    })
                    .map((request) => (
                      <RequestCard key={request.id} request={request} />
                    ))
                ) : (
                  <Box textAlign="center" color="gray.500">
                    No inactive requests yet.
                  </Box>
                )}
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
      <EditProfileDrawer
        isUpdatingUser={isUpdatingUser}
        user={user}
        updateUserProfile={updateUserProfile}
        isOpen={isOpen}
        btnRef={btnRef}
        onClose={onClose}
      />
    </>
  );
};

export default ProfilePage;
