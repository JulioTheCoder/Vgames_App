const axios = require("axios");
const { Genre } = require("./../db");

const getAllGenres = async() =>{

  let result = (await axios.get("https://api.rawg.io/api/games?key=3b9526582f7040b5b89cbea26d1f41ba")).data.results.map(d => d.genres.map(g => g.name));
  result= result.flat();
  let genres = [...new Set(result)];//Método de métodos, genial para sacar valores de forma única de un array

  genres.forEach(g =>{
    Genre.findOrCreate({
      where: {name: g}
    })
  })
  console.log("Géneros cargados a la DB");
}

const getGenresDB = (req, res, next) =>{
  Genre.findAll()
  .then(genre => res.send(genre))
  .catch(e => next(e));
}

module.exports = {
  getAllGenres,
  getGenresDB
};