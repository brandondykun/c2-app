import { AxiosError } from "axios";
import { axiosInstance } from "./config";
import { TeamMessage } from "../types/types";

export const getTeamChats = async (teamId: number) => {
  try {
    const res = await axiosInstance.get<TeamMessage[]>(
      `/v1/chats/teams/${teamId}/`
    );
    return { data: res.data, error: null };
  } catch (err) {
    const error = err as AxiosError;
    return { data: null, error: error.message };
  }
};
