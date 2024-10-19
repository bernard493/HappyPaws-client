import ApiManager from "./ApiManager";


const axiosInstance = ApiManager();




export const generatePetRecommendations = async (body) => {
  console.log('body',body);
  try {
    const response = await axiosInstance.post(
      "/generate-recommendation-breeds",
      { searchValue: body },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

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
