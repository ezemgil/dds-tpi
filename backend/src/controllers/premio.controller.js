import * as service from "../services/premio.service.js";
import { NotFoundError, BadRequestError, ForbiddenError } from "../utils/errors.js";

// Buscar todos los premios
export const getPremios = async (req, res, next) => {
    try {
        const page = req.query.page;
        const size = req.query.size;
        const premios = await service.findAll(page, size);
        res.json(premios);
    } catch (error) {
        next(error);
    }
};

// Buscar un premio por su id
export const getPremioById = async (req, res, next) => {
    try {
        const premio = await service.findById(req.params.id);
        if (premio) {
            res.json(premio);
        } else {
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
            res.json(premio);
        } else {
            next(new NotFoundError("Premio no encontrado"));
        }
    } catch (error) {
        next(error);
    }
};

// Crear un nuevo premio
export const createPremio = async (req, res, next) => {
    try {
        if (res.locals.user.rol === "Administrador") {
            const premio = await service.create(req.body);
            res.status(201).json(premio);
        } else {
            next(new ForbiddenError("No tiene permiso para realizar esta acción"));
        }
    } catch (error) {
        next(error);
    }
};

// Actualizar un premio
export const updatePremio = async (req, res, next) => {
    try {
        if (res.locals.user.rol === "Administrador") {
            const premio = await service.update(req.params.id, req.body);
            if (premio) {
                res.json(premio);
            } else {
                next(new NotFoundError("Premio no encontrado"));
            }
        } else {
            next(new ForbiddenError("No tiene permiso para realizar esta acción"));
        }
    } catch (error) {
        next(error);
    }
};

// Eliminar un premio
export const deletePremio = async (req, res, next) => {
    try {
        if (res.locals.user.rol === "Administrador") {
            const result = await service.remove(req.params.id);
            if (result) {
                res.status(204).send("Premio eliminado");
            } else {
                next(new NotFoundError("Premio no encontrado"));
            }
        } else {
            next(new ForbiddenError("No tiene permiso para realizar esta acción"));
        }
    } catch (error) {
        next(error);
    }
};
