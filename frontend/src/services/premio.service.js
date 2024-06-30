import SERVER_CONFIG from "../config/server.config";
import httpService from "./http.service";

const PREMIO_API_URL = `${SERVER_CONFIG.SERVER_API_URL}/premios`;

async function getAll() {
    try {
        const response = await httpService.get(PREMIO_API_URL);
        return response;
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

const premioService = {
    getAll,
    getById,
    create
}

export default premioService;