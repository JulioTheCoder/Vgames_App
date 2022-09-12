const { Router } = require("express");
const videogamesControllers = require("./../Controllers/VideogameControllers");
const julioController = require("./../Controllers/JulioController")
//Importamos los controladores


const router = Router();

//Configuramos las rutas de videogames
router.use("/julio/:name", julioController.getParams)
router.use("/:id", videogamesControllers.getVideogameById);
router.use("/", videogamesControllers.getAllVideogames);
router.post("/", videogamesControllers.postVideogame);

module.exports = router; 

