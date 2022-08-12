import './AirportSearch.css';
import React from 'react';
import { GPSCoordinates } from '../../utils/common.types';
import AirportLoader from './AirportLoader';
import AirportNearbyLoader from './AirportNearbyLoader';


let airportLoader: AirportLoader;
let airportNearbyLoader: AirportNearbyLoader;

const getAirports = async () => {
  airportLoader = new AirportLoader();
  await airportLoader.get();
  // console.log(airportLoader.data);

  airportNearbyLoader = new AirportNearbyLoader(5, (coordinates: GPSCoordinates, data: any) => {
    console.log(coordinates);
    // console.log(data);
  });
}

getAirports();

const AirportSearch = () => {
  return (
    <div className="airport-search">
      <input type="input" className='airport-search-input'></input>
      <div className="airport-search-flyout">
        <ul className='airport-search-list'>
          <li>
            <span className='airport-search-list-item'>
              <span className='airport-search-icon material-icons'>flight</span>
              <span className='airport-name'>Prague</span>
            </span>
            <span className='airport-search-distance'>150km</span></li>
          <li>Vienna <span className='airport-search-distance'>200km</span></li>
          <li>Linz <span className='airport-search-distance'>130km</span></li>
          <li>Salzburg <span className='airport-search-distance'>250km</span></li>
        </ul>
      </div>
    </div>
  )
}

export default AirportSearch;