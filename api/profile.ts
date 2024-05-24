import { AxiosError } from "axios";
import { axiosInstance } from "./config";
import { Team, Profile } from "../types/types";

export const searchProfiles = async (username: string) => {
  try {
    const res = await axiosInstance.get<Profile[]>(
      `/v1/profiles/?username=${username}`
    );
    return { data: res.data, error: null };
  } catch (err) {
    const error = err as AxiosError;
    return { data: null, error: error.message };
  }
};
