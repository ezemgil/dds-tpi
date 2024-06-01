import * as tipoRolService from '../services/tipoRolService.js';
import { NotFoundError } from '../utils/errors.js';

// Buscar todos los tipos de rol
export const getTiposRol = async (req, res, next) => {
  try {
    const tiposRol = await tipoRolService.getTiposRol();
    res.json(tiposRol);
  } catch (error) {
    next(error);
  }
};

// Buscar un tipo de rol por su id
export const getTipoRolById = async (req, res, next) => {
  try {
    const tipoRol = await tipoRolService.getTipoRolById(req.params.id);
    if (tipoRol) {
      res.json(tipoRol);
    } else {
      next(new NotFoundError('Tipo de rol no encontrado'));
    }
  } catch (error) {
    next(error);
  }
};

// Crear un nuevo tipo de rol
export const createTipoRol = async (req, res, next) => {
  try {
    const tipoRol = await tipoRolService.createTipoRol(req.body);
    res.status(201).json(tipoRol);
  } catch (error) {
    next(error);
  }
};

// Actualizar un tipo de rol
export const updateTipoRol = async (req, res, next) => {
  try {
    const tipoRol = await tipoRolService.updateTipoRol(req.params.id, req.body);
    if (tipoRol) {
      res.json(tipoRol);
    } else {
      next(new NotFoundError('Tipo de rol no encontrado'));
    }
  } catch (error) {
    next(error);
  }
};

// Eliminar un tipo de rol
export const deleteTipoRol = async (req, res, next) => {
  try {
    const result = await tipoRolService.deleteTipoRol(req.params.id);
    if (result) {
      res.send('Tipo de rol eliminado');
    } else {
      next(new NotFoundError('Tipo de rol no encontrado'));
    }
  } catch (error) {
    next(error);
  }
};


