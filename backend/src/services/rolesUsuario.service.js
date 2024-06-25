import RolUsuario from "../models/rolesUsuario.js";

// Buscar todos los roles
export const findAll = async () => {
  return await RolUsuario.findAll();
};

// Buscar rol por nombre
export const findByName = async (nombre) => {
  return await RolUsuario.findOne({
    where: {
      rol: nombre,
    },
  });
};

// Crear un nuevo rol
export const createRol = async (rol) => {
  return await RolUsuario.create(rol);
};

// Actualizar un rol
export const updateRol = async (id, nombre) => {
  const rolToUpdate = await RolUsuario.findByPk(id);
  if (rolToUpdate) {
    rolToUpdate.nombre = nombre;
    return await rolToUpdate.save();
  }
  return null;
};

// Eliminar un rol
export const deleteRol = async (id) => {
  const rolToDelete = await RolUsuario.findByPk(id);
  if (rolToDelete) {
    return await rolToDelete.destroy();
  }
  return null;
};
