import { useReducer, useEffect, useState } from 'react';

import './App.css';
import List from "./components/List"
import Form from './components/Form';
import { Gift } from './types';

type GiftsReducerAction = {
  type: "added" 
  name: string
  id: string
  quantity: number
  img: string

} | {
      type: "deleted"
      id: string
} | {
  type: "cleared"
} | {
  type: "storage"
  elements: Gift[]
}

function giftsReducer(gifts: Gift[], action: GiftsReducerAction) {
  switch (action.type) {
    case "added":{
      
      return [
        ...gifts,
        {
          id: action.id,
          name: action.name,
          quantity: action.quantity,
          img: action.img
        }
      ]
   
  }    
  case "deleted": {
      return gifts.filter((t) => t.id !== action.id);
  }
  case "cleared": {
    window.localStorage.clear()
    return []
  }
  case "storage": {
    return [...action.elements]
  }
}}

function App() {

  const [gifts, dispatch] = useReducer(giftsReducer, [])
  const [form, setForm] = useState(false)
  
  useEffect(() => {
    const elements = JSON.parse(localStorage.getItem('gifts') as any)
    if (elements) {
      dispatch({
        type: "storage",
        elements: elements
      })
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('gifts', JSON.stringify(gifts))
  }, [gifts])


  const handleNewGift = (newGift: Gift): void => {
    let repeated = gifts.find((element) => element.name.toLowerCase() === newGift.name.toLowerCase())
    if (!repeated){
    dispatch({
      type: "added",
      name: newGift.name,
      id: newGift.id,
      quantity: newGift.quantity,
      img: newGift.img
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
        <div className='button-container'>
        <button className="button" onClick={()=>setForm(!form)} >Nuevo regalo</button>
        <button onClick={handleClearAll} className="button">Borrar todo</button>
        </div>
        {form && <Form closeForm={()=>setForm(!form)} onNewGift={handleNewGift}/>}
        <List gifts={gifts} onDeleteGift={handleDeleteGift}/>
        {gifts.length === 0 && <p className='message'>No seas grinch! Agregá algo!</p>}

      </div>
    </div>
  );
}

export default App;
