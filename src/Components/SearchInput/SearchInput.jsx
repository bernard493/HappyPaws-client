import React from "react";
import "./SearchInput.scss";
import { SiMinds } from "react-icons/si";

const SearchInput = ({ placeholder, setValue }) => {
  return (
    <div className="searchInput__container">
      <SiMinds />
      <input 
        onChange={(e) => setValue(e.target.value)}
        className="input"
        type="text"

        placeholder={placeholder}
      />
    </div>
  );
};

export default SearchInput;
