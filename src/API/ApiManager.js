import axios from "axios";
import Cookies from "js-cookie";

const ApiManager = () => {
  const axiosInstance = axios.create({
    baseURL: "https://happypaws-server-d1z9.onrender.com/api/v1", //change this to your api url
    responseType: "json",
    withCredentials: true,
  });

  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response.status === 401) {
        // Token is expired or unauthorized, redirect to login
        Cookies.remove("token");
      }
      return Promise.reject(error);
    }
  );
  // Add  the token to each request
  axiosInstance.interceptors.request.use((config) => {
    const token = Cookies.get("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  return axiosInstance;
};

export default ApiManager;
