import * as service from "../services/rolesUsuario.service.js";
import { NotFoundError, BadRequestError } from "../utils/errors.js";

// Buscar todos los roles
export const getRoles = async (req, res, next) => {
  const { user } = res.locals;
  try {
    if (user.rol === "Administrador" || user.rol === "Supervisor") {
      const roles = await service.findAll();
      res.json(roles);
    } else {
      next(new BadRequestError("No tiene permisos para realizar esta acción"));
    }
  } catch (error) {
    next(error);
  }
};

// Buscar rol por nombre
export const getRolByName = async (req, res, next) => {
  const { user } = res.locals;
  try {
    if (user.rol === "Administrador" || user.rol === "Supervisor") {
      const rol = await service.findByName(req.query.nombre);
      if (rol) {
        res.json(rol);
      } else {
        next(new NotFoundError("Rol no encontrado"));
      }
    }
  } catch (error) {
    next(error);
  }
};

// Crear un nuevo rol
export const createRol = async (req, res, next) => {
  const { user } = res.locals;
  try {
    if (user.rol === "Administrador") {
      const rol = await service.createRol(req.body);
      res.json(rol);
    } else {
      next(new BadRequestError("No tiene permisos para realizar esta acción"));
    }
  } catch (error) {
    next(error);
  }
};

// Actualizar un rol
export const updateRol = async (req, res, next) => {
  const { user } = res.locals;
  try {
    if (user.rol === "Administrador") {
      const { id } = req.params;
      const result = await service.updateRol(id, req.body);
      if (!result) {
        next(new NotFoundError("Rol no encontrado"));
      }
      res.json(result);
    } else {
      next(new BadRequestError("No tiene permisos para realizar esta acción"));
    }
  } catch (error) {
    next(error);
  }
};

// Eliminar un rol
export const deleteRol = async (req, res, next) => {
  const { user } = res.locals;
  try {
    if (user.rol === "Administrador") {
      const { id } = req.params;
      const result = await service.deleteRol(id);
      if (!result) {
        next(new NotFoundError("Rol no encontrado"));
      }

      res.json(result);
    } else {
      next(new BadRequestError("No tiene permisos para realizar esta acción"));
    }
  } catch (error) {
    next(error);
  }
};
