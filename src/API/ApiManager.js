import axios from "axios";

const ApiManager = axios.create({
  baseURL: "localhost:8080/api/v1", //change this to your api url
  responseType: "json",
  withCredentials: true,
});

export default ApiManager;
