interface GPSCoordinates {
  latitude: number;
  longitude: number;
}

type DataLoadedCallback = (data: any) => void;

type GPSAquiredCallback = (data: any, coordinates: GPSCoordinates | null) => void; 


interface AirportEntity {
  id: number;
  iata: string;
  name: string;
  stripped_name: string;
  city: string;
  country: string;
  
  icao?: string;
  location?: string;
  street_number?: string;
  street?: string;
  state?: string;
  country_iso?: string;
  county?: string;
  postal_code?: string;
  phone?: string;
  latitude?: number;
  longitude?: number;
  uct?: number;
  website?: string;

  distance?: number;
}

interface AirportCodeDistanceEntity {
  iata: string;
  distance: number;
}

type FlightStatus = "Unknown" | "Expected" | "EnRoute" | "CheckIn" | "Boarding" | "GateClosed" | "Departed" | "Delayed" | "Approaching" | "Arrived" | "Canceled" | "Diverted" | "CanceledUncertain";
type CodeshareStatus = "Unknown" | "IsOperator" | "IsCodeshared";

interface FlightMovement {
  airport?: {
    name: string;
    iata: string;
  }
  scheduledTimeLocal?: string;
  actualTimeLocal?: string;
  runwayTimeLocal?: string;
  terminal?: string;
  gate?: string;
  checkInDesk?: string;
  baggageBelt?: string;
}

interface FlightEntity {
  number: string;
  status: FlightStatus;
  codeshareStatus: CodeshareStatus;
  codeshare?: string[];
  isCargo: boolean;
  airline: {
    name: string;
  };
  departure: FlightMovement;
  arrival: FlightMovement;
  aircraft: {
    model?: string;
  };
}

export type { GPSCoordinates, GPSAquiredCallback, DataLoadedCallback, 
  AirportEntity, AirportCodeDistanceEntity, FlightEntity };