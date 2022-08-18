import './Airport.scss';
import { useEffect, useState } from 'react';
import { Route, Routes, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { AirportEntity } from '../../utils/common.types';
import AirportInfo from './AirportInfo/AirportInfo';
import AirportSchedule, { AIRPORT_SCHEDULE_PAGE } from './AirportSchedule/AirportSchedule';
import AirportLoader from '../../loaders/AirportLoader';

const Airport = () => {
  const { iata } = useParams();

  const [airportData, setAirportData] = useState<AirportEntity | undefined>();
  useEffect(() => {
    new AirportLoader((data: any) => {
      setAirportData(data);
    }, iata);
  }, []);
 
  return (
    <div className='airport-wrapper'>      
      <nav className='airport-menu'>
        <ul>
          <li><Link to="">Info</Link></li>
          <li><Link to="departures">Departures</Link></li>
          <li><Link to="arrivals">Arrivals</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<AirportInfo airport={airportData}/>} />
        <Route path="/departures" element={<AirportSchedule page={AIRPORT_SCHEDULE_PAGE.DEPARTURES}/>}/>
        <Route path="/arrivals" element={<AirportSchedule page={AIRPORT_SCHEDULE_PAGE.ARRIVALS}/>}/>
      </Routes>
    </div>
  )
}

export default Airport;