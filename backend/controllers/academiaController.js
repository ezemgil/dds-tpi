import * as academiaService from '../services/academiaService.js';
import { NotFoundError, BadRequestError } from '../utils/errors.js';

// Buscar todas las academias
export const getAcademias = async (req, res, next) => {
  try {
    const academias = await academiaService.getAcademias();
    res.json(academias);
  } catch (error) {
    next(error);
  }
};


// Crear nueva academia
export const createAcademia = async (req, res, next) => {
    try {
        const academia = await academiaService.createAcademia(req.body);
        res.status(201).json(academia);
    } catch (error) {
        next(error);
    }
};


// Buscar una academia por su id
export const getAcademiaById = async (req, res, next) => {
    try {
        const academia = await academiaService.getAcademiaById(req.params.id);
        if (academia) {
        res.json(academia);
        } else {
        next(new NotFoundError("Academia no encontrada"));
        }
    } catch (error) {
        next(error);
    }
};


// Actualizar una academia
export const updateAcademia = async (req, res, next) => {
    try {
        const academia = await academiaService.updateAcademia(req.params.id, req.body);
        if (academia) {
        res.json(academia);
        } else {
        next(new NotFoundError("Academia no encontrada"));
        }
    } catch (error) {
        next(error);
    }
};


// Eliminar una academia
export const deleteAcademia = async (req, res, next) => {
    try {
        const result = await academiaService.deleteAcademia(req.params.id);
        if (result) {
        res.send("Academia eliminada");
        } else {
        next(new NotFoundError("Academia no encontrada"));
        }
    } catch (error) {
        next(error);
    }
};