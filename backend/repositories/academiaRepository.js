import Academia from "../models/academias.js";


// Buscar todas las academias
export const findAll = async () => {
  return await Academia.findAll();
};


// Crear una nueva academia
export const create = async (academia) => {
  return await Academia.create(academia);
};


// Buscar una academia por su id
export const findById = async (id) => {
  return await Academia.findByPk(id);
};


// Actualizar una academia
export const update = async (id, academia) => {
  const result = await Academia.findByPk(id);
  if (result) {
    return await result.update(academia);
  }
  return null;
};


// Eliminar una academia
export const remove = async (id) => {
  const result = await Academia.findByPk(id);
  if (result) {
    await result.destroy();
    return true;
  }
  return false;
};