import ApiManager from "./ApiManager";
import Cookies from "js-cookie";

export const generatePetRecommendations = async (body) => {
  console.log("body", body);

  try {
    const token = Cookies.get("token");

    const response = await ApiManager("/generate-recommendation-breeds", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: { searchValue: body },
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
