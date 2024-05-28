import Pelicula from "../models/peliculas.js";
import Clasificacion from "../models/clasificaciones.js";

// Asociaciones

// Una clasificación tiene muchas películas
Clasificacion.hasMany(Pelicula, {
  foreignKey: "id_clasificacion",
  as: "peliculas",
});
Pelicula.belongsTo(Clasificacion, {
  foreignKey: "id_clasificacion",
  as: "clasificacion",
});
