import { Module } from '@nestjs/common';
import { AirportsModule } from '../airports/airports.module';
import { FlightsController } from './flights.controller';
import { FlightsService } from './flights.service';

@Module({
  imports: [AirportsModule],
  controllers: [FlightsController],
  providers: [FlightsService]
})
export class FlightsModule {}
