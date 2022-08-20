import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AirportsModule } from './api/airports/airports.module';
import { FlightsModule } from './api/flights/flights.module';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'frontend/dist'),
      exclude: ['api/']
    }),    
    AirportsModule,
    FlightsModule,
  ],
})
export class AppModule {}
