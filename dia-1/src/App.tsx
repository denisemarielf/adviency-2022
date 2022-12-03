import React, { useState } from 'react';
import './App.css';

function App() {

  const [gifts, setGifts] = useState(["Medias", "Gorras", "Bufandas"])
  return (
    <div className="App">
      <h1>Lista de regalos</h1>
      <ul>
        {
          gifts.map(gift => {
            return <li>{gift}</li>
          })
        }
        
      </ul>
    </div>
  );
}

export default App;
