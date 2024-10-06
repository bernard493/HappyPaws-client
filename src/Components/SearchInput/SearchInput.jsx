import React from "react";
import "./SearchInput.scss";
import { SiMinds } from "react-icons/si";

const SearchInput = ({ placeholder, setValue, isError, setIsError }) => {
  return (
    <>
      <div className={`searchInput__container ${isError && "error__border"}`}>
        <SiMinds />
        <input
          onChange={(e) => setValue(e.target.value)}
          className="input"
          type="text"
          placeholder={placeholder}
          onFocus={() => setIsError(false)}
        />
      </div>
      {isError && (
        <p className="error">
          Please provide details to find the best matches.
        </p>
      )}
    </>
  );
};

export default SearchInput;
