const { Router } = require('express');

//Importamos las rutas
const videogamesRouter = require("./VideogameRouter");
const genreRouter = require("./GenreRouter");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

  router.use("/videogames", videogamesRouter);
  router.use("/genres", genreRouter );
module.exports = router;
