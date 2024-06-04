import * as roles_usuarioService from "../services/roles_usuarioService.js";
import { NotFoundError, BadRequestError } from "../utils/errors.js";
import { logger } from "../utils/logger.js";

// Buscar todos los roles
export const getRoles = async (req, res, next) => {
  try {
    const roles = await roles_usuarioService.getRoles();
    logger.info(
      `GET /roles | ${req.headers["user-agent"]} | ${roles.length} registros encontrados`
    );
    res.json(roles);
  } catch (error) {
    logger.error(
      `GET /roles | ${req.headers["user-agent"]} | ${error.message}`
    );
    next(error);
  }
};

// Buscar rol por nombre
export const getRolByName = async (req, res, next) => {
  try {
    const rol = await roles_usuarioService.getRolByName(req.query.nombre);
    if (rol) {
      logger.info(
        `GET /roles/${req.query.nombre} | ${req.headers["user-agent"]} | Rol ${req.query.nombre} encontrado`
      );
      res.json(rol);
    } else {
      logger.warn(
        `GET /roles/${req.query.nombre} | ${req.headers["user-agent"]} | Rol ${req.query.nombre} no encontrado`
      );
      next(new NotFoundError("Rol no encontrado"));
    }
  } catch (error) {
    logger.error(
      `GET /roles/${req.query.nombre} | ${req.headers["user-agent"]} | ${error.message}`
    );
    next(error);
  }
};

// Crear un nuevo rol
export const createRol = async (req, res, next) => {
  try {
    const rol = await roles_usuarioService.createRol(req.body);
    logger.info(
      `POST /roles | ${
        req.headers["user-agent"]
      } | Rol creado - ${JSON.stringify(rol)}`
    );
    res.status(201).json(rol);
  } catch (error) {
    logger.error(
      `POST /roles | ${req.headers["user-agent"]} | ${error.message}`
    );
    next(error);
  }
};

// Actualizar un rol
export const updateRol = async (req, res, next) => {
  const { id } = req.params;
  const { nombre } = req.body;
  if (!nombre) {
    logger.error(
      `PUT /roles/${id} | ${req.headers["user-agent"]} | Nombre requerido`
    );
    next(new BadRequestError("Nombre requerido"));
  }
  const result = await roles_usuarioService.updateRol(id, nombre);
  if (!result) {
    logger.warn(
      `PUT /roles/${id} | ${req.headers["user-agent"]} | Rol no encontrado`
    );
    next(new NotFoundError("Rol no encontrado"));
  }
  logger.info(
    `PUT /roles/${id} | ${req.headers["user-agent"]} | Rol actualizado`
  );
  res.json({ message: "Rol actualizado" });
};

// Eliminar un rol
export const deleteRol = async (req, res, next) => {
  const { id } = req.params;
  const result = await roles_usuarioService.deleteRol(id);
  if (!result) {
    logger.warn(
      `DELETE /roles/${id} | ${req.headers["user-agent"]} | Rol no encontrado`
    );
    next(new NotFoundError("Rol no encontrado"));
  }
  logger.info(
    `DELETE /roles/${id} | ${req.headers["user-agent"]} | Rol eliminado`
  );
  res.json({ message: "Rol eliminado" });
};
