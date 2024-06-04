import * as roles_usuarioRepository from "../repositories/roles_usuarioRepository.js";

// Obtener todos los roles
export async function getRoles() {
  return await roles_usuarioRepository.findAll();
}

// Buscar rol por nombre
export async function getRolByName(nombre) {
  return await roles_usuarioRepository.findByName(nombre);
}

// Crear un nuevo rol
export async function createRol(rol) {
  return await roles_usuarioRepository.createRol(rol);
}

// Actualizar un rol
export async function updateRol(id, nombre) {
  return await roles_usuarioRepository.updateRol(id, nombre);
}

// Eliminar un rol
export async function deleteRol(id) {
  return await roles_usuarioRepository.deleteRol(id);
}
