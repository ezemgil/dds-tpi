import * as peliculaCineastaRolRepository from '../repositories/peliculaCineastaRolRepository.js';

// Buscar todas las relaciones entre películas, cineastas y roles
export async function getPeliculaCineastaRoles() {
  return await peliculaCineastaRolRepository.findAll();
};


// Buscar una relación entre película, cineasta y rol por su id
export const getPeliculaCineastaRolById = async (id_pelicula, id_cineasta, id_rol) => {
  return await peliculaCineastaRolRepository.findById(id_pelicula, id_cineasta, id_rol);
};


// Crear una nueva relación entre película, cineasta y rol
export const createPeliculaCineastaRol = async (peliculaCineastaRol) => {
  return await peliculaCineastaRolRepository.create(peliculaCineastaRol);
};


// Actualizar una relación entre película, cineasta y rol
export const updatePeliculaCineastaRol = async (id_pelicula, id_cineasta, id_rol, peliculaCineastaRol) => {
  return await peliculaCineastaRolRepository.update(id_pelicula, id_cineasta, id_rol, peliculaCineastaRol);
};


// Eliminar una relación entre película, cineasta y rol
export const deletePeliculaCineastaRol = async (id_pelicula, id_cineasta, id_rol) => {
  return await peliculaCineastaRolRepository.remove(id_pelicula, id_cineasta, id_rol);
};