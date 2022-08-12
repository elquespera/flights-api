interface GPSCoordinates {
  latitude: number;
  longitude: number;
}

type GPSAquiredCallback = (coordinates: GPSCoordinates, data: any) => void; 

export type { GPSCoordinates, GPSAquiredCallback };