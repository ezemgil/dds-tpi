import * as academiaRepository from '../repositories/academiaRepository.js';

// Obtener todas las academias
export async function getAcademias() {
  return await academiaRepository.findAll();
};


// Crear nueva academia
export async function createAcademia(academia) {
  return await academiaRepository.create(academia);
};


// Buscar una academia por su id
export async function getAcademiaById(id) {
  return await academiaRepository.findById(id);
};


// Actualizar una academia
export async function updateAcademia(id, academia) {
  return await academiaRepository.update(id, academia);
};


// Eliminar una academia
export async function deleteAcademia(id) {
  return await academiaRepository.remove(id);
};