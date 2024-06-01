import * as tipoRolRepository from '../repositories/tipoRolRepository.js';

export async function getTiposRol() {
    return await tipoRolRepository.findAll();
}

export async function getTipoRolById(id) {
    return await tipoRolRepository.findById(id);
}

export async function createTipoRol(tipoRol) {
    return await tipoRolRepository.create(tipoRol);
}

export async function updateTipoRol(id, tipoRol) {
    return await tipoRolRepository.update(id, tipoRol);
}

export async function deleteTipoRol(id) {
    return await tipoRolRepository.remove(id);
}