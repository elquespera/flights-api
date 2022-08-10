import axios from 'axios';
import React, { useEffect } from 'react';
import './App.css';

const airportsNearby = async () => await (await axios.get('localhost:4321/api/aiports')).data; 

const App = () => {
  useEffect(() => {
    const airports = airportsNearby();
    console.log(airports);
  }, []);
  return (
    <div className="App">
      
    </div>
  );
}

export default App;
