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
export const create = async (pelicula, generos, idiomas) => {
  try {
    const result = await Pelicula.create(pelicula);
    if (result) {
      if (generos && generos.length > 0) {
        await result.setGeneros(generos);
      }
      if (idiomas && idiomas.length > 0) {
        await result.setIdiomas(idiomas);
      }
      return result;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
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
export const update = async (id, pelicula, generos, idiomas) => {
  try {
    const result = await Pelicula.update(pelicula, { where: { id } });
    if (result) {
      const movie = await Pelicula.findByPk(id);
      if (movie && generos && generos.length > 0) {
        await movie.setGeneros(generos);
      }
      if (movie && idiomas && idiomas.length > 0) {
        await movie.setIdiomas(idiomas);
      }
      return movie;
    }
  } catch (error) {
    throw error;
  }
};

// Eliminar una película
export const remove = async (id) => {
  try {
    const result = await Pelicula.destroy({ where: { id } });
    if (result) {
      return true;
    }
  } catch (error) {
    throw error;
  }
};

// Agregar un cineasta a una película
export const addCineastas = async (id, cineastas) => {
  try {
    console.log(cineastas);
    const movie = await Pelicula.findByPk(id);
    if (movie) {
      await movie.addCineasta(cineastas);
      return true;
    }
  } catch (error) {
    throw error;
  }
};

// Quitar un cineasta de una película
export const removeCineasta = async (id, cineasta) => {
  try {
    const movie = await Pelicula.findByPk(id);
    if (movie) {
      await movie.removeCineasta(cineasta);
      return true;
    }
  } catch (error) {
    throw error;
  }
};
