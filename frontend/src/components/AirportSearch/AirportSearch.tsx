import './AirportSearch.scss';
import React, { ChangeEvent, useEffect, useState } from 'react';
import AirportLoader from '../../loaders/AirportLoader';
import { AirportDistanceLoader } from '../../loaders/AirporGPSLoaders';
import AirporSearchItem from './AirportSearchItem';
import { AirportCodeDistanceEntity, AirportEntity } from '../../utils/common.types';
import filterAirports from './filterAirports';

const MAX_NEARBY_AIRPORTS = 5;
const MAX_SEARCH_ITEMS = 10;

const AirportSearch = () => {
  const [allAirports, setAllAirports] = useState<AirportEntity[]>([]);
  const [airportDistances, setAirportDistances] = useState<AirportCodeDistanceEntity[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [active, setActive] = useState(false);

  const checkAirportDistances = () => {
    if (airportDistances.length > 0) {
      let airports = airportDistances.map((item, index) => {
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
    new AirportDistanceLoader((data: any) => {
      setAirportDistances(data);
    });
  }, []);

  useEffect(() => checkAirportDistances(), [airportDistances]);

  const searchInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;
    value = value.toLocaleLowerCase().trim();
    setSearchValue(value);
  }

  let matchedAirports: AirportEntity[] = []; 

  if (searchValue.length > 0) {
    matchedAirports = filterAirports(allAirports, searchValue, MAX_SEARCH_ITEMS);
  } else {
    if (airportDistances.length > 0)
      matchedAirports = allAirports.slice(0, MAX_NEARBY_AIRPORTS);
  }

  const matched = matchedAirports.map(({ name, stripped_name, iata, distance }) => {
    return <AirporSearchItem
      key={iata}
      name={name}
      iata={iata}
      distance={distance} 
      search={searchValue}
      searchName={stripped_name}
      nearby={distance ? true : false } />
  });

  return (
    <div className={'airport-search ' + (active ? 'active' : '')}>
      <input type='text' 
        className='airport-search-input' 
        placeholder='Choose airport'
        onChange={searchInputChange}
        onFocus={() => setActive(true)}
        onBlur={() => setActive(false)}
      />
      <div className="airport-search-flyout">
        <button className='flyout-back-button' title='Back'>
          <span className='material-icons'>arrow_back</span>
        </button>
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