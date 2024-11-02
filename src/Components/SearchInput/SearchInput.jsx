import React, { useState } from "react";
import "./SearchInput.scss";
import { SiMinds } from "react-icons/si";
import { FaArrowRight } from "react-icons/fa6";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";

const SearchInput = ({ placeholder,  setIsError }) => {
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [error, setError] = useState(false);


  const handleSearchNavigation = () => {
    // navigate to pets dashboard with searchInput
    if (!searchInput) return setError(true);
    setIsDisabled(true);
    const queryParams = encodeURIComponent(searchInput).toString();
    navigate(`/pet-matches?search=${queryParams}`);
    setIsDisabled(false);
  };

  return (
    <div className="searchInput__container">
      <div className="searchInput__container__text--container">
        <textarea
          onChange={(e) => setSearchInput(e.target.value)}
          className="input"
          type="text"
          placeholder={placeholder}
          onFocus={() => setIsError(false)}
          value={searchInput}
        />
       <Button
            handleButtonClick={handleSearchNavigation}
            isDisabledState={isDisabled}
            notDisabledText={<FaArrowRight/>}
            isDisabledText={<FaArrowRight/>}
            width={20}
          /> 
      </div>
      <div>
        <SiMinds color="white"/>
      </div>
    </div>
  );
};

export default SearchInput;
