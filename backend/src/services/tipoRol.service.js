import { Op } from "sequelize";
import TipoRol from "../models/tiposRol.js";
import { DatabaseValidationError } from "../utils/errors.js";

// Buscar todos los tipos de rol
export const findAll = async (page = undefined, size = undefined) => {
    try {
        return await TipoRol.findAll({
            offset: page && size ? page * size : undefined,
            limit: size ? size : undefined,
        });
    } catch (error) {
        throw new DatabaseValidationError(error.message);
    }
};

// Crear un nuevo tipo de rol
export const create = async (tipoRol) => {
    try {
        return await TipoRol.create(tipoRol);
    } catch (error) {
        throw new DatabaseValidationError(error.message);
    }
};

// Buscar un tipo de rol por su id
export const findById = async (id) => {
    try {
        return await TipoRol.findByPk(id);
    } catch (error) {
        throw new DatabaseValidationError(error.message);
    }
};

// Buscar un tipo de rol por su nombre
export const findByName = async (nombre) => {
    try {
        return await TipoRol.findAll({
            where: { nombre: { [Op.like]: `%${nombre}%` } },
        });
    } catch (error) {
        throw new DatabaseValidationError(error.message);
    }
};

// Actualizar un tipo de rol
export const update = async (id, tipoRol) => {
    try {
        const result = await TipoRol.findByPk(id);
        if (result) {
            return await result.update(tipoRol);
        }
        return null;
    } catch (error) {
        throw new DatabaseValidationError(error.message);
    }
};

// Eliminar un tipo de rol
export const remove = async (id) => {
    try {
        const result = await TipoRol.findByPk(id);
        if (result) {
            await result.destroy();
            return true;
        }
        return false;
    } catch (error) {
        throw new DatabaseValidationError(error.message);
    }
};
