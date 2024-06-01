import * as nominacionesCineastaService from '../services/nominacionesCineastaService.js';
import { NotFoundError } from '../utils/errors.js';

// Buscar todas las nominaciones de cineastas
export const getNominacionesCineasta = async (req, res, next) => {
  try {
    const nominacionesCineasta = await nominacionesCineastaService.getNominacionesCineasta();
    res.json(nominacionesCineasta);
  } catch (error) {
    next(error);
  }
};


// Buscar una nominación de cineasta por su id
export const getNominacionCineasta = async (req, res, next) => {
  const { academia, premio, pelicula, cineasta, rol } = req.params;
  try {
    const nominacionCineasta = await nominacionesCineastaService.getNominacionCineasta(academia, premio, pelicula, cineasta, rol);
    res.json(nominacionCineasta);
  } catch (error) {
    next(error);
  }
};

// Crear una nueva nominación de cineasta
export const createNominacionCineasta = async (req, res, next) => {
  try {
    const nominacionCineasta = req.body;
    const result = await nominacionesCineastaService.createNominacionCineasta(nominacionCineasta);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

// Actualizar una nominación de cineasta
export const updateNominacionCineasta = async (req, res, next) => {
  const { academia, premio, pelicula, cineasta, rol } = req.params;
  try {
    const nominacionCineasta = req.body;
    const result = await nominacionesCineastaService.updateNominacionCineasta(academia, premio, pelicula, cineasta, rol, nominacionCineasta);
    if (result) {
      res.json(result);
    } else {
      next(new NotFoundError('Nominación de cineasta no encontrada'));
    }
  } catch (error) {
    next(error);
  }
};

// Eliminar una nominación de cineasta
export const removeNominacionCineasta = async (req, res, next) => {
    const { academia, premio, pelicula, cineasta, rol } = req.params;
    try {
        const result = await nominacionesCineastaService.removeNominacionCineasta(academia, premio, pelicula, cineasta, rol);
        if (result) {
            res.send('Nominación de cineasta eliminada');
        }
        else {
            next(new NotFoundError('Nominación de cineasta no encontrada'));
        }
    } catch (error) {
        next(error);
    }
};
