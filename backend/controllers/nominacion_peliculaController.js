import * as nominacion_peliculaService from '../services/nominacion_peliculaService.js';
import { NotFoundError, BadRequestError } from '../utils/errors';

// Buscar todas las nominaciones de peliculas
export const findAll = async (req, res, next) => {
  try {
    const nominaciones = await nominacion_peliculaService.findAll();
    res.json(nominaciones);
  } catch (error) {
    next(error);
  }
};


// Crear una nueva nominacion de pelicula
export const create = async (req, res, next) => {
  try {
    const nominacion = req.body;
    const nuevaNominacion = await nominacion_peliculaService.create(nominacion);
    res.status(201).json(nuevaNominacion);
  } catch (error) {
    next(error);
  }
};


// Buscar una nominacion de pelicula por sus id's
export const findById = async (req, res, next) => {
  try {
    const { id_academia, id_premio, id_pelicula, fecha_nominacion } = req.params;
    const nominacion = await nominacion_peliculaService.findById(id_academia, id_premio, id_pelicula, fecha_nominacion);
    if (nominacion) {
      res.json(nominacion);
    } else {
      throw new NotFoundError('Nominacion de pelicula no encontrada');
    }
  } catch (error) {
    next(error);
  }
};


// Buscar una nominacion de pelicula por su id_academia
export const findByAcademia = async (req, res, next) => {
  try {
    const { id_academia } = req.params;
    const nominacion = await nominacion_peliculaService.findByAcademia(id_academia);
    if (nominacion) {
      res.json(nominacion);
    } else {
      throw new NotFoundError('Nominacion de pelicula no encontrada');
    }
  } catch (error) {
    next(error);
  }
};


// Buscar una nominacion de pelicula por su id_premio
export const findByPremio = async (req, res, next) => {
  try {
    const { id_premio } = req.params;
    const nominacion = await nominacion_peliculaService.findByPremio(id_premio);
    if (nominacion) {
      res.json(nominacion);
    } else {
      throw new NotFoundError('Nominacion de pelicula no encontrada');
    }
  } catch (error) {
    next(error);
  }
};


// Buscar una nominacion de pelicula por su id_pelicula
export const findByPelicula = async (req, res, next) => {
  try {
    const { id_pelicula } = req.params;
    const nominacion = await nominacion_peliculaService.findByPelicula(id_pelicula);
    if (nominacion) {
      res.json(nominacion);
    } else {
      throw new NotFoundError('Nominacion de pelicula no encontrada');
    }
  } catch (error) {
    next(error);
  }
};


// Buscar una nominacion de pelicula por su fecha_nominacion
export const findByFecha = async (req, res, next) => {
  try {
    const { fecha_nominacion } = req.params;
    const nominacion = await nominacion_peliculaService.findByFecha(fecha_nominacion);
    if (nominacion) {
      res.json(nominacion);
    } else {
      throw new NotFoundError('Nominacion de pelicula no encontrada');
    }
  } catch (error) {
    next(error);
  }
};


// Actualizar una nominacion de pelicula
export const update = async (req, res, next) => {
  try {
    const { id_academia, id_premio, id_pelicula, fecha_nominacion } = req.params;
    const nominacion = req.body;
    const updatedNominacion = await nominacion_peliculaService.update(id_academia, id_premio, id_pelicula, fecha_nominacion, nominacion);
    if (updatedNominacion) {
      res.json(updatedNominacion);
    } else {
      throw new NotFoundError('Nominacion de pelicula no encontrada');
    }
  } catch (error) {
    next(error);
  }
};


// Eliminar una nominacion de pelicula
export const deleteNominacion = async (req, res, next) => {
    try {
        const { id_academia, id_premio, id_pelicula, fecha_nominacion } = req.params;
        const result = await nominacion_peliculaService.deleteNominacion(id_academia, id_premio, id_pelicula, fecha_nominacion);
        if (result) {
        res.status(204).end();
        } else {
        throw new NotFoundError('Nominacion de pelicula no encontrada');
        }
    } catch (error) {
        next(error);
    }
};
