import './MapWidget.scss';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AirportEntity, GPSCoordinates } from '../../../utils/common.types';

import { Wrapper, Status } from "@googlemaps/react-wrapper";

const MapRender = (status: Status) => {
  if (status === Status.SUCCESS) return <></>;
  return <h3>{status} ..</h3>;
};

const Map = ({
  airports,
  coordinates,
}: {
  airports: AirportEntity[],
  coordinates: GPSCoordinates | null
}) => {

  const center = (): google.maps.LatLngLiteral => {
    if (coordinates) 
      return {lat: coordinates.latitude, lng: coordinates.longitude };
    return {lat: 54.305282, lng: 26.843193 };
  }

  const navigate = useNavigate();

  const [map, setMap] = useState<google.maps.Map | undefined>(undefined);
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, {
        center: center(),
        zoom: 7,
        disableDefaultUI: true,
        styles: [
          {featureType: "road", stylers: [{visibility: "off"}]},
          {featureType: "poi", stylers: [{visibility: "off"}]},
          {featureType: "transit", stylers: [{visibility: "off"}]},
        ]
      }));      
    }
  }, [ref, map]);

  useEffect(() => {  
    let markers: (google.maps.Marker | undefined)[] = [];
    if (map) {
      const droppedPin: google.maps.Symbol = {
        path: "M21 14.58c0-.36-.19-.69-.49-.89L13 9V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-7.51 4.69a1.05 1.05 0 0 0 .87 1.89L10 13.5V19l-1.8 1.35a.48.48 0 0 0-.2.4v.59c0 .33.32.57.64.48L11.5 21l2.86.82c.32.09.64-.15.64-.48v-.59a.48.48 0 0 0-.2-.4L13 19v-5.5l6.64 2.08c.68.21 1.36-.3 1.36-1z",
        fillOpacity: 1,
        fillColor: '#222222',
        scale: 1.2,
        strokeWeight: 0,
        labelOrigin: new google.maps.Point(8, -9),
      }      
      markers = airports.map(({ name, iata, latitude, longitude }) => {
        if (!latitude || !longitude) return;
        const marker = new google.maps.Marker();
        marker.setOptions({ 
          map, 
          position: { lat: latitude, lng: longitude },
          title: name,
          icon: droppedPin,
          label: {
            text: name,
            className: 'map-label',
            fontWeight: 'bold',
            fontSize: '12px',
            color: 'white'
          }
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

const MapWidget = (
  { airports, coordinates }: { airports: AirportEntity[], coordinates: GPSCoordinates | null }
) => {
  return (
    <div className='map-widget home-widget'>
      <Wrapper 
        apiKey='putYourApiKeyHere'
        render={MapRender}>
          <Map airports={airports} coordinates={coordinates}></Map>
      </Wrapper>
    </div>
  )
}

export default MapWidget;

