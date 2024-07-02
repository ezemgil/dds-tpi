import httpService from "./http.service";
import SERVER_CONFIG from "../config/server.config";

const PREMIO_API_URL = `${SERVER_CONFIG.SERVER_API_URL}/premios`;

async function getAll(page, size) {
    try {
        if (!page && !size) return await httpService.get(PREMIO_API_URL);
        const response = await httpService.get(`${PREMIO_API_URL}?page=${page}&size=${size}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener todos los premios:", error);
        throw new Error("Error al obtener todos los premios.");
    }
}

async function getById(id) {
    try {
        return await httpService.get(`${PREMIO_API_URL}/${id}`);
    } catch (error) {
        console.error(`Error al buscar premio con ID ${id}:`, error);
        throw new Error(`Error al buscar premio con ID ${id}.`);
    }
}

async function create(data) {
    try {
        return await httpService.post(PREMIO_API_URL, data);
    } catch (error) {
        console.error("Error al crear premio:", error);
        throw new Error("Error al crear premio.");
    }
}

async function update(id, data) {
    try {
        return await httpService.put(`${PREMIO_API_URL}/${id}`, data);
    } catch (error) {
        console.error(`Error al actualizar el premio con id ${id}:`, error);
        throw new Error(`Error al actualizar el premio con id ${id}.`);
    }
}

async function remove(id) {
    try {
        return await httpService.delete(`${PREMIO_API_URL}/${id}`);
    } catch (error) {
        console.error(`Error al eliminar premio con id ${id}:`, error);
        throw new Error(`Error al eliminar premio con id ${id}.`);
    }
}

async function getByName(nombre) {
    try {
        return await httpService.get(`${PREMIO_API_URL}/buscar?nombre=${nombre}`);
    } catch (error) {
        console.error(`Error al buscar premio con nombre ${nombre}:`, error);
        throw new Error(`Error al buscar premio con nombre ${nombre}.`);
    }
}

const premioService = {
    getAll,
    getById,
    create,
    update,
    remove,
    getByName,
};

export default premioService;
