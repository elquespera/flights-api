import './AirportSchedule.scss';
import React, { useEffect, useState } from 'react';

enum AIRPORT_SCHEDULE_PAGE {
  ALL,
  DEPARTURES,
  ARRIVALS,
}

const AirportSchedule = ({ page = AIRPORT_SCHEDULE_PAGE.ALL, iata = '' }) => {
  return (
    <div>
      <h4>Info {page} {iata}</h4>
    </div>
  )
}

export default AirportSchedule;
export { AIRPORT_SCHEDULE_PAGE };