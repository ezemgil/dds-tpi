import { Op } from "sequelize";
import Genero from "../models/generos.js";
import { DatabaseValidationError } from "../utils/errors.js";

// Buscar todos los géneros
export const findAll = async (page = undefined, size = undefined) => {
    try {
        const options = {
            offset: page && size ? page * size : undefined,
            limit: size ? size : undefined,
        };
        const { count, rows } = await Genero.findAndCountAll(options);

        return {
            totalGeneros: count,
            generos: rows,
        };
    } catch (error) {
        throw new DatabaseValidationError(error.message);
    }
};

// Crear un nuevo género
export const create = async (genero) => {
    try {
        return await Genero.create(genero);
    } catch (error) {
        if (error.name === "SequelizeUniqueConstraintError") {
            throw new DatabaseValidationError("El género ya existe");
        }
        throw new DatabaseValidationError(error.message);
    }
};

// Buscar un género por su id
export const findById = async (id) => {
    try {
        return await Genero.findByPk(id);
    } catch (error) {
        throw new DatabaseValidationError(error.message);
    }
};

// Buscar un género por su nombre
export const findByName = async (nombre) => {
    try {
        return await Genero.findAll({
            where: { nombre: { [Op.like]: `%${nombre}%` } },
        });
    } catch (error) {
        throw new DatabaseValidationError(error.message);
    }
};

// Actualizar un género
export const update = async (id, genero) => {
    try {
        const result = await Genero.findByPk(id);
        if (result) {
            return await result.update(genero);
        }
        return null;
    } catch (error) {
        if (error.name === "SequelizeUniqueConstraintError") {
            throw new DatabaseValidationError("El género ya existe");
        }
        throw new DatabaseValidationError(error.message);
    }
};

// Eliminar un género
export const remove = async (id) => {
    try {
        const result = await Genero.findByPk(id);
        if (result) {
            await result.destroy();
            return true;
        }
        return false;
    } catch (error) {
        throw new DatabaseValidationError(error.message);
    }
};
