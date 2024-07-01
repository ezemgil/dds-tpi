import * as service from "../services/idioma.service.js";
import { NotFoundError, ForbiddenError } from "../utils/errors.js";
import { log } from "../utils/logger.js";

// Buscar todos los idiomas
export const getIdiomas = async (req, res, next) => {
    try {
        const page = req.query.page;
        const size = req.query.size;
        const idiomas = await service.findAll(page, size);
        res.json(idiomas).status(200);
        log(req, `GET /idiomas ${idiomas.length} registros encontrados`);
    } catch (error) {
        log(req, `Error en getIdiomas: ${error.message}`);
        next(error);
    }
};

// Buscar idioma por id
export const getIdiomaById = async (req, res, next) => {
    try {
        const idioma = await service.findById(req.params.id);
        if (idioma) {
            res.json(idioma);
        } else {
            next(new NotFoundError("Idiomas no encontrado"));
        }
    } catch (error) {
        log(req, `Error en getIdiomaById: ${error.message}`);
        next(error);
    }
};

// Buscar idioma por nombre
export const getIdiomaByNombre = async (req, res, next) => {
    try {
        const idiomas = await service.findByName(req.query.nombre);
        res.json(idiomas);
    } catch (error) {
        log(req, `Error en getIdiomaByNombre: ${error.message}`);
        next(error);
    }
};

// Crear idioma
export const createIdioma = async (req, res, next) => {
    try {
        if (res.locals.user.rol === "Administrador") {
            const idioma = await service.create(req.body);
            log(req, `Idioma ${idioma.nombre} creado por ${res.locals.user.usuario}`);
            res.status(201).json(idioma);
        } else {
            next(new ForbiddenError("No tiene permiso para realizar esta acción"));
        }
    } catch (error) {
        log(req, `Error en createIdioma: ${error.message}`);
        next(error);
    }
};

// Actualizar idioma
export const updateIdioma = async (req, res, next) => {
    try {
        if (res.locals.user.rol === "Administrador") {
            const idioma = await service.update(req.params.id, req.body);
            if (idioma) {
                res.json(idioma);
            } else {
                next(new NotFoundError("Idioma no encontrado"));
            }
        } else {
            next(new ForbiddenError("No tiene permiso para realizar esta acción"));
        }
    } catch (error) {
        log(req, `Error en updateIdioma: ${error.message}`);
        next(error);
    }
};

// Eliminar idioma
export const deleteIdioma = async (req, res, next) => {
    try {
        if (res.locals.user.rol === "Administrador") {
            const result = await service.remove(req.params.id);
            if (result) {
                res.status(204).send("Idioma eliminado");
            } else {
                next(new NotFoundError("Idioma no encontrado"));
            }
        } else {
            next(new ForbiddenError("No tiene permiso para realizar esta acción"));
        }
    } catch (error) {
        log(req, `Error en deleteIdioma: ${error.message}`);
        next(error);
    }
};
