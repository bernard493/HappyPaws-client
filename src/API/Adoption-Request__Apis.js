import ApiManager from "./ApiManager";
import Cookies from "js-cookie";

export const GetAdoptionRequestByID = async (requestID) => {
  try {
    const token = Cookies.get("token");
    const response = await ApiManager(`/adopter/requests/${requestID}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export const GetAllAdoptionRequest = async () => {
  try {
    const token = Cookies.get("token");
    const response = await ApiManager("/adopter/requests", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export const CreateAdoptionRequest = async (body) => {
  try {
    const token = Cookies.get("token");
    const response = await ApiManager("/adopter/requests", {
      method: "POST",
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
