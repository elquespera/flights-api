import React from 'react';

const AirporSearchItem = ({ name = '', distance = 0, search = '', searchName = '', nearby = false }) => {
  let airportName;
  const s_name = (searchName || name).toLowerCase();
  const searchIndex = s_name.indexOf(search.toLowerCase());
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

  return (
    <li>
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