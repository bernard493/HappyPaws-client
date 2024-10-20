import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Text,
  Button,
} from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";
import { DeleteUserProfile } from "../../API/User__Api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../CustomHooks/AuthProvider ";

const DeleteProfileModel = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = React.useRef(null);

  const handleProfileDelete = async () => {
    try {
      const { status } = await DeleteUserProfile();
      if (status === 200) {
        logout();
        navigate("/");
      } else if (status === 401) {
        navigate("/auth/login");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <MdDelete color="red" size={40} onClick={onOpen} />
      <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Text fontSize="lg" fontWeight="bold" color={"red"}>
              Delete Profile
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Are you sure you want to delete your profile?</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost" onClick={handleProfileDelete}>
              <Text color="red"> Delete Now</Text>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeleteProfileModel;
