import React, { useEffect, useRef, useState } from "react";
import "./SearchInput.scss";
import { Image } from "@chakra-ui/react";
import { BsUpload } from "react-icons/bs";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
import { Uploader } from "uploader"; // Installed by "react-uploader".
import { UploadButton } from "react-uploader";
import { IoCloseCircleSharp } from "react-icons/io5";
import VoiceRecorder from "../VoiceRecorder/VoiceRecorder";

// Initialize once (at the start of your app).
const uploader = Uploader({
  apiKey: "free", // Get production API keys from Bytescale
  maxFileCount: 1,
  showFinishButton: true, // Note: You must use 'onUpdate' if you set 'showFinishButton: false' (default).
  styles: {
    colors: {
      primary: "black",
    },
  },
});

// Configuration options: https://www.bytescale.com/docs/upload-widget/frameworks/react#customize
const options = { multi: true };

const SearchInput = ({ placeholder }) => {
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchImageUrl, setSearchImageUrl] = useState("");
  const [setError] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    // Set focus on the input element when the component loads
    inputRef.current.focus();
  }, []);

  const handleSearchNavigation = () => {
    // navigate to pe ts dashboard with searchInput
    if (!searchInput && !searchImageUrl) return setError(true);
    setIsDisabled(true);
    const encodedSearchInput = encodeURIComponent(searchInput);
    const encodedSearchImageUrl = encodeURIComponent(searchImageUrl);

    // Navigate to the pet-matches page with both search parameters
    navigate(
      `/pet-matches?search=${encodedSearchInput}&image=${encodedSearchImageUrl}`
    );

    // Optionally, delay re-enabling the button
    setTimeout(() => {
      setIsDisabled(false);
    }, 500);
  };

  const getImageUrl = (file) => {
    // get and set uploaded Image url
    setSearchImageUrl(file);
  };

  const handleDeleteImageUpload = () => {
    setSearchImageUrl("");
  };

  return (
    <div className="searchInput__container">
      <div className="searchInput__container__text--container">
        <textarea
          ref={inputRef}
          onChange={(e) => setSearchInput(e.target.value)}
          className="input"
          type="text"
          placeholder={placeholder}
          value={searchInput}
        />
        {searchInput || searchImageUrl ? (
          <Button
            handleButtonClick={handleSearchNavigation}
            isDisabledState={isDisabled}
            notDisabledText={"Go"}
            width={24}
          />
        ) : (
          ""
        )}
      </div>
      {searchImageUrl || searchImageUrl ? (
        <div className="searchInput__container__searchImageUrl--container">
          <Image
            src={searchImageUrl}
            alt=""
            rounded="md"
            height="20"
            width={"20"}
            className="searchImageUrl--img"
          />

          <IoCloseCircleSharp
            color="black"
            size={20}
            className="searchImageUrl--cancel__btn"
            onClick={handleDeleteImageUpload}
          />
        </div>
      ) : (
        ""
      )}
      <div className="searchInput__container__file-upload--container">
        <UploadButton
          uploader={uploader}
          options={options}
          onComplete={(files) =>
            getImageUrl(files.map((x) => x.fileUrl).join("\n"))
          }
        >
          {({ onClick }) => <BsUpload size={20} onClick={onClick} />}
        </UploadButton>
        <VoiceRecorder />
      </div>
    </div>
  );
};

export default SearchInput;
