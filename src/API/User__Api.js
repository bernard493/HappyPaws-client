import ApiManager from "./ApiManager";
import Cookies from 'js-cookie';


export const userLogin = async (body) => {
  try {
    const response = await ApiManager("/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: { ...body },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export const registerUser = async (body) => {
  try {
    const response = await ApiManager("/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: { ...body },
    });
    return response;
  } catch (error) {
    return error.response;
  }
}; 

export const UpdateUserProfile = async (body) => {
  try {

    const token = Cookies.get('token');

    const response = await ApiManager("/profile", {
      method: "PUT",
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


export const GetUserProfile = async () => {
    try {
  
      const token = Cookies.get('token');
  
      const response = await ApiManager("/profile", {
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

export const UpdateUserProfileAvatar = async (body) => {
  try {


    const token = Cookies.get('token');

    const FormData = global.FormData;
    const formData = new FormData();
    formData.append("avatar", body);

    const response = await ApiManager("/profile/user/avatar", {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
      transformRequest: (data, headers) => {
        // !!! override data to return formData
        // since axios converts that to string
        return formData;
      },
      data: formData,
    });
    return response;
  } catch (error) {
    return error.response;
  }
};
