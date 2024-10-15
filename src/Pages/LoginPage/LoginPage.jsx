import React, { useState } from "react";
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
  FormErrorMessage,
  Text,
} from "@chakra-ui/react";
import { useAuth } from "../../CustomHooks/AuthProvider ";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { userLogin } from "../../API/User__Api";
// import Button from "../../Components/Button/Button";

const LoginPage = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/home"; // Fallback to /home if no path is stored

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
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateEmail() && validatePassword()) {
      const { status, data } = await userLogin({
        email,
        password,
      });
      if (status === 200) {
        const { token } = data;
        login(token);
        // After successful login, navigate back to the original path with query parameters
        navigate(from, { replace: true });
      }
    }
  };

  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"}>
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
          <form onSubmit={handleSubmit}>
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
            <Button
              width="full"
              mt={4}
              colorScheme="teal"
              type="submit"
              onClick={handleSubmit}
            >
              Login
            </Button>
            {/* <Button
              handleButtonClick={handleSubmit}
              isDisabledState={isDisabled}
              notDisabledText={"Make offer"}
              isDisabledText={"Submitting..."}
            /> */}
          </form>
          <Box textAlign="center" mt={4}>
            <Link to={"/auth/create-account"} >
              <Text>New HERE? Sing up Now</Text>
            </Link>
          </Box>
        </Box>
      </Box>
    </Flex>
  );
};

export default LoginPage;
