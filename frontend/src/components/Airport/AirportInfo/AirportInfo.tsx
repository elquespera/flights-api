import './AirportInfo.scss';
import React, { useEffect, useState } from 'react';
import { AirportEntity, FlightEntity } from '../../../utils/common.types';
import Map from '../../Map/Map';
import { formatMapUrl } from '../../../utils/formatMapUrl';
import AirportSchedule, { AIRPORT_SCHEDULE_PAGE } from '../AirportSchedule/AirportSchedule';
import UctTimer from './UctTimer/UctTimer';

const AirportInfo = ({ airport, flights, isMockData }: { airport?: AirportEntity, flights?: FlightEntity[], isMockData?: boolean }) => {
  if (!airport || !airport.latitude || !airport.longitude) 
    return <h3>Airport not found</h3>;

  const { location, iata, icao, longitude, latitude, website, uct, phone } = airport;
  const coordiantes = { latitude, longitude };

  return (
    <div className='home-wrapper'>
      <div className='widget airport-info'>
        <Map airports={[airport]} center={coordiantes} zoom={6} openMapsOnClick={true}/>
        <div className='info'>
          <h3>{airport.name}</h3>
          <UctTimer uct={airport.uct}/>
          <ul>
            {location && <li>{location}</li>}
            {latitude && <li><span className='info-label'>GPS: </span><a target='_blank' href={formatMapUrl(coordiantes)}>{latitude}, {longitude}</a></li>}
            {iata && <li><span className='info-label'>IATA: </span>{iata}</li>}
            {icao && <li><span className='info-label'>ICAO: </span>{icao}</li>}
            {website && <li><span className='info-label'>Website: </span><a href={website}>{website}</a></li>}
            {phone && <li><span className='info-label'>Phone: </span><a href={`tel:${phone}`}>{phone}</a></li>}
            {uct && <li><span className='info-label'>Timezone: </span>UCT+{Math.floor(uct / 60)}</li>}
          </ul>
        </div>
      </div>
      <div className='widget'>
        <AirportSchedule 
        page={AIRPORT_SCHEDULE_PAGE.BOTH} 
        airport={airport} flights={flights} 
        flightsPerPage={5} 
        showLaterFlights={false}
        isMockData />
      </div>
    </div>
  )

}

export default AirportInfo;
