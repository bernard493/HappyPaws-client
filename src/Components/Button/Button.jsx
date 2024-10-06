import React from "react";
import "./Button.scss"

const Button = ({ handleButtonClick, isDisabledState , notDisabledText, isDisabledText}) => {
  return (
    <button
      onClick={handleButtonClick}
      className="Btn"
      disabled={isDisabledState}
    >
      {!isDisabledState ? notDisabledText : isDisabledText}
    </button>
  );
};

export default Button;
