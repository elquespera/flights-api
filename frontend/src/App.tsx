import './App.scss';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import Airport from './components/Airport/Airport';
import AirportSearch from './components/AirportSearch/AirportSearch';

const App = () => {
  return (
    <main>
      <BrowserRouter>
        <header>
          <h1>Search airports</h1>
          <AirportSearch />
        </header>
          <Routes>
            <Route path="airport">
              <Route path=":iata/*" element={<Airport />} />
            </Route>
          </Routes>
      </BrowserRouter>
      <div>
      </div>
    </main>
  )
}

export default App;
