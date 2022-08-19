import { Body, Controller, Get, Param, Query } from '@nestjs/common';
import { FlightParams } from './dto/flight.params';
import { FlightEntity } from './flight.entity';
import { FlightsService } from './flights.service';



@Controller('api/flights')
export class FlightsController {
  constructor(private readonly flightsService: FlightsService) {}

  @Get('schedule/:icao')
  async getAllFlights(@Param() params: FlightParams): Promise<FlightEntity[]> {
    return this.flightsService.getAllSchedule(params.icao);
  }

  @Get()
  async getAll(): Promise<FlightEntity[]> {
    return this.flightsService.getAll();
  }

  // @Get('detailed')
  // async getDetailed(@Query() { codes }: AirportCodesQuery): Promise<AirportEntity[]> {
  //   return this.airportsService.getDetailed(codes);
  // }

  // @Get('distance')
  // async getDistance(
  //   @Query() coordinates: CoordinatesDto
  //   ): Promise<AirportCodeDistanceEntity[]> {
  //     console.log(coordinates);
  //     return this.airportsService.getDistance(coordinates);
  // }

  // @Get('nearby/:max_count?')
  // async getNearby(
  //   @Param() params: airportMaxCountDto,
  //   @Query() coordinates: CoordinatesDto
  //   ): Promise<AirportEntity[]> {
  //     console.log(coordinates);
  //     return this.airportsService.getNearby(coordinates, params.max_count);
  // }

  // @Get(':iata_code')
  // async getOne(@Param() params: AirportParams): Promise<AirportEntity> {
  //   return this.airportsService.getOne(params.iata_code);
  // }

}
