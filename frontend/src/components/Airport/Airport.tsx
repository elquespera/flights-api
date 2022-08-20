import './Airport.scss';
import { useEffect, useState } from 'react';
import { Route, Routes, useParams } from 'react-router';
import { NavLink } from 'react-router-dom';
import { AirportEntity, FlightEntity } from '../../utils/common.types';
import AirportInfo from './AirportInfo/AirportInfo';
import AirportSchedule, { AIRPORT_SCHEDULE_PAGE } from './AirportSchedule/AirportSchedule';
import AirportLoader from '../../loaders/AirportLoader';
import ScheduleLoader from '../../loaders/ScheduleLoader';

const Airport = () => {
  const routes = {
    index: '',
    departures: 'departures',
    arrivals: 'arrivals',
    all: 'all'
  }

  const [airportData, setAirportData] = useState<AirportEntity | undefined>();
  const [flightData, setFlightData] = useState<FlightEntity[] | undefined>();
  const [isMockData, setIsMockData] = useState(false);
  const [iata, setIata] = useState<string | undefined>();

  const params = useParams();
  const newIata = params['iata'];
  if (newIata !== iata) setIata(params?.iata);
  
  useEffect(() => {
    if (!iata) return;

    new AirportLoader((data: any) => {
      setAirportData(data);
    }, iata);

    new ScheduleLoader((data: any) => {
      setFlightData(data?.data);
      setIsMockData(data.isFake);
    }, iata);    
  }, [iata]);
 
  return (
    <div className='airport-wrapper'>      
      <nav className='airport-menu'>
        <ul>
          <li><NavLink to={routes.index} end={true} >Info</NavLink></li>
          <li><NavLink to={routes.departures}>Departures</NavLink></li>
          <li><NavLink to={routes.arrivals}>Arrivals</NavLink></li>
          <li><NavLink to={routes.all}>All</NavLink></li>
        </ul>
      </nav>
      <Routes>
        <Route index element={<AirportInfo airport={airportData} flights={flightData}/>} />
        <Route path={routes.departures} element={
          <AirportSchedule page={AIRPORT_SCHEDULE_PAGE.DEPARTURES} airport={airportData} flights={flightData} isMockData />
        }/>
        <Route path={routes.arrivals} element={
          <AirportSchedule page={AIRPORT_SCHEDULE_PAGE.ARRIVALS} airport={airportData} flights={flightData} isMockData />
        }/>
        <Route path={routes.all} element={
          <AirportSchedule page={AIRPORT_SCHEDULE_PAGE.BOTH} airport={airportData} flights={flightData} isMockData />
        }/>
      </Routes>
    </div>
  )
}

export default Airport;