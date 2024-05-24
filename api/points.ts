import { AxiosError } from "axios";
import { axiosInstance } from "./config";
import { Point, NewPoint, MissionGraphics, BackendPoint } from "../types/types";

export const createPoint = async (pointData: NewPoint) => {
  const data = {
    ...pointData,
  };
  try {
    const res = await axiosInstance.post<BackendPoint>("/v1/points/", data);
    const newPoint: Point = { ...res.data, visible: true };
    return { data: newPoint, error: null };
  } catch (err) {
    const error = err as AxiosError;
    return { data: null, error: error.message };
  }
};

export const updatePoint = async (pointId: number, pointData: Point) => {
  try {
    const res = await axiosInstance.patch<BackendPoint>(
      `/v1/points/${pointId}/`,
      pointData
    );
    const updatedPoint: Point = { ...res.data, visible: true };
    return { data: updatedPoint, error: null };
  } catch (err) {
    const error = err as AxiosError;
    return { data: null, error: error.message };
  }
};

export const getMissionGraphics = async (missionId: number) => {
  try {
    const res = await axiosInstance.get<MissionGraphics>(
      `/v1/missions/${missionId}/graphics/`
    );
    return { data: res.data, error: null };
  } catch (err) {
    const error = err as AxiosError;
    return { data: null, error: error.message };
  }
};
