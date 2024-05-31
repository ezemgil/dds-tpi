import * as nominacion_peliculaRepository from '../repositories/nominacion_peliculaRepository.js';

// Buscar todas las nominaciones de peliculas
export const getNominacionesPelicula = async () => {
  return await nominacion_peliculaRepository.findAll();
};


// Crear una nueva nominacion de pelicula
export const createNominacionPelicula = async (nominacion) => {
  return await nominacion_peliculaRepository.create(nominacion);
};


// Buscar una nominacion de pelicula por sus id's
export const getNominacionPeliculaById = async (id_academia, id_premio, id_pelicula, fecha_nominacion) => {
  return await nominacion_peliculaRepository.findById(id_academia, id_premio, id_pelicula, fecha_nominacion);
};


// Buscar una nominacion de pelicula por su id_academia
export const getNominacionPeliculaByAcademia = async (id_academia) => {
  return await nominacion_peliculaRepository.findByAcademia(id_academia);
};

// Actualizar una nominacion de pelicula
export const update = async (id_academia, id_premio, id_pelicula, fecha_nominacion, nominacion) => {
  return await nominacion_peliculaRepository.update(id_academia, id_premio, id_pelicula, fecha_nominacion, nominacion);
};


// Eliminar una nominacion de pelicula
export const deleteNominacion = async (id_academia, id_premio, id_pelicula, fecha_nominacion) => {
  return await nominacion_peliculaRepository.deleteNominacion(id_academia, id_premio, id_pelicula, fecha_nominacion);
};