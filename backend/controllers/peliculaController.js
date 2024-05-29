import * as peliculaService from "../services/peliculaService.js";
import { NotFoundError, BadRequestError } from "../utils/errors.js";

// Obtener todas las películas
export const getPeliculas = async (req, res, next) => {
  try {
    const peliculas = await peliculaService.getPeliculas();
    logger.info(
      `GET /peliculas | ${req.headers["user-agent"]} | ${peliculas.length} registros encontrados`
    );
    res.json(peliculas);
  } catch (error) {
    logger.error(
      `GET /peliculas | ${req.headers["user-agent"]} | ${error.message}`
    );
    next(error);
  }
};

// Buscar una película por su id
export const getPeliculaById = async (req, res, next) => {
  try {
    const pelicula = await peliculaService.getPeliculaById(req.params.id);
    if (pelicula) {
      logger.info(
        `GET /peliculas/${req.params.id} | ${req.headers["user-agent"]} | Película ${req.params.id} encontrada`
      );
      res.json(pelicula);
    } else {
      logger.warn(
        `GET /peliculas/${req.params.id} | ${req.headers["user-agent"]} | Película ${req.params.id} no encontrada`
      );
      next(new NotFoundError("Película no encontrada"));
    }
  } catch (error) {
    logger.error(
      `GET /peliculas/${req.params.id} | ${req.headers["user-agent"]} | ${error.message}`
    );
    next(error);
  }
};

// Crear una nueva película
export const createPelicula = async (req, res, next) => {
  try {
    const pelicula = await peliculaService.createPelicula(req.body);
    logger.info(
      `POST /peliculas | ${
        req.headers["user-agent"]
      } | Película creada - ${JSON.stringify(pelicula)}`
    );
    res.status(201).json(pelicula);
  } catch (error) {
    logger.error(
      `POST /peliculas | ${req.headers["user-agent"]} | ${error.message}`
    );
    next(error);
  }
};

// Actualizar una película
export const updatePelicula = async (req, res, next) => {
  try {
    const pelicula = await peliculaService.updatePelicula(
      req.params.id,
      req.body
    );
    if (pelicula) {
      logger.info(
        `PUT /peliculas/${req.params.id} | ${
          req.headers["user-agent"]
        } | Película actualizada - ${JSON.stringify(pelicula)}`
      );
      res.json(pelicula);
    } else {
      logger.warn(
        `PUT /peliculas/${req.params.id} | ${req.headers["user-agent"]} | Película ${req.params.id} no encontrada`
      );
      next(new NotFoundError("Película no encontrada"));
    }
  } catch (error) {
    logger.error(
      `PUT /peliculas/${req.params.id} | ${req.headers["user-agent"]} | ${error.message}`
    );
    next(error);
  }
};

// Eliminar una película
export const deletePelicula = async (req, res, next) => {
  try {
    const result = await peliculaService.deletePelicula(req.params.id);
    if (result) {
      logger.info(
        `DELETE /peliculas/${req.params.id} | ${req.headers["user-agent"]} | Película eliminada`
      );
      res.send("Película eliminada");
    } else {
      logger.warn(
        `DELETE /peliculas/${req.params.id} | ${req.headers["user-agent"]} | Película ${req.params.id} no encontrada`
      );
      next(new NotFoundError("Película no encontrada"));
    }
  } catch (error) {
    logger.error(
      `DELETE /peliculas/${req.params.id} | ${req.headers["user-agent"]} | ${error.message}`
    );
    next(error);
  }
};
