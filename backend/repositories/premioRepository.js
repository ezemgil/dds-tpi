import Premio from "../models/premios.js";

// Buscar todos los premios
export const findAll = async () => {
  return await Premio.findAll();
};


// Crear un nuevo premio
export const create = async (premio) => {
  return await Premio.create(premio);
};


// Buscar un premio por su id
export const findById = async (id) => {
  return await Premio.findByPk(id);
};


// Actualizar un premio
export const update = async (id, premio) => {
  const result = await Premio.findByPk(id);
  if (result) {
    return await result.update(premio);
  }
  return null;
};


// Eliminar un premio
export const remove = async (id) => {
  const result = await Premio.findByPk(id);
  if (result) {
    await result.destroy();
    return true;
  }
  return false;
};