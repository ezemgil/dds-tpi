import { Op } from "sequelize";
import TipoRol from "../models/tiposRol.js";

// Buscar todos los tipos de rol
export const findAll = async () => {
  return await TipoRol.findAll();
};

// Crear un nuevo tipo de rol
export const create = async (tipoRol) => {
  return await TipoRol.create(tipoRol);
};

// Buscar un tipo de rol por su id
export const findById = async (id) => {
  return await TipoRol.findByPk(id);
};

// Buscar un tipo de rol por su nombre
export const findByName = async (nombre) => {
  return await TipoRol.findAll({
    where: { nombre: { [Op.like]: `%${nombre}%` } },
  });
};

// Actualizar un tipo de rol
export const update = async (id, tipoRol) => {
  const result = await TipoRol.findByPk(id);
  if (result) {
    return await result.update(tipoRol);
  }
  return null;
};

// Eliminar un tipo de rol
export const remove = async (id) => {
  const result = await TipoRol.findByPk(id);
  if (result) {
    await result.destroy();
    return true;
  }
  return false;
};
