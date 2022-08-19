import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AirportsModule } from './api/airports/airports.module';
import { FlightsModule } from './api/flights/flights.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AirportsModule,
    FlightsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
