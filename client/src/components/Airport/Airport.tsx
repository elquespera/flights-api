import React, { useEffect, useState } from 'react';
import { Route, Routes, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { AirportEntity } from '../../utils/common.types';
import AirportInfo, { AIRPORT_INFO_PAGE } from '../AirportInfo/AirportInfo';
import AirportLoader from '../AirportSearch/AirportLoader';

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
      {airportData 
        ? <div className='airport-title'>
            <div>{airportData.name}</div>
            <div>{airportData.iata}</div>
          </div> 
        : ''
      }

      <nav>
        <ul>
          <li><Link to="">Info</Link></li>
          <li><Link to="departures">Departures</Link></li>
          <li><Link to="arrivals">Arrivals</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<AirportInfo />}/>
        <Route path="/departures" element={<AirportInfo page={AIRPORT_INFO_PAGE.DEPARTURES}/>}/>
        <Route path="/arrivals" element={<AirportInfo page={AIRPORT_INFO_PAGE.ARRIVALS}/>}/>
      </Routes>
    </div>
  )
}

export default Airport;