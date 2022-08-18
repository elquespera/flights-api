import './Home.scss';
import { useEffect, useState } from 'react';
import { AirportNearbyLoader } from '../../loaders/AirporGPSLoaders';
import { AirportEntity, GPSCoordinates } from '../../utils/common.types';
import MapWidget from './MapWidget/MapWidget';
import NearbyWidget from './NearbyWidget/NearbyWidget';

const Home = () => {
  const [nearbyAirports, setNearbyAirports] = useState<AirportEntity[]>([]);
  const [currentLocation, setCurrentLocation] = useState<GPSCoordinates | null>(null);
  
  useEffect(() => {
    new AirportNearbyLoader((data: any, coordinates: GPSCoordinates | null) => {
      setCurrentLocation(coordinates);
      setNearbyAirports(data);
    }, 10); 
  }, []);

  return (
    <div className='home-wrapper'>
      {nearbyAirports.length > 0
        ? <>
            <NearbyWidget airports={nearbyAirports.slice(0, 5)}/>
            <MapWidget airports={nearbyAirports} center={currentLocation} />
          </>
        : ''
      }
    </div>
  )
}

export default Home;