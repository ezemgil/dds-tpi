import * as tipo_traduccionService from '../services/tipo_traduccionService.js';
import { NotFoundError, BadRequestError } from '../utils/errors.js';


// Obtener todos los TipoTraduccion
export const getTiposTraduccion = async (req, res, next) => {
    try {
        const tiposTraduccion = await tipo_traduccionService.getTiposTraduccion();
        res.json(tiposTraduccion);
    } catch(error) {
        next(error);
    }
};


// Crear TipoTraduccion
export const createTipoTraduccion = async (req, res, next) => {
    try {
        const tipoTraduccion = await tipo_traduccionService.createTipoTraduccion(req.body);
        res.status(201).json(tipoTraduccion);
    } catch(error) {
        next(error);
    }
};


// Buscar TipoTraduccion por id
export const getTipoTraduccionById = async (req, res, next) => {
    try {
        const tipoTraduccion = await tipo_traduccionService.getTipoTraduccionById(req.params.id);
        if (tipoTraduccion) {
            res.json(tipoTraduccion);
        } else {
            next(new NotFoundError("TipoTraduccion no encontrado"));
        }
    } catch(error) {
        next(error);
    }
};


// Actualizar TipoTraduccion
export const updateTipoTraduccion = async (req, res, next) => {
    try {
        const tipoTraduccion = await tipo_traduccionService.updateTipoTraduccion(req.params.id, req.body);
        if (tipoTraduccion) {
            res.json(tipoTraduccion);
        } else {
            next(new NotFoundError("TipoTraduccion no encontrado"));
        }
    } catch(error) {
        next(error);
    }
};


// Eliminar TipoTraduccion
export const deleteTipoTraduccion = async (req, res, next) => {
    try {
        const result = await tipo_traduccionService.deleteTipoTraduccion(req.params.id);
        if (result) {
            res.send("TipoTraduccion eliminado");
        } else {
            next(new NotFoundError("TipoTraduccion no encontrado"));
        }
    } catch(error) {
        next(error);
    }
};

