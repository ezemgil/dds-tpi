import * as generoService from "../services/generoService.js";
import { NotFoundError, BadRequestError } from "../utils/errors.js";

// Buscar todos los géneros
export const getGeneros = async (req, res, next) => {
  try {
    const generos = await generoService.getGeneros();
    res.json(generos);
  } catch (error) {
    next(error);
  }
};

// Buscar un género por su id
export const getGeneroById = async (req, res, next) => {
  try {
    const genero = await generoService.getGeneroById(req.params.id);
    if (genero) {
      res.json(genero);
    } else {
      next(new NotFoundError("Género no encontrado"));
    }
  } catch (error) {
    next(error);
  }
};

// Crear un nuevo género
export const createGenero = async (req, res, next) => {
  try {
    const genero = await generoService.createGenero(req.body);
    res.status(201).json(genero);
  } catch (error) {
    next(error);
  }
};

// Actualizar un género
export const updateGenero = async (req, res, next) => {
  try {
    const genero = await generoService.updateGenero(req.params.id, req.body);
    if (genero) {
      res.json(genero);
    } else {
      next(new NotFoundError("Género no encontrado"));
    }
  } catch (error) {
    next(error);
  }
};

// Eliminar un género
export const deleteGenero = async (req, res, next) => {
  try {
    const result = await generoService.deleteGenero(req.params.id);
    if (result) {
      res.send("Género eliminado");
    } else {
      next(new NotFoundError("Género no encontrado"));
    }
  } catch (error) {
    next(error);
  }
};
