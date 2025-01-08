import React, { useState } from "react";
import "./Hero.scss";
import SearchInput from "../SearchInput/SearchInput";
import { heroTexts } from "../../const/constant";
import TextAnimation from "../TextAnimation/TextAnimation";

const Hero = () => {
  const [heroText] = useState(heroTexts);

  return (
    <div className="Hero">
      <section className="Hero__text--container">
        <h1 className="Hero__title">I am Pawsist, Your AI Assistance</h1>
        <TextAnimation text={heroText} />
        <div className="Hero__input__section--container">
          <SearchInput placeholder="How can PawSist help you today?" />
        </div>
      </section>
      <section className="Hero__blog--container">
        {/* <BlogCarousel blogs={successfulAdoptedPetsBlogPost} /> */}
      </section>
    </div>
  );
};

export default Hero;
