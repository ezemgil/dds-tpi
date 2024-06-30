import * as service from "../services/pais.service.js";
import { NotFoundError, ForbiddenError } from "../utils/errors.js";
import { log } from "../utils/logger.js";

// Buscar todos los países
export const getPaises = async (req, res, next) => {
    try {
        const page = req.query.page;
        const size = req.query.size;
        const paises = await service.findAll(page, size);
        res.json(paises);
        log(req, `GET /paises ${paises.length} registros encontrados`);
    } catch (error) {
        log(req, `Error en getPaises: ${error.message}`);
        next(error);
    }
};

// Buscar un país por su id
export const getPaisById = async (req, res, next) => {
    try {
        const pais = await service.findById(req.params.id);
        if (pais) {
            res.json(pais);
        } else {
            next(new NotFoundError("País no encontrado"));
        }
    } catch (error) {
        log(req, `Error en getPaisById: ${error.message}`);
        next(error);
    }
};

// Buscar un país por su nombre
export const getPaisByNombre = async (req, res, next) => {
    try {
        const paises = await service.findByName(req.query.nombre);
        res.json(paises);
    } catch (error) {
        log(req, `Error en getPaisByNombre: ${error.message}`);
        next(error);
    }
};

// Crear un nuevo país
export const createPais = async (req, res, next) => {
    try {
        if (res.locals.user.rol === "Administrador") {
            const pais = await service.create(req.body);
            log(req, `País ${pais.nombre} creado por ${res.locals.user.usuario}`);
            res.status(201).json(pais);
        } else {
            next(new ForbiddenError("No tiene permiso para realizar esta acción"));
        }
    } catch (error) {
        log(req, `Error en createPais: ${error.message}`);
        next(error);
    }
};

// Actualizar un país
export const updatePais = async (req, res, next) => {
    try {
        if (res.locals.user.rol === "Administrador") {
            const pais = await service.update(req.params.id, req.body);
            if (pais) {
                log(req, `País ${pais.nombre} actualizado por ${res.locals.user.usuario}`);
                res.json(pais);
            } else {
                next(new NotFoundError("País no encontrado"));
            }
        } else {
            next(new ForbiddenError("No tiene permiso para realizar esta acción"));
        }
    } catch (error) {
        log(req, `Error en updatePais: ${error.message}`);
        next(error);
    }
};

// Eliminar un país
export const deletePais = async (req, res, next) => {
    try {
        if (res.locals.user.rol === "Administrador") {
            const pais = await service.remove(req.params.id);
            if (pais) {
                log(req, `País ${pais.nombre} eliminado por ${res.locals.user.usuario}`);
                res.status(200).end();
            } else {
                next(new NotFoundError("País no encontrado"));
            }
        } else {
            next(new ForbiddenError("No tiene permiso para realizar esta acción"));
        }
    } catch (error) {
        log(req, `Error en deletePais: ${error.message}`);
        next(error);
    }
};
