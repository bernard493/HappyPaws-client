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
  Select,
} from "@chakra-ui/react";
import { useAuth } from "../../CustomHooks/AuthProvider ";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { registerUser } from "../../API/User__Api";

const SignupPage = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const [emailError, setEmailError] = useState("");
  const [roleError, setRoleError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const navigate = useNavigate();

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
  const validateUsername = () => {
    if (!username) {
      setUsernameError("Username is required");
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
    if (
      validateEmail() &&
      validatePassword() &&
      validatePasswordAndConfirmPasswordAreSame()
    ) {
      const { status } = await registerUser({
        email,
        password,
        username,
        role,
      });
      if (status === 201) {
        navigate("/auth/login");
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
          <Heading>Create New Account</Heading>
        </Box>
        <Box my={4} textAlign="left">
          <form onSubmit={handleSignUpSubmit}>
            <FormControl isInvalid={!!usernameError}>
              <FormLabel>User Name</FormLabel>
              <Input
                type="text"
                placeholder="John Doe"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onBlur={validateUsername}
              />
              <FormErrorMessage>{emailError}</FormErrorMessage>
            </FormControl>
            <FormControl mt={6}>
              <FormLabel>Role</FormLabel>
              <Select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                onBlur={validateUserRole}
                // placeholder="Select option"
                defaultValue={"Adopter"}
              >
                <option value="adopter">Adopter</option>
                {/* <option value="shelter">Shelter</option> */}
              </Select>
              {/* <FormErrorMessage>{roleError}</FormErrorMessage> */}
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
            <Button
              width="full"
              mt={4}
              colorScheme="teal"
              type="submit"
              onClick={handleSignUpSubmit}
            >
              Create Account
            </Button>
            {/* <Button
              handleButtonClick={handleSignUpSubmit}
              isDisabledState={isDisabled}
              notDisabledText={"Make offer"}
              isDisabledText={"Submitting..."}
            /> */}
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
