import { Op, Sequelize } from "sequelize";
import Cineasta from "../models/cineastas.js";
import Paises from "../models/paises.js";
import Pelicula from "../models/peliculas.js";
import TipoRol from "../models/tiposRol.js";
import { DatabaseValidationError } from "../utils/errors.js";

// GET ALL
export const findAll = async (page = undefined, size = undefined) => {
    try {
        const options = {
            offset: page && size ? page * size : undefined,
            limit: size ? size : undefined,
            distinct: true,
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
            attributes: { exclude: ["nacionalidad", "nacionalidad2"] }
        };
        const { count, rows } = await Cineasta.findAndCountAll(options);
        return {
            totalCineastas: count,
            cineastas: rows,
        };
    } catch (error) {
        throw new DatabaseValidationError(error.message);
    }
};

// GET BY ID
export const findById = async (id) => {
    try {
        return await Cineasta.findByPk(id, {
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

// GET BY NAME
export const findByName = async (nombre) => {
    try {
        return await Cineasta.findAll({
            where: {
                [Op.or]: [
                    {
                        nombre: {
                            [Op.like]: `%${nombre}%`,
                        },
                    },
                    {
                        apellido: {
                            [Op.like]: `%${nombre}%`,
                        },
                    },
                ],
            },
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

// Get Peliculas by cineasta
export const findPeliculasByCineasta = async (id_cineasta) => {
    try {
        return await Pelicula.findAll({
            include: [
                {
                    model: Cineasta,
                    as: "cineastas",
                    where: {
                        id: id_cineasta,
                    },
                    attributes: [],
                    through: {
                        attributes: [],
                    },
                },
            ],
        });
    } catch (error) {
        throw new DatabaseValidationError(error.message);
    }
};

// Get X random cineastas
export const findRandom = async (amount) => {
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

// POST
export const create = async (cineasta, roles) => {
    try {
        const result = await Cineasta.create(cineasta);
        if (result) {
            if (roles && roles.length > 0) {
                await result.setRoles(roles);
            }
            return result;
        }
    } catch (error) {
        throw new DatabaseValidationError(error.message);
    }
};

// PUT
export const update = async (id, cineasta, roles) => {
    try {
        const result = await Cineasta.update(cineasta, { where: { id } });
        if (result) {
            const filmmaker = await Cineasta.findByPk(id);
            if (roles && roles.length > 0) {
                await filmmaker.setRoles(roles);
            }
        }
        return result;
    } catch (error) {
        throw new DatabaseValidationError(error.message);
    }
};

// DELETE
export const remove = async (id) => {
    try {
        return await Cineasta.destroy({
            where: {
                id,
            },
        });
    } catch (error) {
        throw new DatabaseValidationError(error.message);
    }
};
