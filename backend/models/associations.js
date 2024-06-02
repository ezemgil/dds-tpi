import NominacionPelicula from "./nominaciones_pelicula.js";
import Academia from "./academias.js";
import Premio from "./premios.js";
import Pelicula from "./peliculas.js";
import Clasificacion from "./clasificaciones.js";
import Genero from "./generos.js";
import Cineasta from "./cineastas.js";
import Pais from "./pais.js";
import RolesCineasta from "./rolesCineasta.js";
import TipoRol from "./tiposRol.js";
import NominacionCineasta from "./nominacionesCineasta.js";
import PeliculaCineastaRol from "./peliculasCineastaRol.js";

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
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

// Un género tiene muchas películas
Genero.belongsToMany(Pelicula, {
  through: "GenerosPelicula",
  foreignKey: "id_genero",
  as: "peliculas",
  timestamps: false,
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Cineasta.belongsTo(Pais, {
  foreignKey: "nacionalidad",
  as: "pais",
});

Pais.hasMany(Cineasta, {
  foreignKey: "nacionalidad",
  as: "cineastas",
});

Cineasta.belongsTo(Pais, {
  foreignKey: "nacionalidad2",
  as: "pais2",
});

RolesCineasta.belongsTo(Cineasta, {
  foreignKey: "id_cineasta",
  as: "cineasta",
});

RolesCineasta.belongsTo(TipoRol, {
  foreignKey: "id_rol",
  as: "rol",
});

Cineasta.hasMany(RolesCineasta, {
  foreignKey: "id_cineasta",
  as: "roles",
});

TipoRol.hasMany(RolesCineasta, {
  foreignKey: "id_rol",
  as: "roles",
});


// Una NominacionCineasta tiene una pelicula
NominacionCineasta.belongsTo(Pelicula, {
  through: "PeliculaCineastRol",
  foreignKey: "id_pelicula",
  as: "pelicula",
  timestamps: false,
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});


// Una NominacionCineasta tiene un cineasta
NominacionCineasta.belongsTo(Cineasta, {
  through: "PeliculaCineastRol",
  foreignKey: "id_cineasta",
  as: "cineasta",
  timestamps: false,
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});


// Una NominacionCineasta tiene un rol
NominacionCineasta.belongsTo(TipoRol, {
  through: "PeliculaCineastRol",
  foreignKey: "id_rol",
  as: "tipoRol",
  timestamps: false,
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});


// Una Pelicula puede tener muchas PeliculaCineastaRol
Pelicula.hasMany(PeliculaCineastaRol, {
  foreignKey: "id_pelicula",
  as: "peliculaCineastaRol",
  timestamps: false
});


// Un Cineasta puede tener muhcas PeliculaCineastaRol
Cineasta.hasMany(PeliculaCineastaRol, {
  foreignKey: "id_cineasta",
  as: "peliculaCineastaRol",
  timestamps: false
});


// Un Rol puede tener muchas PeliculaCineastaRol
TipoRol.hasMany(PeliculaCineastaRol, {
  foreignKey: "id_rol",
  as: "peliculaCineastaRol",
  timestamps: false
});


// Una peliculaCineastaRol tiene una pelicula
PeliculaCineastaRol.belongsTo(Pelicula, {
  foreignKey: "id_pelicula",
  as: "pelicula",
  timestamps: false
});


// Una peliculaCineastaRol tiene un cineasta
PeliculaCineastaRol.belongsTo(Cineasta, {
  foreignKey: "id_cineasta",
  as: "cineasta",
  timestamps: false
});


// Una peliculaCineastaRol tiene un rol
PeliculaCineastaRol.belongsTo(TipoRol, {
  foreignKey: "id_rol",
  as: "tipoRol",
  timestamps: false
});