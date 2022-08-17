import './Home.scss';
import React, { useEffect, useState } from 'react';
import { AirportNearbyLoader } from '../../loaders/AirporGPSLoaders';
import { AirportEntity } from '../../utils/common.types';
import MapWidget from './MapWidget/MapWidget';
import NearbyWidget from './NearbyWidget/NearbyWidget';

const Home = () => {
  const [nearbyAirports, setNearbyAirports] = useState<AirportEntity[]>([]);
  
  useEffect(() => {
    new AirportNearbyLoader((data: any) => {
      setNearbyAirports(data);
    });
  }, []);

  return (
    <div className='home-wrapper'>
      {nearbyAirports.length > 0
        ? <>
            <NearbyWidget airports={nearbyAirports}/>
            <MapWidget airports={nearbyAirports}/>
          </>
        : ''
      }
    </div>
  )
}

export default Home;