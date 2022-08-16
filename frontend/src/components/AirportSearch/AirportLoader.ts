import { DataLoadedCallback } from "../../utils/common.types";
import DataLoader from "../../utils/DataLoader/DataLoader";

class AirportLoader extends DataLoader {
  constructor(callback?: DataLoadedCallback, iata = '') {
    super(`airports/${iata}`, {}, callback);
  }
}

export default AirportLoader;