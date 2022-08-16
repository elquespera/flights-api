import { Type } from "class-transformer";
import { IsArray, IsOptional, IsString, Length } from "class-validator";

export class AirportParams {
  @Length(3)
  iata_code: string;
}

export class AirportCodesQuery {
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  // @Length(3)
  codes?: string[];
}