import axios from "axios";

const ApiManager = axios.create({
  baseURL: "http://localhost:5001/api/v1", //change this to your api url
  responseType: "json",
  withCredentials: true,
});

export default ApiManager;
