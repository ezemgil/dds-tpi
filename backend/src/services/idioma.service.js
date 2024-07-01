import { Op } from "sequelize";
import Idioma from "../models/idiomas.js";
import { DatabaseValidationError } from "../utils/errors.js";

// Buscar todos los idiomas
export const findAll = async (page = undefined, size = undefined) => {
  try {
    const options = {
        offset: page && size ? page * size : undefined,
        limit: size ? size : undefined,
    };
    const { count, rows } = await Idioma.findAndCountAll(options);
    return {
      totalIdiomas: count,
      idiomas: rows,
    }
  } catch (error) {
      throw new DatabaseValidationError(error.message);
  }
};

// Crear un nuevo idioma
export const create = async (idioma) => {
    try {
        return await Idioma.create(idioma);
    } catch (error) {
        if (error.name === "SequelizeUniqueConstraintError") {
            throw new DatabaseValidationError("El idioma ya existe");
        }
        throw new DatabaseValidationError(error.message);
    }
};

// Buscar idioma por su id
export const findById = async (id) => {
    try {
        return await Idioma.findByPk(id);
    } catch (error) {
        throw new DatabaseValidationError(error.message);
    }
};

// Buscar idioma por su nombre
export const findByName = async (nombre) => {
    try {
        return await Idioma.findAll({
            where: { nombre: { [Op.like]: `%${nombre}%` } },
        });
    } catch (error) {
        throw new DatabaseValidationError(error.message);
    }
};

// Actualizar idioma
export const update = async (id, idioma) => {
    try {
        const result = await Idioma.findByPk(id);
        if (result) {
            return await result.update(idioma);
        }
        return null;
    } catch (error) {
        if (error.name === "SequelizeUniqueConstraintError") {
            throw new DatabaseValidationError("El idioma ya existe");
        }
        throw new DatabaseValidationError(error.message);
    }
};

// Eliminar un idioma
export const remove = async (id) => {
    try {
        const result = await Idioma.findByPk(id);
        if (result) {
            await result.destroy();
            return true;
        }
        return false;
    } catch (error) {
        throw new DatabaseValidationError(error.message);
    }
};
