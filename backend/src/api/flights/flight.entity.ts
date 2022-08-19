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

interface FlightData {
  isFake: boolean;
  data: FlightEntity[];
}

export { FlightEntity, FlightData };