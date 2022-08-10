import { Type } from "class-transformer";
import { IsInt, IsOptional, Max, Min } from "class-validator";

export class airportMaxCountDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(20)
  @IsOptional()
  max_count: number;
}