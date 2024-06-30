import RolUsuario from "../models/rolesUsuario.js";
import { DatabaseValidationError } from "../utils/errors.js";

// Buscar todos los roles
export const findAll = async (page = undefined, size = undefined) => {
    try {
        return await RolUsuario.findAll({
            offset: page && size ? page * size : undefined,
            limit: size ? size : undefined,
        });
    } catch (error) {
        throw new DatabaseValidationError(error.message);
    }
};

// Buscar rol por nombre
export const findByName = async (nombre) => {
    try {
        return await RolUsuario.findOne({
            where: {
                rol: nombre,
            },
        });
    } catch (error) {
        throw new DatabaseValidationError(error.message);
    }
};

// Crear un nuevo rol
export const createRol = async (rol) => {
    try {
        return await RolUsuario.create(rol);
    } catch (error) {
        if (error.name === "SequelizeUniqueConstraintError") {
            throw new DatabaseValidationError("El rol ya existe");
        }
        throw new DatabaseValidationError(error.message);
    }
};

// Actualizar un rol
export const updateRol = async (id, nombre) => {
    try {
        const rolToUpdate = await RolUsuario.findByPk(id);
        if (rolToUpdate) {
            rolToUpdate.rol = nombre;
            return await rolToUpdate.save();
        }
        return null;
    } catch (error) {
        if (error.name === "SequelizeUniqueConstraintError") {
            throw new DatabaseValidationError("El rol ya existe");
        }
        throw new DatabaseValidationError(error.message);
    }
};

// Eliminar un rol
export const deleteRol = async (id) => {
    try {
        const rolToDelete = await RolUsuario.findByPk(id);
        if (rolToDelete) {
            return await rolToDelete.destroy();
        }
        return null;
    } catch (error) {
        throw new DatabaseValidationError(error.message);
    }
};
