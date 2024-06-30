import Usuario from "../models/usuarios.js";
import RolUsuario from "../models/rolesUsuario.js";
import { DatabaseValidationError } from "../utils/errors.js";

// Buscar usuario por nombre
export const findByUsername = async (usuario) => {
    try {
        return await Usuario.findOne({
            where: { nombre: usuario },
            include: [{ model: RolUsuario, as: "rol" }],
            attributes: { exclude: ["id_rol"] },
        });
    } catch (error) {
        throw new DatabaseValidationError(error.message);
    }
};

// Crear un nuevo usuario
export const createUsuario = async (usuario) => {
    try {
        return await Usuario.create(usuario);
    } catch (error) {
        if (error.name === "SequelizeUniqueConstraintError") {
            throw new DatabaseValidationError("El usuario ya existe");
        }
        throw new DatabaseValidationError(error.message);
    }
};

// Actualizar un usuario
export const updateUsuario = async (id, usuario, clave, id_rol) => {
    try {
        const usuarioToUpdate = await Usuario.findByPk(id);
        if (usuarioToUpdate) {
            usuarioToUpdate.nombre = usuario;
            usuarioToUpdate.clave = clave;
            usuarioToUpdate.id_rol = id_rol;
            return await usuarioToUpdate.save();
        }
        return null;
    } catch (error) {
        if (error.name === "SequelizeUniqueConstraintError") {
            throw new DatabaseValidationError("El usuario ya existe");
        }
        throw new DatabaseValidationError(error.message);
    }
};

// Eliminar un usuario
export const deleteUsuario = async (id) => {
    try {
        const usuarioToDelete = await Usuario.findByPk(id);
        if (usuarioToDelete) {
            return await usuarioToDelete.destroy();
        }
        return null;
    } catch (error) {
        throw new DatabaseValidationError(error.message);
    }
};

// Obtener todos los usuarios
export const findAll = async () => {
    try {
        return await Usuario.findAll({
            include: [{ model: RolUsuario, as: "rol" }],
            attributes: { exclude: ["id_rol"] },
        });
    } catch (error) {
        throw new DatabaseValidationError(error.message);
    }
};
