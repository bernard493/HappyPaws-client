import React, { useState, useEffect } from "react";
import "./PetMatchesPage.scss";
import { useLocation } from "react-router-dom";
import { useDisclosure } from "@chakra-ui/react";
import PetDetailsDrawer from "../../Components/PetDetailsDrawer/PetDetailsDrawer";
import SearchInput from "../../Components/SearchInput/SearchInput";
import Button from "../../Components/Button/Button";
import { heroTexts } from "../../const/constant";
import PetCard from "../../Components/PetCard/PetCard";

// Demo Pets Imgs will be romoved later
import pet1img from "../../assets/demoIMGs/cat-8198720_1280.jpg";
import pet2img from "../../assets/demoIMGs/dog-7691238_1280.jpg";
import pet3img from "../../assets/demoIMGs/german-shorthaired-pointer-8655457_1280.jpg";

const petsDemoDate = [
  {
    id: "13fwsqwfwf",
    name: "Pet1",
    age: 2,
    breed: "Breed1",
    image: pet1img,
    favorite: true
  },
  {
    id: "13fwwwsqwfwf",
    name: "Pet1",
    age: 2,
    breed: "Breed1",
    image: pet2img,
    favorite: true
  },
  {
    id: "jhv676t17g1",
    name: "Pet1",
    age: 2,
    breed: "Breed1",
    image: pet3img,
    favorite: false
  },
  {
    id: "ih7iy87",
    name: "Pet1",
    age: 2,
    breed: "Breed1",
    image: pet1img,
    favorite: true
  },
  {
    id: "786tgu7g7g",
    name: "Pet1",
    age: 2,
    breed: "Breed1",
    image: pet2img,
    favorite: false
  },
];

const PetMatchesPage = () => {
  const location = useLocation();
  const [searchInput, setSearchInput] = useState("");
  const [heroText, setHeroText] = useState(heroTexts);
  const [isDisabled, setIsDisabled] = useState(false);
  const [allPets, setAllPets] = useState(petsDemoDate);
  const [error, setError] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  //   pass ref to handleOpenPetDetailsDrawer BTN
  const btnRef = React.useRef();
  const queryParams = new URLSearchParams(location.search);
  const userInput = decodeURIComponent(queryParams.get("search"));

  //   get get selected pet and open drawer
  const handleOpenPetDetailsDrawer = (petId) => {
    onOpen();
    console.log("pet id ", petId);
  };

  const handleSearchNavigation = () => {
    // navigate to pets dashboard with searchInput
    if (!searchInput) return setError(true);
    setIsDisabled(true);
    // Make Api call with new search input
    setIsDisabled(false);
  };

  return (
    <section>
      {/* <p>{userInput}</p> */}
      <section className="PetMatches__form--container">
        <h1>Want to be more specific </h1>
        <div className="PetMatches__form">
          <div className="PetMatches__form__input--container">
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

        <p>🎉 Here are your perfect pet matches! 🐾</p>
      </section>
      <section className="PetMatches__petsCard--container">
        {allPets.map((pet) => {
          return (
            <PetCard
              key={pet.id}
              petId={pet.id}
              pet={pet}
              onOpen={handleOpenPetDetailsDrawer}
            />
          );
        })}
      </section>

      {/* Display Selected Pet Details */}
      <PetDetailsDrawer isOpen={isOpen} onClose={onClose} btnRef={btnRef} />
    </section>
  );
};

export default PetMatchesPage;
