import * as service from "../services/idioma.service.js";
import { NotFoundError, BadRequestError } from "../utils/errors.js";

// Buscar todos los idiomas
export const getIdiomas = async (req, res, next) => {
  try {
    const idiomas = await service.findAll();
    res.json(idiomas);
  } catch (error) {
    next(error);
  }
};

// Buscar idioma por id
export const getIdiomaById = async (req, res, next) => {
  try {
    const idioma = await service.findById(req.params.id);
    if (idioma) {
      res.json(idioma);
    } else {
      next(new NotFoundError("Idiomas no encontrado"));
    }
  } catch (error) {
    next(error);
  }
};

// Crear idioma
export const createIdioma = async (req, res, next) => {
  try {
    const idioma = await service.create(req.body);
    res.status(201).json(idioma);
  } catch (error) {
    next(error);
  }
};

// Actualizar idioma
export const updateIdioma = async (req, res, next) => {
  try {
    const idioma = await service.update(req.params.id, req.body);
    if (idioma) {
      res.json(idioma);
    } else {
      next(new NotFoundError("Idioma no encontrado"));
    }
  } catch (error) {
    next(error);
  }
};

// Eliminar idioma
export const deleteIdioma = async (req, res, next) => {
  console.log(`Borrando idioma: ${req.params.id}`);
  try {
    const result = await service.remove(req.params.id);
    if (result) {
      res.status(204).send("Idioma eliminado");
    } else {
      next(new NotFoundError("Idioma no encontrado"));
    }
  } catch (error) {
    next(error);
  }
};
