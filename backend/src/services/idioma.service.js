import { Op } from "sequelize";
import Idioma from "../models/idiomas.js";

// Buscar todos los idiomas
export const findAll = async (page = undefined, size = undefined) => {
  const options = {
    offset: page && size ? page * size : undefined,
    limit: size ? size : undefined,
  };
  const { count, rows } = await Idioma.findAndCountAll(options);

  return {
    totalIdiomas: count,
    idiomas: rows,
  };
};

// Crear un nuevo idioma
export const create = async (idioma) => {
  return await Idioma.create(idioma);
};

// Buscar idioma por su id
export const findById = async (id) => {
  return await Idioma.findByPk(id);
};

// Buscar idioma por su nombre
export const findByName = async (nombre) => {
  return await Idioma.findAll({
    where: { nombre: { [Op.like]: `%${nombre}%` } },
  });
};

// Actualizar idioma
export const update = async (id, idioma) => {
  const result = await Idioma.findByPk(id);
  if (result) {
    return await result.update(idioma);
  }
  return null;
};

// Eliminar un idioma
export const remove = async (id) => {
  const result = await Idioma.findByPk(id);
  console.log(result);
  if (result) {
    await result.destroy();
    return true;
  }
  return false;
};
