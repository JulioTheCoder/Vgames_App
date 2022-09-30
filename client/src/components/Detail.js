import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetails } from "../actions";
import { useEffect } from "react";

export default function Detail(props){
  
  const dispatch = useDispatch()

  useEffect(()=> {
    dispatch(getDetails(props.match.params.id));
  },[dispatch]);

  const myVideogame = useSelector((state)=> state.details);
  console.log(myVideogame)
  return(
    <div>
      {
        myVideogame.length>0 ?
        <div>
          <h1>{myVideogame[0].name}</h1>
          <img src={myVideogame[0].img} alt="Not Found Image" width={"300px"} height={"375px"}/>
          <h2>Generos: {myVideogame[0].generos.join(", ")}</h2>
          <h3>Lanzamiento: {myVideogame[0].released}</h3>
          <h3>Rating: {myVideogame[0].rating}</h3>
          <h2>Plataformas: {myVideogame[0].plataforms.join(", ")}</h2>
          <div>
          <h2>Descripción:</h2>
          {myVideogame[0].description}
          </div>
          
        </div>:
        <p>Loading...</p>
      }

      <Link to={"/home"}>
        <button>Volver</button>
      </Link>
    </div>
  )
}