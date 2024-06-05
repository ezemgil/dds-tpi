import * as roles_usuarioService from "../services/roles_usuarioService.js";
import { NotFoundError, BadRequestError } from "../utils/errors.js";
import { logger } from "../utils/logger.js";

// Buscar todos los roles
export const getRoles = async (req, res, next) => {
  const { user } = res.locals;
  try {
    if (user.rol === "Administrador" || user.rol === "Supervisor") {
      const roles = await roles_usuarioService.getRoles();
      res.json(roles);
      logger.info(`${user.usuario} accedió al listado de roles de usuario`);
    } else {
      logger.error(
        `El usuario ${user.usuario} no tiene permisos para obtener todos los roles`
      );
      next(new BadRequestError("No tiene permisos para realizar esta acción"));
    }
  } catch (error) {
    logger.error(`Error al obtener los roles: ${error.message}`);
    next(error);
  }
};

// Buscar rol por nombre
export const getRolByName = async (req, res, next) => {
  const { user } = res.locals;
  try {
    if (user.rol === "Administrador" || user.rol === "Supervisor") {
      const rol = await roles_usuarioService.getRolByName(req.query.nombre);
      if (rol) {
        logger.info(
          `El usuario ${user.usuario} buscó el rol ${req.query.nombre}`
        );
        res.json(rol);
      } else {
        logger.error(
          `El usuario ${user.usuario} buscó el rol ${req.query.nombre}`
        );
        next(new NotFoundError("Rol no encontrado"));
      }
    }
  } catch (error) {
    logger.error(`Error al buscar el rol: ${error.message}`);
    next(error);
  }
};

// Crear un nuevo rol
export const createRol = async (req, res, next) => {
  const { user } = res.locals;
  try {
    if (user.rol === "Administrador") {
      const rol = await roles_usuarioService.createRol(req.body);
      logger.info(`El usuario ${user.usuario} creó un nuevo rol`);
      res.json(rol);
    } else {
      logger.error(
        `El usuario ${user.usuario} no tiene permisos para crear un rol`
      );
      next(new BadRequestError("No tiene permisos para realizar esta acción"));
    }
  } catch (error) {
    logger.error(`Error al crear el rol: ${error.message}`);
    next(error);
  }
};

// Actualizar un rol
export const updateRol = async (req, res, next) => {
  const { user } = res.locals;
  try {
    if (user.rol === "Administrador") {
      const { id } = req.params;
      const result = await roles_usuarioService.updateRol(id, req.body);
      if (!result) {
        logger.error(
          `El usuario ${user.usuario} intentó actualizar un rol que no existe`
        );
        next(new NotFoundError("Rol no encontrado"));
      }
      logger.info(`El usuario ${user.usuario} actualizó el rol con id ${id}`);
      res.json(result);
    } else {
      logger.error(
        `El usuario ${user.usuario} no tiene permisos para actualizar un rol`
      );
      next(new BadRequestError("No tiene permisos para realizar esta acción"));
    }
  } catch (error) {
    logger.error(`Error al actualizar el rol: ${error.message}`);
    next(error);
  }
};

// Eliminar un rol
export const deleteRol = async (req, res, next) => {
  const { user } = res.locals;
  try {
    if (user.rol === "Administrador") {
      const { id } = req.params;
      const result = await roles_usuarioService.deleteRol(id);
      if (!result) {
        logger.error(
          `El usuario ${user.usuario} intentó eliminar un rol que no existe`
        );
        next(new NotFoundError("Rol no encontrado"));
      }
      logger.info(`El usuario ${user.usuario} eliminó el rol con id ${id}`);
      res.json(result);
    } else {
      logger.error(
        `El usuario ${user.usuario} no tiene permisos para eliminar un rol`
      );
      next(new BadRequestError("No tiene permisos para realizar esta acción"));
    }
  } catch (error) {
    logger.error(`Error al eliminar el rol: ${error.message}`);
    next(error);
  }
};
