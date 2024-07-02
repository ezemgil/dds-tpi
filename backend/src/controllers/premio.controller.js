import * as service from "../services/premio.service.js";
import { NotFoundError, BadRequestError, ForbiddenError } from "../utils/errors.js";
import { log } from "../utils/logger.js";

// Buscar todos los premios
export const getPremios = async (req, res, next) => {
    try {
        const page = req.query.page;
        const size = req.query.size;
        const premios = await service.findAll(page, size);
        log(req, `GET /premios ${premios.totalPremios} registros encontrados`);
        res.json(premios);
    } catch (error) {
        log(req, `Error en getPremios: ${error.message}`);
        next(error);
    }
};

// Buscar un premio por su id
export const getPremioById = async (req, res, next) => {
    try {
        const premio = await service.findById(req.params.id);
        if (premio) {
            log(req, `GET /premios/${req.params.id}`);
            res.json(premio);
        } else {
            log(req, `GET /premios/${req.params.id} Premio no encontrado`);
            next(new NotFoundError("Premio no encontrado"));
        }
    } catch (error) {
        next(error);
    }
};

// Buscar un premio por su nombre
export const getPremioByName = async (req, res, next) => {
    try {
        const premio = await service.findByName(req.query.nombre);
        if (premio) {
            log(req, `GET /premios?nombre=${req.query.nombre}`);
            res.json(premio);
        } else {
            log(req, `GET /premios?nombre=${req.query.nombre} Premio no encontrado`);
            next(new NotFoundError("Premio no encontrado"));
        }
    } catch (error) {
        log(req, `Error en getPremioByName: ${error.message}`);
        next(error);
    }
};

// Crear un nuevo premio
export const createPremio = async (req, res, next) => {
    try {
        if (res.locals.user.rol === "Administrador") {
            const premio = await service.create(req.body);
            log(req, `POST /premios ${JSON.stringify(premio)}`);
            res.status(201).json(premio);
        } else {
            log(req, `POST /premios No tiene permiso para realizar esta acción`);
            next(new ForbiddenError("No tiene permiso para realizar esta acción"));
        }
    } catch (error) {
        log(req, `Error en createPremio: ${error.message}`);
        next(error);
    }
};

// Actualizar un premio
export const updatePremio = async (req, res, next) => {
    try {
        if (res.locals.user.rol === "Administrador") {
            const premio = await service.update(req.params.id, req.body);
            if (premio) {
                log(req, `PUT /premios/${req.params.id} ${JSON.stringify(premio)}`);
                res.json(premio);
            } else {
                log(req, `PUT /premios/${req.params.id} Premio no encontrado`);
                next(new NotFoundError("Premio no encontrado"));
            }
        } else {
            log(req, `PUT /premios/${req.params.id} No tiene permiso para realizar esta acción`);
            next(new ForbiddenError("No tiene permiso para realizar esta acción"));
        }
    } catch (error) {
        log(req, `Error en updatePremio: ${error.message}`);
        next(error);
    }
};

// Eliminar un premio
export const deletePremio = async (req, res, next) => {
    try {
        if (res.locals.user.rol === "Administrador") {
            const result = await service.remove(req.params.id);
            if (result) {
                log(req, `DELETE /premios/${req.params.id} Premio eliminado`);
                res.status(204).send("Premio eliminado");
            } else {
                log(req, `DELETE /premios/${req.params.id} Premio no encontrado`);
                next(new NotFoundError("Premio no encontrado"));
            }
        } else {
            log(req, `DELETE /premios/${req.params.id} No tiene permiso para realizar esta acción`);
            next(new ForbiddenError("No tiene permiso para realizar esta acción"));
        }
    } catch (error) {
        log(req, `Error en deletePremio: ${error.message}`);
        next(error);
    }
};
