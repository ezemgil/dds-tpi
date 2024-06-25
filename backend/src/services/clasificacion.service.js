import Clasificacion from "../models/clasificaciones.js";

// Buscar todas las clasificaciones
export const findAll = async () => {
  return await Clasificacion.findAll();
};

// Crear una nueva clasificación
export const create = async (clasificacion) => {
  return await Clasificacion.create(clasificacion);
};

// Buscar una clasificación por su id
export const findById = async (id) => {
  return await Clasificacion.findByPk(id);
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
