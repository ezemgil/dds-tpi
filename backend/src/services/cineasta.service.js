import { Sequelize, Op } from "sequelize";
import Cineasta from "../models/cineastas.js";
import TipoRol from "../models/tiposRol.js";
import Paises from "../models/paises.js";

// GET ALL
export const findAll = async () => {
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
export const create = async (cineasta) => {
  return await Cineasta.create(cineasta);
};

// PUT
export const update = async (id, cineasta) => {
  const result = await Cineasta.findByPk(id);
  if (result) {
    return await result.update(cineasta);
  }
  return null;
};

// DELETE
export const remove = async (id) => {
  const result = await Cineasta.findByPk(id);
  if (result) {
    await result.destroy();
    return true;
  }
  return false;
};
