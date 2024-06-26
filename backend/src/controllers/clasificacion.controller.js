import * as service from "../services/clasificacion.service.js";
import { NotFoundError } from "../utils/errors.js";
import { log } from "../utils/logger.js";

// Buscar todas las clasificaciones
export const getClasificaciones = async (req, res, next) => {
  try {
    const page = req.query.page;
    const size = req.query.size;
    const clasificaciones = await service.findAll(page, size);
    res.json(clasificaciones).status(200);
    log(
      req,
      `GET /clasificaciones ${clasificaciones.length} registros encontrados`
    );
  } catch (error) {
    log(req, `Error en getClasificaciones: ${error.message}`);
    next(error);
  }
};

// Buscar una clasificación por su id
export const getClasificacionById = async (req, res, next) => {
  try {
    const clasificacion = await service.findById(req.params.id);
    if (clasificacion) {
      res.json(clasificacion).status(200);
    } else {
      next(new NotFoundError("Clasificación no encontrada"));
    }
  } catch (error) {
    log(req, `Error en getClasificacionById: ${error.message}`);
    next(error);
  }
};

// Buscar una clasificación por su nombre
export const getClasificacionByNombre = async (req, res, next) => {
  try {
    const clasificacion = await service.findByName(req.query.nombre);
    res.json(clasificacion).status(200);
  } catch (error) {
    log(req, `Error en getClasificacionByNombre: ${error.message}`);
    next(error);
  }
};

// Crear una nueva clasificación
export const createClasificacion = async (req, res, next) => {
  try {
    const clasificacion = await service.create(req.body);
    res.status(201).json(clasificacion);
  } catch (error) {
    log(req, `Error en createClasificacion: ${error.message}`);
    next(error);
  }
};

// Actualizar una clasificación
export const updateClasificacion = async (req, res, next) => {
  try {
    const clasificacion = await service.update(req.params.id, req.body);
    if (clasificacion) {
      res.json(clasificacion).status(200);
    } else {
      next(new NotFoundError("Clasificación no encontrada"));
    }
  } catch (error) {
    log(req, `Error en updateClasificacion: ${error.message}`);
    next(error);
  }
};

// Eliminar una clasificación
export const deleteClasificacion = async (req, res, next) => {
  try {
    const result = await service.remove(req.params.id);
    if (result) {
      res.status(204).send("Clasificación eliminada");
    } else {
      next(new NotFoundError("Clasificación no encontrada"));
    }
  } catch (error) {
    log(req, `Error en deleteClasificacion: ${error.message}`);
    next(error);
  }
};
