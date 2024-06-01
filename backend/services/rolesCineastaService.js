import * as rolesCineastaRepository from '../repositories/rolesCineastaRepository.js';

export async function getRolesCineasta() {
    return await rolesCineastaRepository.findAll();
}

export async function getRolesPorCineasta(id_cineasta) {
    return await rolesCineastaRepository.findRolesPorCineasta(id_cineasta);
}

export async function getCineastasPorRol(id_rol) {
    return await rolesCineastaRepository.findCineastasPorRol(id_rol);
}

export async function getRolDeCineasta(id_cineasta, id_rol) {
    return await rolesCineastaRepository.findRolCineasta(id_cineasta, id_rol);
}

export async function createRolCineasta(rolCineasta) {
    return await rolesCineastaRepository.create(rolCineasta);
}

export async function deleteRolCineasta(id_cineasta, id_rol) {
    return await rolesCineastaRepository.remove(id_cineasta, id_rol);
}

