import Usuario from "../models/usuarios.js";

// Buscar usuario por nombre
export const findByUsername = async (usuario) => {
  return await Usuario.findOne({
    where: {
      nombre: usuario,
    },
  });
};

// Crear un nuevo usuario
export const createUsuario = async (usuario) => {
  return await Usuario.create(usuario);
};

// Actualizar un usuario
export const updateUsuario = async (id, usuario, clave) => {
  const usuarioToUpdate = await Usuario.findByPk(id);
  if (usuarioToUpdate) {
    usuarioToUpdate.nombre = usuario;
    usuarioToUpdate.clave = clave;
    return await usuarioToUpdate.save();
  }
  return null;
};

// Eliminar un usuario
export const deleteUsuario = async (id) => {
  const usuarioToDelete = await Usuario.findByPk(id);
  if (usuarioToDelete) {
    return await usuarioToDelete.destroy();
  }
  return null;
};

// Obtener todos los usuarios
export const findAll = async () => {
  return await Usuario.findAll();
};
