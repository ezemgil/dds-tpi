import SERVER_CONFIG from "../config/server.config";
import httpService from "./http.service";

const CLASIFICACION_API_URL = `${SERVER_CONFIG.SERVER_API_URL}/clasificaciones`;

async function getAll() {
    try {
        return await httpService.get(CLASIFICACION_API_URL);
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

const clasificacionService = {
    getAll,
    getById,
};

export default clasificacionService;


