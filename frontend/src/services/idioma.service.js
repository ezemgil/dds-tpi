import httpService from "./http.service";
import SERVER_CONFIG from "../config/server.config";

const IDIOMA_API_URL = `${SERVER_CONFIG.SERVER_API_URL}/idiomas`;

async function getAll(page, size) {
    try {
        if (!page && !size) return await httpService.get(IDIOMA_API_URL);
        const response = await httpService.get(`${IDIOMA_API_URL}?page=${page}&size=${size}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener todos los idiomas:", error);
        throw new Error("Error al obtener todos los idiomas.");
    }
}

async function getById(id) {
    try {
        return await httpService.get(`${IDIOMA_API_URL}/${id}`);
    } catch (error) {
        console.error(`Error al buscar idioma con ID ${id}:`, error);
        throw new Error(`Error al buscar idioma con ID ${id}.`);
    }
}

async function create(data) {
    try {
        return await httpService.post(IDIOMA_API_URL, data);
    } catch (error) {
        console.error("Error al crear idioma:", error);
        throw new Error("Error al crear idioma.");
    }
}

async function update(id, data) {
    try {
        return await httpService.put(`${IDIOMA_API_URL}/${id}`, data);
    } catch (error) {
        console.error(`Error al actualizar el idioma con id ${id}:`, error);
        throw new Error(`Error al actualizar el idioma con id ${id}.`);
    }
}

async function remove(id) {
    try {
        return await httpService.delete(`${IDIOMA_API_URL}/${id}`);
    } catch (error) {
        console.error(`Error al eliminar idioma con id ${id}:`, error);
        throw new Error(`Error al eliminar idioma con id ${id}.`);
    }
}

const idiomaService = {
    getAll,
    getById,
    create,
    update,
    remove,
};

export default idiomaService;