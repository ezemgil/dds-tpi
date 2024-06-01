import PeliculaCineastaRol from "../models/peliculasCineastaRol.js";
import Pelicula from "../models/peliculas.js";
import Cineasta from "../models/cineastas.js";
import TipoRol from "../models/tiposRol.js";

// Buscar todas las relaciones entre películas, cineastas y roles
export const findAll = async () => {
  return await PeliculaCineastaRol.findAll();
};


// Buscar una relación entre película, cineasta y rol por su id
export const findById = async (id_pelicula, id_cineasta, id_rol) => {
  return await PeliculaCineastaRol.findOne({
    where: {
     id_pelicula: id_pelicula,
     id_cineasta: id_cineasta,
     id_rol: id_rol},
     include: [
        {
            model: Pelicula,
            as: "pelicula",
        },
        {
            model: Cineasta,
            as: "cineasta",
        },
        {
            model: TipoRol,
            as: "tipoRol",
        }
     ],
     exclude: ["id_pelicula", "id_cineasta", "id_rol"],
    });
};


// Crear una nueva relación entre película, cineasta y rol
export const create = async (peliculaCineastaRol) => {
  return await PeliculaCineastaRol.create(peliculaCineastaRol);
};


// Actualizar una relación entre película, cineasta y rol
export const update = async (id_pelicula, id_cineasta, id_rol, peliculaCineastaRol) => {
  const result = await PeliculaCineastaRol.findOne({
    where: {
        id_pelicula: id_pelicula,
        id_cineasta: id_cineasta,
        id_rol: id_rol 
        }
    });
    if (result) {
        return await result.update(peliculaCineastaRol);
  }
  return null;
};


// Eliminar una relación entre película, cineasta y rol
export const remove = async (id_pelicula, id_cineasta, id_rol) => {
  const result = await PeliculaCineastaRol.findOne({
    where: {
        id_pelicula: id_pelicula,
        id_cineasta: id_cineasta,
        id_rol: id_rol 
        }
    });
  if (result) {
    await result.destroy();
    return true;
  }
  return false;
};