import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getVideogameByName } from "../actions";

export default function SearchBar () {
  const dispatch = useDispatch();
  const [name, setName]= useState("");

  function hadleInputChange(e){
    e.preventDefault()
    setName(e.target.value)
   
  }
  function handleSubmit(e){
    e.preventDefault()
    dispatch(getVideogameByName(name))
  }

  return(
    <div>
      <input
        type={"text"}
        placeholder="Buscar videojuego..."
        onChange={(e) =>hadleInputChange(e)}
      />
      <button type="submit" onClick={(e) => handleSubmit(e)}>Buscar</button>
    </div>
  )
  
}