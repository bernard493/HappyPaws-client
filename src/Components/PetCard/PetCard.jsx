import React from "react";
import "./PetCard.scss";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";

const PetCard = ({ pet, petId, onOpen }) => {
  return (
    <div className="petCard" onClick={() => onOpen(petId)}>
      <img src={pet.image} alt={pet.name} className="petCard__img" />
      <div className="petCard__info">
        <div className="petCard__info--name-container">
          <h2 className="petCard__info--name">{pet.name}</h2>
          {pet.favorite ? <MdFavorite /> : <MdFavoriteBorder />}
        </div>
        <div className="petCard__info--location">
          <CiLocationOn />
          <p className="petCard__name">london, UK</p>
        </div>
      </div>
    </div>
  );
};

export default PetCard;
