import * as nominacionesCineastaRepository from '../repositories/nominacionesCineastaRepository.js';

// Obtener todas las nominaciones de cineastas
export async function getNominacionesCineasta() {
  return await nominacionesCineastaRepository.findAll();
}

// Obtener una nominación de cineasta por su id
export async function getNominacionCineasta(academia, premio, pelicula, cineasta, rol) {
  return await nominacionesCineastaRepository.findById(academia, premio, pelicula, cineasta, rol);
}

// Crear una nueva nominación de cineasta
export async function createNominacionCineasta(nominacionCineasta) {
  return await nominacionesCineastaRepository.create(nominacionCineasta);
}

// Actualizar una nominación de cineasta
export async function updateNominacionCineasta(academia, premio, pelicula, cineasta, rol, nominacionCineasta) {
  return await nominacionesCineastaRepository.update(academia, premio, pelicula, cineasta, rol, nominacionCineasta);
}

// Eliminar una nominación de cineasta
export async function removeNominacionCineasta(academia, premio, pelicula, cineasta, rol) {
  return await nominacionesCineastaRepository.remove(academia, premio, pelicula, cineasta, rol);
}