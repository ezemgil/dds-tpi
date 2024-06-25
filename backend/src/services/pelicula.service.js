import { Sequelize, Op } from "sequelize";
import Pelicula from "../models/peliculas.js";
import Clasificacion from "../models/clasificaciones.js";
import Genero from "../models/generos.js";
import Cineasta from "../models/cineastas.js";
import TipoRol from "../models/tiposRol.js";

// Buscar todas las películas
export const findAll = async () => {
  return await Pelicula.findAll({
    include: [
      {
        model: Clasificacion,
        as: "clasificacion",
      },
      {
        model: Genero,
        as: "generos",
        through: {
          attributes: [],
        },
      },
    ],
    attributes: { exclude: ["id_clasificacion"] },
  });
};

// Crear una nueva película
export const create = async (pelicula) => {
  return await Pelicula.create(pelicula);
};

// Obtener la lista de cineastas de una película
export const getElenco = async (id) => {
  const pelicula = await Pelicula.findByPk(id, {
    include: [
      {
        model: Cineasta,
        as: "cineastas",
        through: {
          attributes: [],
        },
        include: [
          {
            model: TipoRol,
            as: "roles",
            through: {
              attributes: [],
            },
          },
        ],
      },
    ],
  });

  if (pelicula) {
    return pelicula.cineastas;
  }
  return null;
};

// Buscar una película por su id
export const findById = async (id) => {
  return await Pelicula.findByPk(id, {
    include: [
      {
        model: Clasificacion,
        as: "clasificacion",
      },
      {
        model: Genero,
        as: "generos",
        through: {
          attributes: [],
        },
      },
    ],
    attributes: { exclude: ["id_clasificacion"] },
  });
};

// Buscar una película por su nombre
export const findByName = async (nombre) => {
  return await Pelicula.findAll({
    where: { titulo: { [Op.like]: `%${nombre}%` } },
    include: [
      {
        model: Clasificacion,
        as: "clasificacion",
      },
      {
        model: Genero,
        as: "generos",
        through: {
          attributes: [],
        },
      },
    ],
    attributes: { exclude: ["id_clasificacion"] },
  });
};

// Buscar X películas aleatorias
export const findRandom = async (amount) => {
  return await Pelicula.findAll({
    order: Sequelize.literal("random()"),
    limit: amount,
    include: [
      {
        model: Clasificacion,
        as: "clasificacion",
      },
      {
        model: Genero,
        as: "generos",
        through: {
          attributes: [],
        },
      },
    ],
    attributes: { exclude: ["id_clasificacion"] },
  });
};

// Actualizar una película
export const update = async (id, pelicula) => {
  const result = await Pelicula.findByPk(id);
  if (result) {
    return await result.update(pelicula);
  }
  return null;
};

// Eliminar una película
export const remove = async (id) => {
  const result = await Pelicula.findByPk(id);
  if (result) {
    await result.destroy();
    return true;
  }
  return false;
};
