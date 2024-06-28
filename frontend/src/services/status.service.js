import httpService from "./http.service";
import SERVER_CONFIG from "../config/server.config";

const STATUS_API_URL = `${SERVER_CONFIG.SERVER_API_URL}/status`;

const getStatus = async () => {
    try {
        const response = await httpService.get(STATUS_API_URL);
        return response;
    } catch (error) {
        console.error("Error al obtener el status:", error);
        throw new Error("Error al obtener el status.");
    }
};

export default getStatus;
