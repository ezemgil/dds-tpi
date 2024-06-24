import httpService from "./http.service";
import SERVER_CONFIG from "../config/server.config";

const ACADEMIA_API_URL = `${SERVER_CONFIG.SERVER_API_URL}/academias`;

async function getAll() {
  try {
    const response = await httpService.get(ACADEMIA_API_URL);
    return response;
  } catch (error) {
    console.error("Error al obtener todas las academias:", error);
    throw new Error("Error al obtener todas las academias.");
  }
}

async function getById(id) {
  try {
    return await httpService.get(`${ACADEMIA_API_URL}/${id}`);
  } catch (error) {
    console.error(`Error al buscar academia con ID ${id}:`, error);
    throw new Error(`Error al buscar academia con ID ${id}.`);
  }
}

async function create(data) {
  try {
    return await httpService.post(ACADEMIA_API_URL, data);
  } catch (error) {
    console.error("Error al crear academia:", error);
    throw new Error("Error al crear academia.");
  }
}

async function update(id, data) {
  try {
    return await httpService.put(`${ACADEMIA_API_URL}/${id}`, data);
  } catch (error) {
    console.error(`Error al actualizar la academia con id ${id}:`, error);
    throw new Error(`Error al actualizar la academia con id ${id}.`);
  }
}

async function remove(id) {
  try {
    return await httpService.delete(`${ACADEMIA_API_URL}/${id}`);
  } catch (error) {
    console.error(`Error al eliminar academia con id ${id}:`, error);
    throw new Error(`Error al eliminar academia con id ${id}.`);
  }
}

const academiaService = {
  getAll,
  getById,
  create,
  update,
  remove,
};

export default academiaService;
