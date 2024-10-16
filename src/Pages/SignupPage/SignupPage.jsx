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
  RadioGroup,
  Stack,
  Radio,
  useToast,
} from "@chakra-ui/react";
import { useAuth } from "../../CustomHooks/AuthProvider ";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { registerUser } from "../../API/User__Api";
import Button from "../../Components/Button/Button";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const [emailError, setEmailError] = useState("");
  const [roleError, setRoleError] = useState("");
  const [userNameError, setUserNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

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
  const validateUserName = () => {
    if (!userName) {
      setUserNameError("UserName is required");
      return false;
    }
    return true;
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

  const validateUserRole = () => {
    if (!role) {
      setRoleError("User Role is required");
      return false;
    } else {
      setRoleError("");
      return true;
    }
  };

  const validateConfirmPassword = () => {
    if (!confirmPassword) {
      setConfirmPasswordError("Confirm Password is required");
      return false;
    } else {
      setConfirmPasswordError("");
      return true;
    }
  };

  const validatePasswordAndConfirmPasswordAreSame = () => {
    if (password !== confirmPassword) {
      return false;
    }
    return true;
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    setIsDisabled(true);
    try {
      if (
        validateEmail() &&
        validatePassword() &&
        validatePasswordAndConfirmPasswordAreSame()
      ) {
        const { status, data } = await registerUser({
          email,
          password,
          username: userName,
          role,
        });
        const { message } = data;
        if (status === 201) {
          toast({
            position: "top-right",
            title: message,
            status: "success",
            isClosable: true,
          });
          navigate("/auth/login");
          setIsDisabled(false);
        }
        if (status === 400) {
          toast({
            position: "top-right",
            title: message,
            status: "info",
            isClosable: true,
          });
          setIsDisabled(false);
        }
      }
    } catch (error) {
      console.error(error);
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
          <Heading>Create New Account</Heading>
        </Box>
        <Box my={4} textAlign="left">
          <form onSubmit={handleSignUpSubmit}>
            <FormControl isInvalid={!!userNameError}>
              <FormLabel>User Name</FormLabel>
              <Input
                type="text"
                placeholder="John Doe"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                onBlur={validateUserName}
              />
              <FormErrorMessage>{userNameError}</FormErrorMessage>
            </FormControl>
            <FormControl mt={6}>
              <FormLabel>Role</FormLabel>
              <RadioGroup
                onChange={setRole}
                value={role}
                defaultValue="adopter"
                onBlur={validateUserRole}
              >
                <Stack spacing={5} direction="row">
                  <Radio colorScheme="green" value="adopter">
                    Adopter
                  </Radio>
                  <Radio colorScheme="green" value="shelter">
                    Shelter
                  </Radio>
                </Stack>
              </RadioGroup>

              <FormErrorMessage>{roleError}</FormErrorMessage>
            </FormControl>
            <FormControl mt={6} isInvalid={!!emailError}>
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
            <FormControl mt={6} isInvalid={!!confirmPasswordError}>
              <FormLabel>Confirm Password</FormLabel>
              <Input
                type="password"
                placeholder="********"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onBlur={validateConfirmPassword}
              />
              <FormErrorMessage>{confirmPasswordError}</FormErrorMessage>
            </FormControl>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                paddingTop: 20,
              }}
            >
              <Button
                handleButtonClick={handleSignUpSubmit}
                isDisabledState={isDisabled}
                notDisabledText={"Create Account"}
                isDisabledText={"Loading..."}
              />
            </div>
          </form>
          <Box textAlign="center" mt={4}>
            <Link to={"/auth/create-account"}>
              <Text>New HERE? Sing up Now</Text>
            </Link>
          </Box>
        </Box>
      </Box>
    </Flex>
  );
};

export default SignupPage;
