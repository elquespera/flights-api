import './FlightItem.scss';
import { FlightEntity } from '../../../../utils/common.types';
import { formatDateTime } from '../../../../utils/formatDateTime';

type StringOrUndefined = string | undefined;

const FlightTime = ({ scheduledTime, actualTime }: { scheduledTime: StringOrUndefined, actualTime: StringOrUndefined }) => {
  const scheduled = formatDateTime(scheduledTime);
  const actual = formatDateTime(actualTime);
  const late = actual.milliseconds > scheduled.milliseconds;
  return (
  <div className='flight-time'>
    <div>{scheduled.time}</div>
    {actualTime && actualTime !== scheduledTime && 
      <div className={'actual ' + (late ? 'late' : 'early')}>{actual.time}</div>
    }
    <div className='flight-date'>{scheduled.date}</div>
  </div>
  )
}

const FlightTitle = (
  { isDeparture, airportName, airportIata, flightNumber, airlineName, codeshare } : 
  { isDeparture: boolean, airportName: StringOrUndefined, airportIata: StringOrUndefined, 
    flightNumber: StringOrUndefined, airlineName: StringOrUndefined, codeshare?: string[] }
) => {
  return (
    <div className='airport-title'>
      <div className='destination-title'>
        <span className='material-icons'>
          {isDeparture ? 'flight_takeoff' : 'flight_land'}
        </span>
        <span>{airportName} ({airportIata})</span>
      </div>
      <div className='airport-subtitle'>
        {flightNumber} | {airlineName}
        {codeshare && codeshare.map(item => <div>{item}</div>)}
      </div>
    </div>
  );
}

const FlightInfoItem = ({ title, info, customClass }: { title: StringOrUndefined, info: StringOrUndefined, customClass?: StringOrUndefined }) => {
  return (
    <div className='flight-info-item'>
      { title && info && 
        <>
          <div className='flight-info-title'>
            {title}
          </div>
          <div className={'flight-info-piece ' + (customClass && customClass)}>
            {info}
          </div>
        </>
      }
    </div>
  );
}

const FlightItem = ({ flight }: {flight: FlightEntity}) => {
  const isDeparture = flight.departure?.airport === undefined;
  const destinationAirport = isDeparture ? flight.arrival.airport : flight.departure.airport;
  const source = isDeparture ? flight.departure : flight.arrival;

  return (
    <li className='flight-item'>
      <FlightTime scheduledTime={source.scheduledTimeLocal} actualTime={source.actualTimeLocal} />
      <FlightTitle isDeparture={isDeparture} airportName={destinationAirport?.name}
        airportIata={destinationAirport?.iata} flightNumber={flight.number} 
        airlineName={flight.airline.name} codeshare={flight.codeshare}/>
      <FlightInfoItem title='Status' info={flight.status} />
      <FlightInfoItem title='Terminal' info={source.terminal} customClass='terminal'/>
      {isDeparture 
      ? <> 
          <FlightInfoItem title='Gate' info={source.gate} customClass='gate'/>
          <FlightInfoItem title='Check-in' info={source.checkInDesk} />
        </>
      : <>
          <FlightInfoItem title='Baggage' info={source.baggageBelt} customClass='baggage' />
        </>}
    </li>
  )
}

export default FlightItem;