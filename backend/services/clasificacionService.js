import * as clasificacionesRepository from "../repositories/clasificacionRepository.js";

// Obtener todas las clasificaciones
export async function getClasificaciones() {
  return await clasificacionesRepository.findAll();
}

// Buscar una clasificación por su id
export async function getClasificacionById(id) {
  return await clasificacionesRepository.findById(id);
}

// Crear una nueva clasificación
export async function createClasificacion(clasificacion) {
  return await clasificacionesRepository.create(clasificacion);
}

// Actualizar una clasificación
export async function updateClasificacion(id, clasificacion) {
  return await clasificacionesRepository.update(id, clasificacion);
}

// Eliminar una clasificación
export async function deleteClasificacion(id) {
  return await clasificacionesRepository.remove(id);
}
