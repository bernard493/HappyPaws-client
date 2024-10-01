import React, { useState } from "react";
import "./Hero.scss";
import SearchInput from "../SearchInput/SearchInput";
import BlogCarousel from "../BlogCarousel/BlogCarousel";
import { successfulAdoptedPetsBlogPost } from "../../const/constant";

const heroTexts = [
  "Find Your Perfect Pet Companion! Start your journey towards finding a new furry friend today!",
  "Adopt a Pet, Change a Life! Search through thousands of adoptable pets looking for a loving home.",
  "Your New Best Friend is Just a Click Away! ",
  "Bringing Pets and Families Together! Discover pets in need of loving homes.",
  " Create Lasting Memories! Start a search for adoptable pets  today.",
];

const Hero = () => {
  const [generateRandomIndex, setGenerateRandomIndex] = useState(0);
  const [searchInput, setSearchInput] = useState("");

  const handleSearchNavigation = () => {};

  return (
    <div className="Hero">
      <section className="Hero__text--container">
        <h1 className="Hero__title">
          I am Pawsist, here to help you find the perfect pet
        </h1>
        <h2 className="Hero__text">{heroTexts[generateRandomIndex]}</h2>
        <div className="Hero__input__section--container">
          <SearchInput
            setValue={setSearchInput}
            placeholder="Looking for a pet that’s great with..."
          />
          <button
            onClick={handleSearchNavigation}
            className="Hero__input--btn "
          >
            Meet Your Match
          </button>
        </div>
      </section>
      <section className="Hero__blog--container">
        <BlogCarousel blogs={successfulAdoptedPetsBlogPost} />
      </section>
    </div>
  );
};

export default Hero;
