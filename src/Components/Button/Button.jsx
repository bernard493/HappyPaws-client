import React from "react";
import "./Button.scss";

const Button = ({
  handleButtonClick,
  isDisabledState,
  notDisabledText,
  isDisabledText,
  width,
}) => {
  return (
    <button
      onClick={handleButtonClick}
      className="Btn"
      disabled={isDisabledState}
      style={{
        width: width || "100%",
      }}
    >
      {notDisabledText}
    </button>
  );
};

export default Button;
