import * as seguridadService from "../services/seguridadService.js";
import {
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
} from "../utils/errors.js";
import jwt from "jsonwebtoken";
import {
  authentificateJWT,
  accessTokenSecret,
  refreshTokenSecret,
} from "../security/auth.js";
import bcrypt from "bcrypt";
import { logger } from "../utils/logger.js";

let refreshTokens = [];

// Iniciar sesión
export const login = async (req, res, next) => {
  const { nombre, clave } = req.body;
  if (!nombre || !clave) {
    logger.error(
      `POST /auth/login | ${req.headers["user-agent"]} | Usuario y contraseña requeridos`
    );
    next(new BadRequestError("Usuario y contraseña requeridos"));
  }
  const usuario = await seguridadService.getUsuarioByUsername(nombre);
  if (!usuario) {
    logger.warn(
      `POST /auth/login | ${req.headers["user-agent"]} | Usuario ${nombre} no encontrado`
    );
    next(new UnauthorizedError("Usuario o contraseña incorrectos"));
  }
  if (await bcrypt.compare(clave, usuario.clave)) {
    const accessToken = jwt.sign(
      { nombre: usuario.nombre, role: usuario.role },
      accessTokenSecret,
      { expiresIn: "20m" }
    );
    const refreshToken = jwt.sign(
      { nombre: usuario.nombre, role: usuario.role },
      refreshTokenSecret
    );
    refreshTokens.push(refreshToken);
    logger.info(
      `POST /auth/login | ${req.headers["user-agent"]} | Usuario ${nombre} autenticado`
    );
    res.json({ accessToken, refreshToken });
  } else {
    logger.warn(
      `POST /auth/login | ${req.headers["user-agent"]} | Usuario o contraseña incorrectos`
    );
    next(new UnauthorizedError("Usuario o contraseña incorrectos"));
  }
};

// Cerrar sesión
export const logout = (req, res, next) => {
  const { token } = req.body;
  refreshTokens = refreshTokens.filter((t) => t !== token);
  logger.info(
    `POST /auth/logout | ${req.headers["user-agent"]} | Usuario desconectado`
  );
  res.json({ message: "Usuario desconectado" });
};

// Renovar token
export const token = (req, res, next) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    logger.warn(
      `POST /auth/token | ${req.headers["user-agent"]} | Acceso denegado`
    );
    next(new UnauthorizedError("Acceso denegado"));
  }
  if (!refreshTokens.includes(refreshToken)) {
    logger.warn(
      `POST /auth/token | ${req.headers["user-agent"]} | Token inválido`
    );
    next(new ForbiddenError("Token inválido"));
  }
  jwt.verify(refreshToken, refreshTokenSecret, (err, user) => {
    if (err) {
      logger.warn(
        `POST /auth/token | ${req.headers["user-agent"]} | Token inválido`
      );
      next(new ForbiddenError("Token inválido"));
    }
    const accessToken = jwt.sign(
      { nombre: user.nombre, role: user.role },
      accessTokenSecret,
      { expiresIn: "20m" }
    );
    logger.info(
      `POST /auth/token | ${req.headers["user-agent"]} | Token renovado`
    );
    res.json({ accessToken });
  });
};
