import jwt from "jsonwebtoken";
import { UnauthorizedError } from "../utils/errors.js";
import dotenv from "dotenv";

dotenv.config();

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

const authentificateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, accessTokenSecret, (err, user, next) => {
      if (err) {
        next(new UnauthorizedError("Token inválido"));
      }
      res.locals.user = user;
      next();
    });
  } else {
    next(new UnauthorizedError("Acceso denegado"));
  }
};

export { authentificateJWT, accessTokenSecret, refreshTokenSecret };
