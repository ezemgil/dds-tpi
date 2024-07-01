import jwt from "jsonwebtoken";
import { UnauthorizedError } from "../utils/errors.js";
import dotenv from "dotenv";
import { justLog } from "../utils/logger.js";

dotenv.config();

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
const accessTokenExpiration = process.env.ACCESS_TOKEN_EXPIRATION;

const authentificateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    justLog(JSON.stringify(authHeader));
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        justLog(JSON.stringify(token));
        jwt.verify(token, accessTokenSecret, (err, user) => {
            if (err) {
                return next(new UnauthorizedError("Token inválido"));
            }
            res.locals.user = user;
            next();
        });
    } else {
        next(new UnauthorizedError("Acceso denegado"));
    }
};

export { authentificateJWT, accessTokenSecret, refreshTokenSecret, accessTokenExpiration };
