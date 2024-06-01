import * as generoRepository from "../repositories/generoRepository.js";

// Obtener todos los géneros
export async function getGeneros() {
  return await generoRepository.findAll();
}

// Buscar un género por su id
export async function getGeneroById(id) {
  return await generoRepository.findById(id);
}

// Crear un nuevo género
export async function createGenero(genero) {
  return await generoRepository.create(genero);
}

// Actualizar un género
export async function updateGenero(id, genero) {
  return await generoRepository.update(id, genero);
}

// Eliminar un género
export async function deleteGenero(id) {
  return await generoRepository.remove(id);
}
