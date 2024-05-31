import * as generoService from "../services/generoService.js";
import { NotFoundError, BadRequestError } from "../utils/errors.js";
import { logger } from "../utils/logger.js";

// Buscar todos los géneros
export const getGeneros = async (req, res, next) => {
  try {
    const generos = await generoService.getGeneros();
    logger.info(
      `GET /generos | ${req.headers["user-agent"]} | ${generos.length} registros encontrados`
    );
    res.json(generos);
  } catch (error) {
    logger.error(
      `GET /generos | ${req.headers["user-agent"]} | ${error.message}`
    );
    next(error);
  }
};

// Buscar un género por su id
export const getGeneroById = async (req, res, next) => {
  try {
    const genero = await generoService.getGeneroById(req.params.id);
    if (genero) {
      logger.info(
        `GET /generos/${req.params.id} | ${req.headers["user-agent"]} | Género ${req.params.id} encontrado`
      );
      res.json(genero);
    } else {
      logger.warn(
        `GET /generos/${req.params.id} | ${req.headers["user-agent"]} | Género ${req.params.id} no encontrado`
      );
      next(new NotFoundError("Género no encontrado"));
    }
  } catch (error) {
    logger.error(
      `GET /generos/${req.params.id} | ${req.headers["user-agent"]} | ${error.message}`
    );
    next(error);
  }
};

// Crear un nuevo género
export const createGenero = async (req, res, next) => {
  try {
    const genero = await generoService.createGenero(req.body);
    logger.info(
      `POST /generos | ${
        req.headers["user-agent"]
      } | Género creado - ${JSON.stringify(genero)}`
    );
    res.status(201).json(genero);
  } catch (error) {
    logger.error(
      `POST /generos | ${req.headers["user-agent"]} | ${error.message}`
    );
    next(error);
  }
};

// Actualizar un género
export const updateGenero = async (req, res, next) => {
  try {
    const genero = await generoService.updateGenero(req.params.id, req.body);
    if (genero) {
      logger.info(
        `PUT /generos/${req.params.id} | ${
          req.headers["user-agent"]
        } | Género actualizado - ${JSON.stringify(genero)}`
      );
      res.json(genero);
    } else {
      logger.warn(
        `PUT /generos/${req.params.id} | ${req.headers["user-agent"]} | Género ${req.params.id} no encontrado`
      );
      next(new NotFoundError("Género no encontrado"));
    }
  } catch (error) {
    logger.error(
      `PUT /generos/${req.params.id} | ${req.headers["user-agent"]} | ${error.message}`
    );
    next(error);
  }
};

// Eliminar un género
export const deleteGenero = async (req, res, next) => {
  try {
    const result = await generoService.deleteGenero(req.params.id);
    if (result) {
      logger.info(
        `DELETE /generos/${req.params.id} | ${req.headers["user-agent"]} | Género eliminado`
      );
      res.status(204).send("Género eliminado");
    } else {
      logger.warn(
        `DELETE /generos/${req.params.id} | ${req.headers["user-agent"]} | Género ${req.params.id} no encontrado`
      );
      next(new NotFoundError("Género no encontrado"));
    }
  } catch (error) {
    logger.error(
      `DELETE /generos/${req.params.id} | ${req.headers["user-agent"]} | ${error.message}`
    );
    next(error);
  }
};
