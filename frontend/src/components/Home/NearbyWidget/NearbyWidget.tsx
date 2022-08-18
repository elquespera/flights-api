import './NearbyWidget.scss';
import React, { useEffect, useState } from 'react';
import { AirportEntity } from '../../../utils/common.types';
import { Link } from 'react-router-dom';

const AirportItem = ({ name = '', iata = '', location = '', distance = -1 }) => {
  return (
    <li>
      <Link to={'airport/' + iata}>
        <span className='material-icons'>flight</span>
        <div className='airport-description'>
          <div className='airport-name'>{name}</div>
          <div className='airport-location'>
            {location} ({distance} km)
          </div>
          <div className='airport-code'>{iata}</div>
        </div>
      </Link>
    </li>
  );
}

const NearbyWidget = ({ airports = [] }: { airports: AirportEntity[] }) => {
  return (
    <div className='widget'>
      <h3>Airports near you location</h3>
      <ul className='airport-list'>
      { airports.map(({ name, iata, location, distance }) => <AirportItem key={iata} { ...{ name, iata, location, distance }} /> ) }
      </ul>
    </div>
  )
}

export default NearbyWidget;

