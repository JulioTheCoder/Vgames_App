import React from "react";
import s from "./Paginado.module.css"
export default function Paginado({videogamesPerPagina, allVideogames, paginado}){
  const pageNumbers=[];
  for (let i = 1; i <= Math.ceil(allVideogames/videogamesPerPagina); i++) {
    pageNumbers.push(i);
    
  }

  return(
    <div className={`${s.paginado}`}>
      <ul className={`${s.paginadoUl}`}>
        {
          pageNumbers &&
          pageNumbers.map(number =>(
            <li key={number}>
              <a onClick={() => paginado(number)}>{number}</a>
            </li>  
          ))
        }
      </ul>
    </div>
  )
}