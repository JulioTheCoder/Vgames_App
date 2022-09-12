const { Router } = require("express");
//Importamos los controladores
const genreController = require("./../Controllers/GenreControllers");

const router = Router();

//Configuramos la ruta de los géneros
router.use("/", genreController.getGenresDB);

module.exports = router;