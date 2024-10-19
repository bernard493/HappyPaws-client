import ApiManager from "./ApiManager";

// Call ApiManager to get the axios instance
const axiosInstance = ApiManager();



export const GetAdoptionRequestByID = async (requestID) => {
  try {
    const response = await axiosInstance.get(`/adopter/requests/${requestID}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export const GetAllAdoptionRequest = async () => {
  try {
    const response = await axiosInstance.get("/adopter/requests", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export const CreateAdoptionRequest = async (body) => {
  try {
    const response = await axiosInstance.post("/adopter/requests", body, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};
