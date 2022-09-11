import './App.scss';
import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import Airport from './components/Airport/Airport';
import AirportSearch from './components/AirportSearch/AirportSearch';
import Home from './components/Home/Home';

const App = () => {
  return (
    <main>
      <BrowserRouter>
        <header>
          <h1><Link to='/'>Search airports</Link></h1>
          <AirportSearch />
          <a className='attribution-link' 
            href='https://www.vecteezy.com/free-vector/nature'
            target='_blank'>
              Nature Vectors by Vecteezy
          </a>
          <div className='about-links'>
            <a className='github-link' target='_blank' href='https://github.com/elquespera/flights-api' title='Github repo' />
            <a className='portfolio-link' target='_blank' href='https://pavelgrinkevich.com' title='My portfolio' />
          </div>
        </header>
        <section className='content'>
          <Routes>
            <Route path="*" element={<Home />}/>
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
