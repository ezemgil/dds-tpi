import httpService from "./http.service";
import SERVER_CONFIG from "../config/server.config";

const CINEASTA_API_URL = `${SERVER_CONFIG.SERVER_API_URL}/cineastas`;

async function getAll(page, size) {
    try {
        if (!page && !size) return await httpService.get(CINEASTA_API_URL);
        const response = await httpService.get(`${CINEASTA_API_URL}?page=${page}&size=${size}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener todos los cineastas:", error);
        throw new Error("Error al obtener todos los cineastas.");
    }
}

async function getById(id) {
    try {
        return await httpService.get(`${CINEASTA_API_URL}/${id}`);
    } catch (error) {
        console.error(`Error al buscar cineasta con ID ${id}:`, error);
        throw new Error(`Error al buscar cineasta con ID ${id}.`);
    }
}

async function create(data) {
    try {
        return await httpService.post(CINEASTA_API_URL, data);
    } catch (error) {
        console.error("Error al crear cineasta:", error);
        throw new Error("Error al crear cineasta.");
    }
}

async function update(id, data) {
    try {
        return await httpService.put(`${CINEASTA_API_URL}/${id}`, data);
    } catch (error) {
        console.error(`Error al actualizar el cineasta con id ${id}:`, error);
        throw new Error(`Error al actualizar el cineasta con id ${id}.`);
    }
}

async function remove(id) {
    try {
        return await httpService.delete(`${CINEASTA_API_URL}/${id}`);
    } catch (error) {
        console.error(`Error al eliminar cineasta con id ${id}:`, error);
        throw new Error(`Error al eliminar cineasta con id ${id}.`);
    }
}

async function getRandom(cantidad) {
    try {
        return await httpService.get(`${CINEASTA_API_URL}/random?cantidad=${cantidad}`);
    } catch (error) {
        console.error(`Error al buscar cineasta con nombre ${nombre}:`, error);
        throw new Error(`Error al buscar cineasta con nombre ${nombre}.`);
    }
}

async function getParticipaciones(id) {
    try {
        return await httpService.get(`${CINEASTA_API_URL}/${id}/peliculas`);
    } catch (error) {
        console.error(`Error al buscar participaciones del cineasta con ID ${id}:`, error);
        throw new Error(`Error al buscar participaciones del cineasta con ID ${id}.`);
    }
}

async function getByName(nombre) {
    try {
        return await httpService.get(`${CINEASTA_API_URL}/buscar?nombre=${nombre}`);
    } catch (error) {
        console.error(`Error al buscar cineasta con nombre ${nombre}:`, error);
        throw new Error(`Error al buscar cineasta con nombre ${nombre}.`);
    }
}

const cineastaService = {
    getAll,
    getById,
    create,
    update,
    remove,
    getRandom,
    getParticipaciones,
    getByName,
};

export default cineastaService;
