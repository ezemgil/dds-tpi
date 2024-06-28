import * as service from "../services/cineasta.service.js";
import { NotFoundError } from "../utils/errors.js";
import { log } from "../utils/logger.js";

// Buscar cineastas por nombre
export const getCineastasByName = async (req, res, next) => {
  try {
    const cineastas = await service.findByName(req.query.nombre);
    res.json(cineastas);
    log(
      req,
      `GET /cineastas?nombre=${req.query.nombre} ${cineastas.length} registros encontrados`
    );
  } catch (error) {
    log(req, `Error en getCineastasByName: ${error.message}`);
    next(error);
  }
};

// Obtener X cineastas aleatorios
export const getCineastasAleatorios = async (req, res, next) => {
  try {
    const cineastas = await service.findRandom(req.query.cantidad);
    res.json(cineastas);
    log(
      req,
      `GET /cineastas/aleatorios?cantidad=${req.query.cantidad} ${cineastas.length} registros encontrados`
    );
  } catch (error) {
    log(req, `Error en getCineastasAleatorios: ${error.message}`);
    next(error);
  }
};

// Obtener las películas de un cineasta
export const getPeliculasByCineasta = async (req, res, next) => {
  try {
    const peliculas = await service.findPeliculasByCineasta(req.params.id);
    res.json(peliculas);
    log(req, `GET /cineasta/${req.params.id}/peliculas`);
  } catch (error) {
    log(req, `Error en getPeliculasByCineasta: ${error.message}`);
    next(error);
  }
};

// Buscar todos los cineastas
export const getCineastas = async (req, res, next) => {
  try {
    const page = req.query.page;
    const size = req.query.size;
    const cineastas = await service.findAll(page, size);
    res.json(cineastas);
    log(req, `GET /cineastas ${cineastas.length} registros encontrados`);

  } catch (error) {
    log(req, `Error en getCineastas: ${error.message}`);
    next(error);
  }
};

// Buscar un cineasta por su id
export const getCineastaById = async (req, res, next) => {
  try {
    const cineasta = await service.findById(req.params.id);
    if (cineasta) {
      res.json(cineasta);
      log(req, `GET /cineasta/${req.params.id}`);
    } else {
      next(new NotFoundError("Cineasta no encontrado"));
    }
  } catch (error) {
    log(req, `Error en getCineastaById: ${error.message}`);
    next(error);
  }
};

// Crear un nuevo cineasta
export const createCineasta = async (req, res, next) => {
  try {
    const { roles, ...cineasta } = req.body;
    const newCineasta = await service.create(cineasta, roles);
    res.status(201).json(newCineasta);
    log(req, `POST /cineastas`);
  } catch (error) {
    log(req, `Error en createCineasta: ${error.message}`);
    next(error);
  }
};

// Actualizar un cineasta
export const updateCineasta = async (req, res, next) => {
  try {
    const { roles, ...cineasta } = req.body;
    
    const updatedCineasta = await service.update(
      req.params.id,
      cineasta,
      roles
    );
    if (updatedCineasta) {
      res.json(updatedCineasta);
      log(req, `PUT /cineastas/${req.params.id}`);
    } else {
      next(new NotFoundError("Cineasta no encontrado"));
    }
  } catch (error) {
    log(req, `Error en updateCineasta: ${error.message}`);
    next(error);
  }
};

// Eliminar un cineasta
export const deleteCineasta = async (req, res, next) => {
  try {
    const result = await service.remove(req.params.id);
    if (result) {
      res.send("Cineasta eliminado");
    } else {
      next(new NotFoundError("Cineasta no encontrado"));
    }
  } catch (error) {
    log(req, `Error en deleteCineasta: ${error.message}`);
    next(error);
  }
};
