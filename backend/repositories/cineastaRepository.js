import Cineasta from "../models/cineastas.js";
import TiposRol from "../models/tiposRol.js";

// Buscar todos los cineastas
export const findAll = async () => {
  return await Cineasta.findAll({
    include: [
      {
        association: "pais",
        attributes: ["id", "nombre", "codigo"],
      },
      {
        association: "pais2",
        attributes: ["id", "nombre", "codigo"],
      },
      {
        model: TiposRol,
        as: "roles",
        through: {
          attributes: [],
        },
      },
    ],
    attributes: { exclude: ["nacionalidad", "nacionalidad2"] },
  });
};

// Crear un nuevo cineasta
export const create = async (cineasta) => {
  return await Cineasta.create(cineasta);
};

// Buscar un cineasta por su id
export const findById = async (id) => {
  return await Cineasta.findByPk(id, {
    include: [
      {
        association: "pais",
        attributes: ["id", "nombre", "codigo"],
      },
      {
        association: "pais2",
        attributes: ["id", "nombre", "codigo"],
      },
      {
        model: TiposRol,
        as: "roles",
        through: {
          attributes: [],
        },
      },
    ],
    attributes: { exclude: ["nacionalidad", "nacionalidad2"] },
  });
};

// Actualizar un cineasta
export const update = async (id, cineasta) => {
  const result = await Cineasta.findByPk(id);
  if (result) {
    return await result.update(cineasta);
  }
  return null;
};

// Eliminar un cineasta
export const remove = async (id) => {
  const result = await Cineasta.findByPk(id);
  if (result) {
    await result.destroy();
    return true;
  }
  return false;
};
