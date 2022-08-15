import React, { useEffect, useState } from 'react';

enum AIRPORT_INFO_PAGE {
  INFO,
  DEPARTURES,
  ARRIVALS
}

const AirportInfo = ({ page = AIRPORT_INFO_PAGE.INFO, iata = '' }) => {
  return (
    <div>
      <h4>Info</h4>
    </div>
  )
}

export default AirportInfo;
export { AIRPORT_INFO_PAGE };