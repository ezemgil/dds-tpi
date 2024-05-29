import * as paisService from '../services/paisService.js';
import { NotFoundError } from '../utils/errors.js';

// Buscar todos los países
export const getPaises = async (req, res, next) => {
  try {
    const paises = await paisService.getPaises();
    res.json(paises);
  } catch (error) {
    next(error);
  }
};

// Buscar un país por su id
export const getPaisById = async (req, res, next) => {
  try {
    const pais = await paisService.getPaisById(req.params.id);
    if (pais) {
      res.json(pais);
    } else {
      next(new NotFoundError('País no encontrado'));
    }
  } catch (error) {
    next(error);
  }
};

// Crear un nuevo país
export const createPais = async (req, res, next) => {
  try {
    const pais = await paisService.createPais(req.body);
    res.status(201).json(pais);
  } catch (error) {
    next(error);
  }
};

// Actualizar un país
export const updatePais = async (req, res, next) => {
  try {
    const pais = await paisService.updatePais(req.params.id, req.body);
    if (pais) {
      res.json(pais);
    } else {
      next(new NotFoundError('País no encontrado'));
    }
  } catch (error) {
    next(error);
  }
};

// Eliminar un país
export const deletePais = async (req, res, next) => {
  try {
    const result = await paisService.deletePais(req.params.id);
    if (result) {
      res.send('País eliminado');
    } else {
      next(new NotFoundError('País no encontrado'));
    }
  } catch (error) {
    next(error);
  }
};