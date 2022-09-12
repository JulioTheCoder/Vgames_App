import React from "react";
import { Link } from "react-router-dom";


export default function Card({name, img, rating, genre, id}){
  return(
    <Link to={`/home/${id}`}>
      <div>
      <img src={img} alt="img not found" width={"200px"} height={"250px"}></img>
      <h2>{name}</h2>
      <h4>{rating}</h4>
      <h3>{genre.join(", ")}</h3>
    </div>
    </Link>
    
  )
};
