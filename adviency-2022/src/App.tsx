import { useState } from 'react';

import './App.css';
import List from "./components/List"
import Form from './components/Form';
import { Gift } from './types';


function App() {

  const [gifts, setGifts] = useState<Gift[]>([{name: "Medias", id: 1}, {name: "Gorras", id: 2}, {name:"Bufandas", id: 3 } ])
  const handleNewGift = (newGift: Gift): void => {
    setGifts(gifts => [...gifts, newGift])
  }


  return (
    <div className="App">
      <div className='wishlist-container'>
        
        <h1 className='wishlist-title'>Lista de regalos</h1>
        <Form onNewGift={handleNewGift}/>
        <List gifts={gifts}/>
      </div>
    </div>
  );
}

export default App;
