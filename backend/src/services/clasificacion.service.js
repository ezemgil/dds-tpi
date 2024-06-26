import { Op } from "sequelize";
import Clasificacion from "../models/clasificaciones.js";

// Buscar todas las clasificaciones
export const findAll = async (page = undefined, size = undefined) => {
  return await Clasificacion.findAll({
    offset: page && size ? page * size : undefined,
    limit: size ? size : undefined,
  });
};

// Crear una nueva clasificación
export const create = async (clasificacion) => {
  return await Clasificacion.create(clasificacion);
};

// Buscar una clasificación por su id
export const findById = async (id) => {
  return await Clasificacion.findByPk(id);
};

// Buscar una clasificación por su nombre
export const findByName = async (nombre) => {
  return await Clasificacion.findOne({
    where: { nombre: { [Op.like]: `%${nombre}%` } },
  });
};

// Actualizar una clasificación
export const update = async (id, clasificacion) => {
  const result = await Clasificacion.findByPk(id);
  if (result) {
    return await result.update(clasificacion);
  }
  return null;
};

// Eliminar una clasificación
export const remove = async (id) => {
  const result = await Clasificacion.findByPk(id);
  if (result) {
    await result.destroy();
    return true;
  }
  return false;
};
