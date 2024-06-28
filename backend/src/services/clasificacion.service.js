import { Op } from "sequelize";
import Clasificacion from "../models/clasificaciones.js";
import { DatabaseValidationError } from "../utils/errors.js";

// Buscar todas las clasificaciones
export const findAll = async (page = undefined, size = undefined) => {
    try {
        return await Cineasta.findAll({
            order: Sequelize.literal("random()"),
            limit: amount,
            include: [
                {
                    model: Paises,
                    as: "pais",
                    attributes: ["id", "nombre", "codigo"],
                },
                {
                    model: Paises,
                    as: "pais2",
                    attributes: ["id", "nombre", "codigo"],
                },
                {
                    model: TipoRol,
                    as: "roles",
                    through: {
                        attributes: [],
                    },
                },
            ],
            attributes: { exclude: ["nacionalidad", "nacionalidad2"] },
        });
    } catch (error) {
        throw new DatabaseValidationError(error.message);
    }
};

// Crear una nueva clasificación
export const create = async (clasificacion) => {
    try {
        return await Clasificacion.create(clasificacion);
    } catch (error) {
        throw new DatabaseValidationError(error.message);
    }
};

// Buscar una clasificación por su id
export const findById = async (id) => {
    try {
        return await Clasificacion.findByPk(id);
    } catch (error) {
        throw new DatabaseValidationError(error.message);
    }
};

// Buscar una clasificación por su nombre
export const findByName = async (nombre) => {
    try {
        return await Clasificacion.findOne({
            where: { nombre: { [Op.like]: `%${nombre}%` } },
        });
    } catch (error) {
        throw new DatabaseValidationError(error.message);
    }
};

// Actualizar una clasificación
export const update = async (id, clasificacion) => {
    try {
        const result = await Clasificacion.findByPk(id);
        if (result) {
            return await result.update(clasificacion);
        }
        return null;
    } catch (error) {
        throw new DatabaseValidationError(error.message);
    }
};

// Eliminar una clasificación
export const remove = async (id) => {
    try {
        const result = await Clasificacion.findByPk(id);
        if (result) {
            return await result.destroy();
        }
        return null;
    } catch (error) {
        throw new DatabaseValidationError(error.message);
    }
};
