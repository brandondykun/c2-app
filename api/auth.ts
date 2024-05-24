import { AxiosError } from "axios";
import { axiosInstance } from "./config";
import axios from "axios";
import { Tokens, AccessToken, UserProfile } from "../types/types";
import { BASE_URL } from "./config";

export const login = async (email: string, password: string) => {
  try {
    const res = await axiosInstance.post<Tokens>("/v1/login/", {
      email,
      password,
    });
    return { data: res.data, error: null };
  } catch (err) {
    const error = err as AxiosError;
    return { data: null, error: error.message };
  }
};

export const refreshToken = async (refresh: string) => {
  try {
    const res = await axios.post<AccessToken>(`${BASE_URL}/v1/refresh/`, {
      refresh,
    });
    return { data: res.data, error: null };
  } catch (err) {
    const error = err as AxiosError;
    return { data: null, error: error.message };
  }
};

export const getMyInfo = async () => {
  try {
    const res = await axiosInstance.get<UserProfile>("/v1/my-info/");
    return { data: res.data, error: null };
  } catch (err) {
    const error = err as AxiosError;
    return { data: null, error: error.message };
  }
};

export const registerUser = async (
  email: string,
  password: string,
  username: string
) => {
  try {
    const res = await axiosInstance.post<UserProfile>("/v1/create-user/", {
      email,
      password,
      username,
    });
    return { data: res.data, error: null };
  } catch (err) {
    const error = err as AxiosError;
    return { data: null, error: error.message };
  }
};
