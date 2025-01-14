import * as SecureStore from "expo-secure-store";
import axios from "axios";

export const BASE_URL = "http://10.0.0.190:8000/api";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  // timeout: 1000,
  // headers: {'X-Custom-Header': 'foobar'}
});

axiosInstance.interceptors.request.use(
  async function (config) {
    // Do something before request is sent
    const accessToken = await SecureStore.getItemAsync("ACCESS_TOKEN");
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);
