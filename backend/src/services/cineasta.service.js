import { Sequelize, Op } from "sequelize";
import Cineasta from "../models/cineastas.js";
import TipoRol from "../models/tiposRol.js";
import Paises from "../models/paises.js";
import Pelicula from "../models/peliculas.js";

// GET ALL
export const findAll = async (page = undefined, size = undefined) => {
  return await Cineasta.findAll({
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
    offset: page && size ? page * size : undefined,
    limit: size ? size : undefined,
  });
};

// GET BY ID
export const findById = async (id) => {
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
};

// GET BY NAME
export const findByName = async (nombre) => {
  return await Cineasta.findAll({
    where: {
      nombre: {
        [Op.like]: `%${nombre}%`,
      },
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
};

// Get Peliculas by cineasta
export const findPeliculasByCineasta = async (id_cineasta) => {
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
};

// Get X random cineastas
export const findRandom = async (amount) => {
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
    return null;
  }
};

// PUT
export const update = async (id, cineasta, roles) => {
  try {
    const result = await Pelicula.update(cineasta, { where: { id } });
    if (result) {
      const filmmaker = await Cineasta.findByPk(id);
      if (roles && roles.length > 0) {
        await filmmaker.setRoles(roles);
      }
    }
    return result;
  } catch (error) {
    return null;
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
    return null;
  }
};
