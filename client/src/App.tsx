import React, { useEffect } from 'react';
import AirportSearch from './components/AirportSearch/AirportSearch';

const App = () => {
  return (
    <main className="app-wrapper">
      <h1>Flights Search</h1>
      <AirportSearch />
      <div>
      </div>
    </main>
  )
}

export default App;
