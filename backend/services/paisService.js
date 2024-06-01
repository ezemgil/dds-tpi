import * as paisRepository from '../repositories/paisRepository.js';

export async function getPaises() {
    return await paisRepository.findAll();
}

export async function getPaisById(id) {
    return await paisRepository.findById(id);
}

export async function createPais(pais) {
    return await paisRepository.create(pais);
}

export async function updatePais(id, pais) {
    return await paisRepository.update(id, pais);
}

export async function deletePais(id) {
    return await paisRepository.remove(id);
}