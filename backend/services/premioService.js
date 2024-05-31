import * as premioRepository from '../repositories/premioRepository.js';

// Obtener todos los premios
export async function getPremios() {
  return await premioRepository.findAll();
};


// Buscar un premio por su id
export async function getPremioById(id) {
  return await premioRepository.findById(id);
};


// Crear un nuevo premio
export async function createPremio(premio) {
  return await premioRepository.create(premio);
};


// Actualizar un premio
export async function updatePremio(id, premio) {
  return await premioRepository.update(id, premio);
};


// Eliminar un premio
export async function deletePremio(id) {
    return await premioRepository.remove(id);
};