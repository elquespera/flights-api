import { forwardRef, Inject, Injectable } from '@nestjs/common';
import axios from 'axios';
import * as fsPromises from 'fs/promises';
import * as fs from 'fs';
import * as path from 'path';
import { FlightEntity, FlightOpenSkyEntity } from './flight.entity';
import { AirportsService } from '../airports/airports.service';

@Injectable()
export class FlightsService {
  private dataTimeRange = 24 * 60 * 60; //24 hours in seconds
  private _flightInfo: FlightEntity[];

  constructor(
    @Inject(forwardRef(() => AirportsService))
    private airportService: AirportsService
  ) {}

  async getAll(): Promise<FlightEntity[]> {
    return this.flightInfo();
  }

  private async loadFlights(): Promise<FlightEntity[]> {
    // const dataFileName = path.resolve(__dirname, '..', '..', '..', 'data', 'flights.json');
    // const data = await import(dataFileName) as FlightOpenSkyEntity[];
    const now = Math.floor(Date.now() / 1000);

    const apiOptions = {
      method: 'GET',
      url: 'https://opensky-network.org/api/flights/departure/',
      params: {
        begin: now - this.dataTimeRange * 5,
        end: now + this.dataTimeRange * 2,
        airport: 'LOWL'
      }
    };

    const response = await axios(apiOptions);
    const data = response.data as FlightOpenSkyEntity[];

    return await Promise.all(data.map(async (flight): Promise<FlightEntity> => {
      const departureAirport = await this.airportService.findByIcao(flight.estDepartureAirport);
      const arrivalAirport = await this.airportService.findByIcao(flight.estArrivalAirport);
      return {
        icao: flight.icao24,
        callsign: flight.callsign,
        departureAirport: departureAirport?.location || flight.estDepartureAirport,
        departureEstimate: new Date(flight.firstSeen * 1000).toLocaleString(),
        departureDistance: Math.floor(flight.estDepartureAirportHorizDistance / 1000),
        arrivalAirport: arrivalAirport?.location || flight.estArrivalAirport,
        arrivalEstimate: new Date(flight.lastSeen * 1000).toLocaleString(),
        arrivalDistance: Math.floor(flight.estArrivalAirportHorizDistance / 1000),
      }
    }));
  }

  private async flightInfo(): Promise<FlightEntity[]> {
    if (this._flightInfo) return this._flightInfo;
    this._flightInfo = await this.loadFlights();
    return this._flightInfo;
  }

  public async getAllSchedule(icao: string): Promise<any> {
    // const apiOptions = {
    //   method: 'GET',
    //   url: 'https://aerodatabox.p.rapidapi.com/flights/airports/icao/LKPR/2022-08-18T23:00/2022-08-19T09:59',
    //   params: {
    //     withLeg: true,
    //     direction: 'Both',
    //     withCancelled: true,
    //     withCodeshared: false,
    //     withCargo: false,
    //     withPrivate: false,
    //     withLocation: true,
    //   },
    //   headers: {
    //     'X-RapidAPI-Key': 'putYourApiKeyHere',
    //     'X-RapidAPI-Host': 'aerodatabox.p.rapidapi.com'
    //   }
    // }

    // const response = await axios(apiOptions);
    // let data = response.data;

    // Mock data
    const dataFileName = path.resolve(__dirname, '..', '..', '..', 'data', 'schedule.json');
    let data = await import(dataFileName);

    const compareDates = (a, b) => {
      const getOriginDate = (flight) => {
        const isDeparture = flight.departure?.airport === undefined;
        const source = isDeparture ? flight.departure : flight.arrival;
        return new Date(source.scheduledTimeLocal).getTime();
      }
      return getOriginDate(a) - getOriginDate(b);
    }
    data = [...data["departures"], ...data["arrivals"]];
    data = data.sort((a, b) => compareDates(a, b));
    return data;
  }
}
