import * as service from "../services/tipoRol.service.js";
import { NotFoundError } from "../utils/errors.js";

// Buscar todos los tipos de rol
export const getTiposRol = async (req, res, next) => {
  try {
    const tiposRol = await service.findAll();
    res.json(tiposRol);
  } catch (error) {
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
    next(error);
  }
};

// Crear un nuevo tipo de rol
export const createTipoRol = async (req, res, next) => {
  try {
    const tipoRol = await service.create(req.body);
    res.status(201).json(tipoRol);
  } catch (error) {
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
    next(error);
  }
};
