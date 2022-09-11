import { GPSCoordinates } from "./common.types";

export const formatMapUrl = (coordinates: GPSCoordinates): string => {
  const { latitude, longitude } = coordinates;
  const url = `https://www.google.com/maps/search/?api=1&query=${latitude}%2C${longitude}`;
  return url;
} 