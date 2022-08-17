import React from 'react';
import { useNavigate } from 'react-router-dom';

const AirporSearchItem = ({ name = '', searchName = '', iata = '', distance = 0, search = '', nearby = false }) => {
  let airportName;
  const s_name = name.toLowerCase();
  const searchIndex = s_name.indexOf(search);
  if (search.length > 0 && searchIndex >= 0) {
    airportName = (
      <span>
        {name.slice(0, searchIndex)}
        <b>{name.slice(searchIndex, searchIndex + search.length)}</b>
        {name.slice(searchIndex + search.length)}
      </span>
    )
  } else {
    airportName = name;
  }

  const navigate = useNavigate();
  const airportSelect = (iata: string) => {
    navigate(`/airport/${iata}`);
  }

  return (
    <li onClick={() => airportSelect(iata)}>
      <span className='airport-search-list-item'>
        <span className='airport-search-icon material-icons'>
          {nearby ? 'near_me' : 'flight'}
        </span>
        <span className='airport-name'>{airportName}</span>
      </span>
      {distance
        ? <span className='airport-search-distance'>{`${distance} km`}</span>
        : ''
      }
    </li>
  );
}

export default AirporSearchItem;