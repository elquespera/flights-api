import { IsString } from "class-validator";

export class FlightParams {
  @IsString()
  icao: string;
}