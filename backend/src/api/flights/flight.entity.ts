class FlightEntity {
  icao: string;
  callsign: string;

  departureAirport?: string;
  departureEstimate?: string;
  departureDistance?: number;

  arrivalAirport?: string;
  arrivalEstimate?: string;
  arrivalDistance?: number;
}

class FlightOpenSkyEntity {
  icao24: string;
  firstSeen: number;
  estDepartureAirport: string;
  lastSeen: number;
  estArrivalAirport: string;
  callsign: string;
  estDepartureAirportHorizDistance: number;
  estDepartureAirportVertDistance: number;
  estArrivalAirportHorizDistance: number;
  estArrivalAirportVertDistance: number;
  departureAirportCandidatesCount: number;
  arrivalAirportCandidatesCount: number;
}

export { FlightEntity, FlightOpenSkyEntity }