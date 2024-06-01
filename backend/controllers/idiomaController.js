import * as idiomaService from "../services/idiomaService.js"
import { NotFoundError, BadRequestError } from "../utils/errors.js"

// Buscar todos los idiomas
export const getIdiomas = async (req, res, next) => {
    try {
        const idiomas = await idiomaService.getIdiomas();
        res.json(idiomas);
    } catch(error) {
        next(error);
    }
};

// Buscar idioma por id
export const getIdiomaById = async (req, res, next) => {
    try {
        const idioma = await idiomaService.getIdiomaById(req.params.id);
        if (idioma) {
            res.json(idioma);
        } else {
            next(new NotFoundError("Idiomas no encontrado"));
        }
    } catch(error) {
        next(error);
    }
};

// Crear idioma
export const createIdioma = async (req, res, next) => {
    try {
        const idioma = await idiomaService.createIdioma(req.body);
        res.status(201).json(idioma)
    } catch(error) {
        next(error);
    }
};

// Actualizar idioma
export const updateIdioma = async (req, res, next) => {
    try {
        const idioma = await idiomaService.updateIdioma(req.params.id, req.body);
        if (idioma) {
            res.json(idioma)
        } else {
            next(new NotFoundError("Idioma no encontrado"));
        }
    } catch(error) {
        next(error);
    }
};

// Eliminar idioma
export const deleteIdioma = async (req, res, next) => {
    try {
        const result = await idiomaService.deleteIdioma(req.params.id);
        if (result) {
            res.status(204).send("Idioma eliminado");
        } else {
            next(new NotFoundError("Idioma no encontrado"));
        }
    } catch(error) {
        next(error);
    }
};