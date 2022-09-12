require('dotenv').config();
const axios = require("axios");
const { Videogames, Genre } = require("./../db");
const { API_KEY } = process.env;

const getAllVideogames = async(req, res, next) =>{
  const {name} = req.query|| "";
  const api = await getAllDataApi();
  const db = await getAllDataDbFix();
  const data = api.concat(db);

  if (name) {//Si tenemos al nombre en query, se buscrá por nombre
    let result = data.filter(d => d.name.toLowerCase().includes(name.toLowerCase()));
    
    if (result.length) {
      res.json(result);
    } else{// Si el no hay coincidencias con lo que se busca, que avise
      res.status(404).send(`Lo siento, no encontramos el videojuego: ${name}`);
    }
  } else {//Si no tenemos nombre en el query, devolverá todo
    res.json(data);
  }
  
  next();
}

const getVideogameById = async (req, res, next) =>{
  const id = req.params.id;
  const api = await getDataApiById(id);
  const db = await getAllDataDbFix();
  const data = api.concat(db);
  if(id){
    let videogameId = data.filter(d => d.id == id);
    console.log(videogameId)
    videogameId.length>0?
    res.json(videogameId):
    res.status(404).send(`No hay coicidencias con: ${id}`);
  }
}

const postVideogame = async (req, res, next) =>{
  let {
    name,
    description,
    img,
    released,
    rating,
    genres,
    plataforms,
  }= req.body;
 
  let videogameCreate = await Videogames.create({//Creammos nueva fila al modelo videogames
    name,
    description,
    released,
    rating,
    plataforms,
    img: img.length > 0?img:"https://media.istockphoto.com/vectors/video-game-controller-logo-icon-vector-illustration-vector-id1172360686?k=20&m=1172360686&s=170667a&w=0&h=73lnURgZ4aTxADPph9_cDhHfPVWzMK98a3fKpRIoupY=" 
  });
 
  let genreDB = await Genre.findAll({//Obtenemos los generos de nuestra DB
    where: {name: genres}
  });

  await videogameCreate.addGenre(genreDB);//Vinculamos los respectivos generos a la nueva fila
  

  //next();
}

// ------------------Funciones auxiliares--------------------------------
const getAllDataApi = async() =>{
  let data = (await axios(`https://api.rawg.io/api/games?key=3b9526582f7040b5b89cbea26d1f41ba&page_size=50&page=3`)).data.results.map(v =>({
    id: v.id,
    name: v.name,
    img: v.background_image,
    generos: (v.genres).map(g=>g.name),
    released:v.released,
    rating:v.rating,
    plataforms:v.parent_platforms.map(p => p.platform.name),
    description:"No description",
    created: false
  }));
   
  return data;
}

const getDataApiById = async(id) =>{
  try{
    let data = (await axios(`https://api.rawg.io/api/games/${id}?key=3b9526582f7040b5b89cbea26d1f41ba`)).data;
  data=[data];
  data=data.map(v =>({
    id: v.id,
    name: v.name,
    img: v.background_image,
    generos: (v.genres).map(g=>g.name),
    released:v.released,
    rating:v.rating,
    plataforms:v.parent_platforms.map(p => p.platform.name),
    description:v.description,
    created: false
  })); 
  return data;
  } catch (error){return [];}
  
}


const getAllDataDb = async () =>{
  return await Videogames.findAll({
    include: {
      model: Genre,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    }
  })
}

const getAllDataDbFix = async() =>{
  let list = await getAllDataDb();
  let Fix = list.map(el =>({
    id:el.id,
    name: el.name,
    img: el.img,
    generos: el.Genres.map(g=>g.name),
    released:el.released,
    rating:el.rating,
    plataforms:el.plataforms,
    description:el.description,
    created:el.created
  }))
  return Fix;
}
//-----------------------------------------------------------------------
module.exports = {
  getAllVideogames,
  getVideogameById,
  postVideogame
}