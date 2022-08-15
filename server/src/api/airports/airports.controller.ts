import { Body, Controller, Get, Param, Query } from '@nestjs/common';
import { AirportsService } from './airports.service';
import { airportMaxCountDto } from './dto/airport.max_count.dto';
import { AirportParams } from './dto/airport.params.dto';
import { CoordinatesDto } from './dto/coordinates.dto';

@Controller('api/airports')
export class AirportsController {
  constructor(private readonly airportsService: AirportsService) {}

  @Get()
  async getAll(): Promise<AirportEntity[]> {
    return this.airportsService.getAll();
  }

  @Get('detailed')
  async getShort(): Promise<AirportEntity[]> {
    return this.airportsService.getAllDetailed();
  }

  @Get('distance')
  async getDistance(
    @Query() coordinates: CoordinatesDto
    ): Promise<AirportCodeDistanceEntity[]> {
      console.log(coordinates);
      return this.airportsService.getDistance(coordinates);
  }

  @Get(':iata_code')
  async getOne(@Param() params: AirportParams): Promise<AirportEntity> {
    return this.airportsService.getOne(params.iata_code);
  }

}
