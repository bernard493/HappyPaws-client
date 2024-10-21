import React, { useState } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Box,
  FormLabel,
  Input,
  FormControl,
  useToast,
} from "@chakra-ui/react";
import Button from "../Button/Button";
import { useAuth } from "../../CustomHooks/AuthProvider ";
import { useNavigate } from "react-router-dom";
const EditProfileDrawer = ({
  isOpen,
  btnRef,
  onClose,
  updateUserProfile,
  user,
  isUpdatingUser,
}) => {
  const { isTokenExpired } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();
  const [username, setUserName] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [role, setRole] = useState(user.role);
  let debounceTimer;

  const handleProfileUpdateSubmit = () => {
    // check if user input is diffrent from older user information before update
    if (isTokenExpired) {
      navigate("/auth/login");
    }
    if (
      username !== user.username ||
      email !== user.email ||
      role !== user.role
    ) {
      if (username && email && role) {
        // Clear old debounceTimer
        clearTimeout(debounceTimer);
        // Set new debounceTimer
        debounceTimer = setTimeout(() => {
          updateUserProfile({
            username,
            email,
            role,
          });
        }, 300);
      } else {
        toast({
          position: "top-right",
          title: "All Details are  required",
          status: "info",
          isClosable: true,
        });
      }
    }
  };

  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      finalFocusRef={btnRef}
      size={"lg"}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Update Your Details</DrawerHeader>

        <DrawerBody>
          <Box>
            <Box my={4}>
              <FormControl>
                <FormLabel>User Name</FormLabel>
                <Input
                  type="text"
                  placeholder="John Doe"
                  value={username}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </FormControl>

              <FormControl mt={6}>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  placeholder="john.doe@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <FormControl mt={6}>
                <FormLabel>User Role</FormLabel>
                <Input
                  type="text"
                  placeholder="Role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  disabled
                />
              </FormControl>
            </Box>
          </Box>
        </DrawerBody>

        <DrawerFooter>
          <Button
            handleButtonClick={handleProfileUpdateSubmit}
            isDisabledState={isUpdatingUser}
            notDisabledText={"Save"}
            isDisabledText={"Saving..."}
          />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default EditProfileDrawer;
