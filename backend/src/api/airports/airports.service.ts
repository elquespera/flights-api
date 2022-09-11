import { Injectable, NotFoundException } from '@nestjs/common';
import * as path from 'path';
import { CoordinatesDto } from '../../utils/coordinates.dto';
import { calculateDistance } from 'src/utils/utils';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AirportsService {
  private _airportInfo: AirportEntity[];  
  private _airportInfoStripped: AirportEntity[];  
  private dataFileName = path.resolve(__dirname, '..', '..', '..', 'data', 'airports.json');

  constructor(private configService: ConfigService) {}


  async getAll(): Promise<AirportEntity[]> {
    return this.airportInfoStripped();
  }
  
  async getDetailed(codes?: string[]): Promise<AirportEntity[]> {
    let airports = await this.airportInfo();
    if (codes) {
      airports = codes.map(code => airports.find(({ iata }) => iata === code));
    }
    return airports;
  }

  async getOne(iata_code: string): Promise<AirportEntity> {
    const airports = await this.airportInfo();
    const airport = airports.find(({ iata }) => iata === iata_code);
    if (!airport) throw new NotFoundException(`Airport with code ${iata_code} not found.`);
    return airport;
  }

  async findByIata(iata_code: string): Promise<AirportEntity> {
    const airports = await this.airportInfo();
    const airport = airports.find(({ iata }) => iata === iata_code);
    return airport;
  }

  async getDistance(coordinates: CoordinatesDto): Promise<AirportCodeDistanceEntity[]> {
    let airports = await this.airportInfo();

    return airports
      .map(({ iata, latitude, longitude }) => {
        return {
          iata,
          distance: calculateDistance(coordinates, { latitude, longitude }),
        }
      })
      .sort((a, b) => a.distance - b.distance);
  }

  async getNearby(coordinates: CoordinatesDto, max_count = 5): Promise<AirportEntity[]> {
    let airports = await this.airportInfo();

    return airports
      .map((airport) => {
        const airportCoordinates = {
          latitude: airport.latitude, 
          longitude: airport.longitude,
        }
        return {
          ...airport,
          distance: calculateDistance(coordinates, airportCoordinates),
        }
      })
      .sort((a, b) => a.distance - b.distance)
      .slice(0, max_count);
  }

  private async airportInfo(): Promise<AirportEntity[]> {
    if (this._airportInfo) return this._airportInfo;
    this._airportInfo = await import(this.dataFileName);
    return this._airportInfo;
  }

  private async airportInfoStripped(): Promise<AirportEntity[]> {
    if (this._airportInfoStripped) return this._airportInfoStripped;
    const airports = await this.airportInfo();
    this._airportInfoStripped = airports.map(({ id, iata, name, stripped_name, city, country }) => {
      return { id, iata, name, stripped_name, city, country };
    });
    return this._airportInfoStripped;
  }
}
