import NominacionPelicula from "./nominaciones_pelicula.js";
import Academia from "./academias.js";
import Premio from "./premios.js";
import Pelicula from "./peliculas.js";

// Asociaciones

// Una nominacion tiene una pelicula
NominacionPelicula.belongsTo(Pelicula, {
  foreignKey: "id_pelicula",
  as: "pelicula",
  timestamps: false,
});

// Una nominacion de pelicula tiene un premio
NominacionPelicula.belongsTo(Premio, {
  foreignKey: "id_premio",
  as: "premio",
  timestamps: false,
});

// Una nominacion de pelicula tiene una academia
NominacionPelicula.belongsTo(Academia, {
  foreignKey: "id_academia",
  as: "academia",
  timestamps: false,
});

// Una academia puede estar en muchas nominaciones de películas
Academia.hasMany(NominacionPelicula, {
  foreignKey: "id_academia",
  as: "nominacion",
  timestamps: false,
});

// Un premio puede estar en muchas nominaciones
Premio.hasMany(NominacionPelicula, {
  foreignKey: "id_premio",
  as: "nominacion",
  timestamps: false,
});

// Una pelicula puede tener muchas nominaciones
Pelicula.hasMany(NominacionPelicula, {
  foreignKey: "id_pelicula",
  as: "nominacion",
  timestamps: false,
});
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
