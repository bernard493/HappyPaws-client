import React, { useState } from "react";
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Heading,
  FormErrorMessage,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useAuth } from "../../CustomHooks/AuthProvider ";
import { useNavigate, useLocation } from "react-router-dom";
import { userLogin } from "../../API/User__Api";
import Button from "../../Components/Button/Button";

const LoginPage = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();
  const redirectToAfterAuth = location.state?.from || "/";


  const validateEmail = () => {
    if (!email) {
      setEmailError("Email is required");
      return false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Invalid email format");
      return false;
    } else {
      setEmailError("");
      return true;
    }
  };

  const validatePassword = () => {
    if (!password) {
      setPasswordError("Password is required");
      return false;
    } else {
      setPasswordError("");
      return true;
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsDisabled(true);
      if (validateEmail() && validatePassword()) {
        const { status, data } = await userLogin({
          email,
          password,
        });

        if (status === 200) {
          const { token, message } = data;
          login(token);

          toast({
            position: "top-right",
            title: message,
            status: "success",
            isClosable: true,
          });

          // Navigate back to original page (or home if not available)
          const redirectTo = sessionStorage.getItem("redirectTo");
          navigate(redirectTo || redirectToAfterAuth);
          sessionStorage.removeItem("redirectTo"); // Optionally remove the item once used
        } else if (status === 401) {
          const { message } = data;
          toast({
            position: "top-right",
            title: message,
            status: "info",
            isClosable: true,
          });
        } else if (status === 500) {
          toast({
            position: "top-right",
            title: "Can't login now. Try again later.",
            status: "info",
            isClosable: true,
          });
        }
      }
    } catch (error) {
      toast({
        position: "top-right",
        title: "Something went wrong, please try again.",
        status: "error",
        isClosable: true,
      });
    } finally {
      setIsDisabled(false);
    }
  };

  const navigateToSignUp = () => {
    sessionStorage.setItem("redirectTo", redirectToAfterAuth);
    navigate("/auth/create-account");
  };

  return (
    <Flex minH={"70vh"} align={"center"} justify={"center"}>
      <Box
        borderWidth={1}
        px={4}
        width="md"
        borderRadius={8}
        boxShadow="lg"
        p={8}
      >
        <Box textAlign="center">
          <Heading>Login</Heading>
        </Box>
        <Box my={4} textAlign="left">
          <form onSubmit={handleLoginSubmit}>
            <FormControl isInvalid={!!emailError}>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                placeholder="john.doe@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={validateEmail}
              />
              <FormErrorMessage>{emailError}</FormErrorMessage>
            </FormControl>
            <FormControl mt={6} isInvalid={!!passwordError}>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={validatePassword}
              />
              <FormErrorMessage>{passwordError}</FormErrorMessage>
            </FormControl>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                paddingTop: 20,
              }}
            >
              <Button
                handleButtonClick={handleLoginSubmit}
                isDisabledState={isDisabled}
                notDisabledText={"Login"}
                isDisabledText={"Loading..."}
              />
            </div>
          </form>
          <Box textAlign="center" mt={4}>
            <Text onClick={navigateToSignUp}>New HERE? Sing up Now</Text>
          </Box>
        </Box>
      </Box>
    </Flex>
  );
};

export default LoginPage;
