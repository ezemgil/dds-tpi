import * as service from "../services/pais.service.js";
import { NotFoundError } from "../utils/errors.js";
import { log } from "../utils/logger.js";

// Buscar todos los países
export const getPaises = async (req, res, next) => {
  try {
    const paises = await service.findAll();
    res.json(paises);
    log(req, `GET /paises ${paises.length} registros encontrados`);
  } catch (error) {
    log(req, `Error en getPaises: ${error.message}`);
    next(error);
  }
};

// Buscar un país por su id
export const getPaisById = async (req, res, next) => {
  try {
    const pais = await service.findById(req.params.id);
    if (pais) {
      res.json(pais);
    } else {
      next(new NotFoundError("País no encontrado"));
    }
  } catch (error) {
    log(req, `Error en getPaisById: ${error.message}`);
    next(error);
  }
};

// Buscar un país por su nombre
export const getPaisByNombre = async (req, res, next) => {
  try {
    const paises = await service.findByName(req.query.nombre);
    res.json(paises);
  } catch (error) {
    log(req, `Error en getPaisByNombre: ${error.message}`);
    next(error);
  }
};

// Crear un nuevo país
export const createPais = async (req, res, next) => {
  try {
    const pais = await service.create(req.body);
    res.status(201).json(pais);
  } catch (error) {
    log(req, `Error en createPais: ${error.message}`);
    next(error);
  }
};

// Actualizar un país
export const updatePais = async (req, res, next) => {
  try {
    const pais = await service.update(req.params.id, req.body);
    if (pais) {
      res.json(pais);
    } else {
      next(new NotFoundError("País no encontrado"));
    }
  } catch (error) {
    log(req, `Error en updatePais: ${error.message}`);
    next(error);
  }
};

// Eliminar un país
export const deletePais = async (req, res, next) => {
  try {
    const result = await service.remove(req.params.id);
    if (result) {
      res.send("País eliminado");
    } else {
      next(new NotFoundError("País no encontrado"));
    }
  } catch (error) {
    log(req, `Error en deletePais: ${error.message}`);
    next(error);
  }
};
