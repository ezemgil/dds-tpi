import * as idiomaPeliculaService from "../services/idiomaPeliculaService.js";
import { NotFoundError, BadRequestError } from "../utils/errors.js";
import { logger } from "../utils/logger.js";

// Buscar todos los idiomas de las peliculas
export const getIdiomasPelicula = async (req, res, next) => {
  try {
    const idiomasPelicula = await idiomaPeliculaService.getIdiomasPelicula();
    res.json(idiomasPelicula).status(200);
    logger.info(
      `GET /idiomas_pelicula | ${req.headers["user-agent"]} | ${idiomasPelicula.length} registros encontrados`
    );
  } catch (error) {
    logger.error(
      `GET /idiomas_pelicula | ${req.headers["user-agent"]} | ${error.message}`
    );
    next(error);
  }
};


// Buscar un idioma de pelicula por sus id's
export const getIdiomaPeliculaById = async (req, res, next) => {
  try {
    const idiomaPelicula = await idiomaPeliculaService.getIdiomaPeliculaById(req.params.id);
    if (idiomaPelicula) {
      logger.info(
        `GET /idiomas_pelicula/${req.params.id} | ${req.headers["user-agent"]} | Idioma de pelicula ${req.params.id} encontrado`
      );
      res.json(idiomaPelicula).status(200);
    } else {
      logger.warn(
        `GET /idiomas_pelicula/${req.params.id} | ${req.headers["user-agent"]} | Idioma de pelicula ${req.params.id}no encontrado`
      );
      next(new NotFoundError("Idioma de pelicula no encontrado"));
    }
  } catch (error) {
    logger.error(
      `GET /idiomas_pelicula/${req.params.id} | ${req.headers["user-agent"]} | ${error.message}`
    );
    next(error);
  }
};


// Crear un nuevo idioma de pelicula
export const createIdiomaPelicula = async (req, res, next) => {
  try {
    const idiomaPelicula = await idiomaPeliculaService.createIdiomaPelicula(req.body);
    logger.info(
      `POST /idiomas_pelicula | ${
        req.headers["user-agent"]
      } | Idioma de pelicula creado - ${JSON.stringify(idiomaPelicula)}`
    );
    res.status(201).json(idiomaPelicula);
  } catch (error) {
    logger.error(
      `POST /idiomas_pelicula | ${req.headers["user-agent"]} | ${error.message}`
    );
    next(error);
  }
};


// Actualizar un idioma de pelicula
export const updateIdiomaPelicula = async (req, res, next) => {
  try {
    const idiomaPelicula = await idiomaPeliculaService.updateIdiomaPelicula(
      req.params.id,
      req.body
    );
    if (idiomaPelicula) {
      logger.info(
        `PUT /idiomas_pelicula/${req.params.id} | ${
          req.headers["user-agent"]
        } | Idioma de pelicula actualizado - ${JSON.stringify(idiomaPelicula)}`
      );
      res.json(idiomaPelicula).status(200);
    } else {
      logger.warn(
        `PUT /idiomas_pelicula/${req.params.id} | ${req.headers["user-agent"]} | Idioma de pelicula ${req.params.id} no encontrado`
      );
      next(new NotFoundError("Idioma de pelicula no encontrado"));
    }
  } catch (error) {
    logger.error(
      `PUT /idiomas_pelicula/${req.params.id} | ${req.headers["user-agent"]} | ${error.message}`
    );
    next(error);
  }
};


// Eliminar un idioma de pelicula
export const deleteIdiomaPelicula = async (req, res, next) => {
  try {
    const deletedIdiomaPelicula = await idiomaPeliculaService.deleteIdiomaPelicula(req.params.id);
    if (deletedIdiomaPelicula) {
      logger.info(
        `DELETE /idiomas_pelicula/${req.params.id} | ${
          req.headers["user-agent"]
        } | Idioma de pelicula ${req.params.id} eliminado`
      );
      res.status(204).end();
    } else {
      logger.warn(
        `DELETE /idiomas_pelicula/${req.params.id} | ${
          req.headers["user-agent"]
        } | Idioma de pelicula ${req.params.id} no encontrado`
      );
      next(new NotFoundError("Idioma de pelicula no encontrado"));
    }
  } catch (error) {
    logger.error(
      `DELETE /idiomas_pelicula/${req.params.id} | ${req.headers["user-agent"]} | ${error.message}`
    );
    next(error);
  }
};