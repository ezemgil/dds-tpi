import { Op } from "sequelize";
import Premio from "../models/premios.js";
import { DatabaseValidationError } from "../utils/errors.js";

// Buscar todos los premios
export const findAll = async (page = undefined, size = undefined) => {
    try {
        const options = {
            offset: page && size ? page * size : undefined,
            limit: size ? size : undefined,
        };
        const { count, rows } = await Premio.findAndCountAll(options);
        return {
            totalPremios: count,
            premios: rows,
        };
    } catch (error) {
        throw new DatabaseValidationError(error.message);
    }
};

// Crear un nuevo premio
export const create = async (premio) => {
    try {
        return await Premio.create(premio);
    } catch (error) {
        if (error.name === "SequelizeUniqueConstraintError") {
            throw new DatabaseValidationError("El premio ya existe");
        }
        throw new DatabaseValidationError(error.message);
    }
};

// Buscar un premio por su id
export const findById = async (id) => {
    try {
        return await Premio.findByPk(id);
    } catch (error) {
        throw new DatabaseValidationError(error.message);
    }
};

// Buscar un premio por su nombre
export const findByName = async (nombre) => {
    try {
        return await Premio.findAll({
            where: { nombre: { [Op.like]: `%${nombre}%` } },
        });
    } catch (error) {
        throw new DatabaseValidationError(error.message);
    }
};

// Actualizar un premio
export const update = async (id, premio) => {
    try {
        const result = await Premio.findByPk(id);
        if (result) {
            return await result.update(premio);
        }
        return null;
    } catch (error) {
        if (error.name === "SequelizeUniqueConstraintError") {
            throw new DatabaseValidationError("El premio ya existe");
        }
        throw new DatabaseValidationError(error.message);
    }
};

// Eliminar un premio
export const remove = async (id) => {
    try {
        const result = await Premio.findByPk(id);
        if (result) {
            await result.destroy();
            return true;
        }
        return false;
    } catch (error) {
        throw new DatabaseValidationError(error.message);
    }
};
