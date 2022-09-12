import { React, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector  } from "react-redux";
import { postVideogame, getGenres } from "../actions";
import SelectOptions from "./SelectOptions";


export function VideogameCreate(){
  const dispatch = useDispatch();
  const history = useHistory();
  const generos = useSelector((state) => state.genres)

  const [input, setInput] = useState({
    name: "",
    description: "",
    img: "",
    released: "",
    rating: 0,
    genres: [],
    plataforms: [],
  });

  function handleChange(e){
    
    console.log(e.target.name+" Y "+e.target.value);
    setInput({
      ...input,
      [e.target.name] : e.target.value
    })
  }
  function handleSelectPlataform(e){
    setInput({
      ...input,
      plataforms: [...input.plataforms,e.target.value]
    })
  }

  function handleSelectGenres(e){
    setInput({
      ...input,
      genres: [...input.genres,e.target.value]
    })
  }
  function handleSubmit(e){
    e.preventDefault();
    dispatch(postVideogame(input))
    alert("Videojuego Creado!")
    setInput({
      name: "",
      description: "",
      img: "",
      released: "",
      rating: 0,
      genres: [],
      plataforms: [],
    })
    history.push("/home");
  }

  useEffect(() =>{
    dispatch(getGenres())
    
  },[dispatch])

  return(
    <div>
      <Link to = "/home"><button>Volver</button></Link>

      <h1>Crea un videojuego</h1>

      <form onSubmit={(e)=> handleSubmit(e)}>
        <div>
          <label>Nombre: </label>
          <input
            type="text"
            value={input.name}
            name ="name"
            onChange={(e)=>handleChange(e)}
          />
        </div>
        <div>
          <label>Descripcion: </label>
          <input
            type="text"
            value={input.description}
            name="description"
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Imagen: </label>
          <input
            type="text"
            value={input.img}
            name="img"
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Lanzamiento: </label>
          <input
            type="text"
            value={input.released}
            name="released"
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Rating: </label>
          <input
            type="number"
            value={input.rating}
            name="rating"
            onChange={handleChange}
          />
         </div>
         <label>Plataformas: </label>
        <select onChange={(e)=>handleSelectPlataform(e)}>
          <option value={"PC"}>PC</option>
          <option value={"PlayStation"}>PlayStation</option>
          <option value={"Xbox"}>Xbox</option>
          <option value={"Nintendo"}>Nintendo</option>
          <option value={"Mac"}>Mac</option>
          <option value={"IOS"}>IOS</option>
          <option value={"Android"}>Android</option>
          <option value={"Navegador"}>Navegador</option>
        </select>
        <ul><li>{input.plataforms.map(p=>p + ",")}</li></ul>
        <label>Generos: </label>
        <select onChange={(e) => handleSelectGenres(e)}>
          
          <SelectOptions nameOptions={generos}/>
        </select>
        <ul><li>{input.genres.map(p=>p + ",")}</li></ul>

        <button type="submit">Crear Videojuego</button>
      </form>
    </div>
  )
}