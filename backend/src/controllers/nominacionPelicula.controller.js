import * as service from "../services/nominacionPelicula.service.js";
import { NotFoundError, BadRequestError } from "../utils/errors.js";
import { log } from "../utils/logger.js";

// Buscar todas las nominaciones de peliculas
export const getNominacionesPelicula = async (req, res, next) => {
  try {
    const nominaciones = await service.findAll();
    res.json(nominaciones);
    log(
      req,
      `GET /nominacionesPelicula ${nominaciones.length} registros encontrados`
    );
  } catch (error) {
    log(req, `Error en getNominacionesPelicula: ${error.message}`);
    next(error);
  }
};

// Buscar todas las nominaciones de peliculas de una pelicula
export const getNominacionesByPelicula = async (req, res, next) => {
  try {
    const nominaciones = await service.findAllByPelicula(req.params.id);
    res.json(nominaciones);
    log(
      req,
      `GET /nominacionesPelicula/pelicula/${req.params.id} ${nominaciones.length} registros encontrados`
    );
  } catch (error) {
    log(req, `Error en getNominacionesPeliculaByPelicula: ${error.message}`);
    next(error);
  }
};

// Crear una nueva nominacion de pelicula
export const createNominacionPelicula = async (req, res, next) => {
  try {
    const nominacion = req.body;
    const nuevaNominacion = await service.create(nominacion);
    res.status(201).json(nuevaNominacion);
  } catch (error) {
    log(req, `Error en createNominacionPelicula: ${error.message}`);
    next(error);
  }
};

// Buscar una nominacion de pelicula por sus id
export const getNominacionPeliculaById = async (req, res, next) => {
  try {
    const nominacion = await service.findById(req.params.id);
    if (nominacion) {
      res.json(nominacion);
    } else {
      throw new NotFoundError("Nominacion de pelicula no encontrada");
    }
  } catch (error) {
    log(req, `Error en getNominacionPeliculaById: ${error.message}`);
    next(error);
  }
};

// Actualizar una nominacion de pelicula
export const updateNominacion = async (req, res, next) => {
  try {
    const updatedNominacion = await service.update(req.params.id, req.body);
    if (updatedNominacion) {
      res.json(updatedNominacion);
    } else {
      throw new NotFoundError("Nominacion de pelicula no encontrada");
    }
  } catch (error) {
    log(req, `Error en updateNominacion: ${error.message}`);
    next(error);
  }
};

// Eliminar una nominacion de pelicula
export const deleteNominacionPelicula = async (req, res, next) => {
  try {
    const result = await service.remove(req.params.id);
    if (result) {
      res.status(204).send("Nominacion de pelicula eliminada");
    } else {
      throw new NotFoundError("Nominacion de pelicula no encontrada");
    }
  } catch (error) {
    log(req, `Error en deleteNominacionPelicula: ${error.message}`);
    next(error);
  }
};
