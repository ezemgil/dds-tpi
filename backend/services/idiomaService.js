import * as idiomaRepository from "../repositories/idiomaRepository.js"


// Obtener todos los idiomas
export async function getIdiomas() {
    return await idiomaRepository.findAll();
};


// Buscar idioma por id
export async function getIdiomaById(id) {
    return await idiomaRepository.findById(id);
};


// Crear nuevo idioma
export async function createIdioma(idioma) {
    return await idiomaRepository.create(idioma);
};


// Actualizar un idioma
export async function updateIdioma(id, idioma) {
    return await idiomaRepository.update(id, idioma);
};


// Elimiar un idioma
export async function deleteIdioma(id) {
    return await idiomaRepository.remove(id);
};

