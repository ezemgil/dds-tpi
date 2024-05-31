import * as tipo_traduccionRepository from '../repositories/tipo_traduccionRepository.js';


// Obtener todos los TipoTraduccion
export async function getTiposTraduccion() {
    return await tipo_traduccionRepository.findAll();
};


// Crear nuevo TipoTraduccion
export async function createTipoTraduccion(tipoTraduccion) {
    return await tipo_traduccionRepository.create(tipoTraduccion);
};


// Buscar idioma por id
export async function getTipoTraduccionById(id) {
    return await tipo_traduccionRepository.findById(id);
};


// Actualizar un TipoTraduccion
export async function updateTipoTraduccion(id, tipoTraduccion) {
    return await tipo_traduccionRepository.update(id, tipoTraduccion);
};


// Elimiar un TipoTraduccion
export async function deleteTipoTraduccion(id) {
    return await tipo_traduccionRepository.remove(id);
}