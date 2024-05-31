import * as usuarioRepository from "../repositories/usuarioRepository.js";

// Obtener usuario por nombre
export async function getUsuarioByUsername(usuario) {
  return await usuarioRepository.findByUsername(usuario);
}

// Crear un nuevo usuario
export async function createUsuario(usuario) {
  return await usuarioRepository.createUsuario(usuario);
}

// Actualizar un usuario
export async function updateUsuario(id, usuario, clave) {
  if (!usuario) {
    const usuarioToUpdate = await usuarioRepository.findById(id);
    usuario = usuarioToUpdate.nombre;
  }
  if (!clave) {
    const usuarioToUpdate = await usuarioRepository.findById(id);
    clave = usuarioToUpdate.clave;
  }
  return await usuarioRepository.updateUsuario(id, usuario, clave);
}

// Eliminar un usuario
export async function deleteUsuario(id) {
  return await usuarioRepository.deleteUsuario(id);
}

// Obtener todos los usuarios
export async function getUsuarios() {
  return await usuarioRepository.findAll();
}
