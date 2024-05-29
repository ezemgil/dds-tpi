import TipoTraduccion from "../models/tipos_traduccion.js";


// Buscar todos los TiposTraduccion
export const findAll = async () => {
    return await TipoTraduccion.findAll();
};


// Crear un nuevo TipoTraduccion
export const create = async (tipoTraduccion) => {
    return await TipoTraduccion.create(tipoTraduccion);
};


// Buscar TipoTraduccion por id
export const findById = async (id) => {
    return await TipoTraduccion.findByPk(id);
};


// Actualizar TipoTraduccion
export const update = async (id, tipoTraduccion) => {
    const result = await TipoTraduccion.findByPk(id);
    if (result) {
        return await result.update(tipoTraduccion);
    }
    return null;
};


// Eliminar TipoTraduccion
export const remove = async (id) => {
    const result = await TipoTraduccion.findByPk(id);
    if (result) {
        await result.destroy();
        return true;
    }
    return false;
};
