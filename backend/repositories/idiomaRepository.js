import Idioma from "../models/idiomas.js";

// Buscar todos los idiomas
export const findAll = async () => {
    return await Idioma.findAll();
};

// Crear un nuevo idioma
export const create = async (idioma) => {
    return await Idioma.create(idioma);
}; 

// Buscar idioma por su id
export const findById = async (id) => {
    return await Idioma.findByPk(id);
};

// Actualizar idioma
export const update = async (id, idioma) => {
    const result = await Idioma.findByPk(id);
    if (result) {
        return await result.update(idioma);
    }
    return null;
};

// Eliminar un idioma
export const remove = async (id) => {
    const result = await Idioma.findByPk(id);
    if (result) {
        await result.destroy();
        return true;
    }
    return false;
};
