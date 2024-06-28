import * as service from "../services/genero.service.js";
import { NotFoundError, BadRequestError, ForbiddenError } from "../utils/errors.js";
import { log } from "../utils/logger.js";

// Buscar todos los géneros
export const getGeneros = async (req, res, next) => {
    try {
        const page = req.query.page;
        const size = req.query.size;
        const generos = await service.findAll(page, size);
        res.json(generos);
        log(req, `GET /generos ${generos.length} registros encontrados`);
    } catch (error) {
        log(req, `Error en getGeneros: ${error.message}`);
        next(error);
    }
};

// Buscar un género por su id
export const getGeneroById = async (req, res, next) => {
    try {
        const genero = await service.findById(req.params.id);
        if (genero) {
            res.json(genero);
        } else {
            next(new NotFoundError("Género no encontrado"));
        }
    } catch (error) {
        log(req, `Error en getGeneroById: ${error.message}`);
        next(error);
    }
};

// Buscar un género por su nombre
export const getGeneroByNombre = async (req, res, next) => {
    try {
        const generos = await service.findByName(req.query.nombre);
        res.json(generos);
    } catch (error) {
        log(req, `Error en getGeneroByNombre: ${error.message}`);
        next(error);
    }
};

// Crear un nuevo género
export const createGenero = async (req, res, next) => {
    try {
        if (res.locals.user.rol === "Administrador") {
            const genero = await service.create(req.body);
            log(req, `Género ${genero.nombre} creado por ${res.locals.user.usuario}`);
            res.status(201).json(genero);
        } else {
            next(new ForbiddenError("No tiene permiso para realizar esta acción"));
        }
    } catch (error) {
        log(req, `Error en createGenero: ${error.message}`);
        next(error);
    }
};

// Actualizar un género
export const updateGenero = async (req, res, next) => {
    try {
        if (res.locals.user.rol === "Administrador") {
            const genero = await service.update(req.params.id, req.body);
            if (genero) {
                res.json(genero);
            } else {
                next(new NotFoundError("Género no encontrado"));
            }
        } else {
            next(new ForbiddenError("No tiene permiso para realizar esta acción"));
        }
    } catch (error) {
        log(req, `Error en updateGenero: ${error.message}`);
        next(error);
    }
};

// Eliminar un género
export const deleteGenero = async (req, res, next) => {
    try {
        if (res.locals.user.rol === "Administrador") {
            const result = await service.remove(req.params.id);
            if (result) {
                res.status(204).send("Género eliminado");
            } else {
                next(new NotFoundError("Género no encontrado"));
            }
        } else {
            next(new ForbiddenError("No tiene permiso para realizar esta acción"));
        }
    } catch (error) {
        log(req, `Error en deleteGenero: ${error.message}`);
        next(error);
    }
};
