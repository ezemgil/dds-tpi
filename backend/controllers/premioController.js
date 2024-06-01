import * as premioService from '../services/premioService.js';
import { NotFoundError, BadRequestError } from '../utils/errors.js';
import { logger } from '../utils/logger.js';

// Buscar todos los premios
export const getPremios = async (req, res, next) => {
  try {
    const premios = await premioService.getPremios();
    logger.info(
      `GET /premios | ${req.headers["user-agent"]} | ${premios.length} registros encontrados`
    );
    res.json(premios);
  } catch (error) {
    logger.error(
      `GET /premios | ${req.headers["user-agent"]} | ${error.message}`
    );
    next(error);
  }
};


// Buscar un premio por su id
export const getPremioById = async (req, res, next) => {
  try {
    const premio = await premioService.getPremioById(req.params.id);
    if (premio) {
      logger.info(
        `GET /premios/${req.params.id} | ${req.headers["user-agent"]} | Premio ${req.params.id} encontrado`
      );
      res.json(premio);
    } else {
      logger.warn(
        `GET /premios/${req.params.id} | ${req.headers["user-agent"]} | Premio ${req.params.id} no encontrado`
      );
      next(new NotFoundError("Premio no encontrado"));
    }
  } catch (error) {
    logger.error(
      `GET /premios/${req.params.id} | ${req.headers["user-agent"]} | ${error.message}`
    );
    next(error);
  }
};


// Crear un nuevo premio
export const createPremio = async (req, res, next) => {
  try {
    const premio = await premioService.createPremio(req.body);
    logger.info(
      `POST /premios | ${
        req.headers["user-agent"]
      } | Premio creado - ${JSON.stringify(premio)}`
    );
    res.status(201).json(premio);
  } catch (error) {
    logger.error(
      `POST /premios | ${req.headers["user-agent"]} | ${error.message}`
    );
    next(error);
  }
};


// Actualizar un premio
export const updatePremio = async (req, res, next) => {
  try {
    const premio = await premioService.updatePremio(req.params.id, req.body);
    if (premio) {
      logger.info(
        `PUT /premios/${req.params.id} | ${
          req.headers["user-agent"]
        } | Premio actualizado - ${JSON.stringify(premio)}`
      );
      res.json(premio);
    } else {
      logger.warn(
        `PUT /premios/${req.params.id} | ${
          req.headers["user-agent"]
        } | Premio ${req.params.id} no encontrado`
      );
      next(new NotFoundError("Premio no encontrado"));
    }
  } catch (error) {
    logger.error(
      `PUT /premios/${req.params.id} | ${req.headers["user-agent"]} | ${error.message}`
    );
    next(error);
  }
};


// Eliminar un premio
export const deletePremio = async (req, res, next) => {
  try {
    const result = await premioService.deletePremio(req.params.id);
    if (result) {
      logger.info(
        `DELETE /premios/${req.params.id} | ${
          req.headers["user-agent"]
        } | Premio eliminado`
      );
      res.status(204).send("Premio eliminado");
    } else {
      logger.warn(
        `DELETE /premios/${req.params.id} | ${
          req.headers["user-agent"]
        } | Premio ${req.params.id} no encontrado`
      );
      next(new NotFoundError("Premio no encontrado"));
    }
  } catch (error) {
    logger.error(
      `DELETE /premios/${req.params.id} | ${req.headers["user-agent"]} | ${error.message}`
    );
    next(error);
  }
};
