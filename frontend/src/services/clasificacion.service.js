import SERVER_CONFIG from "../config/server.config";
import httpService from "./http.service";

const CLASIFICACION_API_URL = `${SERVER_CONFIG.SERVER_API_URL}/clasificaciones`;

async function getAll(page, size) {
    try {
        if (!page && !size) return await httpService.get(CLASIFICACION_API_URL);
        const response = await httpService.get(`${CLASIFICACION_API_URL}?page=${page}&size=${size}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener todas las clasificaciones:", error);
        throw new Error("Error al obtener todas las clasificaciones.");
    }
}

async function getById(id) {
    try {
        return await httpService.get(`${CLASIFICACION_API_URL}/${id}`);
    } catch (error) {
        console.error(`Error al buscar clasificacion con ID ${id}:`, error);
        throw new Error(`Error al buscar clasificacion con ID ${id}.`);
    }
}

async function create(data) {
    try {
        return await httpService.post(CLASIFICACION_API_URL, data);
    } catch (error) {
        console.error("Error al crear clasificacion:", error);
        throw new Error("Error al crear clasificacion.");
    }
}

async function update(id, data) {
    try {
        return await httpService.put(`${CLASIFICACION_API_URL}/${id}`, data);
    } catch (error) {
        console.error(`Error al actualizar el clasificacion con id ${id}:`, error);
        throw new Error(`Error al actualizar el clasificacion con id ${id}.`);
    }
}

async function remove(id) {
    try {
        return await httpService.delete(`${CLASIFICACION_API_URL}/${id}`);
    } catch (error) {
        console.error(`Error al eliminar clasificacion con id ${id}:`, error);
        throw new Error(`Error al eliminar clasificacion con id ${id}.`);
    }
}

const clasificacionService = {
    getAll,
    getById,
    create,
    update,
    remove,
};

export default clasificacionService;


