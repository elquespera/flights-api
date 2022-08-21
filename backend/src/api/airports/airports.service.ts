import { Injectable, NotFoundException } from '@nestjs/common';
import axios from 'axios';
import * as fsPromises from 'fs/promises';
import * as fs from 'fs';
import * as path from 'path';
import airportCodes from './airport.codes';
import { CoordinatesDto } from '../../utils/coordinates.dto';
import { calculateDistance } from 'src/utils/utils';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AirportsService {
  private _airportInfo: AirportEntity[];  
  private _airportInfoStripped: AirportEntity[];  
  private dataFileName = path.resolve(__dirname, '..', '..', '..', 'data', 'airports.json');
  private expiry = 30 * 24 * 60 * 60 * 1000; // 1 day

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
  
  private async checkData() {
    const apiOptions = {
      method: 'GET',
      url: 'https://airport-info.p.rapidapi.com/airport',
      headers: {
        'X-RapidAPI-Key': this.configService.get<string>('AIRPORT_API_KEY'),
        'X-RapidAPI-Host': 'airport-info.p.rapidapi.com'
      }
    };
    
    let stats:fs.Stats;
    try {
      stats = await fsPromises.stat(this.dataFileName);
    } catch (e) {};

    const fetchFresh = (!stats || new Date().getTime() - stats.mtimeMs > this.expiry );
    let res = [];

    if (fetchFresh) {
      console.log('Fetching airport data...');
      res = await Promise.all(
        airportCodes.map(async (iata) => {
          try {
            const response = await axios({ ...apiOptions, params: { iata } });
            return response.data;
          } catch(e) {
            return iata;
          }
        })
      );
      res = res.filter(info => info.id);
      res = res.map(airport => {
        return {
          ...airport, 
          stripped_name: airport.name.replace(/Airport|airport|International|international/g, '').trim(),
        }
      });

      await fsPromises.writeFile(this.dataFileName, JSON.stringify(res), { flag: 'w' });
      console.log(`Fetched ${res.length} airports!`);
    }
  }

  private async airportInfo(): Promise<AirportEntity[]> {
    if (this._airportInfo) return this._airportInfo;
    await this.checkData();
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
