import * as peliculaCineastaRolService from '../services/peliculaCineastaRolService.js';
import { NotFoundError, BadRequestError } from '../utils/errors.js';
import { logger } from '../utils/logger.js';

// Buscar todas las relaciones entre películas, cineastas y roles
export const getPeliculaCineastaRoles = async (req, res, next) => {
  try {
    const peliculaCineastaRoles = await peliculaCineastaRolService.getPeliculaCineastaRoles();
    logger.info(
        `GET /peliculas_cineastas_roles | ${req.headers['user-agent']} | ${peliculaCineastaRoles.length} registros encontrados`
        );
    res.json(peliculaCineastaRoles);
  } catch (error) {
    logger.error(
        `GET /peliculas_cineastas_roles | ${req.headers['user-agent']} | ${error.message}`
        );
    next(error);
  }
};


// Buscar una relación entre película, cineasta y rol por su id
export const getPeliculaCineastaRolById = async (req, res, next) => {
  try {
    const peliculaCineastaRol = await peliculaCineastaRolService.getPeliculaCineastaRolById(req.params.id);
    if (peliculaCineastaRol) {
      logger.info(
          `GET /peliculas_cineastas_roles/${req.params.id} | ${req.headers['user-agent']} | Relación entre película, cineasta y rol ${req.params.id} encontrada`
          );
      res.json(peliculaCineastaRol);
    } else {
      logger.warn(
          `GET /peliculas_cineastas_roles/${req.params.id} | ${req.headers['user-agent']} | Relación entre película, cineasta y rol ${req.params.id} no encontrada`
          );
      throw new NotFoundError('Relación entre película, cineasta y rol no encontrada');
    }
  } catch (error) {
    logger.error(
        `GET /peliculas_cineastas_roles/${req.params.id} | ${req.headers['user-agent']} | ${error.message}`
        );
    next(error);
  }
};


// Crear una nueva relación entre película, cineasta y rol
export const createPeliculaCineastaRol = async (req, res, next) => {
  try {
    const peliculaCineastaRol = req.body;
    const nuevaPeliculaCineastaRol = await peliculaCineastaRolService.createPeliculaCineastaRol(peliculaCineastaRol);
    logger.info(
        `POST /peliculas_cineastas_roles | ${
            req.headers['user-agent']
        } | Relación entre película, cineasta y rol creada - ${JSON.stringify(nuevaPeliculaCineastaRol)}`
        );
    res.status(201).json(nuevaPeliculaCineastaRol);
  } catch (error) {
    logger.error(
        `POST /peliculas_cineastas_roles | ${req.headers['user-agent']} | ${error.message}`
        );
    next(error);
  }
};


// Actualizar una relación entre película, cineasta y rol
export const updatePeliculaCineastaRol = async (req, res, next) => {
  try {
    const updatedPeliculaCineastaRol = await peliculaCineastaRolService.updatePeliculaCineastaRol(req.params.id, req.body);
    if (updatedPeliculaCineastaRol) {
      logger.info(
          `PUT /peliculas_cineastas_roles/${req.params.id} | ${
              req.headers['user-agent']
          } | Relación entre película, cineasta y rol ${req.params.id} actualizada - ${JSON.stringify(updatedPeliculaCineastaRol)}`
          );
      res.json(updatedPeliculaCineastaRol);
    } else {
      logger.warn(
          `PUT /peliculas_cineastas_roles/${req.params.id} | ${
              req.headers['user-agent']
          } | Relación entre película, cineasta y rol ${req.params.id} no encontrada`
          );
      throw new NotFoundError('Relación entre película, cineasta y rol no encontrada');
    }
  } catch (error) {
    logger.error(
        `PUT /peliculas_cineastas_roles/${req.params.id} | ${
            req.headers['user-agent']
        } | ${error.message}`
        );
    next(error);
  }
};


// Eliminar una relación entre película, cineasta y rol
export const deletePeliculaCineastaRol = async (req, res, next) => {
  try {
    const peliculaCineastaRol = await peliculaCineastaRolService.deletePeliculaCineastaRol(req.params.id);
    if (peliculaCineastaRol) {
      logger.info(
          `DELETE /peliculas_cineastas_roles/${req.params.id} | ${
              req.headers['user-agent']
          } | Relación entre película, cineasta y rol ${req.params.id} eliminada`
          );
      res.status(204).send("peliculaCineastaRol eliminada");
    } else {
      logger.warn(
          `DELETE /peliculas_cineastas_roles/${req.params.id} | ${
              req.headers['user-agent']
          } | Relación entre película, cineasta y rol ${req.params.id} no encontrada`
          );
      throw new NotFoundError('Relación entre película, cineasta y rol no encontrada');
    }
  } catch (error) {
    logger.error(
        `DELETE /peliculas_cineastas_roles/${req.params.id} | ${
            req.headers['user-agent']
        } | ${error.message}`
        );
    next(error);
  }
};

