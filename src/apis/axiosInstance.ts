import axios from "axios";

import { PRODUCTION } from "../constants";

const getToken = (tokenName: string) => {
  const localToken = localStorage.getItem("recoil-persist");
  if (localToken) {
    const tokenParseJson = JSON.parse(localToken);
    if (tokenParseJson !== "") {
      const token = tokenParseJson[tokenName];
      return token;
    }
  }
};

export const axiosInstance = axios.create();

axiosInstance.defaults.validateStatus = (status) => status < 400;
axiosInstance.defaults.baseURL = PRODUCTION
  ? "http://13.125.36.183/api"
  : "http://13.125.36.183/api";
axiosInstance.defaults.timeout = 30000;

export const authInstance = axios.create();

authInstance.defaults.validateStatus = (status) => status < 400;
authInstance.defaults.baseURL = PRODUCTION
  ? "http://13.125.36.183/api"
  : "http://13.125.36.183/api";
authInstance.defaults.timeout = 30000;

authInstance.interceptors.request.use((config) => {
  const token = getToken("userToken");
  if (token) {
    config.headers = { "Access-Token": `${token}` };
  }
  try {
    return config;
  } catch (err) {
    console.error(`[_axios.interceptors.request] config : ${err}`);
  }
  return config;
});
