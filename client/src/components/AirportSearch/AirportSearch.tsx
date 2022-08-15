import './AirportSearch.css';
import React, { ChangeEvent, ChangeEventHandler, useEffect, useState } from 'react';
import AirportLoader from './AirportLoader';
import AirportNearbyLoader from './AirportNearbyLoader';
import AirporSearchItem from './AirportSearchItem';
import { AirportCodeDistanceEntity, AirportEntity } from '../../utils/common.types';

const MAX_NEARBY_AIRPORTS = 5;
const MAX_SEARCH_ITEMS = 10;

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
  const [allAirports, setAllAirports] = useState<AirportEntity[]>([]);
  const [nearbyAirports, setNearbyAirports] = useState<AirportCodeDistanceEntity[]>([]);
  const [searchValue, setSearchValue] = useState('');

  const checkNearbyAirports = () => {
    if (nearbyAirports.length > 0) {
      let airports = nearbyAirports.map((item, index) => {
        const airport = allAirports.find(airport => airport.iata === item.iata);
        if (airport && index < MAX_NEARBY_AIRPORTS) {
          airport.distance = item.distance;
        }
        return airport;
      });
      setAllAirports(airports as AirportEntity[]);
    }
  }

  useEffect(() => {
    new AirportLoader((data: any) => {
      setAllAirports(data);
    });
    new AirportNearbyLoader((data: any) => {
      setNearbyAirports(data);
    });
  }, []);

  useEffect(() => checkNearbyAirports(), [nearbyAirports]);

  const searchInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;
    value = value.toLocaleLowerCase().trim();
    setSearchValue(value);
  }

  let matchedAirports: AirportEntity[] = []; 

  if (searchValue.length > 0) {
    matchedAirports = filterAirports(allAirports, searchValue, MAX_SEARCH_ITEMS);
  } else {
    matchedAirports = allAirports.slice(0, MAX_NEARBY_AIRPORTS);
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