import { DataLoadedCallback } from "../utils/common.types";
import DataLoader from "./DataLoader";

class ScheduleLoader extends DataLoader {
  constructor(callback?: DataLoadedCallback, iata = '') {
    super(`flights/${iata}`, {}, callback);
  }
}

export default ScheduleLoader;