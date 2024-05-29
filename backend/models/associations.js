import Pelicula from "../models/peliculas.js";
import Clasificacion from "../models/clasificaciones.js";
import Genero from "../models/generos.js";

// Asociaciones

// Una clasificación tiene muchas películas
Clasificacion.hasMany(Pelicula, {
  foreignKey: "id_clasificacion",
  as: "peliculas",
  timestamps: false,
});
Pelicula.belongsTo(Clasificacion, {
  foreignKey: "id_clasificacion",
  as: "clasificacion",
  timestamps: false,
});

// Una película tiene muchos géneros
Pelicula.belongsToMany(Genero, {
  through: "GenerosPelicula",
  foreignKey: "id_pelicula",
  as: "generos",
  timestamps: false,
});

// Un género tiene muchas películas
Genero.belongsToMany(Pelicula, {
  through: "GenerosPelicula",
  foreignKey: "id_genero",
  as: "peliculas",
  timestamps: false,
});
