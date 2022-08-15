import { GPSAquiredCallback, GPSCoordinates } from "../../utils/common.types";
import DataLoader from "../../utils/DataLoader/DataLoader";

class AirportNearbyLoader extends DataLoader {
  private coordinates: GPSCoordinates | null = null;

  constructor(callback?: GPSAquiredCallback) {
    super(`airports/distance`, {}, callback);
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

export default AirportNearbyLoader;