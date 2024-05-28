import * as peliculaService from "../services/peliculaService.js";
import { NotFoundError, BadRequestError } from "../utils/errors.js";

// Obtener todas las películas
export const getPeliculas = async (req, res, next) => {
  try {
    const peliculas = await peliculaService.getPeliculas();
    res.json(peliculas);
  } catch (error) {
    next(error);
  }
};

// Buscar una película por su id
export const getPeliculaById = async (req, res, next) => {
  try {
    const pelicula = await peliculaService.getPeliculaById(req.params.id);
    if (pelicula) {
      res.json(pelicula);
    } else {
      next(new NotFoundError("Película no encontrada"));
    }
  } catch (error) {
    next(error);
  }
};

// Crear una nueva película
export const createPelicula = async (req, res, next) => {
  try {
    const pelicula = await peliculaService.createPelicula(req.body);
    res.status(201).json(pelicula);
  } catch (error) {
    next(error);
  }
};

// Actualizar una película
export const updatePelicula = async (req, res, next) => {
  try {
    const pelicula = await peliculaService.updatePelicula(
      req.params.id,
      req.body
    );
    if (pelicula) {
      res.json(pelicula);
    } else {
      next(new NotFoundError("Película no encontrada"));
    }
  } catch (error) {
    next(error);
  }
};

// Eliminar una película
export const deletePelicula = async (req, res, next) => {
  try {
    const result = await peliculaService.deletePelicula(req.params.id);
    if (result) {
      res.send("Película eliminada");
    } else {
      next(new NotFoundError("Película no encontrada"));
    }
  } catch (error) {
    next(error);
  }
};
