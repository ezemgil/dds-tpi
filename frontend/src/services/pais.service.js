import httpService from "./http.service";
import SERVER_CONFIG from "../config/server.config";

const PAISES_API_URL = `${SERVER_CONFIG.SERVER_API_URL}/paises`;

async function getAll() {
  try {
    const response = await httpService.get(PAISES_API_URL);
    return response;
  } catch (error) {
    console.error("Error al obtener todos los paises:", error);
    throw new Error("Error al obtener todos los paises.");
  }
}

async function getById(id) {
  try {
    return await httpService.get(`${PAISES_API_URL}/${id}`);
  } catch (error) {
    console.error(`Error al buscar pais con ID ${id}:`, error);
    throw new Error(`Error al buscar pais con ID ${id}.`);
  }
}

async function create(data) {
  try {
    return await httpService.post(PAISES_API_URL, data);
  } catch (error) {
    console.error("Error al crear pais:", error);
    throw new Error("Error al crear pais.");
  }
}

async function update(id, data) {
  try {
    return await httpService.put(`${PAISES_API_URL}/${id}`, data);
  } catch (error) {
    console.error(`Error al actualizar el pais con id ${id}:`, error);
    throw new Error(`Error al actualizar el pais con id ${id}.`);
  }
}

async function remove(id) {
  try {
    return await httpService.delete(`${PAISES_API_URL}/${id}`);
  } catch (error) {
    console.error(`Error al eliminar pais con id ${id}:`, error);
    throw new Error(`Error al eliminar pais con id ${id}.`);
  }
}

const paisService = {
  getAll,
  getById,
  create,
  update,
  remove,
};

export default paisService;
