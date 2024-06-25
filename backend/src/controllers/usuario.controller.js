import * as service from "../services/usuario.service.js";
import { NotFoundError } from "../utils/errors.js";

// Buscar todos los usuarios
export const getUsuarios = async (req, res, next) => {
  try {
    const usuarios = await service.findAll();
    res.json(usuarios);
  } catch (error) {
    next(error);
  }
};
