import { DataLoadedCallback } from "../../utils/common.types";
import DataLoader from "../../utils/DataLoader/DataLoader";

class AirportLoader extends DataLoader {
  constructor(callback?: DataLoadedCallback) {
    super('airports', {}, callback);
  }
}

export default AirportLoader;