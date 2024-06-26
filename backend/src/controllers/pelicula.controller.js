import * as service from "../services/pelicula.service.js";
import { NotFoundError, BadRequestError } from "../utils/errors.js";
import { log } from "../utils/logger.js";

// Obtener todas las películas
export const getPeliculas = async (req, res, next) => {
  try {
    const peliculas = await service.findAll();
    res.json(peliculas);
    log(req, `GET /peliculas ${peliculas.length} registros encontrados`);
  } catch (error) {
    log(req, `Error: ${error.message}`);
    next(error);
  }
};

// Obtener X películas aleatorias
export const getPeliculasAleatorias = async (req, res, next) => {
  try {
    const peliculas = await service.findRandom(req.query.cantidad);
    res.json(peliculas);
    log(
      req,
      `GET /peliculas/aleatorias?cantidad=${req.query.cantidad} ${peliculas.length} registros encontrados`
    );
  } catch (error) {
    log(req, `Error: ${error.message}`);
    next(error);
  }
};

// Obtener la lista de actores de una película
export const getElenco = async (req, res, next) => {
  try {
    const elenco = await service.getElenco(req.params.id);
    res.json(elenco);
    log(req, `GET /peliculas/${req.params.id}/actores`);
  } catch (error) {
    log(req, `Error: ${error.message}`);
    next(error);
  }
};

// Buscar una película por su id
export const getPeliculaById = async (req, res, next) => {
  try {
    const pelicula = await service.findById(req.params.id);
    if (pelicula) {
      res.json(pelicula);
      log(req, `GET /peliculas/${req.params.id}`);
    } else {
      next(new NotFoundError("Película no encontrada"));
    }
  } catch (error) {
    log(req, `Error: ${error.message}`);
    next(error);
  }
};

// Buscar una película por su nombre
export const getPeliculaByNombre = async (req, res, next) => {
  try {
    const peliculas = await service.findByName(req.query.nombre);
    res.json(peliculas);
    log(
      req,
      `GET /peliculas?nombre=${req.query.nombre} ${peliculas.length} registros encontrados`
    );
  } catch (error) {
    log(req, `Error: ${error.message}`);
    next(error);
  }
};

// Crear una nueva película
export const createPelicula = async (req, res, next) => {
  try {
    const { generos, idiomas, ...pelicula } = req.body;
    const newPelicula = await service.create(pelicula, generos, idiomas);
    log(req, `POST /peliculas`);
    res.status(201).json(newPelicula);
  } catch (error) {
    log(req, `Error: ${error.message}`);
    next(error);
  }
};

// Actualizar una película
export const updatePelicula = async (req, res, next) => {
  try {
    const { generos, idiomas, ...pelicula } = req.body;
    const updatedPelicula = await service.update(
      req.params.id,
      pelicula,
      generos,
      idiomas
    );
    if (updatedPelicula) {
      res.json(updatedPelicula);
    } else {
      throw new NotFoundError("Película no encontrada");
    }
  } catch (error) {
    log(req, `Error: ${error.message}`);
    next(error);
  }
};

// Eliminar una película
export const deletePelicula = async (req, res, next) => {
  try {
    const result = await service.remove(req.params.id);
    if (result) {
      res.status(204).send("Película eliminada");
    } else {
      next(new NotFoundError("Película no encontrada"));
    }
  } catch (error) {
    log(req, `Error: ${error.message}`);
    next(error);
  }
};
