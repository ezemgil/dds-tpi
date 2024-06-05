import * as nominacion_peliculaRepository from '../repositories/nominacion_peliculaRepository.js';

// Buscar todas las nominaciones de peliculas
export async function getNominacionesPelicula() {
  return await nominacion_peliculaRepository.findAll();
};

// Crear una nueva nominacion de pelicula
export const createNominacionPelicula = async (nominacion) => {
  return await nominacion_peliculaRepository.create(nominacion);
};


// Buscar una nominacion de pelicula por sus id
export const getNominacionPeliculaById = async (id) => {
  return await nominacion_peliculaRepository.findById(id);
};


// Actualizar una nominacion de pelicula
export const updateNominacion = async (id, nominacion) => {
  return await nominacion_peliculaRepository.update(id, nominacion);
};


// Eliminar una nominacion de pelicula
export const deleteNominacion = async (id) => {
  return await nominacion_peliculaRepository.remove(id);
};