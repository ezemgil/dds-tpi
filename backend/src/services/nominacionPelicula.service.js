import { Op } from "sequelize";
import NominacionPelicula from "../models/nominacionesPelicula.js";
import Premio from "../models/premios.js";
import Pelicula from "../models/peliculas.js";
import { DatabaseValidationError } from "../utils/errors.js";

// Buscar todas las nominaciones de peliculas
export const findAll = async (page = undefined, size = undefined) => {
    try {
        const options = {
            offset: page && size ? page * size : undefined,
            limit: size ? size : undefined,
            include: [
                {
                    model: Premio,
                    as: "premio",
                },
                {
                    model: Pelicula,
                    as: "pelicula",
                },
            ],
            attributes: {
                exclude: ["id_premio", "id_pelicula"],
            }
        };
        const { count, rows } = await NominacionPelicula.findAndCountAll(options);
        return {
            totalNominaciones: count,
            nominaciones: rows,
        };
        } catch (error) {
        throw new DatabaseValidationError(error.message);
        }
};

// Dado un id de pelicula, obtener todas las nominaciones de esa pelicula
export const findAllByPelicula = async (id_pelicula) => {
    try {
        return await NominacionPelicula.findAll({
            where: {
                id_pelicula,
            },
            include: [
                {
                    model: Premio,
                    as: "premio",
                },
            ],
            attributes: {
                exclude: ["id_premio"],
            },
        });
    } catch (error) {
        throw new DatabaseValidationError(error.message);
    }
};

// Crear una nueva nominacion de pelicula
export const create = async (nominacion) => {
    try {
        return await NominacionPelicula.create(nominacion);
    } catch (error) {
        if (error.name === "SequelizeUniqueConstraintError") {
            throw new DatabaseValidationError("La nominacion de pelicula ya existe");
        }
        throw new DatabaseValidationError(error.message);
    }
};

// Buscar una nominacion de pelicula por sus id
export const findById = async (id) => {
    try {
        return await NominacionPelicula.findByPk(id, {
            include: [
                {
                    model: Premio,
                    as: "premio",
                },
                {
                    model: Pelicula,
                    as: "pelicula",
                },
            ],
            attributes: {
                exclude: ["id_premio", "id_pelicula"],
            },
        });
    } catch {
        throw new DatabaseValidationError(error.message);
    }
};

// Actualizar una nominacion de pelicula
export const update = async (id, nominacion) => {
    try {
        const result = await NominacionPelicula.findByPk(id);
        if (result) {
            return await result.update(nominacion);
        }
        return null;
    } catch (error) {
        if (error.name === "SequelizeUniqueConstraintError") {
            throw new DatabaseValidationError("La nominacion de pelicula ya existe");
        }
        throw new DatabaseValidationError(error.message);
    }
};

// Eliminar una nominacion de pelicula
export const remove = async (id) => {
    try {
        const result = await NominacionPelicula.findByPk(id);
        if (result) {
            await result.destroy();
            return true;
        }
        return false;
    } catch (error) {
        throw new DatabaseValidationError(error.message);
    }
};

// Actualizar las nominaciones de una película
export const updateNominaciones = async (id_pelicula, nominaciones) => {
    try {
        nominaciones.forEach(async (nominacion) => {
            const result = await NominacionPelicula.findOne({
                where: {
                    id_pelicula,
                    id_premio: nominacion.id_premio,
                },
            });
            if (result) {
                await result.update(nominacion);
            } else {
                await NominacionPelicula.create({
                    id_pelicula,
                    ...nominacion,
                });
            }
        });
        // Eliminar las nominaciones que no estén en el array
        await NominacionPelicula.destroy({
            where: {
                id_pelicula,
                id_premio: {
                    [Op.notIn]: nominaciones.map((nominacion) => nominacion.id_premio),
                },
            },
        });
        return await findAllByPelicula(id_pelicula);
    } catch (error) {
        throw new DatabaseValidationError(error.message);
    }
};
