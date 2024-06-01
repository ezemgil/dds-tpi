import * as tipo_traduccionService from '../services/tipo_traduccionService.js';
import { NotFoundError, BadRequestError } from '../utils/errors.js';
import { logger } from "../utils/logger.js"


// Obtener todos los TipoTraduccion
export const getTiposTraduccion = async (req, res, next) => {
    try {
        const tiposTraduccion = await tipo_traduccionService.getTiposTraduccion();
        logger.info(
            `GET /tipos_traduccion | ${req.headers["user-agent"]} | ${tiposTraduccion.length} registros encontrados`
        );
        res.json(tiposTraduccion);
    } catch(error) {
        logger.error(
            `GET /tipos_traduccion | ${req.headers["user-agent"]} | ${error.message}`
        )
        next(error);
    }
};


// Crear TipoTraduccion
export const createTipoTraduccion = async (req, res, next) => {
    try {
        const tipoTraduccion = await tipo_traduccionService.createTipoTraduccion(req.body);
        logger.info(
            `POST /tipos_traduccion | ${ req.headers["user-agent"] } | TipoTraduccion creado - ${JSON.stringify(tipoTraduccion)}`
        );
        res.status(201).json(tipoTraduccion);
    } catch(error) {
        logger.error(
            `POST /tipos_traduccion | ${req.headers["user-agent"]} | ${error.message}`
        );
        next(error);
    }
};


// Buscar TipoTraduccion por id
export const getTipoTraduccionById = async (req, res, next) => {
    try {
        const tipoTraduccion = await tipo_traduccionService.getTipoTraduccionById(req.params.id);
        if (tipoTraduccion) {
            logger.info(
                `GET /tipos_traduccion/${req.params.id} | ${req.headers["user-agent"]} | TipoTraduccion ${req.params.id} encontrado`
            );
            res.json(tipoTraduccion);
        } else {
            logger.warn(
                `GET /tipos_traduccion/${req.params.id} | ${req.headers["user-agent"]} | TipoTraduccion ${req.params.id} no encontrado`
            )
            next(new NotFoundError("TipoTraduccion no encontrado"));
        }
    } catch(error) {
        logger.error(
            `GET /tipos_traduccion/${req.params.id} | ${req.headers["user-agent"]} | ${error.message}`
        );
        next(error);
    }
};


// Actualizar TipoTraduccion
export const updateTipoTraduccion = async (req, res, next) => {
    try {
        const tipoTraduccion = await tipo_traduccionService.updateTipoTraduccion(req.params.id, req.body);
        if (tipoTraduccion) {
            logger.info(
                `PUT /tipos_traduccion/${req.params.id} | ${req.headers["user-agent"]} | TipoTraduccion ${req.params.id} actualizado - ${JSON.stringify(tipoTraduccion)}`
            )
            res.json(tipoTraduccion);
        } else {
            logger.warn(
                `PUT /tipos_traduccion/${req.params.id} | ${req.headers["user-agent"]} | TipoTraduccion ${req.params.id} no encontrado`
            )
            next(new NotFoundError("TipoTraduccion no encontrado"));
        }
    } catch(error) {
        logger.error(
            `PUT /tipos_traduccion/${req.params.id} | ${req.headers["user-agent"]} | ${error.message}`
        );
        next(error);
    }
};


// Eliminar TipoTraduccion
export const deleteTipoTraduccion = async (req, res, next) => {
    try {
        const result = await tipo_traduccionService.deleteTipoTraduccion(req.params.id);
        if (result) {
            logger.info(
                `DELETE /tipos_traduccion/${req.params.id} | ${req.headers["user-agent"]} | TipoTraduccion ${req.params.id} eliminado`
            );
            res.send("TipoTraduccion eliminado");
        } else {
            logger.warn(
                `DELETE /tipos_traduccion/${req.params.id} | ${req.headers["user-agent"]} | TipoTraduccion ${req.params.id} no encontrado`
            )
            next(new NotFoundError("TipoTraduccion no encontrado"));
        }
    } catch(error) {
        logger.error(
            `DELETE /tipos_traduccion/${req.params.id} | ${req.headers["user-agent"]} | ${error.message}`
        )
        next(error);
    }
};

