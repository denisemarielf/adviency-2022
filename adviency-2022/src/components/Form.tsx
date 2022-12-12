import React, { useReducer } from "react"
import { Gift } from "../types"
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import uuid from 'react-uuid';

interface FormState {
    inputValues: Gift
}

interface FormProps {
    onNewGift: (newGift: Gift) => void
    closeForm: () => void
}

const INITIAL_STATE = {
    name: "",
    id: "",
    quantity: 1,
    img: "",
    addressee: ""
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

export default function Form({ onNewGift, closeForm }: FormProps){ 

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
        <div className="form-container">
            
            <form className="form" onSubmit={handleSubmit}>                
            <button className="list-button" onClick={closeForm}>
                <FontAwesomeIcon icon={faXmark}/>
            </button>
            <h1 className="wishlist-title">Nuevo regalo</h1>
                <label> Regalo
                <input className="form-input" onChange={handleChange} value={inputValue.name} type="text" name="name" placeholder="Agrega un nuevo regalo"></input>
                </label>
                <label> Link de imagen
                <input className="form-input" onChange={handleChange} value={inputValue.img} type="text" name="img" placeholder="URL de imagen" />
                </label>
                <label> Destinatario
                <input className="form-input" onChange={handleChange} value={inputValue.addressee} type="text" name="addressee" placeholder="Destinatario" />
                </label>
                <label> Cantidad
                <input className="form-input-quantity" onChange={handleChange} value={inputValue.quantity} type="number" name="quantity" ></input>
                </label>
                <button className="form-button">Agregar</button>
            </form>
        </div>
    )
}