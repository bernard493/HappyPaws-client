import React, { useState, useEffect, useRef, useCallback } from "react";
import "./PetMatchesPage.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { useDisclosure, useToast } from "@chakra-ui/react";
import PetDetailsDrawer from "../../Components/PetDetailsDrawer/PetDetailsDrawer";
import SearchInput from "../../Components/SearchInput/SearchInput";
import PetCard from "../../Components/PetCard/PetCard";
import Paginate from "../../Components/ReactPaginate/ReactPaginate";
import { generatePetRecommendations } from "../../API/Search__Api";
import LottieSpinner from "../../Components/LottieSpinner/LottieSpinner";
import loadingLottie from "../../assets/lottie/Animation - 1729377053863.json";
import TextAnimation from "../../Components/TextAnimation/TextAnimation";

const PetMatchesPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const btnRef = useRef();
  const toast = useToast();
  const queryParams = new URLSearchParams(location.search);
  const userSearchInput = decodeURIComponent(queryParams.get("search"));
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [allPets, setAllPets] = useState([]);
  const [itemsPerPage] = useState(20);
  const [itemOffset, setItemOffset] = useState(0);
  const [selectedPetID, setSelectedPetID] = useState("");
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
  const getPetsRecommendations = useCallback(
    async (searchValue) => {
      try {
        setIsLoadingPetRecommendations(true);
        const { status, data } = await generatePetRecommendations(searchValue);
        if (status === 200) {
          setAllPets(data.results);
        } else if (status === 401) {
          navigate("/auth/login");
        }
      } catch (error) {
        toast({
          position: "top-right",
          title: "Failed to get Recommendations Try again later ",
          status: "info",
          isClosable: true,
        });
      } finally {
        setIsLoadingPetRecommendations(false);
      }
    },
    [navigate, toast]
  );

  useEffect(() => {
    getPetsRecommendations(userSearchInput);
  }, [userSearchInput, getPetsRecommendations]);

  //   get get selected pet and open drawer
  const handleOpenPetDetailsDrawer = (petId) => {
    setSelectedPetID(petId);
    onOpen();
  };

  

  return (
    <section className="PetMatches">
      {!isLoadingPetRecommendations ? (
        <>
          <section className="PetMatches__form--container">
            <h1>Want to be more specific </h1>
            <div className="PetMatches__form">
              <div className="PetMatches__form__input--container">
                <SearchInput placeholder="Enter details like breed, age, size, or any specific preferences you have." />
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

      {/* Conditionally render PetDetailsDrawer only when isOpen is true */}
      {isOpen && (
        <PetDetailsDrawer
          isOpen={isOpen}
          onClose={onClose}
          btnRef={btnRef}
          petID={selectedPetID}
        />
      )}
    </section>
  );
};

export default PetMatchesPage;
