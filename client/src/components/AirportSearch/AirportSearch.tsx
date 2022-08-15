import './AirportSearch.css';
import React, { ChangeEvent, ChangeEventHandler, useEffect, useState } from 'react';
import AirportLoader from './AirportLoader';
import AirportNearbyLoader from './AirportNearbyLoader';
import AirporSearchItem from './AirportSearchItem';
import { AirportEntity } from '../../utils/common.types';


const filterAirports = (airports: AirportEntity[], keyword = '', max_count = 10): AirportEntity[] => {
  if (keyword === '') return [];
  const res = [];
  keyword = keyword.toLowerCase();
  for (let i = 0; i < airports.length; i += 1) {
    const airport = airports[i];
    const airportName = airport.stripped_name.toLowerCase();
    if (airportName.includes(keyword)) {
      res.push(airport);
      if (res.length >= max_count) break;
    }
  }
  return res;
}


const AirportSearch = () => {
  const [allAirports, setAllAirports] = useState([]);
  const [nearbyAirports, setNearbyAirports] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    new AirportNearbyLoader(5, (data: any) => {
      setNearbyAirports(data);
    });
    new AirportLoader((data: any) => {
      setAllAirports(data);
    });

  }, []);

  const searchInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  }

  let matchedAirports: AirportEntity[] = [];

  if (searchValue.length > 0) {
    let allMatched = filterAirports(allAirports, searchValue, 10);
    const nearbyMatched = filterAirports(nearbyAirports, searchValue);
    allMatched = allMatched.filter(airport => !nearbyMatched.find(near => near.iata === airport.iata));
    matchedAirports = [...nearbyMatched, ...allMatched];
  } else {
    matchedAirports = nearbyAirports;
  }

  const matched = matchedAirports.map(({ name, stripped_name, iata, distance }) => {
    return <AirporSearchItem
      key={iata}
      name={name}
      distance={distance} 
      search={searchValue}
      searchName={stripped_name}
      nearby={distance ? true : false } />
  });

  return (
    <div className="airport-search">
      <input type="input" className='airport-search-input' onChange={searchInputChange}/>
      <div className="airport-search-flyout">
        {matchedAirports.length > 0
        ? <ul className='airport-search-list'>
            {matched}
          </ul>
        : <div className='airport-search-no-match'>
            <span>
              No airports found for&nbsp;<strong>{searchValue}</strong>
            </span>
          </div>
        }
      </div>
    </div>
  )
}

export default AirportSearch;