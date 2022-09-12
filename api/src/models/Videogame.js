const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Videogames', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    released: {
      type: DataTypes.STRING,
      allowNull: false
    },
    rating: {
      type: DataTypes.DOUBLE,
      defaultValue: 0
    },
    plataforms: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    },
    img: {
      type:DataTypes.STRING,
      defaultValue: "https://cdn.imgbin.com/2/15/20/imgbin-bloodborne-video-game-pixel-art-computer-software-tetris-bloodborne-gray-game-controller-eUxcd9JLNNeXrB6WA9LNJeJVd.jpg"
    },
    created:{
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }

  });
};
