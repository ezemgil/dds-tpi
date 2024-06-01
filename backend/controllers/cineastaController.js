import * as cineastaService from '../services/cineastaService.js';
import { NotFoundError } from '../utils/errors.js';

// Buscar todos los cineastas
export const getCineastas = async (req, res, next) => {
  try {
    const cineastas = await cineastaService.findAllCineastas();
    res.json(cineastas);
  } catch (error) {
    next(error);
  }
};

// Buscar un cineasta por su id
export const getCineastaById = async (req, res, next) => {
  try {
    const cineasta = await cineastaService.findById(req.params.id);
    if (cineasta) {
      res.json(cineasta);
    } else {
      next(new NotFoundError('Cineasta no encontrado'));
    }
  } catch (error) {
    next(error);
  }
};

// Crear un nuevo cineasta
export const createCineasta = async (req, res, next) => {
  try {
    const cineasta = await cineastaService.create(req.body);
    console.log(cineasta);
    res.status(201).json(cineasta);
  } catch (error) {
    next(error);
  }
};

// Actualizar un cineasta
export const updateCineasta = async (req, res, next) => {
  try {
    const cineasta = await cineastaService.update(req.params.id, req.body);
    if (cineasta) {
      res.json(cineasta);
    } else {
      next(new NotFoundError('Cineasta no encontrado'));
    }
  } catch (error) {
    next(error);
  }
};

// Eliminar un cineasta
export const deleteCineasta = async (req, res, next) => {
  try {
    const result = await cineastaService.remove(req.params.id);
    if (result) {
      res.send('Cineasta eliminado');
    } else {
      next(new NotFoundError('Cineasta no encontrado'));
    }
  } catch (error) {
    next(error);
  }
};
