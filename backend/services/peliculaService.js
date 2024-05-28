import * as peliculaRepository from "../repositories/peliculaRepository.js";

// Obtener todas las películas
export async function getPeliculas() {
  return await peliculaRepository.findAll();
}

// Buscar una película por su id
export async function getPeliculaById(id) {
  return await peliculaRepository.findById(id);
}

// Crear una nueva película
export async function createPelicula(pelicula) {
  return await peliculaRepository.create(pelicula);
}

// Actualizar una película
export async function updatePelicula(id, pelicula) {
  return await peliculaRepository.update(id, pelicula);
}

// Eliminar una película
export async function deletePelicula(id) {
  return await peliculaRepository.remove(id);
}
