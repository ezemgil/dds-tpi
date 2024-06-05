import * as nominacion_peliculaService from "../services/nominacion_peliculaService.js";
import { NotFoundError, BadRequestError } from "../utils/errors.js";
import { logger } from "../utils/logger.js";

// Buscar todas las nominaciones de peliculas
export const getNominacionesPelicula = async (req, res, next) => {
  try {
    const nominaciones = await nominacion_peliculaService.getNominacionesPelicula();
    logger.info(
      `GET /nominaciones_pelicula | ${req.headers["user-agent"]} | ${nominaciones.length} registros encontrados`
    );
    res.json(nominaciones);
  } catch (error) {
    logger.error(
      `GET /nominaciones_pelicula | ${req.headers["user-agent"]} | ${error.message}`
    )
    next(error);
  }
};


// Crear una nueva nominacion de pelicula
export const createNominacionPelicula = async (req, res, next) => {
  try {
    const nominacion = req.body;
    const nuevaNominacion = await nominacion_peliculaService.createNominacionPelicula(nominacion);
    logger.info(
      `POST /nominaciones_pelicula | ${
        req.headers["user-agent"]
      } | Nominacion de pelicula creada - ${JSON.stringify(nuevaNominacion)}`
    );
    res.status(201).json(nuevaNominacion);
  } catch (error) {
    logger.error(
      `POST /nominaciones_pelicula | ${req.headers["user-agent"]} | ${error.message}`
    );
    next(error);
  }
};


// Buscar una nominacion de pelicula por sus id
export const getNominacionPeliculaById = async (req, res, next) => {
  try {
    const nominacion = await nominacion_peliculaService.getNominacionPeliculaById(req.params.id);
    if (nominacion) {
      logger.info(
        `GET /nominaciones_pelicula/${req.params.id} | ${req.headers["user-agent"]} | Nominacion de pelicula ${req.params.id} encontrada`
      )
      res.json(nominacion);
    } else {
      logger.warn(
        `GET /nominaciones_pelicula/${req.params.id} | ${req.headers["user-agent"]} | Nominacion de pelicula ${req.params.id} no encontrada`
      );
      throw new NotFoundError("Nominacion de pelicula no encontrada");
    }
  } catch (error) {
    logger.error(
      `GET /nominaciones_pelicula/${req.params.id} | ${req.headers["user-agent"]} | ${error.message}`
    );
    next(error);
  }
};


// Actualizar una nominacion de pelicula
export const updateNominacion = async (req, res, next) => {
  try {
    const updatedNominacion = await nominacion_peliculaService.updateNominacion(
      req.params.id,
      req.body
    );
    if (updatedNominacion) {
      logger.info(
        `PUT /nominaciones_pelicula/${req.params.id} | ${
          req.headers["user-agent"]
        } | Nominacion de pelicula ${req.params.id} actualizada - ${JSON.stringify(updatedNominacion)}`
      );
      res.json(updatedNominacion);
    } else {
      logger.warn(
        `PUT /nominaciones_pelicula/${req.params.id} | ${
          req.headers["user-agent"]
        } | Nominacion de pelicula ${req.params.id} no encontrada`
      );
      throw new NotFoundError("Nominacion de pelicula no encontrada");
    }
  } catch (error) {
    logger.error(
      `PUT /nominaciones_pelicula/${req.params.id} | ${
        req.headers["user-agent"]
      } | ${error.message}`
    );
    next(error);
  }
};


// Eliminar una nominacion de pelicula
export const deleteNominacionPelicula = async (req, res, next) => {
  try {
    const result = await nominacion_peliculaService.deleteNominacion(req.params.id);
    if (result) {
      logger.info(
        `DELETE /nominaciones_pelicula/${req.params.id} | ${
          req.headers["user-agent"]
        } | Nominacion de pelicula ${req.params.id} eliminada`
      );
      res.status(204).send("Nominacion de pelicula eliminada");
    } else {
      logger.warn(
        `DELETE /nominaciones_pelicula/${req.params.id} | ${
          req.headers["user-agent"]
        } | Nominacion de pelicula ${req.params.id} no encontrada`
      );
      throw new NotFoundError("Nominacion de pelicula no encontrada");
    }
  } catch (error) {
    logger.error(
      `DELETE /nominaciones_pelicula/${req.params.id} | ${
        req.headers["user-agent"]
      } | ${error.message}`
    );
    next(error);
  }
};
