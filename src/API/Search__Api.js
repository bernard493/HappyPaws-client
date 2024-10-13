import ApiManager from "./ApiManager";
import Cookies from "js-cookie";

export const generatePetRecommendations = async (body) => {
  try {
    const token = Cookies.get("token");
    const response = await ApiManager("/search", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: { ...body },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};
