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

let refreshTokens = [];

// Iniciar sesión
export const login = async (req, res, next) => {
  const { nombre, clave } = req.body;
  if (!nombre || !clave) {
    next(new BadRequestError("Usuario y contraseña requeridos"));
  }
  const usuario = await seguridadService.getUsuarioByUsername(nombre);
  if (!usuario) {
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
    res.json({ accessToken, refreshToken });
  } else {
    next(new UnauthorizedError("Usuario o contraseña incorrectos"));
  }
};

// Cerrar sesión
export const logout = (req, res, next) => {
  const { token } = req.body;
  refreshTokens = refreshTokens.filter((t) => t !== token);
  res.json({ message: "Usuario desconectado" });
};

// Renovar token
export const token = (req, res, next) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    next(new UnauthorizedError("Acceso denegado"));
  }
  if (!refreshTokens.includes(refreshToken)) {
    next(new ForbiddenError("Token inválido"));
  }
  jwt.verify(refreshToken, refreshTokenSecret, (err, user) => {
    if (err) {
      next(new ForbiddenError("Token inválido"));
    }
    const accessToken = jwt.sign(
      { nombre: user.nombre, role: user.role },
      accessTokenSecret,
      { expiresIn: "20m" }
    );
    res.json({ accessToken });
  });
};
