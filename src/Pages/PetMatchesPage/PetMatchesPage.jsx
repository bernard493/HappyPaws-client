import React, { useState, useEffect } from "react";
import "./PetMatchesPage.scss";
import {  useLocation, useNavigate } from "react-router-dom";
import { useDisclosure } from "@chakra-ui/react";
import PetDetailsDrawer from "../../Components/PetDetailsDrawer/PetDetailsDrawer";
import SearchInput from "../../Components/SearchInput/SearchInput";
import Button from "../../Components/Button/Button";
import PetCard from "../../Components/PetCard/PetCard";
import Paginate from "../../Components/ReactPaginate/ReactPaginate";
import { generatePetRecommendations } from "../../API/Search__Api";
import { getPetDetailsById } from "../../API/Pets__Api";
import LottieSpinner from "../../Components/LottieSpinner/LottieSpinner";
import loadingLottie from "../../assets/lottie/Animation - 1729377053863.json";
import TextAnimation from "../../Components/TextAnimation/TextAnimation";

const PetMatchesPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const btnRef = React.useRef();
  const queryParams = new URLSearchParams(location.search);
  const userSearchInput = decodeURIComponent(queryParams.get("search"));
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchInput, setSearchInput] = useState("");
  const [isDisabled] = useState(false);
  const [allPets, setAllPets] = useState([]);
  const [itemsPerPage] = useState(20);
  const [error, setError] = useState(false);
  const [itemOffset, setItemOffset] = useState(0);
  const [selectedPetDetails, setSelectedPetDetails] = useState(null);
  const [isLoadingPetDetails, setIsLoadingPetDetails] = useState(false);
  const [isLoadingPetRecommendations, setIsLoadingPetRecommendations] =
    useState(false);

  // Pagenate
  const endOffset = itemOffset + itemsPerPage;
  const currentPetItems = allPets.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(allPets.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % allPets.length;
    setItemOffset(newOffset);
  };
  // // API Call to get pet details
  const getPetsRecommendations = async (searchValue) => {
    try {
      setIsLoadingPetRecommendations(true);
      const { status, data } = await generatePetRecommendations(searchValue);
      if (status === 200) {
        setAllPets(data.results);
        setIsLoadingPetDetails(false);
      } else if (status === 401) {
        navigate("/auth/login");
      }
    } catch (error) {
      console.log("Error fetching pet Recommendation");
    } finally {
      setIsLoadingPetRecommendations(false);
    }
  };

  useEffect(() => {
    getPetsRecommendations(userSearchInput);
  }, [userSearchInput]);

  const fetchPetDetails = async (petId) => {
    try {
      setIsLoadingPetDetails(true);
      const { status, data } = await getPetDetailsById(petId);
      if (status === 200) {
        setSelectedPetDetails(data);
      }
    } catch {
      console.log("Error fetching pet details");
    } finally {
      setIsLoadingPetDetails(false);
    }
  };

  //   get get selected pet and open drawer
  const handleOpenPetDetailsDrawer = (petId) => {
    fetchPetDetails(petId);
    onOpen();
  };

  const handleSearchNewSearchRequest = () => {
    if (!searchInput) return setError(true);
    // Make Api call with new search input
    getPetsRecommendations(searchInput);
  };

  return (
    <section className="PetMatches">
        {!isLoadingPetRecommendations ? (
        <>
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
          <div className="PetMatches__form--container__mobile">
            <Button
              handleButtonClick={handleSearchNewSearchRequest}
              isDisabledState={isDisabled}
              notDisabledText={"Meet Your Pet Pall"}
              isDisabledText={"Finding Pet Pall..."}
            />
          </div>
          <div className="PetMatches__form--container__tablet">
            <Button
              handleButtonClick={handleSearchNewSearchRequest}
              isDisabledState={isDisabled}
              notDisabledText={"Meet Your Pet Pall"}
              isDisabledText={"Finding Pet Pall..."}
              width={200}
            />
          </div>
        </div>
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
        </>
      ) : (
        <section className="PetMatches__loading--container">
          <div className="PetMatches__petsCard--container__loading__spinner">
            <TextAnimation
              text={[
                "🎉 Finding your new best friend... just a moment! 🐾",
                1000,
                "🎉 Hold on, we’re sniffing out your ideal pet! 🐾",
                1000,
                "🎉 We’re barking up the right tree! Your perfect pet is on the way.. 🐾",
                1000,
                "🎉 Get ready to meet your new fur-ever friend! We’re almost there... 🐾",
                1000,
                "🎉 Hold tight! We're fetching the cutest companions for you... 🐾",
                1000,
              ]}
            />
            <LottieSpinner LottieFile={loadingLottie} />
          </div>
        </section>
      )}

      {/* Display Selected Pet Details */}
      <PetDetailsDrawer
        isOpen={isOpen}
        onClose={onClose}
        btnRef={btnRef}
        petDetails={selectedPetDetails}
        isLoading={isLoadingPetDetails}
      />
    </section>
  );
};

export default PetMatchesPage;
