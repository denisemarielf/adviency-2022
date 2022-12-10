import React, { useReducer } from "react"
import { Gift } from "../types"
import uuid from 'react-uuid';

interface FormState {
    inputValues: Gift
}

interface FormProps {
    onNewGift: (newGift: Gift) => void
}

const INITIAL_STATE = {
    name: "",
    id: "",
    quantity: 0
}

type FormReducerAction = {
    type: "change_value" 
    payload: {
        inputName: string,
        inputValue: string
    } 
} | {
        type: "clear"
}



function formReducer(state: FormState["inputValues"], action: FormReducerAction) {
    switch (action.type) {
        case 'change_value': {
          const {inputName, inputValue} = action.payload
          return {
            ...state,
            [inputName]: inputValue
          }
        }
        case 'clear': {
          return INITIAL_STATE
        }
      }
}

export default function Form({ onNewGift }: FormProps){ 

    const [inputValue, dispatch] = useReducer(formReducer, INITIAL_STATE)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (inputValue.name !== "") {
            onNewGift({...inputValue, id: uuid()})
            handleClear()
        }

    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        dispatch({
            type: "change_value",
            payload: {
                inputName: name,
                inputValue: value,
            }
        })
        
    }

    const handleClear = () => {
        dispatch({
            type: "clear"
        })
    }

    return (
        <form className="form" onSubmit={handleSubmit}>
            <input className="form-input" onChange={handleChange} value={inputValue.name} type="text" name="name" placeholder="Agrega un nuevo regalo"></input>
            <input className="form-input-quantity" onChange={handleChange} value={inputValue.quantity} type="number" name="quantity" ></input>
            <button className="form-button">Agregar</button>
        </form>
    )
}