import './NearbyWidget.scss';
import React, { useEffect, useState } from 'react';
import { AirportEntity } from '../../../utils/common.types';
import { Link } from 'react-router-dom';

const AirportItem = ({name = '', iata = '', location = ''}) => {
  return (
    <li>
      <Link to={'airport/' + iata}>
        <span className='material-icons'>flight</span>
        <div>
          <div>{name}</div>
          <div>{location}</div>
          <div>{iata}</div>
        </div>
      </Link>
    </li>
  );
}

const NearbyWidget = ({ airports = [] }: { airports: AirportEntity[] }) => {
  return (
    <div className='home-widget'>
      <ul className='airport-list'>
      { airports.map(({ name, iata, location}) => <AirportItem key={iata} { ...{ name, iata, location}} /> ) }
      </ul>
    </div>
  )
}

export default NearbyWidget;

