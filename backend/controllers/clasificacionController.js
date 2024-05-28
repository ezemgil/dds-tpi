import * as clasificacionService from "../services/clasificacionService.js";
import { NotFoundError, BadRequestError } from "../utils/errors.js";

// Buscar todas las clasificaciones
export const getClasificaciones = async (req, res, next) => {
  try {
    const clasificaciones = await clasificacionService.getClasificaciones();
    res.json(clasificaciones);
  } catch (error) {
    next(error);
  }
};

// Buscar una clasificación por su id
export const getClasificacionById = async (req, res, next) => {
  try {
    const clasificacion = await clasificacionService.getClasificacionById(
      req.params.id
    );
    if (clasificacion) {
      res.json(clasificacion);
    } else {
      next(new NotFoundError("Clasificación no encontrada"));
    }
  } catch (error) {
    next(error);
  }
};

// Crear una nueva clasificación
export const createClasificacion = async (req, res, next) => {
  try {
    const clasificacion = await clasificacionService.createClasificacion(
      req.body
    );
    res.status(201).json(clasificacion);
  } catch (error) {
    next(error);
  }
};

// Actualizar una clasificación
export const updateClasificacion = async (req, res, next) => {
  try {
    const clasificacion = await clasificacionService.updateClasificacion(
      req.params.id,
      req.body
    );
    if (clasificacion) {
      res.json(clasificacion);
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
    const result = await clasificacionService.deleteClasificacion(
      req.params.id
    );
    if (result) {
      res.send("Clasificación eliminada");
    } else {
      next(new NotFoundError("Clasificación no encontrada"));
    }
  } catch (error) {
    next(error);
  }
};
