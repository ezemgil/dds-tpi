import { Op } from "sequelize";
import NominacionPelicula from "../models/nominacionesPelicula.js";
import Premio from "../models/premios.js";
import Pelicula from "../models/peliculas.js";

// Buscar todas las nominaciones de peliculas
export const findAll = async () => {
  return await NominacionPelicula.findAll({
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
};

// Crear una nueva nominacion de pelicula
export const create = async (nominacion) => {
  return await NominacionPelicula.create(nominacion);
};

// Buscar una nominacion de pelicula por sus id
export const findById = async (id) => {
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
};

// Actualizar una nominacion de pelicula
export const update = async (id, nominacion) => {
  const result = await NominacionPelicula.findByPk(id);
  if (result) {
    return await result.update(nominacion);
  }
  return null;
};

// Eliminar una nominacion de pelicula
export const remove = async (id) => {
  const result = await NominacionPelicula.findByPk(id);
  if (result) {
    await result.destroy();
    return true;
  }
  return false;
};
