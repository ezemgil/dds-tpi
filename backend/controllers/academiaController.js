import * as academiaService from '../services/academiaService.js';
import { NotFoundError, BadRequestError } from '../utils/errors.js';
import { logger } from '../utils/logger.js';

// Buscar todas las academias
export const getAcademias = async (req, res, next) => {
  try {
    const academias = await academiaService.getAcademias();
    logger.info(
        `GET /academias | ${req.headers["user-agent"]} | ${academias.length} registros encontrados`
        );
    res.json(academias);
  } catch (error) {
    logger.error(
        `GET /academias | ${req.headers["user-agent"]} | ${error.message}`
    );
    next(error);
  }
};


// Crear nueva academia
export const createAcademia = async (req, res, next) => {
    try {
        const academia = await academiaService.createAcademia(req.body);
        logger.info(
            `POST /academias | ${
                req.headers["user-agent"]
            } | Academia creada - ${JSON.stringify(academia)}`
        )
        res.status(201).json(academia);
    } catch (error) {
        logger.error(
            `POST /academias | ${req.headers["user-agent"]} | ${error.message}`
        );
        next(error);
    }
};


// Buscar una academia por su id
export const getAcademiaById = async (req, res, next) => {
    try {
        const academia = await academiaService.getAcademiaById(req.params.id);
        if (academia) {
            logger.info(
                `GET /academias/${req.params.id} | ${req.headers["user-agent"]} | Academia ${req.params.id} encontrada`
            );
            res.json(academia);
        } else {
            logger.warn(
                `GET /academias/${req.params.id} | ${req.headers["user-agent"]} | Academia ${req.params.id} no encontrada`
            );
            next(new NotFoundError("Academia no encontrada"));
        }
    } catch (error) {
        logger.error(
            `GET /academias/${req.params.id} | ${req.headers["user-agent"]} | ${error.message}`
        );
        next(error);
    }
};


// Actualizar una academia
export const updateAcademia = async (req, res, next) => {
    try {
        const academia = await academiaService.updateAcademia(req.params.id, req.body);
        if (academia) {
            logger.info(
                `PUT /academias/${req.params.id} | ${
                    req.headers["user-agent"]
                } | Academia actualizada - ${JSON.stringify(academia)}`
            );
            res.json(academia);
        } else {
            logger.warn(
                `PUT /academias/${req.params.id} | ${
                    req.headers["user-agent"]
                } | Academia ${req.params.id} no encontrada`
            )
            next(new NotFoundError("Academia no encontrada"));
        }
    } catch (error) {
        logger.error(
            `PUT /academias/${req.params.id} | ${req.headers["user-agent"]} | ${error.message}`
        )
        next(error);
    }
};


// Eliminar una academia
export const deleteAcademia = async (req, res, next) => {
    try {
        const result = await academiaService.deleteAcademia(req.params.id);
        if (result) {
            logger.info(
                `DELETE /academias/${req.params.id} | ${
                    req.headers["user-agent"]
                } | Academia ${req.params.id} eliminada`
            )
            res.status(204).send("Academia eliminada");
        } else {
            logger.warn(
                `DELETE /academias/${req.params.id} | ${
                    req.headers["user-agent"]
                } | Academia ${req.params.id} no encontrada`
            )
            next(new NotFoundError("Academia no encontrada"));
        }
    } catch (error) {
        logger.error(
            `DELETE /academias/${req.params.id} | ${req.headers["user-agent"]} | ${error.message}`
        )
        next(error);
    }
};