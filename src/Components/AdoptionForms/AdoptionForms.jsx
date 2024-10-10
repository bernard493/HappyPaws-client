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

const validate = (values) => {
  const errors = {};

  if (!values.firstName.trim()) {
    errors.firstName = "First Name is required";
  }
  if (!values.lastName.trim()) {
    errors.lastName = "Last Name is required";
  }

  if (!values.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.phoneNumber.trim()) {
    errors.phoneNumber = "Phone number is required";
  }

  if (!values.address.trim()) {
    errors.address = "Address is required";
  }

  if (!values.offerPrice || values.offerPrice <= 0) {
    errors.offerPrice = "Offer Price must be greater than 0";
  }

  return errors;
};

const AdoptionForms = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    offerPrice: 0,
    address: "",
    phoneNumber: "",
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
      //  Api call with values
      //   console.log("Form submitted successfully:", response.data);
      // You can handle the success message or redirect the user here
      console.log('values',values);
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
      <div className="form__information--container">
        <div>
          <label htmlFor="firstName">First Name</label>
          <Input
            name="firstName"
            placeholder="First Name"
            onChange={(e) =>
              setValues({ ...values, firstName: e.target.value })
            }
            value={values.firstName}
          />
          {errors.firstName && <div className="error">{errors.firstName}</div>}
        </div>

        <div>
          <label htmlFor="lastName">Last Name</label>
          <Input
            name="lastName"
            placeholder="Last Name"
            onChange={(e) => setValues({ ...values, lastName: e.target.value })}
            value={values.lastName}
          />
          {errors.lastName && <div className="error">{errors.lastName}</div>}
        </div>
      </div>

      <div>
        <label htmlFor="email">Email Address</label>
        <Input
          name="email"
          placeholder="Email Address"
          onChange={(e) => setValues({ ...values, email: e.target.value })}
          value={values.email}
        />
        {errors.email && <div className="error">{errors.email}</div>}
      </div>

      <div>
        <label htmlFor="phoneNumber">Phone Number</label>
        <Input
          name="phoneNumber"
          placeholder="Phone Number"
          onChange={(e) =>
            setValues({ ...values, phoneNumber: e.target.value })
          }
          value={values.phoneNumber}
        />
        {errors.phoneNumber && (
          <div className="error">{errors.phoneNumber}</div>
        )}
      </div>

      <div>
        <label htmlFor="address">Address</label>
        <Input
          name="address"
          placeholder="Address"
          onChange={(e) => setValues({ ...values, address: e.target.value })}
          value={values.address}
        />
        {errors.address && <div className="error">{errors.address}</div>}
      </div>

      <div>
        <label htmlFor="offerPrice">Offer Price</label>
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
