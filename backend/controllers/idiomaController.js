import * as idiomaService from "../services/idiomaService.js"
import { NotFoundError, BadRequestError } from "../utils/errors.js"
import { logger } from "../utils/logger.js";

// Buscar todos los idiomas
export const getIdiomas = async (req, res, next) => {
    try {
        const idiomas = await idiomaService.getIdiomas();
        logger.info(
            `GET /idiomas | ${req.headers["user-agent"]} | ${idiomas.length} registros encontrados`
        );
        res.json(idiomas);
    } catch(error) {
        logger.error(
            `GET /idiomas | ${req.headers["user-agent"]} | ${error.message}`
        );
        next(error);
    }
};

// Buscar idioma por id
export const getIdiomaById = async (req, res, next) => {
    try {
        const idioma = await idiomaService.getIdiomaById(req.params.id);
        if (idioma) {
            logger.info(
                `GET /idiomas/${req.params.id} | ${req.headers["user-agent"]} | Idioma ${req.params.id} encontrado`
            );
            res.json(idioma);
        } else {
            logger.warn(
                `GET /idiomas/${req.params.id} | ${req.headers["user-agent"]} | Idioma ${req.params.id} no encontrado`
            )
            next(new NotFoundError("Idiomas no encontrado"));
        }
    } catch(error) {
        logger.error(
            `GET /idiomas/${req.params.id} | ${req.headers["user-agent"]} | ${error.message}`
        );
        next(error);
    }
};

// Crear idioma
export const createIdioma = async (req, res, next) => {
    try {
        const idioma = await idiomaService.createIdioma(req.body);
        logger.info(
            `POST /idiomas | ${req.headers["user-agent"]} | Idioma creado - ${JSON.stringify(idioma)}`
        );
        res.status(201).json(idioma)
    } catch(error) {
        logger.error(
            `POST /idiomas | ${req.headers["user-agent"]} | ${error.message}`
        );
        next(error);
    }
};

// Actualizar idioma
export const updateIdioma = async (req, res, next) => {
    try {
        const idioma = await idiomaService.updateIdioma(req.params.id, req.body);
        if (idioma) {
            logger.info(
                `PUT /idiomas/${req.params.id} | ${req.headers["user-agent"]} | Idioma ${req.params.id} actualizado`
            )
            res.json(idioma)
        } else {
            logger.warn(
                `PUT /idiomas/${req.params.id} | ${req.headers["user-agent"]} | Idioma ${req.params.id} no encontrado`
            );
            next(new NotFoundError("Idioma no encontrado"));
        }
    } catch(error) {
        logger.error(
            `PUT /idiomas/${req.params.id} | ${req.headers["user-agent"]} | ${error.message}`
        );
        next(error);
    }
};

// Eliminar idioma
export const deleteIdioma = async (req, res, next) => {
    try {
        const result = await idiomaService.deleteIdioma(req.params.id);
        if (result) {
            logger.info(
                `DELETE /idiomas/${req.params.id} | ${req.headers["user-agent"]} | Idioma ${req.params.id} eliminado`
            );
            res.status(204).send("Idioma eliminado");
        } else {
            logger.warn(
                `DELETE /idiomas/${req.params.id} | ${req.headers["user-agent"]} | Idioma ${req.params.id} no encontrado`   
            );
            next(new NotFoundError("Idioma no encontrado"));
        }
    } catch(error) {
        logger.error(
            `DELETE /idiomas/${req.params.id} | ${req.headers["user-agent"]} | ${error.message}`
        );
        next(error);
    }
};