import React from "react";
import { Link } from "react-router-dom";
import s from "./Landing.module.css"


export default function LandingPage(){
  return(
    <div className={`${s.landing}`}>
      <h1>Bienvenido a Videogames app</h1>
      <Link to= "/home">
        <button>Entrar</button>
      </Link>
    </div>
  )
}