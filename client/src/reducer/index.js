
const initialState= {
  videogames : [],
  allVideogames: [],
  genres:[],
  details:[]
}
 function rootReducer (state = initialState, action){
  
 
  switch(action.type){
    case "GET_VIDEOGAMES":
      return{
        ...state,
        videogames: action.payload,
        allVideogames:action.payload
      }
    
    case "GET_GENRES":
      return{
        ...state,
        genres: action.payload
      }
    
    case "FILTER_BY_GENRE": 
    const allVideogamesFBG = state.allVideogames;
    //console.log("Paiload: ",action.payload)
    const statusFiltered = action.payload === "Todo"? allVideogamesFBG: allVideogamesFBG.filter(el => el.generos.includes(action.payload));
    
      return{
        ...state,
        videogames:statusFiltered
      }

    case "FILTER_BY_API_CREADO":
      const allVideogamesFBAC = state.allVideogames;
      const apiOCreado = action.payload === "Api"? allVideogamesFBAC.filter(el => !(el.created)) : allVideogamesFBAC.filter(el => el.created);
      return{
        ...state,
        videogames:action.payload === "Todo"?allVideogamesFBAC:apiOCreado
      }

    case "ORDER_BY_NAME":
      let ordenNameArr = action.payload === "asc"?
      state.videogames.sort(function(a, b){
        if (a.name > b.name) {
          return 1
        }
        if(a.name < b.name){
          return -1;
        }
        return 0;
      }):action.payload === "des"?
      
      state.videogames.sort(function(a, b){
        if (a.name > b.name) {
          return -1;
        }
        if(a.name < b.name){
          return 1;
        }
        return 0
      }):state.allVideogames
      
      return{
        ...state,
        videogames:ordenNameArr
      }

    case "ORDER_BY_RATING":
      let ordenRatingArr = action.payload === "asc"?
      state.videogames.sort(function(a, b){
        if (a.rating > b.rating) {
          return 1
        }
        if(a.rating < b.rating){
          return -1;
        }
        return 0;
      }):action.payload === "des"?
      
      state.videogames.sort(function(a, b){
        if (a.rating > b.rating) {
          return -1;
        }
        if(a.rating < b.rating){
          return 1;
        }
        return 0
      }):state.allVideogames
      
      return{
        ...state,
        videogames:ordenRatingArr
      }
    case "GET_VIDEOGAME_BY_NAME":
      return{
        ...state,
        videogames:action.payload
      }
    case "POST_VIDEOGAME":
      return{
        ...state
      }
    case "GET_DETAILS":
      return{
        ...state,
        details:action.payload
      }

      default:
        return state;
  }
}

export default rootReducer;