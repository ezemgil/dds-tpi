import * as usuarioRepository from "../repositories/usuarioRepository.js";

// Obtener usuario por nombre
export async function getUsuarioByUsername(usuario) {
  return await usuarioRepository.findByUsername(usuario);
}
