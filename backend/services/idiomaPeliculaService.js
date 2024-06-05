import * as idiomaPeliculaRepository from "../repositories/idiomaPeliculaRepository.js";

// Buscar todos los idiomas de peliculas
export async function getIdiomasPelicula() {
  return await idiomaPeliculaRepository.findAll();
};


// Buscar un idioma de pelicula por sus id's
export const getIdiomaPeliculaById = async (id) => {
  return await idiomaPeliculaRepository.findById(id);
};


// Crear un nuevo idioma de pelicula
export const createIdiomaPelicula = async (idiomaPelicula) => {
  return await idiomaPeliculaRepository.create(idiomaPelicula);
};


// Actualizar un idioma de pelicula
export const updateIdiomaPelicula = async (id, idiomaPelicula) => {
  return await idiomaPeliculaRepository.update(id, idiomaPelicula);
};


// Eliminar un idioma de pelicula
export const deleteIdiomaPelicula = async (id) => {
  return await idiomaPeliculaRepository.remove(id);
};
