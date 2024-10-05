import React, { useState } from "react";
import "./PetCard.scss";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import Button from "../Button/Button";

const PetCard = ({ pet, petId, onOpen }) => {
  const [isDisabled, setisDisabled] = useState(false);

  const handleSelectedPet = (petId) => {
    onOpen(petId);
  };
  return (
    <div className="petCard">
      <div className="petCard__cont">
        <img src={pet.image} alt={pet.name} className="petCard__img" />
        <div className="petCard__info">
          <div className="petCard__info--name-container">
            <h2 className="petCard__info--name">{pet.name}</h2>
            {pet.favorite ? (
              <MdFavorite size={29} />
            ) : (
              <MdFavoriteBorder size={29} />
            )}
          </div>
          <div className="petCard__info--location">
            <CiLocationOn />
            <p className="petCard__location">london, UK</p>
          </div>
          <div className="petCard__info--container">
            <p className="petCard__name">
              Gender:{"  "}
              <span className="petCard__info--container-span">
                {pet.gender}
              </span>
            </p>
            <p className="petCard__name">
              Age:{"  "}
              <span className="petCard__info--container-span">{pet.age}</span>
            </p>
          </div>
          <div className="petCard__info--container">
            <p className="petCard__name">
              Breed:{"  "}
              <span className="petCard__info--container-span">{pet.breed}</span>
            </p>
            <p className="petCard__name">
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
