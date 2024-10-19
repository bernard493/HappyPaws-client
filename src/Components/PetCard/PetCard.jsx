import React, { useState } from "react";
import "./PetCard.scss";
import Button from "../Button/Button";

const PetCard = ({ pet, petId, onOpen }) => {
  const [isDisabled] = useState(false);

  const handleSelectedPet = (petId) => {
    onOpen(petId);
  };


  return (
    <div className="petCard">
      <div className="petCard__cont">
        <img src={pet.images[0]} alt={pet.name} className="petCard__img" />
        <div className="petCard__info">
          <div className="petCard__info--name-container">
            <h2 className="petCard__info--name">{pet.name}</h2>
            {/* {pet.favorite ? (
              <MdFavorite size={29} />
            ) : (
              <MdFavoriteBorder size={29} />
            )} */}
          </div>
          {/* <div className="petCard__info--location">
            <CiLocationOn />
            <p className="petCard__info--text">london, UK</p>
          </div> */}
          <div className="petCard__info--container">
            <p className="petCard__info--text">
              Gender:{"  "}
              <span className="petCard__info--container-span">
                {pet.gender}
              </span>
            </p>
            <p className="petCard__info--text">
              Age:{"  "}
              <span className="petCard__info--container-span">{pet.age}</span>
            </p>
          </div>
          <div className="petCard__info--container">
            <p className="petCard__info--text">
              Breed:{"  "}
              <span className="petCard__info--container-span">{pet.breed}</span>
            </p>
            <p className="petCard__info--text">
              Size:{"  "}
              <span className="petCard__info--container-span">{pet.size}</span>
            </p>
          </div>
          <div className="petCard__description--container">
            <p className="petCard__description">{pet.description}</p>
          </div>
        </div>
      </div>
      <div className="petCard__bt--container">
        <Button
          handleButtonClick={() => handleSelectedPet(petId)}
          isDisabledState={isDisabled}
          notDisabledText={"More Info"}
          isDisabledText={"More Info"}
        />
      </div>
    </div>
  );
};

export default PetCard;
