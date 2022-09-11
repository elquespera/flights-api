import { AirportEntity } from "../../utils/common.types";


const filterAirports = (airports: AirportEntity[], keyword = '', max_count = 10): AirportEntity[] => {
  if (keyword === '') return [];
  const res = [];
  keyword = keyword.toLowerCase();
  for (let i = 0; i < airports.length; i += 1) {
    const airport = airports[i];
    const airportName = airport.stripped_name.toLowerCase();
    if (airportName.includes(keyword)) {
      res.push(airport);
      if (res.length >= max_count) break;
    }
  }
  return res;
}

export default filterAirports;