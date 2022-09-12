import axios from "axios";

export function getVideogames(){
  return async function(dispatch){
    let json= await axios("http://localhost:3001/videogames");
    return dispatch({
      type: "GET_VIDEOGAMES",
      payload: json.data
    })
  }
}

export function getGenres(){
  return async (dispatch) => {
    let genres = (await axios("http://localhost:3001/genres")).data;
    return dispatch({
      type: "GET_GENRES",
      payload:genres
    })
  }
}

export function filterVideogamesByGenre(payload){
  //console.log(payload)
  return {
    type:"FILTER_BY_GENRE",
    payload

  }  
}

export function filterVideogamesApiOCreado(payload){
  return{
    type: "FILTER_BY_API_CREADO",
    payload
  }
}

export function orderByName(payload){
  return{
    type: "ORDER_BY_NAME",
    payload
  }
}

export function orderByRating(payload){
  return{
    type: "ORDER_BY_RATING",
    payload
  }
}

export function getVideogameByName(name){
  return async (dispatch) =>{
    try{
      let json = (await axios(`http://localhost:3001/videogames/?name=${name}`)).data
      return dispatch({
        type: "GET_VIDEOGAME_BY_NAME",
        payload:json
      })
    } catch(error){console.error(error);}
  }
}

export function postVideogame(payload){
  return async (dispatch)=>{
    const json = await axios.post(`http://localhost:3001/videogames`,payload);
    return json
  }
}

export function getDetails(id){
  return async(dispatch)=>{
    try{
      let json =(await axios(`http://localhost:3001/videogames/${id}`)).data;
      console.log(json)
      return dispatch({
        type: "GET_DETAILS",
        payload: json
      })
    } catch(error){console.error(error)}
  }
}