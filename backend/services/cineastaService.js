import * as cineastaRepository from '../repositories/cineastaRepository.js';

// Obtener todos los cineastas
export async function findAllCineastas() {
  return await cineastaRepository.findAll();
}

// Buscar un cineasta por su id
export async function findById(id) {
  return await cineastaRepository.findById(id);
}

// Crear un nuevo cineasta
export async function create(cineasta) {
  return await cineastaRepository.create(cineasta);
}

// Actualizar un cineasta
export async function update(id, cineasta) {
  return await cineastaRepository.update(id, cineasta);
}

// Eliminar un cineasta
export async function remove(id) {
  return await cineastaRepository.remove(id);
}

