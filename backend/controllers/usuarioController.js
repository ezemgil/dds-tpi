import * as usuarioService from "../services/usuarioService.js";
import { NotFoundError } from "../utils/errors.js";

// Buscar todos los usuarios
export const getUsuarios = async (req, res, next) => {
  try {
    const usuarios = await usuarioService.getUsuarios();
    res.json(usuarios);
  } catch (error) {
    next(error);
  }
};
