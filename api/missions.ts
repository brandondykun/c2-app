import { AxiosError } from "axios";
import { axiosInstance } from "./config";
import { Mission } from "../types/types";

export const createMission = async (
  name: string,
  about: string,
  teamId: number | string
) => {
  try {
    const res = await axiosInstance.post<Mission>("/v1/missions/", {
      teamId: Number(teamId),
      name,
      about,
    });
    return { data: res.data, error: null };
  } catch (err) {
    const error = err as AxiosError;
    return { data: null, error: error.message };
  }
};

export const getMission = async (id: number) => {
  try {
    const res = await axiosInstance.get<Mission>(`/v1/missions/${id}/`);
    return { data: res.data, error: null };
  } catch (err) {
    const error = err as AxiosError;
    return { data: null, error: error.message };
  }
};

export const getMissions = async () => {
  try {
    const res = await axiosInstance.get<Mission[]>(`/v1/missions/`);
    return { data: res.data, error: null };
  } catch (err) {
    const error = err as AxiosError;
    return { data: null, error: error.message };
  }
};

export const addTeamToMission = async (missionId: number, teamId: number) => {
  try {
    const res = await axiosInstance.patch<{ id: number }>(
      `/v1/missions/${missionId}/add-team/`,
      { teamId }
    );
    return { data: res.data, error: null };
  } catch (err) {
    const error = err as AxiosError;
    return { data: null, error: error.message };
  }
};

export const removeTeamFromMission = async (
  missionId: number,
  teamId: number
) => {
  try {
    const res = await axiosInstance.delete(
      `/v1/missions/${missionId}/remove-team/${teamId}/`
    );
    return { data: res.data, error: null };
  } catch (err) {
    const error = err as AxiosError;
    return { data: null, error: error.message };
  }
};
