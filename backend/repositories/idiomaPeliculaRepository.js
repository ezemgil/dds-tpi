import IdiomaPelicula from "../models/idiomasPelicula.js";
import Pelicula from "../models/peliculas.js";
import Idioma from "../models/idiomas.js";
import TipoTraduccion from "../models/tipos_traduccion.js";


// Buscar todos los idiomas de peliculas
export const findAll = async () => {
    return await IdiomaPelicula.findAll({
        include: [
            {
                model: Pelicula,
                as: "pelicula",
            },
            {
                model: Idioma,
                as: "idioma",
            },
            {
                model: TipoTraduccion,
                as: "tipo_traduccion",
            },
        ],
        attributes: {
            exclude: ["id_pelicula", "id_idioma", "id_tipo_traduccion"],
        },
    });
};


// Crear un nuevo idioma de pelicula
export const create = async (idiomaPelicula) => {
    return await IdiomaPelicula.create(idiomaPelicula);
};


// Buscar un idioma de pelicula por sus id's
export const findById = async (id_pelicula, id_idioma, id_tipo_traduccion) => {
    return await IdiomaPelicula.findOne({
        where: {
            id_pelicula: id_pelicula,
            id_idioma: id_idioma,
            id_tipo_traduccion: id_tipo_traduccion
        },
        include: [
            {
                model: Pelicula,
                as: "pelicula",
            },
            {
                model: Idioma,
                as: "idioma",
            },
            {
                model: TipoTraduccion,
                as: "tipo_traduccion",
            }
        ],
        attributes: {
            exclude: ["id_pelicula", "id_idioma", "id_tipo_traduccion"],
        },
    });
};


// Actualizar un idioma de pelicula
export const update = async (id_pelicula, id_idioma, id_tipo_traduccion, idiomaPelicula) => {
    const result = await IdiomaPelicula.findOne({
        where: {
            id_pelicula: id_pelicula,
            id_idioma: id_idioma,
            id_tipo_traduccion: id_tipo_traduccion
        }
    });
    if (result) {
        return await result.update(idiomaPelicula);
     }
    return null
};


// Eliminar un idioma de pelicula
export const remove = async (id_pelicula, id_idioma, id_tipo_traduccion) => {
    const result = await IdiomaPelicula.findOne({
        where: {
            id_pelicula: id_pelicula,
            id_idioma: id_idioma,
            id_tipo_traduccion: id_tipo_traduccion
        }
    });
    if (result) {
        return await result.destroy();
        return true;
    };
    return false;
};

