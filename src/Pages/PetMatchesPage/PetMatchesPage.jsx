import React, { useState, useEffect } from "react";
import "./PetMatchesPage.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { useDisclosure } from "@chakra-ui/react";
import PetDetailsDrawer from "../../Components/PetDetailsDrawer/PetDetailsDrawer";
import SearchInput from "../../Components/SearchInput/SearchInput";
import Button from "../../Components/Button/Button";
import { heroTexts, petsDemoDate } from "../../const/constant";
import PetCard from "../../Components/PetCard/PetCard";
import Paginate from "../../Components/ReactPaginate/ReactPaginate";
import { generatePetRecommendations } from "../../API/Search__Api";
import { getPetDetailsById } from "../../API/Pets__Api";
import { useAuth } from "../../CustomHooks/AuthProvider ";

const PetMatchesPage = () => {
  const { isTokenExpired } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const btnRef = React.useRef();
  const queryParams = new URLSearchParams(location.search);
  const userSearchInput = decodeURIComponent(queryParams.get("search"));
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [searchInput, setSearchInput] = useState("");
  const [heroText, setHeroText] = useState(heroTexts);
  const [isDisabled, setIsDisabled] = useState(false);
  const [allPets, setAllPets] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [error, setError] = useState(false);
  const [itemOffset, setItemOffset] = useState(0);
  const [selectedPetDetails, setSelectedPetDetails] = useState(null);
  const [isLoadingPetDetails, setIsLoadingPetDetails] = useState(false);

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
  useEffect(() => {
    if (!isTokenExpired) {
      const getPetsRecommendations = async () => {
        const { status, data } = await generatePetRecommendations(
          userSearchInput
        );
        if (status === 200) {
          setAllPets(data.results);
          setIsLoadingPetDetails(false);
        }
      };
      getPetsRecommendations();
    } else {
      navigate("/auth/login");
    }
  }, [userSearchInput]);

  const fetchPetDetails = async (petId) => {
    try {
      setIsLoadingPetDetails(true);
      const { status, data } = await getPetDetailsById(petId);
      setSelectedPetDetails(data);
    } catch {
      console.log("Error fetching pet details");
    } finally {
      setIsLoadingPetDetails(false);
    }
  };

  //   get get selected pet and open drawer
  const handleOpenPetDetailsDrawer = (petId) => {
    console.log("hello open drawr", petId);
    onOpen();
    fetchPetDetails(petId);
  };

  const handleSearchNewSearchRequest = () => {
    if (!searchInput) return setError(true);
    setIsDisabled(true);
    // Make Api call with new search input
    setIsDisabled(false);
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
            handleButtonClick={handleSearchNewSearchRequest}
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
