import NominacionPelicula from "../models/nominaciones_pelicula.js";
import Academia from "../models/academias.js";
import Premio from "../models/premios.js";
import Pelicula from "../models/peliculas.js";


// Buscar todas las nominaciones de peliculas
export const findAll = async () => {
  return await NominacionPelicula.findAll({
    include: [
        {
            model: Academia,
            as: "academia",
        },
        {
            model: Premio,
            as: "premio",
        },
        {
            model: Pelicula,
            as: "pelicula",
            though: {
                attributes: [],
            },
        },
    ],
    attributes: {
        exclude: ["id_academia", "id_premio", "id_pelicula"],
    },
  });
};


// Crear una nueva nominacion de pelicula
export const create = async (nominacion) => {
  return await NominacionPelicula.create(nominacion);
};


// Buscar una nominacion de pelicula por sus id's
export const findById = async (id_academia, id_premio, id_pelicula, fecha_nominacion) => {
  return await NominacionPelicula.findByPk(id_academia, id_premio, id_pelicula, fecha_nominacion, {
    include: [
        {
            model: Academia,
            as: "academia",
        },
        {
            model: Premio,
            as: "premio",
        },
        {
            model: Pelicula,
            as: "pelicula",
            though: {
                attributes: [],
            },
        }
    ],
    attributes: {
        exclude: ["id_academia", "id_premio", "id_pelicula"],
    },
  });
};


// Buscar una nominacion de pelicula por su id_academia
export const findByAcademia = async (id_academia) => {
  return await NominacionPelicula.findAll({
    where: {
        id_academia: id_academia,
    },
    include: [
        {
            model: Academia,
            as: "academia",
        },
        {
            model: Premio,
            as: "premio",
        },
        {
            model: Pelicula,
            as: "pelicula",
            though: {
                attributes: [],
            },
        },
    ],
    attributes: {
        exclude: ["id_academia", "id_premio", "id_pelicula"],
    },
  });
};


// Buscar una nominacion de pelicula por su id_premio
export const findByPremio = async (id_premio) => {
    return await NominacionPelicula.findAll({
      where: {
          id_premio: id_premio,
      },
      include: [
          {
              model: Academia,
              as: "academia",
          },
          {
              model: Premio,
              as: "premio",
          },
          {
              model: Pelicula,
              as: "pelicula",
              though: {
                  attributes: [],
              },
          },
      ],
      attributes: {
          exclude: ["id_academia", "id_premio", "id_pelicula"],
      },
    });
  };


// Buscar una nominacion de pelicula por su id_pelicula
export const findByPelicula = async (id_pelicula) => {
    return await NominacionPelicula.findAll({
      where: {
          id_pelicula: id_pelicula,
      },
      include: [
          {
              model: Academia,
              as: "academia",
          },
          {
              model: Premio,
              as: "premio",
          },
          {
              model: Pelicula,
              as: "pelicula",
              though: {
                  attributes: [],
              },
          },
      ],
      attributes: {
          exclude: ["id_academia", "id_premio", "id_pelicula"],
      },
    });
  };


// Buscar nominacion de pelicula por su fecha de nominacion
export const findByFecha = async (fecha_nominacion) => {
    return await NominacionPelicula.findAll({
      where: {
          fecha_nominacion: fecha_nominacion,
      },
      include: [
          {
              model: Academia,
              as: "academia",
          },
          {
              model: Premio,
              as: "premio",
          },
          {
              model: Pelicula,
              as: "pelicula",
              though: {
                  attributes: [],
              },
          },
      ],
      attributes: {
          exclude: ["id_academia", "id_premio", "id_pelicula"],
      },
    });
  };


// Actualizar una nominacion de pelicula
export const update = async (id_academia, id_premio, id_pelicula, fecha_nominacion, nominacion) => {
  const result = await NominacionPelicula.findByPk(id_academia, id_premio, id_pelicula, fecha_nominacion);
  if (result) {
    return await result.update(nominacion);
  }
  return null;
};


// Eliminar una nominacion de pelicula
export const remove = async (id_academia, id_premio, id_pelicula, fecha_nominacion) => {
  const result = await NominacionPelicula.findByPk(id_academia, id_premio, id_pelicula, fecha_nominacion);
  if (result) {
    await result.destroy();
    return true;
  }
  return false;
};