import ApiManager from "./ApiManager";


// Call ApiManager to get the axios instance
const axiosInstance = ApiManager(); 


export const getPetDetailsById = async (petID) => {
  try {

    const response = await axiosInstance.get(`/pets/${petID}`, {
      headers: {
        "Content-Type": "application/json",
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
