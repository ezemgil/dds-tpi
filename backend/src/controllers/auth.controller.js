import jwt from "jsonwebtoken";
import * as service from "../services/usuario.service.js";
import * as auth from "../middleware/auth.js";
import {
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
} from "../utils/errors.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { log } from "../utils/logger.js";

dotenv.config();

let refreshTokens = [];

export const login = async (req, res, next) => {
  const { nombre, clave } = req.body;

  if (!nombre || !clave) {
    log(
      req,
      "Error en login: Nombre de usuario o contraseña no proporcionados"
    );
    return next(
      new BadRequestError("Nombre de usuario o contraseña no proporcionados")
    );
  }

  // Buscar el usuario
  const usuario = await service.findByUsername(nombre);

  // Verificar la contraseña
  const claveCorrecta = usuario
    ? await bcrypt.compare(clave, usuario.clave)
    : false;

  // Verificar si el usuario existe y la contraseña es correcta
  if (!usuario || !claveCorrecta) {
    log(req, "Error en login: Nombre de usuario o contraseña incorrectos");
    return next(
      new BadRequestError("Nombre de usuario o contraseña incorrectos")
    );
  }

  // Generar el token de autenticación
  const accessToken = jwt.sign(
    { usuario: usuario.nombre, rol: usuario.rol.rol },
    auth.accessTokenSecret,
    { expiresIn: auth.accessTokenExpiration }
  );

  // Generar el token de refresco
  const refreshToken = jwt.sign(
    { usuario: usuario.nombre, rol: usuario.rol.rol },
    auth.refreshTokenSecret
  );

  // Guardar el token de refresco
  refreshTokens.push(refreshToken);

  log(req, `Usuario ${usuario.nombre} inició sesión`);

  res.json({
    accessToken,
    refreshToken,
    message: `Bienvenido ${usuario.nombre}`,
  });
};

export const refresh = (req, res, next) => {
  const { token } = req.body;

  if (!token) {
    log(req, "Error en refresh: Token de refresco no proporcionado");
    return next(new BadRequestError("Token de refresco no proporcionado"));
  }

  if (!refreshTokens.includes(token)) {
    log(req, "Error en refresh: Token de refresco inválido");
    return next(new UnauthorizedError("Token de refresco inválido"));
  }

  jwt.verify(token, auth.refreshTokenSecret, (err, user) => {
    if (err) {
      log(req, "Error en refresh: Token de refresco inválido");
      return next(new ForbiddenError("Token de refresco inválido"));
    }

    const accessToken = jwt.sign(
      { usuario: usuario.nombre, rol: usuario.rol.rol },
      auth.accessTokenSecret,
      { expiresIn: auth.accessTokenExpiration }
    );
    log(req, "Token de acceso actualizado");
    res.json({ accessToken });
  });
};

export const logout = (req, res, next) => {
  const { token } = req.body;

  // Eliminar el token de refresco
  if (!token && !refreshTokens.includes(token)) {
    log(req, "Error en logout: Token de refresco no proporcionado o inválido");
    return next(
      new BadRequestError("Token de refresco no proporcionado o inválido")
    );
  }
  refreshTokens = refreshTokens.filter((t) => t !== token);
  log(req, "Sesión cerrada");
  res.json({ message: "Sesión cerrada" });
};
