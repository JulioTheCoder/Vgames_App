import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as action from "../actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import Paginado from "./Paginado";
import SelectOptions from "./SelectOptions";
import SearchBar from "./SearchBar";

export default function Home (){
  const dispatch = useDispatch();
  const allVideogames = useSelector((state) => state.videogames);
  const allGenres = useSelector((state) => state.genres)
  const [order, setOrder]= useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [ videogamesPerPage, setVideogamesPerPage] = useState(15);
  const indexOfLastVideogame = currentPage*videogamesPerPage;
  const indexOfFirstVideogame = indexOfLastVideogame-videogamesPerPage;
  const currentVideogames = allVideogames.slice(indexOfFirstVideogame,indexOfLastVideogame);


  const paginado = (pageNumber) =>{//Aquí podremos controlar el paginado
    setCurrentPage(pageNumber)
  }
  

  useEffect(() =>{
    dispatch(action.getVideogames())
    dispatch(action.getGenres())
  },[dispatch])

  function handleClick(e){
    e.preventDefault();
    dispatch(action.getVideogames());
  }

  function handleFilterByGenre(e){
    dispatch(action.filterVideogamesByGenre(e.target.value))
  }

  function handleFilterByApiOCreado(e){
    dispatch(action.filterVideogamesApiOCreado(e.target.value))
  }

  function handleOrderByName(e){
    e.preventDefault()
    if (e.target.value === "defecto") {
      handleClick(e)
    } else {
      dispatch(action.orderByName(e.target.value))
    setCurrentPage(1)
    setOrder(`Ordenado ${e.target.value}`);
    }
    
  }

  function handleOrderByRating(e){
    e.preventDefault()
    if (e.target.value === "defecto") {
      handleClick(e)
    } else {
      dispatch(action.orderByRating(e.target.value))
    setCurrentPage(1)
    setOrder(`Ordenado ${e.target.value}`);
    }
    
  }

  return(
    <div>
      <Link to= "/videogame">Crear Videogame</Link>
      <h1>Video Games</h1>
      <button onClick={e=> {handleClick(e)}}>Refresh</button>
      <div>
          <select onChange={e => handleOrderByName(e)}>
            <option value={"defecto"}>Por nombre</option>
            <option value={"asc"}>Ascendente</option>
            <option value={"des"}>Descendente</option>
          </select>
          <select onChange={e => handleOrderByRating(e)}>
            <option value={"defecto"}>Por rating</option>
            <option value={"asc"}>Ascendente</option>
            <option value={"des"}>Descendente</option>
          </select>
          <select onChange={e => handleFilterByGenre(e)}>
            <option value={"Todo"}>Genero</option>
            <SelectOptions nameOptions={allGenres}/>
          </select>
          <select onChange={e => {handleFilterByApiOCreado(e)}}>
            <option value={"Todo"}>Api/Creado</option>
            <option value={"Api"}>Api</option>
            <option value={"Creado"}>Creado</option>
          </select>
          <SearchBar/>
          <Paginado
          videogamesPerPagina = {videogamesPerPage}
          allVideogames = {allVideogames.length}
          paginado = {paginado}
          />
          {
            allVideogames && currentVideogames.map( el => {
              return(<Card key={el.id} id={el.id} name={el.name} img={el.img} rating={el.rating} genre={el.generos}/>)
            })
          }
      </div>
    </div>
  )
}