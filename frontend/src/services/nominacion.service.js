import SERVER_CONFIG from "../config/server.config";
import httpService from "./http.service";

const NOMINACION_API_URL = `${SERVER_CONFIG.SERVER_API_URL}/nominaciones_pelicula`;

async function getAll(page, size) {
  try {
    if (!page && !size) return await httpService.get(NOMINACION_API_URL);
    const response = await httpService.get(`${NOMINACION_API_URL}?page=${page}&size=${size}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener todos los nominaciones:", error);
    throw new Error("Error al obtener todos los nominaciones.");
  }
}

async function getById(id) {
  try {
    const response = await httpService.get(`${NOMINACION_API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al buscar nominacion con ID ${id}:`, error);
    throw new Error(`Error al buscar nominacion con ID ${id}.`);
  }
}

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


/* 
data = 
  {
    "id_premio": 9,
    "id_pelicula": 1,
    "fecha_nominacion": "2003-07-04",
    "fue_ganador": 0
  }
*/
async function create(data) {
  try {
    return await httpService.post(NOMINACION_API_URL, data);
  } catch (error) {
    console.error("Error al crear nominacion:", error);
    throw new Error("Error al crear nominacion.");
  }
}

async function update(id, data) {
  try {
    return await httpService.put(`${NOMINACION_API_URL}/${id}`, data);
  } catch (error) {
    console.error(`Error al actualizar la nominacion con id ${id}:`, error);
    throw new Error(`Error al actualizar la nominacion con id ${id}.`);
  }
}

async function remove(id) {
  try {
    return await httpService.delete(`${NOMINACION_API_URL}/${id}`);
  } catch (error) {
    console.error(`Error al eliminar nominacion con id ${id}:`, error);
    throw new Error(`Error al eliminar nominacion con id ${id}.`);
  }
}

async function updateNominaciones(id_pelicula, nominaciones) {
  try {
    const data = {
      nominaciones: nominaciones,
    };
    return await httpService.put(
      `${NOMINACION_API_URL}/pelicula/${id_pelicula}`,
      data
    );
  } catch (err) {
    console.error(`Error al actualizar las nominaciones de la película con id ${id_pelicula}:`, err);
    throw new Error(`Error al actualizar las nominaciones de la película con id ${id_pelicula}.`);
  }
    
}

const nominacionService = {
  getAll,
  getById,
  getByPeliculaId,
  create,
  update,
  remove,
};

export default nominacionService;
