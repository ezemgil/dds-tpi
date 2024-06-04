import * as usuarioRepository from "../repositories/usuarioRepository.js";

// Obtener todos los usuarios
export async function getUsuarios() {
  return await usuarioRepository.findAll();
}

// Buscar un usuario por su nombre
export async function getUsuarioByName(nombre) {
  return await usuarioRepository.findByUsername(nombre);
}

// Crear un nuevo usuario
export async function createUsuario(usuario) {
  return await usuarioRepository.create(usuario);
}

// Actualizar un usuario
export async function updateUsuario(id, usuario, clave, id_rol) {
  return await usuarioRepository.update(id, usuario, clave, id_rol);
}

// Eliminar un usuario
export async function deleteUsuario(id) {
  return await usuarioRepository.remove(id);
}
