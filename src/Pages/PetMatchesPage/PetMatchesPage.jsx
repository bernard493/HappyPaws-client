import React, { useState, useEffect } from "react";
import "./PetMatchesPage.scss";
import { useLocation } from "react-router-dom";
import { useDisclosure } from "@chakra-ui/react";
import PetDetailsDrawer from "../../Components/PetDetailsDrawer/PetDetailsDrawer";
import SearchInput from "../../Components/SearchInput/SearchInput";
import Button from "../../Components/Button/Button";
import { heroTexts } from "../../const/constant";
import PetCard from "../../Components/PetCard/PetCard";
import ReactPaginate from "react-paginate";


// Demo Pets Imgs will be romoved later
import pet1img from "../../assets/demoIMGs/cat-8198720_1280.jpg";
import pet2img from "../../assets/demoIMGs/dog-7691238_1280.jpg";
import pet3img from "../../assets/demoIMGs/german-shorthaired-pointer-8655457_1280.jpg";
import Paginate from "../../Components/ReactPaginate/ReactPaginate";

const petsDemoDate = [
  {
    id: "13fwsqwfwf",
    name: "Pet1",
    age: 2,
    breed: "Breed1",
    gender: "Male",
    image: pet1img,
    favorite: true,
    size: "Small",
    description:
      "The longest word in any of the major English language dictionaries is pneumonoultramicroscopicsilicovolcanoconiosis, a word that refers to a lung disease",
  },
  {
    id: "13fwwwsqwfwf",
    name: "Pet1",
    age: 2,
    breed: "Breed1",
    gender: "Male",
    image: pet2img,
    favorite: true,
    size: "Small",
    description: "Pet1 is a cute pet",
  },
  {
    id: "jhv676t17g1",
    name: "Pet1",
    age: 2,
    breed: "Breed1",
    gender: "Male",
    image: pet3img,
    favorite: false,
    size: "Small",
    description: "Pet1 is a cute pet",
  },
  {
    id: "ih7iy87",
    name: "Pet1",
    age: 2,
    breed: "Breed1",
    image: pet1img,
    gender: "Male",
    favorite: true,
    size: "Small",
    description: "Pet1 is a cute pet",
  },
  {
    id: "786tgu7g7g",
    name: "Pet1",
    age: 2,
    breed: "Breed1",
    image: pet2img,
    gender: "Male",
    favorite: false,
    size: "Small",
    description: "Pet1 is a cute pet",
  },
];

const PetMatchesPage = () => {
  const location = useLocation();
  const [searchInput, setSearchInput] = useState("");
  const [heroText, setHeroText] = useState(heroTexts);
  const [isDisabled, setIsDisabled] = useState(false);
  const [allPets, setAllPets] = useState(petsDemoDate);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [error, setError] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [itemOffset, setItemOffset] = useState(0);
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

  // Paginate



  
  const endOffset = itemOffset + itemsPerPage;
  const currentPetItems = allPets.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(allPets.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % allPets.length;
    setItemOffset(newOffset);
  };



  return (
    <section>
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
        {currentPetItems.map((pet) => {
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
        <div className="PetMatches__petsCard--container__paginate">
          <Paginate handlePageClick={handlePageClick} pageCount={pageCount} />
        </div>

      {/* Display Selected Pet Details */}
      <PetDetailsDrawer isOpen={isOpen} onClose={onClose} btnRef={btnRef} />
    </section>
  );
};

export default PetMatchesPage;
