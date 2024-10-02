import React from "react";
import { useLocation } from "react-router-dom";

const PetMatchesPage = () => {
  const { searchInput } = useLocation().state;
  return <div>{searchInput}</div>;
};

export default PetMatchesPage;
