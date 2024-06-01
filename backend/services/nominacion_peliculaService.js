import * as nominacion_peliculaRepository from '../repositories/nominacion_peliculaRepository.js';

// Buscar todas las nominaciones de peliculas
export async function getNominacionesPelicula() {
  return await nominacion_peliculaRepository.findAll();
};

// Crear una nueva nominacion de pelicula
export const createNominacionPelicula = async (nominacion) => {
  return await nominacion_peliculaRepository.create(nominacion);
};


// Buscar una nominacion de pelicula por sus id's
export const getNominacionPeliculaById = async (id_academia, id_premio, id_pelicula) => {
  return await nominacion_peliculaRepository.findById(id_academia, id_premio, id_pelicula);
};


// Buscar una nominacion de pelicula por su id_academia
export const getNominacionPeliculaByAcademia = async (id_academia) => {
  return await nominacion_peliculaRepository.findByAcademia(id_academia);
};


// Buscar una nominacion de pelicula por su id_premio
export const getNominacionPeliculaByPremio = async (id_premio) => {
  return await nominacion_peliculaRepository.findByPremio(id_premio);
};


// Buscar una nominacion de pelicula por su id_pelicula
export const getNominacionPeliculaByPelicula = async (id_pelicula) => {
  return await nominacion_peliculaRepository.findByPelicula(id_pelicula);
};


// Actualizar una nominacion de pelicula
export const update = async (id_academia, id_premio, id_pelicula, nominacion) => {
  return await nominacion_peliculaRepository.update(id_academia, id_premio, id_pelicula, nominacion);
};


// Eliminar una nominacion de pelicula
export const deleteNominacion = async (id_academia, id_premio, id_pelicula) => {
  return await nominacion_peliculaRepository.remove(id_academia, id_premio, id_pelicula);
};