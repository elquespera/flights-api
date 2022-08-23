import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import * as path from 'path';
import { AirportsService } from '../airports/airports.service';
import { FlightData, FlightEntity } from './flight.entity';

@Injectable()
export class FlightsService {


  constructor(
    @Inject(forwardRef(() => AirportsService))
    private airportService: AirportsService,
    private configService: ConfigService,
  ) {}

  public async getAllSchedule(iata: string): Promise<FlightData> {
    const formatDate = (date: number): string => {
      return new Date(date).toISOString().slice(0, 16);
    }

    const airport = await this.airportService.findByIata(iata);
    if (!airport) throw new NotFoundException('Airport not found!');
    const icao = airport.icao;
    if (!icao) throw new NotFoundException('Airport not found!');

    const uct = (airport.uct || 0) * 60 * 1000;
    const now = Date.now() + uct;
    const from = formatDate(now - 1 * 60 * 60 * 1000);
    const to = formatDate(now + 11 * 60 * 60 * 1000 - 60 * 1000);
    const url = `https://aerodatabox.p.rapidapi.com/flights/airports/icao/${icao}/${from}/${to}`;
    console.log(url);

    const apiOptions = {
      method: 'GET',
      url,
      params: {
        withLeg: true,
        direction: 'Both',
        withCancelled: true,
        withCodeshared: false,
        withCargo: false,
        withPrivate: false,
        withLocation: true,
      },
      headers: {
        'X-RapidAPI-Key': this.configService.get<string>('AERODATABOX_API_KEY'),
        'X-RapidAPI-Host': 'aerodatabox.p.rapidapi.com'
      }
    }


    // Real data
    // let isFake = false;
    // const response = await axios(apiOptions);
    // let rawData = response.data;

    // Mock data
    let isFake = true;
    const dataFileName = path.resolve(__dirname, '..', '..', '..', 'data', 'schedule1.json');
    let rawData = await import(dataFileName);


    // Pre-processing
    const getSourceAirport = (flight:FlightEntity) => {
      const isDeparture = flight.departure?.airport === undefined;
      return isDeparture ? flight.departure : flight.arrival;
    }

    const getDestinationAirport = (flight:FlightEntity) => {
      const isDeparture = flight.departure?.airport === undefined;
      return isDeparture ? flight.arrival : flight.departure;
    }

    const compareDates = (a:FlightEntity, b:FlightEntity) => {
      const getOriginDate = (flight: FlightEntity) => {
        const source = getSourceAirport(flight);
        return new Date(source.scheduledTimeLocal).getTime();
      }
      return getOriginDate(a) - getOriginDate(b);
    }

    const findOperator = (codesharedFlight: FlightEntity, data: FlightEntity[]) => {
      const codesharedDest = getDestinationAirport(codesharedFlight);
      return data.find(flight => {
        const dest = getDestinationAirport(flight);
        return dest?.airport.name === codesharedDest.airport.name 
            && dest.scheduledTimeLocal === codesharedDest.scheduledTimeLocal;
      });
    }

    let data = [...rawData['departures'], ...rawData['arrivals']] as FlightEntity[];
    data = data.sort((a: FlightEntity, b: FlightEntity) => compareDates(a, b));

    data.forEach(flight => {
      if (flight.codeshareStatus === 'IsCodeshared') {
        const operator = findOperator(flight, data);
        if (operator) {
          const codeshareTitle = flight.number + ' | ' + flight.airline.name;
          if (!operator.codeshare) operator['codeshare'] = [];
          if (!operator.codeshare.includes(codeshareTitle)) {
            operator.codeshare.push(codeshareTitle);
          }
        }
      }
      return flight;
    });

    data = data.filter(flight => flight.codeshareStatus === 'IsOperator');
    console.log(data.length);
    return { isFake, data };
  }
}
