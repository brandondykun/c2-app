import { Coordinate, Point } from "../types/types";
const mgrs = require("mgrs");

export const truncateLLCoord = (coordinate: number) => {
  return Math.trunc(coordinate * 100000) / 100000;
};

export const getInitialRegion = (points: Point[]) => {
  const numOfPoints = points?.length;

  if (!numOfPoints) return undefined;

  let latitude = 0;
  let longitude = 0;

  let maxLat: undefined | number = undefined;
  let minLat: undefined | number = undefined;

  let maxLng: undefined | number = undefined;
  let minLng: undefined | number = undefined;

  points.forEach((point) => {
    latitude += point.lat;
    longitude += point.lng;

    if (!maxLat || !maxLng || !minLat || !minLng) {
      maxLat = point.lat;
      minLat = point.lat;
      maxLng = point.lng;
      minLng = point.lng;
    } else {
      if (maxLat < point.lat) {
        maxLat = point.lat;
      }
      if (minLat > point.lat) {
        minLat = point.lat;
      }
      if (maxLng < point.lng) {
        maxLng = point.lng;
      }
      if (minLng > point.lng) {
        minLng = point.lng;
      }
    }
  });

  const averageLat = latitude / numOfPoints;
  const averageLng = longitude / numOfPoints;

  const latitudeDelta =
    averageLat - minLat! > maxLat! - averageLat
      ? averageLat - minLat!
      : maxLat! - averageLat;

  const longitudeDelta =
    averageLng - minLng! > maxLng! - averageLng
      ? averageLng - minLng!
      : maxLng! - averageLng;

  return {
    latitude: averageLat,
    longitude: averageLng,
    latitudeDelta: latitudeDelta + 0.01,
    longitudeDelta: longitudeDelta + 0.01,
  };
};

export const LLtoMGRS = (coordinate: Coordinate): string => {
  if (!coordinate) return "";

  const point = mgrs.forward([coordinate.longitude, coordinate.latitude]);

  let gridZoneDesignator = point.slice(0, 3);
  let squareIdentifier = point.slice(3, 5);
  let easting = point.slice(5, 10);
  let northing = point.slice(10, 16);

  if (point.length === 14) {
    gridZoneDesignator = point.slice(0, 2);
    squareIdentifier = point.slice(2, 4);
    easting = point.slice(4, 9);
    northing = point.slice(9, 15);
  }

  return `${gridZoneDesignator} ${squareIdentifier} ${easting} ${northing}`;
};

export const MGRStoLL = (grid: string) => {
  // this should return a Coordinate type
  const point = mgrs.toPoint(grid);
  return {
    longitude: point[0],
    latitude: point[1],
  };
};

export const milsToDegrees = (mils: number) => {
  return Math.round(mils / 17.77777778);
};

export const degreesToMils = (degrees: number) => {
  return Math.round(degrees * 17.77777778);
};
