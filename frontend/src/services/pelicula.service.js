import httpService from "./http.service";
import SERVER_CONFIG from "../config/server.config";

const PELICULA_API_URL = `${SERVER_CONFIG.SERVER_API_URL}/peliculas`;

async function getAll() {
  try {
    // const response = await Promise.race([
    //   httpService.get(PELICULA_API_URL),
    //   new Promise((_, reject) =>
    //     setTimeout(() => reject(new Error("Request timeout")), 10000)
    //   ),
    // ]);
    const response = await httpService.get(PELICULA_API_URL);
    return response;
  } catch (error) {
    console.error("Error al obtener todas las películas:", error);
    throw new Error("Error al obtener todas las películas.");
  }
}

async function getById(id) {
  try {
    return await httpService.get(`${PELICULA_API_URL}/${id}`);
  } catch (error) {
    console.error(`Error al buscar película con ID ${id}:`, error);
    throw new Error(`Error al buscar película con ID ${id}.`);
  }
}

async function create(data) {
  try {
    return await httpService.post(PELICULA_API_URL, data);
  } catch (error) {
    console.error("Error al crear película:", error);
    throw new Error("Error al crear película.");
  }
}

async function update(id, data) {
  try {
    return await httpService.put(`${PELICULA_API_URL}/${id}`, data);
  } catch (error) {
    console.error(`Error al actualizar la película con id ${id}:`, error);
    throw new Error(`Error al actualizar la película con id ${id}.`);
  }
}

async function remove(id) {
  try {
    return await httpService.delete(`${PELICULA_API_URL}/${id}`);
  } catch (error) {
    console.error(`Error al eliminar película con id ${id}:`, error);
    throw new Error(`Error al eliminar película con id ${id}.`);
  }
}

const peliculaService = {
  getAll,
  getById,
  create,
  update,
  remove,
};

export default peliculaService;
