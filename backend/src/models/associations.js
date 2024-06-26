import Cineasta from "./cineastas.js";
import Clasificacion from "./clasificaciones.js";
import Genero from "./generos.js";
import Idioma from "./idiomas.js";
import NominacionPelicula from "./nominacionesPelicula.js";
import Paises from "./paises.js";
import Pelicula from "./peliculas.js";
import Premios from "./premios.js";
import RolesUsuario from "./rolesUsuario.js";
import TipoRol from "./tiposRol.js";
import Usuario from "./usuarios.js";

// ..> Muchos
// -> Uno

//////////////////////////////////////// TABLAS INTERMEDIAS ////////////////////////////////////////

// Pelicula <....> Generos
Pelicula.belongsToMany(Genero, {
  through: "GenerosPelicula",
  foreignKey: "id_pelicula",
  timestamps: false,
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  as: "generos",
});

Genero.belongsToMany(Pelicula, {
  through: "GenerosPelicula",
  foreignKey: "id_genero",
  timestamps: false,
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  as: "peliculas",
});

// Pelicula <....> Idiomas
Pelicula.belongsToMany(Idioma, {
  through: "IdiomasPelicula",
  foreignKey: "id_pelicula",
  timestamps: false,
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  as: "idiomas",
});

Idioma.belongsToMany(Pelicula, {
  through: "IdiomasPelicula",
  foreignKey: "id_idioma",
  timestamps: false,
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  // as: "peliculas",
});

// Cineasta <....> TiposRol
Cineasta.belongsToMany(TipoRol, {
  through: "RolesCineasta",
  foreignKey: "id_cineasta",
  timestamps: false,
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  as: "roles",
});

TipoRol.belongsToMany(Cineasta, {
  through: "RolesCineasta",
  foreignKey: "id_rol",
  timestamps: false,
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  // as: "cineastas",
});

// Pelicula <....> Cineasta (Roles)
Pelicula.belongsToMany(Cineasta, {
  through: "PeliculaCineasta",
  foreignKey: "id_pelicula",
  timestamps: false,
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  as: "cineastas",
});

Cineasta.belongsToMany(Pelicula, {
  through: "PeliculaCineasta",
  foreignKey: "id_cineasta",
  timestamps: false,
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  // as: "peliculas",
});
//////////////////////////////////////// TABLAS PRINCIPALES ////////////////////////////////////////

// Usuario <..-> RolesUsuario
Usuario.hasOne(RolesUsuario, {
  foreignKey: "id",
  as: "rol",
});

RolesUsuario.hasMany(Usuario, {
  foreignKey: "id_rol",
  as: "usuarios",
});

// NominaconPelicula <..-> Premios
NominacionPelicula.belongsTo(Premios, {
  foreignKey: "id_premio",
  as: "premio",
  timestamps: false,
});

Premios.hasMany(NominacionPelicula, {
  foreignKey: "id_premio",
  as: "nominaciones",
});

// NominacionPelicula <..-> Pelicula
NominacionPelicula.belongsTo(Pelicula, {
  foreignKey: "id_pelicula",
  as: "pelicula",
  timestamps: false,
});

Pelicula.hasMany(NominacionPelicula, {
  foreignKey: "id_pelicula",
  as: "nominaciones",
});

// Pelicula <..-> Clasificaciones
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

// Cineasta <..-> Paises
Cineasta.belongsTo(Paises, {
  foreignKey: "nacionalidad",
  as: "pais",
});

Cineasta.belongsTo(Paises, {
  foreignKey: "nacionalidad2",
  as: "pais2",
});

Paises.hasMany(Cineasta, {
  foreignKey: "nacionalidad",
  as: "cineastas",
});
