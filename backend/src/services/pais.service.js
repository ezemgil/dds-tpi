import { Op } from "sequelize";
import Pais from "../models/paises.js";
import { DatabaseValidationError } from "../utils/errors.js";

// Buscar todos los países
export const findAll = async (page = undefined, size = undefined) => {
    try {
        const options = {
            offset: page && size ? page * size : undefined,
            limit: size ? size : undefined,
        };
        const { count, rows } = await Pais.findAndCountAll(options);

        return {
            totalPaises: count,
            paises: rows,
        };
    } catch (error) {
        throw new DatabaseValidationError(error.message);
    }
};

// Crear un nuevo país
export const create = async (pais) => {
    try {
        return await Pais.create(pais);
    } catch (error) {
        if (error.name === "SequelizeUniqueConstraintError") {
            throw new DatabaseValidationError("El país ya existe");
        }
        throw new DatabaseValidationError(error.message);
    }
};

// Buscar un país por su id
export const findById = async (id) => {
    try {
        return await Pais.findByPk(id);
    } catch (error) {
        throw new DatabaseValidationError(error.message);
    }
};

// Buscar un país por su nombre
export const findByName = async (nombre) => {
    try {
        return await Pais.findAll({
            where: { nombre: { [Op.like]: `%${nombre}%` } },
        });
    } catch (error) {
        throw new DatabaseValidationError(error.message);
    }
};

// Actualizar un país
export const update = async (id, pais) => {
    try {
        const result = await Pais.findByPk(id);
        if (result) {
            return await result.update(pais);
        }
        return null;
    } catch (error) {
        if (error.name === "SequelizeUniqueConstraintError") {
            throw new DatabaseValidationError("El país ya existe");
        }
        throw new DatabaseValidationError(error.message);
    }
};

// Eliminar un país
export const remove = async (id) => {
    try {
        const result = await Pais.findByPk(id);
        if (result) {
            await result.destroy();
            return true;
        }
        return false;
    } catch (error) {
        throw new DatabaseValidationError(error.message);
    }
};
