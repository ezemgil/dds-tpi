import * as clasificacionService from "../services/clasificacionService.js";
import { NotFoundError, BadRequestError } from "../utils/errors.js";
import { logger } from "../utils/logger.js";

// Buscar todas las clasificaciones
export const getClasificaciones = async (req, res, next) => {
  try {
    const clasificaciones = await clasificacionService.getClasificaciones();
    res.json(clasificaciones);
    logger.info(
      `GET /clasificaciones | ${req.headers["user-agent"]} | ${clasificaciones.length} registros encontrados`
    );
  } catch (error) {
    logger.error(
      `GET /clasificaciones | ${req.headers["user-agent"]} | ${error.message}`
    );
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
      logger.info(
        `GET /clasificaciones/${req.params.id} | ${req.headers["user-agent"]} | Clasificación ${req.params.id} encontrada`
      );
      res.json(clasificacion);
    } else {
      logger.warn(
        `GET /clasificaciones/${req.params.id} | ${req.headers["user-agent"]} | Clasificación ${req.params.id} no encontrada`
      );
      next(new NotFoundError("Clasificación no encontrada"));
    }
  } catch (error) {
    logger.error(
      `GET /clasificaciones/${req.params.id} | ${req.headers["user-agent"]} | ${error.message}`
    );
    next(error);
  }
};

// Crear una nueva clasificación
export const createClasificacion = async (req, res, next) => {
  try {
    const clasificacion = await clasificacionService.createClasificacion(
      req.body
    );
    logger.info(
      `POST /clasificaciones | ${
        req.headers["user-agent"]
      } | Clasificación creada - ${JSON.stringify(clasificacion)}`
    );
    res.status(201).json(clasificacion);
  } catch (error) {
    logger.error(
      `POST /clasificaciones | ${req.headers["user-agent"]} | ${error.message}`
    );
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
      logger.info(
        `PUT /clasificaciones/${req.params.id} | ${
          req.headers["user-agent"]
        } | Clasificación ${req.params.id} actualizada - ${JSON.stringify(
          clasificacion
        )}`
      );
      res.json(clasificacion);
    } else {
      logger.warn(
        `PUT /clasificaciones/${req.params.id} | ${req.headers["user-agent"]} | Clasificación ${req.params.id} no encontrada`
      );
      next(new NotFoundError("Clasificación no encontrada"));
    }
  } catch (error) {
    logger.error(
      `PUT /clasificaciones/${req.params.id} | ${req.headers["user-agent"]} | ${error.message}`
    );
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
      logger.info(
        `DELETE /clasificaciones/${req.params.id} | ${req.headers["user-agent"]} | Clasificación ${req.params.id} eliminada`
      );
      res.send("Clasificación eliminada");
    } else {
      logger.warn(
        `DELETE /clasificaciones/${req.params.id} | ${req.headers["user-agent"]} | Clasificación ${req.params.id} no encontrada`
      );
      next(new NotFoundError("Clasificación no encontrada"));
    }
  } catch (error) {
    logger.error(
      `DELETE /clasificaciones/${req.params.id} | ${req.headers["user-agent"]} | ${error.message}`
    );
    next(error);
  }
};
