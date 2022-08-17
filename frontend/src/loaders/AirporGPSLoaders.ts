import { GPSAquiredCallback, GPSCoordinates } from "../utils/common.types";
import DataLoader from "./DataLoader";

class AirportGPSLoader extends DataLoader {
  private coordinates: GPSCoordinates | null = null;

  constructor(endpoint: string, params = {}, callback?: GPSAquiredCallback) {
    const cb = (data: any) => {
      if (callback) 
        callback(this.data, this.coordinates)
    }
    super(`airports/${endpoint}`, params, cb);
  }

  public async get(): Promise<any> {

    const updateCoordinates = async (position: GeolocationPosition) => {
      if (position && position.coords) {
        const { latitude, longitude } = position.coords;
        this.coordinates = { latitude, longitude };
        await super.get(this.coordinates);
      } else {
        this.coordinates = null;
      }
    }

    const failedUpdateCoordinates = () => {
      this.coordinates = null;
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(updateCoordinates, failedUpdateCoordinates);
    } else {
      this.coordinates = null;
    }
  }
}


class AirportDistanceLoader extends AirportGPSLoader {
  constructor(callback?: GPSAquiredCallback) {
    super('distance', {}, callback);
  }
}

class AirportNearbyLoader extends AirportGPSLoader { 
  constructor(callback?: GPSAquiredCallback, max_count = 5) {
    super(`nearby/${max_count}`, {}, callback);
  }
}

export { AirportNearbyLoader, AirportDistanceLoader };