import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AirportsModule } from './api/airports/airports.module';
import { FlightsModule } from './api/flights/flights.module';
import { join } from 'path';
import { configuration } from './env/config';

@Module({
  imports: [
    ConfigModule.forRoot({ 
      isGlobal: true,
      envFilePath: join(__dirname, '..', 'env', `.env.${process.env.NODE_ENV}`),
      load: [configuration]       
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'frontend/dist'),
      exclude: ['api/'],
      serveStaticOptions: {
        lastModified: false,
      }
    }),
    AirportsModule,
    FlightsModule,
  ],
})
export class AppModule {}