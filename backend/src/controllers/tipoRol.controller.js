import * as service from "../services/tipoRol.service.js";
import { NotFoundError } from "../utils/errors.js";
import { log } from "../utils/logger.js";

// Buscar todos los tipos de rol
export const getTiposRol = async (req, res, next) => {
  try {
    const page = req.query.page;
    const size = req.query.size;
    const tiposRol = await service.findAll(page, size);
    res.json(tiposRol);
    log(req, `GET /tipos-rol ${tiposRol.length} registros encontrados`);
  } catch (error) {
    log(req, `Error en getTiposRol: ${error.message}`);
    next(error);
  }
};

// Buscar un tipo de rol por su id
export const getTipoRolById = async (req, res, next) => {
  try {
    const tipoRol = await service.findById(req.params.id);
    if (tipoRol) {
      res.json(tipoRol);
    } else {
      next(new NotFoundError("Tipo de rol no encontrado"));
    }
  } catch (error) {
    log(req, `Error en getTipoRolById: ${error.message}`);
    next(error);
  }
};

// Crear un nuevo tipo de rol
export const createTipoRol = async (req, res, next) => {
  try {
    const tipoRol = await service.create(req.body);
    res.status(201).json(tipoRol);
  } catch (error) {
    log(req, `Error en createTipoRol: ${error.message}`);
    next(error);
  }
};

// Buscar un tipo de rol por su nombre
export const getTipoRolByName = async (req, res, next) => {
  try {
    const tipoRol = await service.findByName(req.params.nombre);
    if (tipoRol) {
      res.json(tipoRol);
    } else {
      next(new NotFoundError("Tipo de rol no encontrado"));
    }
  } catch (error) {
    log(req, `Error en getTipoRolByName: ${error.message}`);
    next(error);
  }
};

// Actualizar un tipo de rol
export const updateTipoRol = async (req, res, next) => {
  try {
    const tipoRol = await service.update(req.params.id, req.body);
    if (tipoRol) {
      res.json(tipoRol);
    } else {
      next(new NotFoundError("Tipo de rol no encontrado"));
    }
  } catch (error) {
    log(req, `Error en updateTipoRol: ${error.message}`);
    next(error);
  }
};

// Eliminar un tipo de rol
export const deleteTipoRol = async (req, res, next) => {
  try {
    const result = await service.remove(req.params.id);
    if (result) {
      res.send("Tipo de rol eliminado");
    } else {
      next(new NotFoundError("Tipo de rol no encontrado"));
    }
  } catch (error) {
    log(req, `Error en deleteTipoRol: ${error.message}`);
    next(error);
  }
};
