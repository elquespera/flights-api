import { Injectable, NotFoundException } from '@nestjs/common';
import axios from 'axios';
import * as fsPromises from 'fs/promises';
import * as fs from 'fs';
import * as path from 'path';
import airportCodes from './airport.codes';
import { CoordinatesDto } from './dto/coordinates.dto';

@Injectable()
export class AirportsService {
  private _airportInfo: AirportEntity[];  
  private _airportInfoStripped: AirportEntity[];  
  private dataFileName = path.resolve(__dirname, '..', '..', '..', 'data', 'airports.json');
  private expiry = 1 * 24 * 60 * 60 * 1000; // 1 day
  private nearbyRange = 300; //km

  async getAll(): Promise<AirportEntity[]> {
    return this.airportInfoStripped();
  }
  
  async getAllDetailed(): Promise<AirportEntity[]> {
    return this.airportInfo();
  }

  async getOne(iata_code: string): Promise<AirportEntity> {
    const airports = await this.airportInfo();
    const airport = airports.find(({ iata }) => iata === iata_code);
    if (!airport) throw new NotFoundException(`Airport with code ${iata_code} not found.`);
    return airport;
  }

  async getNearby(coordinates: CoordinatesDto, max_count = 10): Promise<AirportEntity[]> {
    const getDistance = (coord1: CoordinatesDto, coord2: CoordinatesDto) => {
      const R = 6371e3;
      const φ1 = coord1.latitude * Math.PI/180;
      const φ2 = coord2.latitude * Math.PI/180;
      const Δφ = (coord2.latitude - coord1.latitude) * Math.PI/180;
      const Δλ = (coord2.longitude - coord1.longitude) * Math.PI/180;

      const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
                Math.cos(φ1) * Math.cos(φ2) *
                Math.sin(Δλ/2) * Math.sin(Δλ/2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      return Math.round(R * c / 1000);
    }

    let airports = await this.airportInfo();
    airports = airports.map((airport) => {
      airport.distance = getDistance(
        coordinates, 
        { 
          latitude: airport.latitude, 
          longitude: airport.longitude }
        );
      return airport;
    });

    airports = airports.filter(({ distance }) => distance < this.nearbyRange);
    airports.sort((a, b) => a.distance - b.distance);
    if (max_count) {
      airports = airports.filter((_airport, index) => index < max_count);
    }
    return airports;
  }



  private async checkData() {
    const apiOptions = {
      method: 'GET',
      url: 'https://airport-info.p.rapidapi.com/airport',
      headers: {
        'X-RapidAPI-Key': 'putYourApiKeyHere',
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
