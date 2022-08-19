import { Body, Controller, Get, Param, Query } from '@nestjs/common';
import { FlightParams } from './dto/flight.params';
import { FlightData } from './flight.entity';
import { FlightsService } from './flights.service';



@Controller('api/flights')
export class FlightsController {
  constructor(private readonly flightsService: FlightsService) {}

  @Get(':icao')
  async getAllFlights(@Param() params: FlightParams): Promise<FlightData> {
    return this.flightsService.getAllSchedule(params.icao);
  }
}
