import './App.scss';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import Airport from './components/Airport/Airport';
import AirportSearch from './components/AirportSearch/AirportSearch';
import Home from './components/Home/Home';

const App = () => {
  return (
    <main>
      <BrowserRouter>
        <header>
          <h1>Search airports</h1>
          <AirportSearch />
          <a className='attribution-link' 
            href='https://www.vecteezy.com/free-vector/nature'
            target='_blank'>
              Nature Vectors by Vecteezy'
          </a>
        </header>
        <section className='content'>
          <Routes>
            <Route index element={<Home />}/>
            <Route path="airport">
              <Route path=":iata/*" element={<Airport />} />
            </Route>
          </Routes>
        </section>
      </BrowserRouter>
    </main>
  )
}

export default App;
