import { useReducer } from 'react';
import uuid from 'react-uuid';

import './App.css';
import List from "./components/List"
import Form from './components/Form';
import { Gift } from './types';


const initialState = [{name: "Medias", id: uuid(), quantity: 1}, {name: "Gorras", id: uuid(), quantity: 1}, {name:"Bufandas", id: uuid(), quantity: 1 } ]

type GiftsReducerAction = {
  type: "added" 
  name: string
  id: string
  quantity: number
} | {
      type: "deleted"
      id: string
} | {
  type: "cleared"
}

function giftsReducer(gifts: Gift[], action: GiftsReducerAction) {
  switch (action.type) {
    case "added":{
      return [
        ...gifts,
        {
          id: action.id,
          name: action.name,
          quantity: action.quantity
        }
      ]
  }    
  case "deleted": {
      return gifts.filter((t) => t.id !== action.id);
  }
  case "cleared": {
    return []
  }
}}

function App() {

  const [gifts, dispatch] = useReducer(giftsReducer, initialState)
  
  const handleNewGift = (newGift: Gift): void => {
    let repeated = gifts.find((element) => element.name.toLowerCase() === newGift.name.toLowerCase())
    if (!repeated){
    dispatch({
      type: "added",
      name: newGift.name,
      id: newGift.id,
      quantity: newGift.quantity
    })
  }
  }

  const handleDeleteGift = (id: string):void => {
    dispatch({
      type: "deleted",
      id: id
    })
  }

  const handleClearAll = ():void => {
    dispatch({
      type: "cleared"
    })
  }


  return (
    <div className="App">
      <div className='wishlist-container'>
        
        <h1 className='wishlist-title'>Lista de regalos</h1>
        <Form onNewGift={handleNewGift}/>
        <List gifts={gifts} onDeleteGift={handleDeleteGift}/>
        {gifts.length === 0 && <p className='message'>No seas grinch! Agregá algo!</p>}
        <button onClick={handleClearAll} className="clear-button">Borrar todo</button>
      </div>
    </div>
  );
}

export default App;
