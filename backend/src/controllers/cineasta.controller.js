import * as service from "../services/cineasta.service.js";
import { NotFoundError } from "../utils/errors.js";
import { log } from "../utils/logger.js";

// Buscar todos los cineastas
export const getCineastas = async (req, res, next) => {
  try {
    const cineastas = await service.findAll();
    res.json(cineastas);
    log(
      1,
      req.headers["user-agent"],
      "GET / cineastas",
      cineastas.length,
      "registros encontrados"
    );
  } catch (error) {
    next(error);
  }
};

// Buscar un cineasta por su id
export const getCineastaById = async (req, res, next) => {
  try {
    const cineasta = await service.findById(req.params.id);
    if (cineasta) {
      res.json(cineasta);
    } else {
      next(new NotFoundError("Cineasta no encontrado"));
    }
  } catch (error) {
    next(error);
  }
};

// Crear un nuevo cineasta
export const createCineasta = async (req, res, next) => {
  try {
    const cineasta = await service.create(req.body);
    console.log(cineasta);
    res.status(201).json(cineasta);
  } catch (error) {
    next(error);
  }
};

// Actualizar un cineasta
export const updateCineasta = async (req, res, next) => {
  try {
    const cineasta = await service.update(req.params.id, req.body);
    if (cineasta) {
      res.json(cineasta);
    } else {
      next(new NotFoundError("Cineasta no encontrado"));
    }
  } catch (error) {
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
    next(error);
  }
};
