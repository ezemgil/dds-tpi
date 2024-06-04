import jwt from "jsonwebtoken";
import * as usuarioService from "../services/usuarioService.js";
import * as auth from "../middleware/auth.js";
import {
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
} from "../utils/errors.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

let refreshTokens = [];

export const login = async (req, res, next) => {
  const { nombre, clave } = req.body;

  // Buscar el usuario en la base de datos
  const usuario = await usuarioService.getUsuarioByName(nombre);

  // Verificar si el usuario existe y la contraseña es correcta
  if (!usuario || !bcrypt.compare(clave, usuario.clave)) {
    return next(
      new BadRequestError("Nombre de usuario o contraseña incorrectos")
    );
  }

  // Generar el token de autenticación
  const accessToken = jwt.sign(
    { usuario: usuario.nombre, rol: usuario.rol.nombre },
    auth.accessTokenSecret,
    { expiresIn: auth.accessTokenExpiration }
  );

  // Generar el token de refresco
  const refreshToken = jwt.sign(
    { usuario: usuario.nombre, rol: usuario.rol.nombre },
    auth.refreshTokenSecret
  );

  // Guardar el token de refresco
  refreshTokens.push(refreshToken);

  res.json({
    accessToken,
    refreshToken,
    message: `Bienvenido ${usuario.nombre}`,
  });
};

export const refresh = (req, res, next) => {
  const { token } = req.body;

  if (!token) {
    return next(new BadRequestError("Token de refresco no proporcionado"));
  }

  if (!refreshTokens.includes(token)) {
    return next(new UnauthorizedError("Token de refresco inválido"));
  }

  jwt.verify(token, auth.refreshTokenSecret, (err, user) => {
    if (err) {
      return next(new ForbiddenError("Token de refresco inválido"));
    }

    const accessToken = jwt.sign(
      { usuario: usuario.nombre, rol: usuario.rol.nombre },
      auth.accessTokenSecret,
      { expiresIn: auth.accessTokenExpiration }
    );

    res.json({ accessToken });
  });
};

export const logout = (req, res, next) => {
  const { token } = req.body;

  // Eliminar el token de refresco
  if (!token && !refreshTokens.includes(token)) {
    return next(
      new BadRequestError("Token de refresco no proporcionado o inválido")
    );
  }
  refreshTokens = refreshTokens.filter((t) => t !== token);
  res.json({ message: "Sesión cerrada" });
};
