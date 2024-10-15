import ApiManager from "./ApiManager";
import Cookies from "js-cookie";

export const getPetDetailsById = async (petID) => {
  try {
    // const token = Cookies.get("token");

    const response = await ApiManager(`/pets/${petID}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    console.error("Error making the request or parsing the body:", error);
    return (
      error.response || {
        status: 500,
        message: "Something went wrong",
      }
    );
  }
};
