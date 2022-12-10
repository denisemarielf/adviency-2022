import React, { useState } from "react"
import { Gift } from "../types"

interface FormState {
    inputValues: Gift
}

interface FormProps {
    onNewGift: (newGift: Gift) => void
}

export default function Form({ onNewGift }: FormProps){ 

    const [inputValues, setInputValues] = useState<FormState["inputValues"]>({
        name: "",
        id: 0
    })

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        onNewGift(inputValues)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValues({
            ...inputValues,
            [e.target.name]: e.target.value
        })
    }

    return (
        <form className="form" onSubmit={handleSubmit}>
            <input className="form-input" onChange={handleChange} value={inputValues.name} type="text" name="name" placeholder="Agrega un nuevo regalo"></input>
            <button className="form-button">Agregar</button>
        </form>
    )
}