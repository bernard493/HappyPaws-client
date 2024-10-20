import React, { useState } from "react";
import "./Hero.scss";
import SearchInput from "../SearchInput/SearchInput";
import { heroTexts } from "../../const/constant";
import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import TextAnimation from "../TextAnimation/TextAnimation";

const Hero = () => {
  const navigate = useNavigate();
  const [generateRandomIndex, setGenerateRandomIndex] = useState(0);
  const [searchInput, setSearchInput] = useState("");
  const [heroText, setHeroText] = useState(heroTexts);
  const [isDisabled, setIsDisabled] = useState(false);
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
    <div className="Hero">
      <section className="Hero__text--container">
        <h1 className="Hero__title">I am Pawsist, Your AI Assistance</h1>
        {/* <h2 className="Hero__text">{heroText[generateRandomIndex]}</h2> */}
        <TextAnimation text={heroText} />
        <div className="Hero__input__section--container">
          <div>
            <SearchInput
              isError={error}
              setIsError={setError}
              setValue={setSearchInput}
              placeholder="I'm Looking for a pet that’s great with..."
            />
          </div>
          <Button
            handleButtonClick={handleSearchNavigation}
            isDisabledState={isDisabled}
            notDisabledText={"Meet Your Pet Pall"}
            isDisabledText={"Finding Pet Pall..."}
          />
        </div>
      </section>
      <section className="Hero__blog--container">
        {/* <BlogCarousel blogs={successfulAdoptedPetsBlogPost} /> */}
      </section>
    </div>
  );
};

export default Hero;
