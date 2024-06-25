import * as service from "../services/clasificacion.service.js";
import { NotFoundError } from "../utils/errors.js";

// Buscar todas las clasificaciones
export const getClasificaciones = async (req, res, next) => {
  try {
    const clasificaciones = await service.findAll();
    res.json(clasificaciones).status(200);
  } catch (error) {
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
    next(error);
  }
};

// Buscar una clasificación por su nombre
export const getClasificacionByNombre = async (req, res, next) => {
  try {
    const clasificacion = await service.findByName(req.query.nombre);
    res.json(clasificacion).status(200);
  } catch (error) {
    next(error);
  }
};

// Crear una nueva clasificación
export const createClasificacion = async (req, res, next) => {
  try {
    const clasificacion = await service.create(req.body);
    res.status(201).json(clasificacion);
  } catch (error) {
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
    next(error);
  }
};
