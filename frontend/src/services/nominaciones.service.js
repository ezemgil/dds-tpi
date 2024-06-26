import httpService from "./http.service";
import SERVER_CONFIG from "../config/server.config";

const NOMINACION_API_URL = `${SERVER_CONFIG.SERVER_API_URL}/nominaciones_pelicula`;

async function getByPeliculaId(id) {
  try {
    return await httpService.get(`${NOMINACION_API_URL}/pelicula/${id}`);
  } catch (error) {
    console.error(
      `Error al buscar nominaciones de la película con ID ${id}:`,
      error
    );
    throw new Error(
      `Error al buscar nominaciones de la película con ID ${id}.`
    );
  }
}

const nominacionesService = {
  getByPeliculaId,
};

export default nominacionesService;
