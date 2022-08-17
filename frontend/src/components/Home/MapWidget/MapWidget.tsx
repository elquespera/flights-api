import './MapWidget.scss';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AirportEntity } from '../../../utils/common.types';

import { Wrapper, Status } from "@googlemaps/react-wrapper";

export const droppedPin = {
  viewBox: "0 0 24 24",
  fillColor: 'black',
  // anchor: new google.maps.Point(12, 24),
  path: "M6 20h12c.55 0 1 .45 1 1s-.45 1-1 1H6c-.55 0-1-.45-1-1s.45-1 1-1zm6-13c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-5c3.27 0 7 2.46 7 7.15 0 2.98-2.13 6.12-6.39 9.39-.36.28-.86.28-1.22 0C7.13 15.26 5 12.13 5 9.15 5 4.46 8.73 2 12 2z",
}

const MapRender = (status: Status) => {
  if (status === Status.SUCCESS) return <></>;
  return <h3>{status} ..</h3>;
};

const Map = ({
  airports
}: {
  airports: AirportEntity[]
}) => {

  const navigate = useNavigate();
  const zoom = 6;
  const center = { lat: 48.9750528, lng: 14.4441344 };

  const [map, setMap] = useState<google.maps.Map | undefined>(undefined);
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, {
        center,
        zoom,
      }));      
    }
  }, [ref, map]);

  useEffect(() => {
    let markers: (google.maps.Marker | undefined)[] = [];
    if (map) {
      markers = airports.map(({ name, iata, latitude, longitude }) => {
        if (!latitude || !longitude) return;
        const marker = new google.maps.Marker();
        marker.setOptions({ 
          map, 
          position: { lat: latitude, lng: longitude },
          title: name,
          
          // icon: 2
          // icon: droppedPin,
        });
        marker.addListener('click', () => navigate(`airport/${iata}`));
        return marker;
      });    
    }
    return () => {
      markers.forEach(marker => marker && marker.setMap(null));
    }
  }, [map])

  return (
    <div ref={ref} className='airport-map' id='airport-map'>
    </div>
  );
}

const MapWidget = ({ airports = [] }: { airports: AirportEntity[] }) => {
  return (
    <div className='map-widget home-widget'>
      <Wrapper 
        apiKey='putYourApiKeyHere'
        render={MapRender}>
          <Map airports={airports}></Map>
      </Wrapper>
    </div>
  )
}

export default MapWidget;

