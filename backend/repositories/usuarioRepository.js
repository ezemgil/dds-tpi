import Usuario from "../models/usuarios.js";
import RolUsuario from "../models/rolesUsuario.js";

// Buscar usuario por nombre
export const findByUsername = async (usuario) => {
  return await Usuario.findOne(
    {
      where: {
        nombre: usuario,
      },
    },
    {
      include: RolUsuario,
      attributes: { exclude: ["id_rol"] },
    }
  );
};

// Crear un nuevo usuario
export const createUsuario = async (usuario) => {
  return await Usuario.create(usuario);
};

// Actualizar un usuario
export const updateUsuario = async (id, usuario, clave, id_rol) => {
  const usuarioToUpdate = await Usuario.findByPk(id);
  if (usuarioToUpdate) {
    usuarioToUpdate.nombre = usuario;
    usuarioToUpdate.clave = clave;
    usuarioToUpdate.id_rol = id_rol;
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
  return await Usuario.findAll({
    include: RolUsuario,
    attributes: { exclude: ["id_rol"] },
  });
};
