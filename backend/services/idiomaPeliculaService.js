import * as idiomaPeliculaRepository from "../repositories/idiomaPeliculaRepository.js";

// Buscar todos los idiomas de peliculas
export async function getIdiomasPelicula() {
  return await idiomaPeliculaRepository.findAll();
};


// Buscar un idioma de pelicula por sus id's
export const getIdiomaPeliculaById = async (id_pelicula, id_idioma, id_tipo_traduccion) => {
  return await idiomaPeliculaRepository.findById(id_pelicula, id_idioma, id_tipo_traduccion);
};


// Crear un nuevo idioma de pelicula
export const createIdiomaPelicula = async (idiomaPelicula) => {
  return await idiomaPeliculaRepository.create(idiomaPelicula);
};


// Actualizar un idioma de pelicula
export const updateIdiomaPelicula = async (id_pelicula, id_idioma, id_tipo_traduccion, idiomaPelicula) => {
  return await idiomaPeliculaRepository.update(id_pelicula, id_idioma, id_tipo_traduccion, idiomaPelicula);
};


// Eliminar un idioma de pelicula
export const deleteIdiomaPelicula = async (id_pelicula, id_idioma, id_tipo_traduccion) => {
  return await idiomaPeliculaRepository.remove(id_pelicula, id_idioma, id_tipo_traduccion);
};
