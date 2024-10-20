import React from "react";
import Lottie from "react-lottie";

const LottieSpinner = ({LottieFile}) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: LottieFile, 
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div>
      <Lottie options={defaultOptions} height={200} width={200} />
    </div>
  );
};

export default LottieSpinner;
