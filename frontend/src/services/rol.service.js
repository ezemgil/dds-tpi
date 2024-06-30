import SERVER_CONFIG from "../config/server.config";
import httpService from "./http.service";

// const PELICULA_API_URL = `${SERVER_CONFIG.SERVER_API_URL}/peliculas`;
const ROL_API_URL = `${SERVER_CONFIG.SERVER_API_URL}/tipos_rol`;

async function getAll() {
  try {
    const response = await httpService.get(ROL_API_URL);
    return response;
  } catch (error) {
    console.error("Error al obtener todos los roles:", error);
    throw new Error("Error al obtener todos los roles.");
  }
}

const rolService = {
    getAll
}
export default rolService;