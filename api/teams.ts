import { AxiosError } from "axios";
import { axiosInstance } from "./config";
import { Team, TeamDetailed } from "../types/types";

export const createTeam = async (name: string, about: string) => {
  try {
    const res = await axiosInstance.post<Team>("/v1/teams/", {
      name,
      about,
    });
    return { data: res.data, error: null };
  } catch (err) {
    const error = err as AxiosError;
    return { data: null, error: error.message };
  }
};

export const getTeam = async (id: number) => {
  try {
    const res = await axiosInstance.get<TeamDetailed>(`/v1/teams/${id}/`);
    return { data: res.data, error: null };
  } catch (err) {
    const error = err as AxiosError;
    return { data: null, error: error.message };
  }
};

export const getTeams = async () => {
  try {
    const res = await axiosInstance.get<Team[]>(`/v1/teams/`);
    return { data: res.data, error: null };
  } catch (err) {
    const error = err as AxiosError;
    return { data: null, error: error.message };
  }
};

export const addMemberToTeam = async (teamId: number, id: number) => {
  try {
    const res = await axiosInstance.patch<{ id: number }>(
      `/v1/teams/${teamId}/add-member/`,
      {
        id,
      }
    );
    return { data: res.data, error: null };
  } catch (err) {
    const error = err as AxiosError;
    return { data: null, error: error.message };
  }
};

export const removeMemberFromTeam = async (teamId: number, id: number) => {
  try {
    const res = await axiosInstance.delete(
      `/v1/teams/${teamId}/remove-member/${id}/`
    );
    return { data: res.data, error: null };
  } catch (err) {
    const error = err as AxiosError;
    return { data: null, error: error.message };
  }
};

export const searchTeams = async (teamName: string) => {
  try {
    const res = await axiosInstance.get<Team[]>(
      `/v1/teams/?teamName=${teamName}`
    );
    return { data: res.data, error: null };
  } catch (err) {
    const error = err as AxiosError;
    return { data: null, error: error.message };
  }
};
