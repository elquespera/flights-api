import './AirportSearch.scss';
import React, { ChangeEvent, useEffect, useState, useRef } from 'react';
import AirportLoader from '../../loaders/AirportLoader';
import { AirportDistanceLoader } from '../../loaders/AirporGPSLoaders';
import AirporSearchItem from './AirportSearchItem';
import { AirportCodeDistanceEntity, AirportEntity } from '../../utils/common.types';
import filterAirports from './filterAirports';
import { useNavigate } from 'react-router';

const MAX_NEARBY_AIRPORTS = 5;
const MAX_SEARCH_ITEMS = 10;

const AirportSearch = () => {
  const [allAirports, setAllAirports] = useState<AirportEntity[]>([]);
  const [airportDistances, setAirportDistances] = useState<AirportCodeDistanceEntity[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [searchStatus, setSearchStatus] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

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

  const windowKeyPress = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setSearchStatus(false);
    } 
    else if (inputRef?.current) {
      const input = inputRef.current as HTMLInputElement;
      input.focus();
    }
  }  

  useEffect(() => {
    new AirportLoader((data: any) => {
      setAllAirports(data);
    });
    new AirportDistanceLoader((data: any) => {
      setAirportDistances(data);
    });

    window.addEventListener('keydown', windowKeyPress);
    return () => window.removeEventListener('keydown', windowKeyPress);
  }, []);

  useEffect(() => checkAirportDistances(), [airportDistances]);

  const searchInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;
    value = value.toLocaleLowerCase().trim();
    setSearchValue(value);
  }

  // const 

  const openSearch = () => setSearchStatus(true);
  const closeSearch = () => setSearchStatus(false);

  useEffect(() => {
    if (searchStatus) window.scrollTo(0, 0);
    document.body.style.overflow = searchStatus ? 'hidden' : 'auto';
  }, [searchStatus]);

  let matchedAirports: AirportEntity[] = []; 

  if (searchValue.length > 0) {
    matchedAirports = filterAirports(allAirports, searchValue, MAX_SEARCH_ITEMS);
  } else {
    if (airportDistances.length > 0)
      matchedAirports = allAirports.slice(0, MAX_NEARBY_AIRPORTS);
  }

  function selectAirport(name: string, iata: string) {
    navigate(`/airport/${iata}`);
    closeSearch();
    if (inputRef?.current) {
      const input = inputRef.current as HTMLInputElement;
      input.value = name;
    }
  }

  const matched = matchedAirports.map(({ name, stripped_name, iata, distance }) => {
    return <AirporSearchItem
      key={iata}
      name={name}
      iata={iata}
      distance={distance} 
      search={searchValue}
      searchName={stripped_name}
      nearby={distance ? true : false }
      onClick={selectAirport} />
  });

  return (
    <div className={'airport-search ' + (searchStatus ? 'active' : '')}>
      <input type='text'
        ref={inputRef}
        className='airport-search-input' 
        placeholder='Choose airport'
        onChange={searchInputChange}
        onFocus={openSearch}
        onKeyDown={() => !searchStatus && openSearch()}
        onClick={() => !searchStatus && openSearch()}
      />
      <div className="airport-search-flyout">
        <button 
          className='flyout-back-button' title='Back'
          onClick={closeSearch}>
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