import SERVER_CONFIG from "../config/server.config";
import httpService from "./http.service";

// Configuración de la URL base de la API
const GENERO_API_URL = `${SERVER_CONFIG.SERVER_API_URL}/generos`;

async function getAll() {
  try {
    return await httpService.get(GENERO_API_URL);
  } catch (error) {
    console.error("Error al obtener todos los géneros:", error);
    throw new Error("Error al obtener todos los géneros.");
  }
}

async function getById(id) {
  try {
    return await httpService.get(`${GENERO_API_URL}/${id}`);
  } catch (error) {
    console.error(`Error al buscar género con ID ${id}:`, error);
    throw new Error(`Error al buscar género con ID ${id}.`);
  }
}

async function create(data) {
  try {
    return await httpService.post(GENERO_API_URL, data);
  } catch (error) {
    console.error("Error al crear género:", error);
    throw new Error("Error al crear género.");
  }
}

async function update(id, data) {
  try {
    return await httpService.put(`${GENERO_API_URL}/${id}`, data);
  } catch (error) {
    console.error(`Error al actualizar el género con id ${id}:`, error);
    throw new Error(`Error al actualizar el género con id ${id}.`);
  }
}

async function remove(id) {
  try {
    return await httpService.delete(`${GENERO_API_URL}/${id}`);
  } catch (error) {
    console.error(`Error al eliminar género con id ${id}:`, error);
    throw new Error(`Error al eliminar género con id ${id}.`);
  }
}


const generoService = {
  getAll,
  getById,
  create,
  update,
  remove,
};


export default  generoService;
