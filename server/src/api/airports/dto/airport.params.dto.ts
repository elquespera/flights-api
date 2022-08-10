import { IsString, Length } from "class-validator";

export class AirportParams {

  @Length(3)
  iata_code: string;
}