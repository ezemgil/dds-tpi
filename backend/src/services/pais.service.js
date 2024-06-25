import { Op } from "sequelize";
import Pais from "../models/paises.js";

// Buscar todos los países
export const findAll = async () => {
  return await Pais.findAll();
};

// Crear un nuevo país
export const create = async (pais) => {
  return await Pais.create(pais);
};

// Buscar un país por su id
export const findById = async (id) => {
  return await Pais.findByPk(id);
};

// Buscar un país por su nombre
export const findByName = async (nombre) => {
  return await Pais.findAll({
    where: { nombre: { [Op.like]: `%${nombre}%` } },
  });
};

// Actualizar un país
export const update = async (id, pais) => {
  const result = await Pais.findByPk(id);
  if (result) {
    return await result.update(pais);
  }
  return null;
};

// Eliminar un país
export const remove = async (id) => {
  const result = await Pais.findByPk(id);
  if (result) {
    await result.destroy();
    return true;
  }
  return false;
};
