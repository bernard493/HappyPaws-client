import ApiManager from "./ApiManager";

const axiosInstance = ApiManager();

export const userLogin = async (body) => {
  try {
    const response = await axiosInstance.post("/auth/login", body, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export const registerUser = async (body) => {
  try {
    const response = await axiosInstance.post("/auth/register", body, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export const UpdateUserProfile = async (body) => {
  try {
    const response = await axiosInstance.put("/profile", body, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export const GetUserProfile = async () => {
  try {
    const response = await axiosInstance.get("/profile", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export const DeleteUserProfile = async () => {
  try {
    const response = await axiosInstance.delete("/profile", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};


export const UpdateUserProfileAvatar = async (body) => {
  try {
    const FormData = global.FormData;
    const formData = new FormData();
    formData.append("avatar", body);

    const response = await axiosInstance.post(
      "/profile/user/avatar",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        transformRequest: (data, headers) => {
          // !!! override data to return formData
          // since axios converts that to string
          return formData;
        },
      }
    );
    return response;
  } catch (error) {
    return error.response;
  }
};
