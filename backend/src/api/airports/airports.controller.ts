import { Body, Controller, Get, Param, Query } from '@nestjs/common';
import { AirportsService } from './airports.service';
import { airportMaxCountDto } from './dto/airport.max_count.dto';
import { AirportParams } from './dto/airport.params.dto';
import { CoordinatesDto } from '../../utils/coordinates.dto';

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

  @Get('nearby/:max_count?')
  async getNearby(
    @Param('max_count') { max_count }: airportMaxCountDto,
    @Query() coordinates: CoordinatesDto
    ): Promise<AirportEntity[]> {
      console.log(coordinates);
      return this.airportsService.getNearby(coordinates, max_count);
  }

  @Get(':iata_code')
  async getOne(@Param() params: AirportParams): Promise<AirportEntity> {
    return this.airportsService.getOne(params.iata_code);
  }

}
