import './AirportSchedule.scss';
import { AirportEntity, FlightEntity } from '../../../utils/common.types';
import React, { useEffect, useState } from 'react';
import FlightItem from './FlightItem/FlightItem';

enum AIRPORT_SCHEDULE_PAGE {
  BOTH,
  DEPARTURES,
  ARRIVALS,
}

const AirportSchedule = (
  { page, airport, flights, flightsPerPage = 15, showLaterFlights = true, isMockData = false }: 
  { page: number, airport?: AirportEntity, flights?: FlightEntity[], 
    flightsPerPage?: number, showLaterFlights?: boolean, isMockData?: boolean }) => {

  if (!flights || !airport) return null;
  const [flightsToDisplay, setFlightsToDisplay] = useState(flightsPerPage);

  const filterFlights = (flights: FlightEntity[], flightIsDeparture: boolean) => {
    return flights.filter(flight => {
      const IsDeparture = flight.departure?.airport === undefined;
      return IsDeparture === flightIsDeparture;
    });
  }

  let data = flights;
  let title = 'Schedule';
  switch (page) {
    case AIRPORT_SCHEDULE_PAGE.DEPARTURES:
      title = 'Departures';
      data = filterFlights(flights, true);
      break;
    case AIRPORT_SCHEDULE_PAGE.ARRIVALS:
      title = 'Arrivals';
      data = filterFlights(flights, false);
      break;
  }
  const dataLength = data.length;
  data = data.slice(0, flightsToDisplay);
  const flightList = data.map(flight => <FlightItem key={flight.number} flight={flight} uct={airport?.uct} />);
  return (
    <div className='flight-schedule'>
      <h2>{title}</h2>
      <ul className='flight-list'>
        {flightList}
      </ul>
      {isMockData &&
        <p className='mock-data-warning'>
          * Mock data is being used for this flight schedule 
            because the developer is poor and free API limit has been reached.
        </p>
      }
      {showLaterFlights && flightsToDisplay < dataLength && 
        <button
          className='show-more-flights' 
          onClick={() => setFlightsToDisplay(flightsToDisplay + flightsPerPage)}>
          Show later flights
        </button>
      }
    </div>
  )
}

export default AirportSchedule;
export { AIRPORT_SCHEDULE_PAGE };