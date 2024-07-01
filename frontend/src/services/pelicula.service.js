import SERVER_CONFIG from "../config/server.config";
import httpService from "./http.service";

const PELICULA_API_URL = `${SERVER_CONFIG.SERVER_API_URL}/peliculas`;

async function getAll() {
  try {
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

async function getRandom(cantidad) {
  try {
    return await httpService.get(
      `${PELICULA_API_URL}/random?cantidad=${cantidad}`
    );
  } catch (error) {
    console.error(`Error al buscar película con nombre ${nombre}:`, error);
    throw new Error(`Error al buscar película con nombre ${nombre}.`);
  }
}

async function getElenco(id) {
  try {
    return await httpService.get(`${PELICULA_API_URL}/${id}/elenco`);
  } catch (error) {
    console.error(`Error al buscar elenco de la película con ID ${id}:`, error);
    throw new Error(`Error al buscar elenco de la película con ID ${id}.`);
  }
}

async function getByName(nombre) {
  try {
    return await httpService.get(`${PELICULA_API_URL}/buscar?nombre=${nombre}`);
  } catch (error) {
    console.error(`Error al buscar película con nombre ${nombre}:`, error);
    throw new Error(`Error al buscar película con nombre ${nombre}.`);
  }
}

async function addCineastas(id_pelicula, lista_id_cineastas){
  try {
    return await httpService.post(`${PELICULA_API_URL}/${id_pelicula}/cineastas`, lista_id_cineastas)
  } catch (error) {
    console.error(`Error al agregar los cineastas`, error)
    throw new Error(`Error al agregar los cineastas con id ${lista_id_cineastas}`);
  }
}

async function removeCineasta(id_pelicula, id_cineasta){
  try{
    return await httpService.delete(`${PELICULA_API_URL}/${id_pelicula}/cineastas/${id_cineasta}`)
  }catch (error) {
    console.error(`Error al eliminar el cineasta con id ${id_cineasta} de la película con id ${id_pelicula}`, error)
    throw new Error(`Error al eliminar el cineasta con id ${id_cineasta} de la película con id ${id_pelicula}`);
  }
}

const peliculaService = {
  getAll,
  getById,
  getByName,
  create,
  update,
  remove,
  getRandom,
  getElenco,
  addCineastas,
  removeCineasta
};

export default peliculaService;
