import React, { useState } from "react";
import "./AdoptionForms.scss";
import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import Button from "../Button/Button";
import axios from "axios";
import { FaCheck } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { CreateAdoptionRequest } from "../../API/Adoption-Request__Apis";

const validate = (values) => {
  const errors = {};

  if (!values.offerPrice || values.offerPrice <= 0) {
    errors.offerPrice = "Offer Price must be greater than 0";
  }

  return errors;
};

const AdoptionForms = ({ price, petId }) => {
  const navigate = useNavigate();
  const toast = useToast();
  const [isDisabled, setIsDisabled] = useState(false);
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    offerPrice: 0,
    price: price,
    petId,
  });

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate(values);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsDisabled(true);

    try {
      const { status, data } = await CreateAdoptionRequest(values);
      const { message } = data;
      if (status === 201) {
        toast({
          title: "Request submitted ",
          description: message,
          status: "success",
          duration: 9000,
          isClosable: true,
          position: "top-right",
        });
        navigate("/profile");
      }
      if (status === 400 || status === 500) {
        toast({
          title: "Error",
          description: message,
          status: "warning",
          duration: 9000,
          isClosable: true,
          position: "top-right",
        });
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
      // Handle error response
    } finally {
      setIsDisabled(false);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h3>Adoption Request Form</h3>

      <div>
        <label htmlFor="offerPrice">Make an Offer</label>
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            color="gray.300"
            fontSize="1.2em"
          >
            £
          </InputLeftElement>
          <Input
            name="offerPrice"
            placeholder="Offer Price"
            type="number"
            onChange={(e) =>
              setValues({ ...values, offerPrice: parseFloat(e.target.value) })
            }
            value={values.offerPrice}
          />
          <InputRightElement>
            <FaCheck color="green.500" />
          </InputRightElement>
        </InputGroup>
        {errors.offerPrice && <div className="error">{errors.offerPrice}</div>}
      </div>

      <Button
        handleButtonClick={handleSubmit}
        isDisabledState={isDisabled}
        notDisabledText={"Make offer"}
        isDisabledText={"Submitting..."}
      />
    </form>
  );
};

export default AdoptionForms;
