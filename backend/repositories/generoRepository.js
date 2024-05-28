import Genero from "../models/generos.js";

// Buscar todos los géneros
export const findAll = async () => {
  return await Genero.findAll();
};

// Crear un nuevo género
export const create = async (genero) => {
  return await Genero.create(genero);
};

// Buscar un género por su id
export const findById = async (id) => {
  return await Genero.findByPk(id);
};

// Actualizar un género
export const update = async (id, genero) => {
  const result = await Genero.findByPk(id);
  if (result) {
    return await result.update(genero);
  }
  return null;
};

// Eliminar un género
export const remove = async (id) => {
  const result = await Genero.findByPk(id);
  if (result) {
    await result.destroy();
    return true;
  }
  return false;
};
