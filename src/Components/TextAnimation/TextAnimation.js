import React from "react";
import { TypeAnimation } from "react-type-animation";

const TextAnimation = ({ text }) => {
  return (
    <TypeAnimation
      sequence={text}
      wrapper="span"
      speed={40}
      style={{
        fontSize: "2rem",
        display: "inline-block",
        fontWeight: "bold",
        textWrap: "wrap",
      }}
      repeat={Infinity}
    />
  );
};

export default TextAnimation;
